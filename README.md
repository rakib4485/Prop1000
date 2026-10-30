# Prop1000: MERN stack + Tailwind CSS

- **M**ongoDB (Atlas) for signups, site content and admin accounts
- **E**xpress + **N**ode API in `server/`
- **R**eact 18 (Vite) in `client/`, styled with **Tailwind CSS v4**

```
prop1000/
  client/   React 18 + Tailwind (src/index.css holds the theme: colours, fonts)
  server/   Express API, Mongoose models, create-admin script
```

## Run locally
1. Create a free MongoDB Atlas cluster, add a database user, allow your IP,
   and copy the connection string.
2. Install everything:
   ```bash
   npm install
   npm run install:all
   ```
3. Configure and create your admin:
   ```bash
   cd server
   cp .env.example .env       # fill MONGODB_URI and JWT_SECRET
   npm run create-admin -- you@example.com "a-strong-password"
   cd ..
   ```
4. Start the API and the React app together:
   ```bash
   npm run dev                # site: http://localhost:5173
   ```
Admin panel: `http://localhost:5173/#/admin` (also the "Admin" link in the footer).

## Change the look
Colours and fonts are Tailwind theme values in `client/src/index.css`
(`--color-gold`, `--color-night`, `--font-serif`, ...). Use them as classes such
as `bg-gold` or `text-mute`. Shared pieces (`.btn`, `.field`, `.panel`) are
defined in the same file.

## Deploy on Vercel (two projects)
1. **Backend** (`server/` folder, already deployed at https://server-lime-two-35.vercel.app).
   Redeploy it with this version of `server/index.js` and `server/vercel.json`.
   In its Vercel settings add the variables `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`.
   In MongoDB Atlas > Network Access allow `0.0.0.0/0` (Vercel IPs change), with a strong DB password.
2. **Frontend** (`client/` folder): in `client/vercel.json` the `destination` of the `/api` rewrite
   must be your backend URL. If your backend URL changes, change it there and redeploy the frontend.
   Build command `npm run build`, output directory `dist`.
3. Test: `<backend>/api/config` returns JSON, then sign in at `<frontend>/#/admin`.

Because the frontend forwards `/api` to the backend, the browser sees a single domain, so
`client/src/lib/api.js` and the cookies need no changes.

## Pool images
Admin > Content > Pool A / Pool B > Image URL. Use any https link, or put files in
`client/public/images/` and enter `/images/pool-a.jpg`.

## Deploy (one server)
```bash
npm run build                          # builds client/dist
cd server && NODE_ENV=production npm start
```
The server serves the site and `/api` together. Host it on Render, Railway,
Fly.io or a VPS and set `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`.
Use HTTPS, and in Atlas allow your host's IP under Network Access.

## Security notes
- Visitors can only add a signup (10 per hour per IP). Reading, editing and
  deleting need the admin cookie.
- Passwords are bcrypt hashed, login is rate limited, and the session cookie is
  httpOnly, sameSite=lax, and secure in production.
- Never commit `server/.env`.

## Before launch
- Add a privacy policy and a consent line on the signup form.
- Consider a CAPTCHA to cut spam.
- Keep the "targets, not guarantees" wording and check the rules for marketing
  real estate investments where you advertise.
