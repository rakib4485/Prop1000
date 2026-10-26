export default function Overview({ leads }) {
  if (leads === null) return <p>Loading…</p>;
  const week = Date.now() - 7 * 864e5;
  const count = (pool) => leads.filter((l) => l.pool === pool).length;
  const recent = [...leads].sort((a, b) => (b.ts || 0) - (a.ts || 0)).slice(0, 5);
  const kpis = [
    [leads.length, 'Total signups'],
    [leads.filter((l) => l.ts > week).length, 'Last 7 days'],
    [count('Pool A'), 'Pool A interest'],
    [count('Pool B'), 'Pool B interest'],
  ];
  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {kpis.map(([n, label]) => (
          <div key={label} className="rounded-xl border border-line bg-night2 p-[18px]">
            <strong className="block font-serif text-[32px] text-gold2">{n}</strong>
            <span className="text-[13px] text-mute">{label}</span>
          </div>
        ))}
      </div>
      <div className="panel">
        <h3 className="mb-3.5 text-xl">Latest signups</h3>
        {recent.length === 0 && <p className="text-mute">No signups yet. They appear here when visitors join.</p>}
        {recent.map((l) => (
          <div key={l.id} className="flex flex-wrap justify-between gap-3 border-b border-line py-2">
            <span>{l.name} <span className="text-mute">{l.email}</span></span>
            <span className="rounded-full border border-line bg-card px-2.5 py-0.5 text-xs">{l.pool}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
