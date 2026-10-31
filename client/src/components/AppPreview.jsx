import { useEffect, useRef, useState } from 'react';
import {
  Home, TrendingUp, Wallet, PieChart, Award, Menu, Bell, User, Eye, EyeOff, ShieldCheck, Contact,
  Zap, Building2, CheckCircle2, FileSignature, UserCheck, ArrowRight, ChevronRight, X, Receipt,
  SlidersHorizontal, Check, Signal, Wifi, BatteryFull,
} from 'lucide-react';

/* ------------------------------------------------------------------
   Everything the preview shows is in APP below. It comes from your
   index.html. Check the regulatory wording and the sample figures
   before you publish, and replace them with real, approved content.
------------------------------------------------------------------- */
const IMG_A = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80';
const IMG_B = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

const APP = {
  minimum: '1,000 AED',
  rewards: 150,
  regulator: 'DFSA',
  regulatoryNote:
    'prop1000 is strictly regulated by the Dubai Financial Services Authority (DFSA) for investment crowdfunding activities in the DIFC. Client assets and property investments are managed in segregated account structures complying with local regulatory mandates.',
  referralLink: 'https://prop1000.com/r/INV1000',
  featured: {
    name: 'Marina Sunset Bay Apartments', sub: 'Prime Waterfront Real Estate', area: 'Dubai Marina',
    yield: '8.4% Expected Yield', funded: '72% Complete', image: IMG_A,
  },
  properties: [
    { name: 'Marina Sunset Tower', area: 'Dubai Marina, Dubai', roi: '12.8% ROI', status: 'Available', bar: 'w-3/4', open: true, image: IMG_A },
    { name: 'Downtown Luxury Suite', area: 'Downtown Dubai', roi: '12.5% ROI', status: 'Funded', bar: 'w-full', open: false, image: IMG_B },
  ],
};

const GOLD_BG = 'bg-[linear-gradient(135deg,#e8c86a_0%,#d4af37_60%,#b58f24_100%)]';
const clock = () => new Date().toTimeString().slice(0, 5);
const hideBroken = (e) => { e.currentTarget.style.display = 'none'; };

/* ---------- small pieces ---------- */
function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center rounded-md border border-slate-700/80 bg-black p-1 px-1.5 shadow-sm">
        <span className="text-lg font-black leading-none tracking-tight text-white">P</span>
        <div className="-ml-1 mt-3 flex space-x-[1px]">
          {[0, 1, 2].map((i) => <span key={i} className="h-1 w-1 rounded-full bg-gold" />)}
        </div>
      </div>
      <div className="flex items-center text-xl font-extrabold tracking-tight">
        <span className="text-white">PROP</span>
        <span className="gold-text ml-0.5">1000</span>
      </div>
    </div>
  );
}

function Overlay({ children, bottom }) {
  return (
    <div className={`absolute inset-0 z-50 flex justify-center bg-black/80 p-4 backdrop-blur-sm ${bottom ? 'items-end p-0' : 'items-center'}`}>
      {children}
    </div>
  );
}

function SmallModal({ title, onClose, children }) {
  return (
    <Overlay>
      <div className="w-full max-w-sm space-y-4 rounded-3xl border border-line bg-night2 p-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>
        {children}
        <button onClick={onClose} className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-bold text-slate-200">Close</button>
      </div>
    </Overlay>
  );
}

function NavBtn({ id, label, icon: Icon, tab, setTab }) {
  const on = tab === id;
  return (
    <button onClick={() => setTab(id)} className={`flex flex-col items-center space-y-1 transition ${on ? 'text-gold' : 'text-slate-400 hover:text-slate-200'}`}>
      <Icon size={20} />
      <span className={`text-[10px] ${on ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
  );
}

/* ---------- tabs ---------- */
function HomeTab({ app }) {
  const { hidden, setHidden, verified, setTab, openVerify, setModal, say } = app;
  return (
    <div className="space-y-5">
      <div className="rounded-b-3xl border-b border-slate-800/60 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,.15)_0%,rgba(11,13,18,.95)_70%),linear-gradient(180deg,rgba(20,24,34,.8)_0%,#0b0d12_100%)] px-5 pb-6 pt-4">
        <div className="mb-5 flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-2">
            <button onClick={() => setTab('rewards')} className="flex items-center rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1.5 text-xs font-semibold text-gold2 transition hover:bg-gold/20">
              <span className="mr-1">🎁</span><span>{APP.rewards}</span>
              <span className="ml-1 text-[10px] font-bold text-gold/80">AED</span>
            </button>
            <button onClick={() => setModal('notifications')} aria-label="Notifications" className="relative rounded-full border border-slate-700/60 bg-card/80 p-2.5 text-slate-200 hover:text-white">
              <Bell size={15} />
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-night bg-gold text-[9px] font-bold text-ink">2</span>
            </button>
            <button onClick={() => say('Profile is not available in the preview.')} aria-label="Profile" className="rounded-full border border-slate-700/60 bg-card/80 p-2.5 text-slate-200 hover:text-white">
              <User size={15} />
            </button>
          </div>
        </div>

        <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-400">
          <span>Total account value</span>
          <button onClick={() => setHidden(!hidden)} aria-label="Show or hide balance" className="hover:text-gold2">
            {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-light text-gold2">AED</span>
          <span className="text-4xl font-extrabold tracking-tight text-white">{hidden ? '••••••' : '0'}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-1.5 text-[11px] font-medium text-slate-400">
          <ShieldCheck size={13} className="text-gold" />
          <span>prop1000 will be regulated by the <strong className="font-semibold text-slate-200">{APP.regulator}</strong></span>
          <button onClick={() => setModal('dfsa')} className="ml-1 font-medium text-gold2 hover:underline">Learn more</button>
        </div>
      </div>

      <div className="space-y-5 px-5">
        {!verified && (
          <div className="amber-card rounded-2xl p-4">
            <div className="flex items-start space-x-3.5">
              <div className="flex-shrink-0 rounded-xl border border-amber-500/30 bg-amber-600/30 p-2.5 text-amber-400"><Contact size={20} /></div>
              <div className="flex-1 pr-2">
                <h4 className="text-sm font-bold text-amber-100">Verify your account to start investing</h4>
                <p className="mt-0.5 text-xs leading-relaxed text-amber-200/80">Regulations require us to verify your identity before investing.</p>
              </div>
            </div>
            <button onClick={openVerify} className="mt-3.5 flex w-full items-center justify-between rounded-xl border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-500/30 hover:text-white">
              <span>Complete Onboarding</span><ArrowRight size={13} />
            </button>
          </div>
        )}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center text-base font-bold text-white"><Zap size={13} className="mr-2 text-gold" /> Get started</h3>
            <button onClick={openVerify} className="text-xs font-semibold text-slate-400 transition hover:text-gold2">View all steps</button>
          </div>
          <div className="space-y-4 rounded-2xl border border-line bg-night2 p-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="rounded-lg bg-gold/10 p-1.5 text-gold2"><Building2 size={13} /></div>
                <span className="text-xs font-bold text-slate-200">Properties</span>
              </div>
              <div className="flex items-center space-x-1 rounded-md border border-slate-700/60 bg-card px-2 py-0.5 text-[10px] text-slate-400">
                <CheckCircle2 size={11} className="text-gold" /><span className="font-bold">{APP.regulator}</span>
              </div>
            </div>
            <div className="flex items-start justify-between space-x-3">
              <div className="flex-1 space-y-1">
                <span className="text-[11px] font-bold text-gold2">Step {verified ? 3 : 2}</span>
                <h4 className="text-base font-bold leading-tight text-white">{verified ? 'Account Ready for Investment' : 'Complete onboarding'}</h4>
                <p className="text-xs leading-relaxed text-slate-400">
                  {verified
                    ? <>Your identity is verified. Select a property to start investing from <strong className="text-gold2">{APP.minimum}</strong>.</>
                    : <>Setup your account by verifying who you are to start investing from <strong className="text-gold2">{APP.minimum}</strong>.</>}
                </p>
              </div>
              <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 text-gold">
                <FileSignature size={26} />
                <div className="absolute -bottom-1 -right-1 rounded-full bg-gold p-1 text-ink"><UserCheck size={10} /></div>
              </div>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>Progress</span><span className="text-slate-200">{verified ? '3/3' : '1/3'} completed</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 p-0.5">
                <div className={`h-full rounded-full transition-all duration-500 ${GOLD_BG}`} style={{ width: verified ? '100%' : '33.33%' }} />
              </div>
            </div>
            <button onClick={verified ? () => setTab('invest') : openVerify} className={`flex w-full items-center justify-center space-x-2 rounded-xl py-3 text-xs font-extrabold text-ink shadow-md transition hover:brightness-110 active:scale-[.99] ${GOLD_BG}`}>
              <span>{verified ? 'Browse Properties Now' : 'Complete onboarding'}</span><ChevronRight size={13} />
            </button>
          </div>
        </div>

        <div className="pb-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Featured Properties</h3>
            <button onClick={() => setTab('invest')} className="text-xs font-semibold text-gold2 hover:underline">Explore all</button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-night2 transition hover:border-gold/40">
            <div className="relative h-36 bg-slate-800">
              <img src={APP.featured.image} alt={APP.featured.name} loading="lazy" onError={hideBroken} className="h-full w-full object-cover" />
              <div className="absolute left-3 top-3 rounded-full border border-gold/30 bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-gold2 backdrop-blur-md">{APP.featured.area}</div>
              <div className="absolute bottom-3 right-3 rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-slate-200 backdrop-blur-md">{APP.featured.yield}</div>
            </div>
            <div className="space-y-3 p-4">
              <div>
                <h4 className="text-sm font-bold text-white">{APP.featured.name}</h4>
                <p className="text-xs text-slate-400">{APP.featured.sub}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-800 bg-card/60 p-2.5 text-xs">
                <div><span className="block text-[10px] text-slate-500">Min. Investment</span><span className="font-extrabold text-gold2">{APP.minimum}</span></div>
                <div><span className="block text-[10px] text-slate-500">Funded</span><span className="font-extrabold text-slate-200">{APP.featured.funded}</span></div>
              </div>
              <button onClick={() => setTab('invest')} className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700">View Property Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestTab({ app }) {
  return (
    <div className="space-y-4 p-5">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white">Investment Properties</h2>
          <p className="text-xs text-slate-400">Property crowdfunding starting from {APP.minimum}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-night2 p-2 text-slate-300"><SlidersHorizontal size={16} /></div>
      </div>
      {APP.properties.map((p) => (
        <div key={p.name} className="overflow-hidden rounded-2xl border border-line bg-night2">
          <div className="relative h-40 bg-slate-800">
            <img src={p.image} alt={p.name} loading="lazy" onError={hideBroken} className="h-full w-full object-cover" />
            <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${p.open ? 'bg-gold text-ink' : 'border border-slate-700 bg-slate-800 text-slate-300'}`}>{p.status}</span>
          </div>
          <div className="space-y-3 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{p.name}</h3>
                <p className="text-xs text-slate-400">{p.area}</p>
              </div>
              <span className={`rounded-lg px-2 py-1 text-xs font-bold ${p.open ? 'bg-gold/10 text-gold2' : 'bg-slate-800 text-slate-300'}`}>{p.roi}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div className={`h-full ${p.bar} ${p.open ? GOLD_BG : 'bg-slate-600'}`} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Min: <strong className="text-slate-200">{APP.minimum}</strong></span>
              {p.open
                ? <button onClick={app.openVerify} className={`rounded-lg px-4 py-1.5 text-xs font-bold text-ink ${GOLD_BG}`}>Invest Now</button>
                : <button disabled className="cursor-not-allowed rounded-lg bg-slate-800 px-4 py-1.5 text-xs font-bold text-slate-500">Fully Funded</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WalletTab({ app }) {
  return (
    <div className="space-y-5 p-5">
      <div className="border-b border-slate-800 py-4 text-center">
        <span className="text-xs text-slate-400">Wallet Available Balance</span>
        <h2 className="mt-1 text-3xl font-extrabold text-gold2">AED 0.00</h2>
        <div className="mt-4 flex justify-center space-x-3">
          <button onClick={app.openVerify} className={`flex items-center space-x-2 rounded-xl px-5 py-2.5 text-xs font-bold text-ink ${GOLD_BG}`}><span>+</span><span>Deposit Funds</span></button>
          <button className="rounded-xl border border-slate-700 bg-card px-5 py-2.5 text-xs font-bold text-slate-200">Withdraw</button>
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-white">Recent Activity</h4>
        <div className="rounded-2xl border border-line bg-night2 p-6 text-center text-xs text-slate-500">
          <Receipt size={26} className="mx-auto mb-2 text-slate-600" />
          <p>No wallet transactions yet.</p>
          <p className="mt-1 text-[11px] text-slate-600">Complete account verification to deposit and invest.</p>
        </div>
      </div>
    </div>
  );
}

function PortfolioTab({ app }) {
  return (
    <div className="space-y-5 p-5">
      <div>
        <h2 className="text-xl font-extrabold text-white">My Portfolio</h2>
        <p className="text-xs text-slate-400">Track your real estate yields and holdings</p>
      </div>
      <div className="space-y-3 rounded-2xl border border-line bg-night2 p-5 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold2"><PieChart size={22} /></div>
        <h3 className="text-base font-bold text-white">You don't own any properties yet</h3>
        <p className="mx-auto max-w-xs text-xs text-slate-400">Start investing in Dubai real estate from {APP.minimum} and build your portfolio.</p>
        <button onClick={() => app.setTab('invest')} className={`mt-2 inline-block rounded-xl px-6 py-2.5 text-xs font-extrabold text-ink ${GOLD_BG}`}>Browse Properties</button>
      </div>
    </div>
  );
}

function RewardsTab({ app }) {
  const copy = async () => {
    try { await navigator.clipboard.writeText(APP.referralLink); app.say('Referral link copied.'); }
    catch { app.say('Copy is not available here.'); }
  };
  return (
    <div className="space-y-5 p-5">
      <div className="space-y-3 rounded-2xl border border-gold/30 bg-gradient-to-br from-[#2b2410] via-night2 to-night2 p-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-gold2">Rewards Balance</span>
            <h2 className="text-3xl font-extrabold text-white">{APP.rewards} <span className="text-lg text-gold2">AED</span></h2>
          </div>
          <span className="text-2xl">🎁</span>
        </div>
        <p className="text-xs text-slate-300">Earn AED rewards by inviting friends to invest on prop1000.</p>
      </div>
      <div className="space-y-3 rounded-2xl border border-line bg-night2 p-4">
        <h4 className="text-sm font-bold text-white">Refer a Friend &amp; Earn</h4>
        <p className="text-xs text-slate-400">Share your referral link with friends. Reward terms are shown in the app.</p>
        <div className="flex items-center space-x-2 rounded-xl border border-slate-700 bg-card p-2">
          <input readOnly value={APP.referralLink} aria-label="Referral link" className="w-full bg-transparent px-2 text-xs text-slate-300 outline-none" />
          <button onClick={copy} className={`flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold text-ink ${GOLD_BG}`}>Copy</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- onboarding sheet ---------- */
function VerifySheet({ vStep, onNext, onClose }) {
  const titles = ['Personal Details', `${APP.regulator} Investor Profile`, 'Verified'];
  const label = ['Continue to Step 2', 'Submit & Complete', 'Done & Start Investing'][vStep - 1];
  const input = 'w-full rounded-xl border border-slate-700 bg-card p-3 text-white outline-none focus:border-gold';
  return (
    <Overlay bottom>
      <div className="max-h-[90%] w-full space-y-5 overflow-y-auto rounded-t-3xl border border-line bg-night2 p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="rounded-xl bg-gold/10 p-2 text-gold2"><ShieldCheck size={18} /></div>
            <div>
              <h3 className="text-base font-bold text-white">Identity Verification</h3>
              <p className="text-[11px] text-slate-400">Onboarding preview</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 text-slate-400 hover:text-white"><X size={18} /></button>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>Verification Step <strong className="text-gold2">{vStep}</strong> of 3</span>
          <span className="text-gold2">{titles[vStep - 1]}</span>
        </div>

        {vStep === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">Provide your basic personal details as stated on your UAE Pass or Passport.</p>
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[11px] text-amber-200">
              Demo only. Nothing you type here is saved or sent anywhere. Please don't enter real ID numbers.
            </p>
            <div className="space-y-3 text-xs">
              <label className="block"><span className="mb-1 block font-medium text-slate-400">Full Name</span>
                <input type="text" autoComplete="off" placeholder="e.g. Abdullah Mansoor" className={input} /></label>
              <label className="block"><span className="mb-1 block font-medium text-slate-400">Emirates ID or Passport Number</span>
                <input type="text" autoComplete="off" placeholder="784-XXXX-XXXXXXX-X" className={input} /></label>
            </div>
          </div>
        )}

        {vStep === 2 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">Confirm your investment profile details.</p>
            <div className="space-y-2 rounded-xl border border-slate-800 bg-card/60 p-3 text-xs">
              <div className="flex items-center justify-between text-slate-300"><span>Minimum Investment Level</span><span className="font-bold text-gold2">{APP.minimum}</span></div>
              <div className="flex items-center justify-between text-slate-300"><span>Regulatory Oversight</span><span className="font-bold text-white">{APP.regulator}</span></div>
            </div>
            <label className="flex cursor-pointer items-start space-x-2 text-xs text-slate-400">
              <input type="checkbox" defaultChecked className="mt-0.5 accent-gold" />
              <span>I confirm I am investing my own funds and agree to prop1000 terms.</span>
            </label>
          </div>
        )}

        {vStep === 3 && (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold2"><Check size={28} /></div>
            <h4 className="text-lg font-bold text-white">Verification Complete!</h4>
            <p className="text-xs text-slate-300">In the real app you could now deposit and start investing from {APP.minimum}.</p>
          </div>
        )}

        <button onClick={onNext} className={`w-full rounded-xl py-3 text-xs font-extrabold text-ink shadow-lg transition hover:brightness-110 ${GOLD_BG}`}>{label}</button>
      </div>
    </Overlay>
  );
}

/* ---------- the section ---------- */
export default function AppPreview() {
  const [tab, setTab] = useState('home');
  const [hidden, setHidden] = useState(false);
  const [modal, setModal] = useState(null);
  const [vStep, setVStep] = useState(1);
  const [verified, setVerified] = useState(false);
  const [toast, setToast] = useState('');
  const [time, setTime] = useState(clock());
  const scroller = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTime(clock()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => { if (scroller.current) scroller.current.scrollTop = 0; }, [tab]);
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const say = (m) => setToast(m);
  const openVerify = () => setModal('verify');
  const nextStep = () => {
    if (vStep === 1) setVStep(2);
    else if (vStep === 2) { setVStep(3); setVerified(true); say('Demo: verification complete.'); }
    else setModal(null);
  };
  const reset = () => { setTab('home'); setModal(null); setVStep(1); setVerified(false); setHidden(false); setToast(''); };

  const app = { hidden, setHidden, verified, setTab, openVerify, setModal, say };

  const features = [
  [Home, 'Account overview', 'See your account value and onboarding progress at a glance.'],
  [TrendingUp, 'Browse properties', `Explore investment opportunities from ${APP.minimum}.`],
  [Wallet, 'Wallet', 'Check your balance and recent activity, and deposit funds once your account is verified.'],
  [PieChart, 'Portfolio', 'Track your real estate holdings and yields as you invest.'],
  [Award, 'Rewards', 'Invite friends and follow your rewards balance.'],
];

  return (
    <section id="app" className="bg-night2 py-[60px] md:py-[88px]">
      <div className="wrap grid items-center gap-6 md:grid-cols-[1fr_auto] md:gap-6">
        <div className="max-w-[1000px]">
          <span className="mb-4 inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold text-gold2">The app</span>
          <h2 className="sec-title">Your property portfolio, in your pocket</h2>
          <p className="mt-3.5 text-[17px] text-mute">Browse properties, follow your wallet and rewards, and finish onboarding from one app. Tap around the preview to see how it works.</p>
          <ul className="mt-6 grid gap-4">
            {features.map(([Icon, t, d]) => (
              <li key={t} className="flex gap-3.5">
                <span className="grid size-10 flex-none place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold2"><Icon size={18} /></span>
                <div><b className="block">{t}</b><span className="text-[15px] text-mute">{d}</span></div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2.5 text-[13px]">
            <span className="rounded-md border border-mute px-3 py-1.5">Coming soon: App Store</span>
            <span className="rounded-md border border-mute px-3 py-1.5">Coming soon: Google Play</span>
          </div>
          <p className="mt-4 text-[12.5px] text-mute">Preview screens use example data and are not live offers. Returns are targets, not guarantees, and your capital is at risk.</p>
          <button onClick={reset} className="btn btn-ghost btn-sm mt-4">Reset preview</button>
        </div>

        {/* phone */}
        <div className="relative mx-auto flex h-[720px] w-full max-w-[380px] flex-col justify-between overflow-hidden rounded-[36px] border border-slate-800 bg-night shadow-2xl">
          <div className="z-20 flex items-center justify-between bg-night/80 px-6 pt-3 text-xs text-slate-400 backdrop-blur-md">
            <span className="font-semibold text-slate-300">{time}</span>
            <div className="flex items-center space-x-2"><Signal size={13} /><Wifi size={13} /><BatteryFull size={15} className="text-gold" /></div>
          </div>

          <div ref={scroller} className="relative flex-1 select-none overflow-y-auto overscroll-contain pb-24">
            {tab === 'home' && <HomeTab app={app} />}
            {tab === 'invest' && <InvestTab app={app} />}
            {tab === 'wallet' && <WalletTab app={app} />}
            {tab === 'portfolio' && <PortfolioTab app={app} />}
            {tab === 'rewards' && <RewardsTab app={app} />}
          </div>

          <nav className="absolute inset-x-0 bottom-0 z-30 border-t border-slate-800/80 bg-[#0f131c]/95 px-4 py-2.5 backdrop-blur-xl">
            <div className="flex items-center justify-around">
              <NavBtn id="home" label="Home" icon={Home} tab={tab} setTab={setTab} />
              <NavBtn id="invest" label="Invest" icon={TrendingUp} tab={tab} setTab={setTab} />
              <NavBtn id="wallet" label="Wallet" icon={Wallet} tab={tab} setTab={setTab} />
              <NavBtn id="portfolio" label="Portfolio" icon={PieChart} tab={tab} setTab={setTab} />
              <NavBtn id="rewards" label="Rewards" icon={Award} tab={tab} setTab={setTab} />
              <button onClick={() => setModal('menu')} aria-label="Menu" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/60 bg-card text-slate-200 transition hover:text-gold2"><Menu size={16} /></button>
            </div>
          </nav>

          {modal === 'verify' && <VerifySheet vStep={vStep} onNext={nextStep} onClose={() => setModal(null)} />}

          {modal === 'dfsa' && (
            <SmallModal title="Regulatory Information" onClose={() => setModal(null)}>
              <p className="text-xs leading-relaxed text-slate-300">{APP.regulatoryNote}</p>
            </SmallModal>
          )}

          {modal === 'notifications' && (
            <SmallModal title="Notifications" onClose={() => setModal(null)}>
              <div className="space-y-2 text-xs">
                <div className="space-y-1 rounded-xl border border-slate-800 bg-card p-3">
                  <p className="font-bold text-gold2">Welcome to prop1000</p>
                  <p className="text-[11px] text-slate-400">Start investing in Dubai property from {APP.minimum}.</p>
                </div>
                <div className="space-y-1 rounded-xl border border-slate-800 bg-card p-3">
                  <p className="font-bold text-white">Complete Onboarding Step</p>
                  <p className="text-[11px] text-slate-400">Verify your account to activate instant deposits.</p>
                </div>
              </div>
            </SmallModal>
          )}

          {modal === 'menu' && (
            <SmallModal title="App Options" onClose={() => setModal(null)}>
              <div className="space-y-2 text-xs font-semibold text-slate-300">
                {[
                  ['Account Verification', openVerify],
                  [`${APP.regulator} Regulation Info`, () => setModal('dfsa')],
                  [`Referral Program (${APP.rewards} AED)`, () => { setModal(null); setTab('rewards'); }],
                ].map(([label, fn]) => (
                  <button key={label} onClick={fn} className="flex w-full items-center justify-between rounded-xl bg-card p-3 text-left hover:text-gold2">
                    <span>{label}</span><ChevronRight size={14} className="text-slate-500" />
                  </button>
                ))}
              </div>
            </SmallModal>
          )}

          <div
            role="status"
            className={`pointer-events-none absolute bottom-20 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-ink shadow-2xl transition-opacity duration-300 ${toast ? 'opacity-100' : 'opacity-0'}`}
          >
            {toast || '\u00a0'}
          </div>
        </div>
      </div>
    </section>
  );
}
