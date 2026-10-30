// import { useState } from 'react';
// import { scrollToId } from '../lib/utils.js';
// import { WAITLIST_URL } from '../lib/defaults.js';
// import Logo from './Logo.jsx';

// const LINKS = [
//   ['how', 'How it works'],
//   ['pools', 'Pools'],
//   ['calc', 'Calculator'],
//   ['faq', 'FAQ'],
// ];

// export default function Nav({ inAdmin, onHome }) {
//   const [open, setOpen] = useState(false);

//   const go = (id) => {
//     setOpen(false);
//     if (inAdmin) {
//       onHome();
//       setTimeout(() => scrollToId(id), 80);
//     } else {
//       scrollToId(id);
//     }
//   };

//   return (
//     <header className="sticky top-0 z-20 border-b border-line bg-night/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
//       <div className="wrap relative flex h-16 items-center justify-between">
//         {/* <button
//           aria-label="Prop1000 home"
//           className="cursor-pointer font-serif text-[22px] font-bold tracking-tight"
//           onClick={() => {
//             setOpen(false);
//             if (inAdmin) onHome();
//             else window.scrollTo(0, 0);
//           }}
//         >
//           PROP<span className="gold-text">1000</span>
//         </button> */}

//         <Logo className="cursor-pointer font-serif text-[22px] font-bold tracking-tight"
//           onClick={() => {
//             setOpen(false);
//             if (inAdmin) onHome();
//             else window.scrollTo(0, 0);
//           }}/>

//         <button
//           aria-label="Menu"
//           aria-expanded={open}
//           onClick={() => setOpen(!open)}
//           className="h-10 w-11 rounded-lg border border-line text-xl md:hidden"
//         >
//           {open ? '×' : '≡'}
//         </button>

//         <nav
//           className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col border-b border-line bg-night px-[18px] pb-5 pt-2
//             md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 sm:px-6`}
//         >
//           {LINKS.map(([id, label]) => (
//             <button
//               key={id}
//               onClick={() => go(id)}
//               className="border-b border-line py-3.5 text-left text-base text-mute hover:text-cream md:border-0 md:py-1.5 md:text-sm"
//             >
//               {label}
//             </button>
//           ))}
//           <button className="btn btn-sm mt-4 md:mt-0" onClick={() => window.open(WAITLIST_URL, '_blank')}>
//             Join the waitlist
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// }

import { useEffect, useState } from 'react';
import { scrollToId } from '../lib/utils.js';
import { WAITLIST_URL } from '../lib/defaults.js';
import Logo from './Logo.jsx';

const LINKS = [
  ['how', 'How it works'],
  ['pools', 'Pools'],
  ['calc', 'Calculator'],
  ['faq', 'FAQ'],
];

export default function Nav({ inAdmin, onHome }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Watch the scroll position (once per frame, so it stays smooth)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [inAdmin]);

  const go = (id) => {
    setOpen(false);
    if (inAdmin) {
      onHome();
      setTimeout(() => scrollToId(id), 80);
    } else {
      scrollToId(id);
    }
  };

  const glass = scrolled || open;
  const link =
    'relative text-sm font-medium text-mute transition-colors hover:text-cream after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full';

  return (
    <header className="sticky top-0 z-50">
      <div className="wrap relative h-[calc(72px+env(safe-area-inset-top))] pt-[calc(8px+env(safe-area-inset-top))]">
        {/* the bar */}
        <div
          className={`relative mx-auto flex h-14 animate-nav-in items-center justify-between transition-all duration-500 ease-out motion-reduce:transition-none ${
            glass
              ? 'max-w-[980px] rounded-full border border-white/10 bg-night/55 px-4 shadow-[0_8px_32px_rgba(0,0,0,.45)] backdrop-blur-xl backdrop-saturate-150 sm:px-6'
              : 'max-w-full rounded-full border border-transparent px-0'
          }`}
        >
          <button
            aria-label="Prop1000 home"
            className="cursor-pointer"
            onClick={() => {
              setOpen(false);
              if (inAdmin) onHome();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className={`block origin-left transition-transform duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
              <Logo />
            </span>
          </button>

          {/* desktop links */}
          <nav className="hidden items-center gap-7 md:flex">
            {LINKS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className={link}>
                {label}
              </button>
            ))}
            <a className="btn btn-sm" href={WAITLIST_URL} target="_blank" rel="noopener noreferrer">
              Join the waitlist
            </a>
          </nav>

          {/* mobile menu button: three bars that turn into an X */}
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="relative grid size-10 place-items-center rounded-full border border-line md:hidden"
          >
            <span className={`absolute h-0.5 w-5 rounded bg-cream transition-all duration-300 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-cream transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-cream transition-all duration-300 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>

          {/* scroll progress line */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 left-8 right-8 h-px origin-left bg-gold transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        {/* mobile dropdown */}
        <div
          aria-hidden={!open}
          className={`absolute left-[18px] right-[18px] top-[calc(72px+env(safe-area-inset-top))] origin-top rounded-2xl border border-white/10 bg-night/95 p-3 shadow-2xl transition-all duration-300 sm:left-6 sm:right-6 md:hidden ${
            open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-2 scale-95 opacity-0'
          }`}
        >
          {LINKS.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="block w-full border-b border-line px-2 py-3.5 text-left text-base text-mute hover:text-cream">
              {label}
            </button>
          ))}
          <a className="btn mt-3 block" href={WAITLIST_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Join the waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
