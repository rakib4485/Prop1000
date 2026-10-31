import { useEffect, useState } from "react";
import { money, num, scrollToId } from "../lib/utils.js";
import { WAITLIST_URL } from "../lib/defaults.js";
import { Mail } from "lucide-react";
import Logo from "./Logo.jsx";

const SECTION = "py-[60px] md:py-[88px]";

function Heading({ title, sub }) {
  return (
    <div className="mb-11 max-w-[640px]">
      <h2 className="sec-title">{title}</h2>
      {sub && <p className="mt-3.5 text-[17px] text-mute">{sub}</p>}
    </div>
  );
}

export function How() {
  const steps = [
    [
      "Choose a pool",
      "Pick distressed-deal flips for a one-off profit, or holiday homes for steady rental income.",
    ],
    [
      "Invest your share",
      "Start with the minimum and own a fraction of the property portfolio inside your pool.",
    ],
    [
      "Earn as it performs",
      "Receive profit on exit from Pool A, or a share of annual rental yield from Pool B.",
    ],
  ];
  return (
    <section id="how" className={SECTION}>
      <div className="wrap">
        <Heading
          title="Three steps to your first share"
          sub="No need for a large deposit, a mortgage, or a trip to Dubai."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <div
              key={t}
              className="rounded-[14px] border border-line bg-night2 p-7"
            >
              <span className="mb-[18px] grid size-[38px] place-items-center rounded-full bg-gold font-serif text-lg font-bold text-ink">
                {i + 1}
              </span>
              <h3 className="mb-2 text-[22px]">{t}</h3>
              <p className="text-[15px] text-mute">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PoolImage({ src, alt, badge }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return (
    <div className="relative -mx-6 -mt-6 mb-6 h-44 overflow-hidden bg-gradient-to-br from-card to-night sm:-mx-8 sm:-mt-8 sm:h-52">
      {src && !failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-night2 via-night2/10 to-transparent" />
      <span className="absolute left-3 top-3 rounded-full border border-gold/30 bg-night/80 px-2.5 py-1 text-[10px] font-bold text-gold2 backdrop-blur">
        {badge}
      </span>
    </div>
  );
}

function PoolCard({
  accent,
  title,
  image,
  badge,
  big,
  bigLabel,
  rows,
  desc,
  ghost,
}) {
  return (
    <article
      className={`overflow-hidden rounded-[18px] border border-line border-t-4 bg-night2 p-6 transition hover:border-gold/40 sm:p-8 ${accent === "gold" ? "border-t-gold" : "border-t-aqua"}`}
    >
      <PoolImage src={image} alt={title} badge={badge} />
      <h3 className="text-[26px]">{title}</h3>
      <div
        className={`mb-0.5 mt-4 text-[46px] font-extrabold ${accent === "gold" ? "gold-text not-italic" : "gold-text not-italic"}`}
      >
        {big}
      </div>
      <p className="text-[15px] text-mute">{bigLabel}</p>
      <ul className="my-5 grid gap-2.5 text-[15px]">
        {rows.map(([k, v]) => (
          <li
            key={k}
            className="flex justify-between gap-4 border-b border-line pb-2.5"
          >
            <span className="text-mute">{k}</span>
            <b>{v}</b>
          </li>
        ))}
      </ul>
      <p className="mb-[22px] text-[15px] text-mute">{desc}</p>
      <button
        className={`btn ${ghost ? "" : ""}`}
        onClick={() => window.open(WAITLIST_URL, "_blank")}
      >
        Join the waitlist
      </button>
    </article>
  );
}

export function Pools({ c }) {
  return (
    <section id="pools" className={`${SECTION} bg-night2`}>
      <div className="wrap">
        <Heading
          title="Two pools, two ways to grow your money"
          sub={`Choose the one that fits your timeline and income goals. Invest ${money(c.min)} to ${money(c.max)} in each pool.`}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <PoolCard
            accent="gold"
            title={c.poolA.name}
            image={c.poolA.image}
            badge={c.poolA.duration}
            big={`${c.poolA.target}%+`}
            bigLabel="Target profit on exit"
            desc={c.poolA.desc}
            rows={[
              ["Duration", c.poolA.duration],
              ["Return type", "Profit on exit"],
              ["Minimum", money(c.min)],
              ["Maximum", money(c.max)],
            ]}
          />
          <PoolCard
            ghost
            accent="aqua"
            title={c.poolB.name}
            image={c.poolB.image}
            badge={c.poolB.duration}
            big={`${c.poolB.yLow}–${c.poolB.yHigh}%`}
            bigLabel="Target annual rental yield"
            desc={c.poolB.desc}
            rows={[
              ["Duration", c.poolB.duration],
              ["Return type", "Annual rental yield"],
              ["Minimum", money(c.min)],
              ["Maximum", money(c.max)],
            ]}
          />
        </div>
        <p className="mt-3.5 text-[12.5px] text-mute">
          Returns are targets, not guarantees.
        </p>
      </div>
    </section>
  );
}

export function Market({ c }) {
  const max = Math.max(1, ...c.cities.map((x) => num(x.v))) * 1.15;
  const perks = [
    ["No income tax on rent", "Rental income isn't taxed in Dubai."],
    ["No capital gains tax", "Keep the profit when a property is sold."],
    ["No annual property tax", "Lower holding costs than many major cities."],
    [
      "Open to foreign owners",
      "Foreigners can own freehold property in designated areas.",
    ],
  ];
  return (
    <section id="market" className={`${SECTION} bg-night2`}>
      <div className="wrap grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="sec-title">Why Dubai</h2>
          <p className="mt-3.5 text-[17px] text-mute">
            Tax-free returns, open ownership rules, and yields that compare well
            with major global cities.
          </p>
          <div className="mt-6 grid gap-3.5">
            {perks.map(([t, d]) => (
              <div key={t} className="flex gap-3.5">
                <i className="mt-[9px] size-2.5 flex-none rounded-full bg-gold" />
                <div>
                  <b className="block">{t}</b>
                  <span className="text-[15px] text-mute">{d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <figure className="rounded-[18px] border border-line bg-night p-5 sm:p-[30px]">
          <figcaption className="text-base font-semibold">
            Gross apartment yield (%)
          </figcaption>
          {c.cities.map((x, i) => (
            <div
              key={i}
              className="my-4 grid grid-cols-[84px_1fr_38px] items-center gap-2.5 text-sm sm:grid-cols-[110px_1fr_44px] sm:gap-3.5"
            >
              <span>{x.c}</span>
              <div className="h-4 overflow-hidden rounded-lg bg-card">
                <div
                  className="h-full origin-left animate-grow rounded-lg bg-gold motion-reduce:animate-none"
                  style={{
                    width: (num(x.v) / max) * 100 + "%",
                    opacity: Math.max(0.35, 1 - i * 0.17),
                    animationDelay: i * 0.12 + "s",
                  }}
                />
              </div>
              <b>{x.v}</b>
            </div>
          ))}
          <p className="mt-3.5 text-[12.5px] text-mute">
            Gross yields for illustration; other cities are shown at the
            midpoint of quoted ranges.
          </p>
        </figure>
      </div>
    </section>
  );
}

export function Why() {
  const items = [
    ["Fractional", "Own a share instead of buying a whole property."],
    [
      "Transparent",
      "Know which pool you're in, what it targets, and how returns are earned.",
    ],
    ["Global", "Open to investors anywhere in the world."],
    [
      "Mobile soon",
      "iOS and Android apps are coming. Waitlist members hear first.",
    ],
  ];
  return (
    <section className={SECTION}>
      <div className="wrap">
        <Heading
          title="Dubai property for everyone, not just those with millions"
          sub="Transparent, fractional, global."
        />
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([t, d]) => (
            <div
              key={t}
              className="rounded-[14px] border border-line bg-night2 p-6"
            >
              <h3 className="mb-2 text-[19px]">{t}</h3>
              <p className="text-[14.5px] text-mute">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ({ c }) {
  return (
    <section id="faq" className={`${SECTION} bg-night2`}>
      <div className="wrap">
        <Heading title="Common questions" />
        <div className="max-w-full">
          {c.faqs.map((f, i) => (
            <details key={i} className="group border-b border-line py-[18px]">
              <summary className="flex cursor-pointer list-none justify-between gap-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-2xl leading-none text-gold group-open:hidden">
                  +
                </span>
                <span className="hidden text-2xl leading-none text-gold group-open:inline">
                  –
                </span>
              </summary>
              <p className="mt-3 text-mute">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer({ c }) {
  const openMail = (e) => {
    // On phones, let the normal mailto link open the mail app
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return;
    // On computers, open Gmail's compose page in a new tab
    e.preventDefault();
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(c.email)}&su=${encodeURIComponent("Prop1000 enquiry")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <footer className="border-t border-line bg-[#06080b] py-10 text-[13px] text-mute">
      <div className="wrap grid gap-3">
        <div className="flex items-center gap-3">
          <Logo isRequiresText={false} />
        <a
            href={`mailto:${c.email}?subject=${encodeURIComponent("Prop1000 enquiry")}`}
            onClick={openMail}
            aria-label="Email Prop1000"
            title="Email us"
            className="md:hidden grid size-11 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold2 shadow-[0_0_18px_rgba(212,175,55,.25)] transition hover:-translate-y-0.5 hover:bg-gold hover:text-ink hover:shadow-[0_0_26px_rgba(212,175,55,.5)] motion-reduce:transition-none"
          >
            <Mail size={20} />
          </a>
        </div>
        <div>
          <strong className="text-cream">Risk warning.</strong> Returns are
          targets, not guarantees.Property values and rental income can go down
          as well as up. Yield figures are gross and for illustration. This page
          is not financial advice.
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span>
            Prop1000. Invest in Dubai real estate from {money(c.min)}.
          </span>
          <a
            href={`mailto:${c.email}?subject=${encodeURIComponent("Prop1000 enquiry")}`}
            onClick={openMail}
            aria-label="Email Prop1000"
            title="Email us"
            className="hidden md:grid size-11 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold2 shadow-[0_0_18px_rgba(212,175,55,.25)] transition hover:-translate-y-0.5 hover:bg-gold hover:text-ink hover:shadow-[0_0_26px_rgba(212,175,55,.5)] motion-reduce:transition-none"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
