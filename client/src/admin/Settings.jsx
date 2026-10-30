import { num } from "../lib/utils.js";

export default function Settings({ d, upd, onSave, onReset }) {
  const check = "size-5 accent-gold";
  return (
    <div className="panel">
      <h3 className="mb-3.5 text-xl">Site settings</h3>
      <label className="flex cursor-pointer items-center gap-2.5">
        <input
          className={check}
          type="checkbox"
          checked={d.waitlistOpen}
          onChange={(e) => upd(["waitlistOpen"], e.target.checked)}
        />
        Waitlist open to new signups
      </label>
      <label className="mt-[18px] flex cursor-pointer items-center gap-2.5">
        <input
          className={check}
          type="checkbox"
          checked={d.announce.on}
          onChange={(e) => upd(["announce", "on"], e.target.checked)}
        />
        Show announcement banner
      </label>
      <label className="mb-3.5 mt-3.5 grid gap-1.5 text-[13px] text-mute">
        Banner text
        <input
          className="field"
          type="text"
          value={d.announce.text}
          onChange={(e) => upd(["announce", "text"], e.target.value)}
        />
      </label>
      <label className="mb-3.5 grid gap-1.5 text-[13px] text-mute">
        Contact email
        <input
          className="field"
          type="email"
          value={d.email}
          onChange={(e) => upd(["email"], e.target.value)}
        />
      </label>
      <label className="mb-3.5 grid gap-1.5 text-[13px] text-mute">
        Minimum investment (AED)
        <input
          className="field"
          type="number"
          min="1"
          value={d.min}
          onChange={(e) => upd(["min"], num(e.target.value) || 1)}
        />
      </label>
      <label className="mb-3.5 grid gap-1.5 text-[13px] text-mute">
        Maximum investment per pool (AED)
        <input
          className="field"
          type="number"
          min="1"
          value={d.max}
          onChange={(e) => upd(["max"], num(e.target.value) || 1)}
        />
      </label>
      <div className="flex flex-wrap gap-3.5">
        <button className="btn" onClick={onSave}>
          Save settings
        </button>
        <button className="btn btn-danger" onClick={onReset}>
          Reset all to defaults
        </button>
      </div>
    </div>
  );
}
