import { useState } from 'react';
import { addLead } from '../lib/store.js';
import { POOL_OPTIONS } from '../lib/defaults.js';
import { isEmail, money } from '../lib/utils.js';

export default function JoinForm({ c }) {
  const [form, setForm] = useState({ name: '', email: '', pool: POOL_OPTIONS[0], note: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError('Enter your name.');
    if (!isEmail(form.email)) return setError('Enter a valid email address, like name@example.com.');
    setError('');
    setBusy(true);
    try {
      await addLead({ name: form.name.trim(), email: form.email.trim(), pool: form.pool, note: form.note.trim() });
      setDone(true);
    } catch (err) {
      setError(err.status === 429 ? 'Too many signups from this connection. Try again later.' : `We could not save your details. Please try again, or email ${c.email}.`);
    } finally {
      setBusy(false);
    }
  };

  const box = 'rounded-xl border border-aqua bg-night p-6';

  return (
    <section id="waitlist" className="py-[60px] md:py-[88px]">
      <div className="wrap">
        <div className="grid items-center gap-8 rounded-[22px] border border-line bg-gradient-to-br from-card to-[#123f46] p-[30px] md:grid-cols-2 md:gap-12 md:p-14">
          <div>
            <h2 className="text-[clamp(28px,3.6vw,42px)]">Join the exclusive waitlist</h2>
            <p className="mt-3.5 text-mute">
              Be among the first to invest from {money(c.min)}. Questions? Email{' '}
              <a className="underline" href={'mailto:' + c.email}>{c.email}</a>.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5 text-[13px]">
              <span className="rounded-md border border-mute px-3 py-1.5">Coming soon: App Store</span>
              <span className="rounded-md border border-mute px-3 py-1.5">Coming soon: Google Play</span>
            </div>
          </div>

          {!c.waitlistOpen ? (
            <div className={box}>
              <h3 className="mb-1.5 text-2xl">Waitlist is full for now</h3>
              <p>Email {c.email} and we'll let you know when spots open.</p>
            </div>
          ) : done ? (
            <div className={box} role="status">
              <h3 className="mb-1.5 text-2xl">You're on the list</h3>
              <p>Thanks {form.name}. We'll email {form.email} when Prop1000 opens.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-3">
              <input className="field" type="text" placeholder="Full name" aria-label="Full name" autoComplete="name" value={form.name} onChange={set('name')} />
              <input className="field" type="email" placeholder="Email address" aria-label="Email address" autoComplete="email" value={form.email} onChange={set('email')} />
              <select className="field" aria-label="Pool of interest" value={form.pool} onChange={set('pool')}>
                {POOL_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <textarea className="field min-h-20 resize-y" placeholder="Anything you'd like us to know (optional)" aria-label="Note" value={form.note} onChange={set('note')} />
              {error && <div className="text-sm text-bad" role="alert">{error}</div>}
              <button className="btn" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Join the exclusive waitlist'}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
