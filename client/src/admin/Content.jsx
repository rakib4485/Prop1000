import { num } from '../lib/utils.js';

const Fld = ({ l, children }) => (
  <label className="mb-3.5 grid gap-1.5 text-[13px] text-mute">
    {l}
    {children}
  </label>
);
const Panel = ({ title, children }) => (
  <div className="panel">
    <h3 className="mb-3.5 text-xl">{title}</h3>
    {children}
  </div>
);
const Two = ({ children }) => <div className="grid gap-3.5 md:grid-cols-2">{children}</div>;

export default function Content({ d, upd, onSave }) {
  const text = (path) => ({ className: 'field', type: 'text', value: path.reduce((o, k) => o[k], d), onChange: (e) => upd(path, e.target.value) });
  const number = (path, step = 0.5) => ({ className: 'field', type: 'number', step, value: path.reduce((o, k) => o[k], d), onChange: (e) => upd(path, num(e.target.value)) });
  const area = (path) => ({ className: 'field min-h-20 resize-y', value: path.reduce((o, k) => o[k], d), onChange: (e) => upd(path, e.target.value) });

  return (
    <div>
      <Panel title="Hero">
        <Fld l="Headline"><input {...text(['hero', 'title'])} /></Fld>
        <Fld l="Highlighted text"><input {...text(['hero', 'accent'])} /></Fld>
        <Fld l="Intro paragraph"><textarea {...area(['hero', 'lead'])} /></Fld>
      </Panel>

      <Panel title="Pool A">
        <Two>
          <Fld l="Name"><input {...text(['poolA', 'name'])} /></Fld>
          <Fld l="Duration"><input {...text(['poolA', 'duration'])} /></Fld>
        </Two>
        <Fld l="Image URL (https://… or /images/pool-a.jpg)"><input {...text(['poolA', 'image'])} placeholder="https://" /></Fld>
        <Fld l="Target profit on exit (%)"><input {...number(['poolA', 'target'])} /></Fld>
        <Fld l="Description"><textarea {...area(['poolA', 'desc'])} /></Fld>
      </Panel>

      <Panel title="Pool B">
        <Two>
          <Fld l="Name"><input {...text(['poolB', 'name'])} /></Fld>
          <Fld l="Duration"><input {...text(['poolB', 'duration'])} /></Fld>
        </Two>
        <Two>
          <Fld l="Yield low (%)"><input {...number(['poolB', 'yLow'])} /></Fld>
          <Fld l="Yield high (%)"><input {...number(['poolB', 'yHigh'])} /></Fld>
        </Two>
        <Fld l="Image URL (https://… or /images/pool-b.jpg)"><input {...text(['poolB', 'image'])} placeholder="https://" /></Fld>
        <Fld l="Description"><textarea {...area(['poolB', 'desc'])} /></Fld>
      </Panel>

      <Panel title="Yield chart (cities)">
        {d.cities.map((x, i) => (
          <div key={i} className="mb-2.5 grid grid-cols-[1fr_auto] items-start gap-2.5 sm:grid-cols-[2fr_1fr_auto]">
            <input className="field col-span-2 sm:col-span-1" type="text" aria-label="City" value={x.c} onChange={(e) => upd(['cities', i, 'c'], e.target.value)} />
            <input className="field" type="number" step="0.1" aria-label="Yield" value={x.v} onChange={(e) => upd(['cities', i, 'v'], num(e.target.value))} />
            <button className="btn btn-danger btn-sm" onClick={() => upd(['cities'], d.cities.filter((_, j) => j !== i))}>Remove</button>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={() => upd(['cities'], [...d.cities, { c: 'New city', v: 3 }])}>Add city</button>
      </Panel>

      <Panel title="FAQ">
        {d.faqs.map((x, i) => (
          <div key={i} className="mb-3 grid items-start gap-2.5 md:grid-cols-[1fr_2fr_auto]">
            <input className="field" type="text" aria-label="Question" value={x.q} onChange={(e) => upd(['faqs', i, 'q'], e.target.value)} />
            <textarea className="field min-h-20 resize-y" aria-label="Answer" value={x.a} onChange={(e) => upd(['faqs', i, 'a'], e.target.value)} />
            <button className="btn btn-danger btn-sm" onClick={() => upd(['faqs'], d.faqs.filter((_, j) => j !== i))}>Remove</button>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={() => upd(['faqs'], [...d.faqs, { q: 'New question', a: 'Answer' }])}>Add question</button>
      </Panel>

      <button className="btn" onClick={onSave}>Save and publish changes</button>
    </div>
  );
}
