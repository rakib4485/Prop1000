import { useEffect, useRef, useState } from 'react';
import { saveConfig, resetConfig } from '../lib/store.js';
import { useLeads } from '../lib/hooks.js';
import { DEFAULTS } from '../lib/defaults.js';
import { logout } from '../lib/auth.js';
import Overview from './Overview.jsx';
import Waitlist from './Waitlist.jsx';
import Content from './Content.jsx';
import Settings from './Settings.jsx';

const TABS = [['overview', 'Overview'], ['waitlist', 'Waitlist'], ['content', 'Content'], ['settings', 'Settings']];

export default function Admin({ cfg, onLogout }) {
  const [tab, setTab] = useState('overview');
  const [draft, setDraft] = useState(cfg);
  const [toast, setToast] = useState(null);
  const dirty = useRef(false);
  const leads = useLeads();

  // Keep the draft in sync with saved config until the admin starts editing.
  useEffect(() => {
    if (!dirty.current) setDraft(cfg);
  }, [cfg]);

  const say = (m, bad) => {
    setToast({ m, bad });
    setTimeout(() => setToast(null), 2600);
  };

  const upd = (path, value) => {
    dirty.current = true;
    setDraft((d) => {
      const next = structuredClone(d);
      let o = next;
      for (let i = 0; i < path.length - 1; i++) o = o[path[i]];
      o[path[path.length - 1]] = value;
      return next;
    });
  };

  const save = async () => {
    try {
      await saveConfig(draft);
      dirty.current = false;
      say('Saved. The live site updated.');
    } catch (e) {
      say('Save failed: ' + e.message, true);
    }
  };

  const reset = async () => {
    if (!window.confirm('Reset all site content to the defaults?')) return;
    await resetConfig();
    dirty.current = false;
    setDraft(DEFAULTS);
    say('Reset to defaults.');
  };

  return (
    <div className="wrap min-h-[80vh] pb-20 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl">Admin panel</h2>
        <button className="btn btn-ghost btn-sm" onClick={async () => { await logout(); onLogout(); }}>Sign out</button>
      </div>
      <p className="text-mute">Changes appear on the live site as soon as you save.</p>

      <div className="my-5 flex flex-wrap gap-2" role="tablist">
        {TABS.map(([k, n]) => (
          <button
            key={k}
            aria-pressed={tab === k}
            onClick={() => setTab(k)}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium ${tab === k ? 'border-gold bg-gold text-ink' : 'border-line bg-card text-mute'}`}
          >
            {n}
          </button>
        ))}
      </div>

      {tab === 'overview' && <Overview leads={leads} />}
      {tab === 'waitlist' && <Waitlist leads={leads} say={say} />}
      {tab === 'content' && <Content d={draft} upd={upd} onSave={save} />}
      {tab === 'settings' && <Settings d={draft} upd={upd} onSave={save} onReset={reset} />}

      {toast && (
        <div
          role="status"
          className={`fixed bottom-[calc(24px+env(safe-area-inset-bottom))] left-1/2 z-50 max-w-[90vw] -translate-x-1/2 rounded-[10px] px-5 py-3 text-sm text-white ${toast.bad ? 'bg-[#8a2c22]' : 'bg-aqua'}`}
        >
          {toast.m}
        </div>
      )}
    </div>
  );
}
