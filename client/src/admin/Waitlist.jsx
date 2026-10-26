import { useMemo, useState } from 'react';
import { addLead, updateLead, deleteLead } from '../lib/store.js';
import { STATUSES, POOL_OPTIONS } from '../lib/defaults.js';
import { downloadCSV, isEmail } from '../lib/utils.js';

const COLS = 'md:grid-cols-[1.1fr_1.7fr_.8fr_.8fr_1fr_auto]';

export default function Waitlist({ leads, say }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [nl, setNl] = useState({ name: '', email: '', pool: POOL_OPTIONS[0] });

  const rows = useMemo(
    () =>
      (leads || [])
        .filter((l) => (status === 'All' || l.status === status) && `${l.name} ${l.email}`.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => (b.ts || 0) - (a.ts || 0)),
    [leads, q, status]
  );

  if (leads === null) return <p>Loading…</p>;

  const changeStatus = (l, s) => updateLead(l.id, { status: s }).catch(() => say('Update failed', true));
  const remove = (l) => {
    if (window.confirm(`Delete ${l.email}?`)) deleteLead(l.id).catch(() => say('Delete failed', true));
  };
  const add = async (e) => {
    e.preventDefault();
    if (!nl.name.trim() || !isEmail(nl.email)) return say('Enter a name and a valid email.', true);
    try {
      await addLead(nl);
      setNl({ name: '', email: '', pool: POOL_OPTIONS[0] });
      say('Lead added.');
    } catch {
      say('Could not add lead', true);
    }
  };
  const exportCsv = () =>
    downloadCSV('prop1000-waitlist.csv', [
      ['Name', 'Email', 'Pool', 'Status', 'Date', 'Note'],
      ...rows.map((l) => [l.name, l.email, l.pool, l.status, new Date(l.ts || 0).toISOString().slice(0, 10), l.note]),
    ]);

  const label = 'text-mute md:hidden';

  return (
    <div>
      <div className="panel">
        <div className="mb-4 flex flex-wrap gap-2.5">
          <input className="field min-w-36 flex-1" type="search" placeholder="Search name or email" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="field w-auto min-w-36 flex-1" aria-label="Status filter" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="btn btn-ghost btn-sm" onClick={exportCsv}>Export CSV</button>
        </div>

        {rows.length === 0 ? (
          <p className="text-mute">No signups match.</p>
        ) : (
          <div className="text-sm">
            <div className={`hidden gap-2.5 border-b border-line px-2.5 pb-2.5 text-mute md:grid ${COLS}`}>
              <span>Name</span><span>Email</span><span>Pool</span><span>Date</span><span>Status</span><span />
            </div>
            {rows.map((l) => (
              <div key={l.id} className={`mb-3 grid items-center gap-1 rounded-[10px] border border-line bg-night p-2.5 break-words md:mb-0 md:gap-2.5 md:rounded-none md:border-0 md:border-b md:bg-transparent ${COLS}`}>
                <div><span className={label}>Name: </span>{l.name}</div>
                <div className="[overflow-wrap:anywhere]"><span className={label}>Email: </span>{l.email}</div>
                <div><span className={label}>Pool: </span><span className="rounded-full border border-line bg-card px-2.5 py-0.5 text-xs">{l.pool}</span></div>
                <div><span className={label}>Date: </span>{l.ts ? new Date(l.ts).toLocaleDateString() : ''}</div>
                <div>
                  <select className="field w-auto px-2 py-1.5" aria-label="Status" value={l.status || 'New'} onChange={(e) => changeStatus(l, e.target.value)}>
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div><button className="btn btn-danger btn-sm" onClick={() => remove(l)}>Delete</button></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form className="panel" onSubmit={add}>
        <h3 className="mb-3.5 text-xl">Add a lead manually</h3>
        <div className="grid gap-3.5 md:grid-cols-2">
          <input className="field" type="text" placeholder="Name" aria-label="Name" value={nl.name} onChange={(e) => setNl({ ...nl, name: e.target.value })} />
          <input className="field" type="email" placeholder="Email" aria-label="Email" value={nl.email} onChange={(e) => setNl({ ...nl, email: e.target.value })} />
        </div>
        <div className="mt-3 flex flex-wrap gap-3.5">
          <select className="field flex-1" aria-label="Pool" value={nl.pool} onChange={(e) => setNl({ ...nl, pool: e.target.value })}>
            {POOL_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
          <button className="btn" type="submit">Add lead</button>
        </div>
      </form>
    </div>
  );
}
