import { useEffect, useState } from 'react';
import { useConfig } from './lib/hooks.js';
import { isAdmin } from './lib/auth.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Calculator from './components/Calculator.jsx';
import JoinForm from './components/JoinForm.jsx';
import { How, Pools, Market, Why, FAQ, Footer } from './components/Sections.jsx';
import Login from './admin/Login.jsx';
import Admin from './admin/Admin.jsx';

const wantsAdmin = () => window.location.hash === '#/admin';

export default function App() {
  const cfg = useConfig();
  const [inAdmin, setInAdmin] = useState(wantsAdmin());
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    isAdmin().then((ok) => {
      setAuthed(ok);
      setChecking(false);
    });
  }, []);

  useEffect(() => {
    const onHash = () => setInAdmin(wantsAdmin());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goHome = () => {
    window.location.hash = '';
    setInAdmin(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {cfg.announce.on && cfg.announce.text && <div className="bg-gold px-4 py-2 text-center text-sm font-semibold text-ink" role="status">{cfg.announce.text}</div>}
      <Nav inAdmin={inAdmin} onHome={goHome} />
      {inAdmin ? (
        checking ? (
          <div className="wrap py-10"><p>Loading…</p></div>
        ) : authed ? (
          <Admin cfg={cfg} onLogout={() => { setAuthed(false); goHome(); }} />
        ) : (
          <Login onSuccess={() => setAuthed(true)} />
        )
      ) : (
        <main>
          <Hero c={cfg} />
          <How />
          <Pools c={cfg} />
          <Calculator c={cfg} />
          <Market c={cfg} />
          <Why />
          <FAQ c={cfg} />
          <JoinForm c={cfg} />
        </main>
      )}
      <Footer c={cfg} />
    </>
  );
}
