// Usage: npm run create-admin -- you@example.com "a-strong-password"
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin } from '../models.js';

const [email, password] = process.argv.slice(2);
if (!email || !password || password.length < 10) {
  console.error('Usage: npm run create-admin -- <email> <password of 10+ characters>');
  process.exit(1);
}
await mongoose.connect(process.env.MONGODB_URI);
const passwordHash = await bcrypt.hash(password, 12);
await Admin.findOneAndUpdate({ email: email.toLowerCase() }, { $set: { passwordHash } }, { upsert: true });
console.log(`Admin ready: ${email.toLowerCase()}`);
await mongoose.disconnect();
