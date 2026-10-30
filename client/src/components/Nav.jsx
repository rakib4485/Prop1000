import { useState } from 'react';
import { scrollToId } from '../lib/utils.js';

const LINKS = [
  ['how', 'How it works'],
  ['pools', 'Pools'],
  ['calc', 'Calculator'],
  ['faq', 'FAQ'],
];

export default function Nav({ inAdmin, onHome }) {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    if (inAdmin) {
      onHome();
      setTimeout(() => scrollToId(id), 80);
    } else {
      scrollToId(id);
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-night/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="wrap relative flex h-16 items-center justify-between">
        <button
          aria-label="Prop1000 home"
          className="cursor-pointer font-serif text-[22px] font-bold tracking-tight"
          onClick={() => {
            setOpen(false);
            if (inAdmin) onHome();
            else window.scrollTo(0, 0);
          }}
        >
          PROP<span className="gold-text">1000</span>
        </button>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="h-10 w-11 rounded-lg border border-line text-xl md:hidden"
        >
          {open ? '×' : '≡'}
        </button>

        <nav
          className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col border-b border-line bg-night px-[18px] pb-5 pt-2
            md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 sm:px-6`}
        >
          {LINKS.map(([id, label]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="border-b border-line py-3.5 text-left text-base text-mute hover:text-cream md:border-0 md:py-1.5 md:text-sm"
            >
              {label}
            </button>
          ))}
          <button className="btn btn-sm mt-4 md:mt-0" onClick={() => go('waitlist')}>
            Join the waitlist
          </button>
        </nav>
      </div>
    </header>
  );
}
