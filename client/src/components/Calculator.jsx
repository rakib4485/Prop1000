import { useState } from 'react';
import { money } from '../lib/utils.js';

export default function Calculator({ c }) {
  const [pool, setPool] = useState('A');
  const [amt, setAmt] = useState(Math.max(10000, c.min));
  const [yrs, setYrs] = useState(3);
  const isA = pool === 'A';

  const tab = (on) => `px-[18px] py-2.5 text-sm font-medium ${on ? 'bg-gold text-ink' : 'text-mute'}`;

  return (
    <section id="calc" className="py-[60px] md:py-[88px]">
      <div className="wrap">
        <div className="mb-11 max-w-[640px]">
          <h2 className="sec-title">See what your target return could look like</h2>
          <p className="mt-3.5 text-[17px] text-mute">An illustration based on each pool's target. Not a forecast.</p>
        </div>
        <div className="grid items-center gap-8 rounded-[18px] border border-line bg-night2 p-5 sm:p-9 md:grid-cols-2 md:gap-10">
          <div>
            <div className="mb-[22px] inline-flex overflow-hidden rounded-[10px] border border-line" role="group" aria-label="Pool">
              <button aria-pressed={isA} className={tab(isA)} onClick={() => setPool('A')}>Pool A</button>
              <button aria-pressed={!isA} className={tab(!isA)} onClick={() => setPool('B')}>Pool B</button>
            </div>
            <label className="mb-2 block text-sm text-mute" htmlFor="amt">
              Amount: <b className="text-cream">{money(amt)}</b>
            </label>
            <input
              id="amt" type="range" className="w-full accent-gold"
              min={c.min} max={Math.max(100000, c.min * 10)} step={c.min}
              value={amt} onChange={(e) => setAmt(+e.target.value)}
            />
            {!isA && (
              <>
                <label className="mb-2 mt-[22px] block text-sm text-mute" htmlFor="yrs">
                  Holding period: <b className="text-cream">{yrs} years</b>
                </label>
                <input id="yrs" type="range" min="3" max="5" step="1" className="w-full accent-gold" value={yrs} onChange={(e) => setYrs(+e.target.value)} />
              </>
            )}
          </div>

          <div className="rounded-[14px] bg-card p-[26px]">
            <div className="text-sm text-mute">{isA ? 'Target profit on exit' : `Target rental income over ${yrs} years`}</div>
            <div className="break-words font-serif text-[34px] font-bold text-gold2 sm:text-4xl">
              {isA
                ? money((amt * c.poolA.target) / 100) + '+'
                : `${money(((amt * c.poolB.yLow) / 100) * yrs)} – ${money(((amt * c.poolB.yHigh) / 100) * yrs)}`}
            </div>
            <dl className="mt-4 grid grid-cols-[1fr_auto] gap-2 text-sm text-mute">
              <dt>Invested</dt><dd className="text-right text-cream">{money(amt)}</dd>
              <dt>Target</dt><dd className="text-right text-cream">{isA ? `${c.poolA.target}%+ on exit` : `${c.poolB.yLow}–${c.poolB.yHigh}% a year`}</dd>
              <dt>Duration</dt><dd className="text-right text-cream">{isA ? c.poolA.duration : `${yrs} years`}</dd>
            </dl>
            <p className="mt-3.5 text-[12.5px] text-mute">
              Illustrative only, before fees. Actual returns may be lower, and you may lose some or all of your capital.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
