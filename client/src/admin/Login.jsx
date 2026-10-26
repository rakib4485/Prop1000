import { useState } from 'react';
import { login } from '../lib/auth.js';

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const msg = await login(email.trim(), pw);
    setBusy(false);
    if (msg) setError(msg);
    else onSuccess();
  };

  return (
    <div className="wrap min-h-[70vh] max-w-[440px] py-10">
      <h2 className="mb-5 text-3xl">Admin sign in</h2>
      <form className="panel grid gap-3.5" onSubmit={submit}>
        <label className="grid gap-1.5 text-[13px] text-mute">
          Email
          <input className="field" type="email" autoFocus autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="grid gap-1.5 text-[13px] text-mute">
          Password
          <input className="field" type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} />
        </label>
        {error && <div className="text-sm text-bad" role="alert">{error}</div>}
        <button className="btn" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}
