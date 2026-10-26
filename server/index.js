import 'dotenv/config';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Config, Lead, Admin } from './models.js';

const { MONGODB_URI, JWT_SECRET, PORT = 4000, NODE_ENV } = process.env;
if (!MONGODB_URI || !JWT_SECRET || JWT_SECRET.length < 24) {
  console.error('Set MONGODB_URI and a JWT_SECRET of at least 24 characters in server/.env');
  process.exit(1);
}
const isProd = NODE_ENV === 'production';
const COOKIE = 'p1k_admin';

const app = express();
app.set('trust proxy', 1);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
      },
    },
  })
);
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

/* ---------- helpers ---------- */
const isEmail = (s) => typeof s === 'string' && /^\S+@\S+\.\S+$/.test(s);
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const wrap = (fn) => (req, res) => fn(req, res).catch((e) => {
  console.error(e);
  res.status(500).json({ error: 'Server error' });
});
const toLead = (l) => ({
  id: String(l._id), name: l.name, email: l.email, pool: l.pool, note: l.note, status: l.status,
  ts: l.createdAt.getTime(),
});

const requireAdmin = (req, res, next) => {
  try {
    const payload = jwt.verify(req.cookies[COOKIE] || '', JWT_SECRET);
    req.adminId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: 'Not signed in' });
  }
};

/* ---------- auth ---------- */
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

app.post('/api/auth/login', loginLimiter, wrap(async (req, res) => {
  const email = str(req.body?.email, 200).toLowerCase();
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const admin = email ? await Admin.findOne({ email: String(email) }) : null;
  const ok = await bcrypt.compare(password, admin ? admin.passwordHash : DUMMY_HASH);
  if (!admin || !ok) return res.status(401).json({ error: 'Incorrect email or password.' });
  const token = jwt.sign({ sub: String(admin._id) }, JWT_SECRET, { expiresIn: '12h' });
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: 'lax', secure: isProd, maxAge: 12 * 3600 * 1000, path: '/' });
  res.json({ ok: true });
}));

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie(COOKIE, { path: '/' });
  res.json({ ok: true });
});

app.get('/api/auth/me', requireAdmin, (req, res) => res.json({ ok: true }));

/* ---------- site config ---------- */
app.get('/api/config', wrap(async (req, res) => {
  const doc = await Config.findOne({ key: 'site' }).lean();
  res.json({ data: doc ? doc.data : null });
}));

app.put('/api/config', requireAdmin, wrap(async (req, res) => {
  const data = req.body?.data;
  if (!data || typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ error: 'Invalid data' });
  await Config.findOneAndUpdate({ key: 'site' }, { $set: { data } }, { upsert: true, new: true });
  res.json({ ok: true });
}));

app.delete('/api/config', requireAdmin, wrap(async (req, res) => {
  await Config.deleteOne({ key: 'site' });
  res.json({ ok: true });
}));

/* ---------- leads ---------- */
const signupLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
const POOLS = ['Both pools', 'Pool A', 'Pool B'];
const STATUSES = ['New', 'Contacted', 'Approved', 'Rejected'];

// Public: add a signup. Cannot read anything back.
app.post('/api/leads', signupLimiter, wrap(async (req, res) => {
  const b = req.body || {};
  const name = str(b.name, 120);
  const email = str(b.email, 200);
  const pool = POOLS.includes(b.pool) ? b.pool : 'Both pools';
  if (name.length < 2) return res.status(400).json({ error: 'Enter your name.' });
  if (!isEmail(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
  await Lead.create({ name, email, pool, note: str(b.note, 1000) });
  res.status(201).json({ ok: true });
}));

app.get('/api/leads', requireAdmin, wrap(async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 }).limit(5000);
  res.json({ leads: leads.map(toLead) });
}));

app.patch('/api/leads/:id', requireAdmin, wrap(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Bad id' });
  const status = req.body?.status;
  if (!STATUSES.includes(status)) return res.status(400).json({ error: 'Bad status' });
  await Lead.updateOne({ _id: req.params.id }, { $set: { status } });
  res.json({ ok: true });
}));

app.delete('/api/leads/:id', requireAdmin, wrap(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Bad id' });
  await Lead.deleteOne({ _id: req.params.id });
  res.json({ ok: true });
}));

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

/* ---------- serve the built React app in production ---------- */
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../client/dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

app.get('/*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

await mongoose.connect(MONGODB_URI);
console.log('MongoDB connected');
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
