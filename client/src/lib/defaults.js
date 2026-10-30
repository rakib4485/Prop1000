// Default site content. Anything the admin saves is merged over these values.
export const DEFAULTS = {
  announce: { on: false, text: 'Waitlist is open. Join today.' },
  hero: {
    title: 'Own a share of Dubai property from',
    accent: 'AED 1,000',
    lead: 'Fractional real estate investing, open to people anywhere in the world. Pick a pool, invest your share, and earn as the property performs.',
  },
  min: 1000,
  max: 183000,
  email: 'eakubarabe9725@gmail.com',
  waitlistOpen: true,
  poolA: {
    name: 'Pool A: Distressed deals',
    duration: '18 months',
    target: 15,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    desc: 'Properties bought below market value, improved where needed, then sold. Best if you want a defined timeline.',
  },
  poolB: {
    name: 'Pool B: Holiday homes',
    duration: '3–5 years',
    yLow: 7,
    yHigh: 10,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    desc: 'Short-stay holiday homes in popular Dubai areas, earning rental income. Best if you want recurring returns.',
  },
  cities: [
    { c: 'Dubai', v: 7.1 },
    { c: 'New York', v: 4.5 },
    { c: 'London', v: 3.5 },
    { c: 'Singapore', v: 2.5 },
  ],
  faqs: [
    { q: 'What is fractional investing?', a: 'You buy a small share of a property portfolio rather than a whole property, so you can start with as little as the minimum amount.' },
    { q: 'Who can invest?', a: 'Prop1000 is designed to be open to people anywhere in the world. Waitlist members will get full eligibility details at launch.' },
    { q: 'How do the two pools differ?', a: 'Pool A is a short investment in discounted properties targeting a profit on exit. Pool B is a longer investment in holiday homes targeting annual rental yield.' },
    { q: 'Are returns guaranteed?', a: 'No. Returns are targets, not guarantees. Property values and rental income can fall, and your capital is at risk.' },
    { q: 'When does Prop1000 launch?', a: 'We are building a waitlist now, with iOS and Android apps coming soon. Join the waitlist to be notified.' },
  ],
};

export const STATUSES = ['New', 'Contacted', 'Approved', 'Rejected'];
export const POOL_OPTIONS = ['Both pools', 'Pool A', 'Pool B'];
export const WAITLIST_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdAZG7H5rcjTOPgf8oRfwF2t5xXEZvyS7QPSE8kcZZYo8yUfQ/viewform?usp=header';