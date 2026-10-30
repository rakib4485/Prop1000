import { money, scrollToId } from "../lib/utils.js";

function Skyline() {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d4af37" stopOpacity=".35" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="120" r="46" fill="url(#sun)" />
      <g fill="#06080b">
        <rect x="20" y="330" width="40" height="170" />
        <rect x="66" y="290" width="34" height="210" />
        <path d="M110 500V230l14-60 14 60v270z" />
        <rect x="146" y="300" width="42" height="200" />
        <path d="M196 500V120l12-70 12 70v380z" />
        <rect x="226" y="260" width="38" height="240" />
        <path d="M270 500V210l30 20v270z" />
        <rect x="306" y="320" width="40" height="180" />
        <rect x="350" y="360" width="50" height="140" />
      </g>
      <g fill="#f6d58a" opacity=".75">
        {Array.from({ length: 60 }, (_, i) => (
          <rect
            key={i}
            x={24 + ((i * 37) % 360)}
            y={250 + ((i * 53) % 230)}
            width="3"
            height="4"
          />
        ))}
      </g>
    </svg>
  );
}

export default function Hero({ c }) {
  return (
    <section className="bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,.16)_0%,rgba(11,13,18,.95)_70%),linear-gradient(180deg,#141822,#0b0d12)]">
      <div className="wrap grid items-center gap-12 py-12 md:grid-cols-[1.1fr_.9fr] md:py-20">
        <div>
          <h1 className="text-[clamp(34px,5.4vw,64px)] font-bold">
            {c.hero.title}{" "}
            <em className="gold-text not-italic">{c.hero.accent}</em>
          </h1>
          <p className="my-6 max-w-[520px] text-[17px] text-mute sm:text-[19px]">
            {c.hero.lead}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <button
              className="btn inline-flex items-center justify-center gap-2"
              onClick={() => scrollToId("waitlist")}
            >
              <span>Join the exclusive waitlist</span>
              <span aria-hidden="true">›</span>
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => scrollToId("calc")}
            >
              Try the calculator
            </button>
          </div>
          <div className="mt-10 flex flex-wrap gap-7 border-t border-line pt-6 text-sm text-mute">
            {[
              [money(c.min), "minimum"],
              ["2", "investment pools"],
              ["Global", "open worldwide"],
            ].map(([n, l]) => (
              <div key={l}>
                <strong className="block font-serif text-[22px] text-cream">
                  {n}
                </strong>
                {l}
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[16/11] overflow-hidden rounded-[18px] border border-line bg-gradient-to-b from-[#1a2130] to-[#0b0d12] shadow-[0_30px_80px_rgba(0,0,0,.5)] md:aspect-[4/5]">
          <Skyline />
          <div className="absolute inset-x-[18px] bottom-[18px] flex justify-between gap-3 rounded-xl border border-line bg-night/80 px-[18px] py-4 text-[13px] text-mute backdrop-blur">
            <div>
              <strong className="block font-serif text-[22px] text-gold2">
                {c.poolA.target}%+
              </strong>
              Pool A target
            </div>
            <div>
              <strong className="block font-serif text-[22px] text-gold2">
                {c.poolB.yLow}–{c.poolB.yHigh}%
              </strong>
              Pool B yearly target
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
