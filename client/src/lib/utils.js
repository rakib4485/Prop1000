export const money = (n) => 'AED ' + Math.round(n).toLocaleString('en-US');

export const num = (v) => {
  const n = parseFloat(v);
  return Number.isNaN(n) ? 0 : n;
};

export const isEmail = (s) => /^\S+@\S+\.\S+$/.test(s);

// Deep-merge saved config over defaults. Arrays are replaced, not merged.
export const merge = (d, o) => {
  if (Array.isArray(d)) return Array.isArray(o) ? o : d;
  if (d && typeof d === 'object') {
    const r = {};
    for (const k in d) r[k] = merge(d[k], o ? o[k] : undefined);
    return r;
  }
  return o === undefined || o === null ? d : o;
};

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
};

export const downloadCSV = (filename, rows) => {
  const esc = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  const text = rows.map((r) => r.map(esc).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
