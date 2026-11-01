// Path: app/components/HeroPhone.tsx
'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

const u = (id: string) => 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=700&q=75';
const IMG = {
  food: u('1414235077428-338989a2e8c0'), room: u('1517248135467-4c7edcad34c4'),
  salon: u('1600948836101-f9f03dd557db'), makeup: u('1522335789203-aabd1fc54bc9'), portrait: u('1487412720507-e7ab37603c6f'),
  clinic: u('1622902046580-2b47f47f5471'),
  fash1: u('1539109136881-3be0616acf4b'), fash2: u('1483985988355-763728e1935b'), fash3: u('1529139574466-a303027c1d8b'),
};

function Photo({ src, className, children }: { src: string; className: string; children?: ReactNode }) {
  return <div className={'mh-ph ' + className} style={{ backgroundImage: 'url(' + src + ')' }}>{children}</div>;
}
const Bar = ({ name, right }: { name: string; right?: ReactNode }) => (
  <div className="sx-bar"><b>{name}</b>{right ?? <i className="sx-burger" />}</div>
);
const Stars = () => <span className="sx-stars" aria-hidden="true">★★★★★</span>;
const Row = ({ a, b, c }: { a: string; b: string; c: string }) => (
  <div className="sx-row"><div><b>{a}</b><span>{b}</span></div><strong>{c}</strong></div>
);
const Icon = ({ d }: { d: string }) => <i className="sx-ic"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d={d} fill="#fff" /></svg></i>;

function Restaurant() {
  return (
    <div className="sx">
      <Bar name="MESA" />
      <Photo src={IMG.food} className="sx-hero"><div><small>Lekki, Lagos</small><h4>Gather around something good.</h4><p>Jollof, grills and small chops, cooked fresh every day.</p><span className="sx-btn">Book a table</span><span className="sx-btn sx-ghost">View menu</span></div></Photo>
      <div className="sx-info"><div><b>Open today</b><span>12pm to 10pm</span></div><div><b>Delivery</b><span>About 45 min</span></div><div><b>Rated</b><span>4.8 of 5</span></div></div>
      <div className="sx-sec"><h5>Signature dishes</h5>
        <Row a="Smoky party jollof" b="Rice, grilled chicken, fried plantain" c="₦4,500" />
        <Row a="Suya platter" b="Spiced beef, onions, yaji" c="₦6,000" />
        <Row a="Pepper soup" b="Goat meat or catfish, served hot" c="₦5,200" />
        <Row a="Chapman" b="Chilled, 500ml" c="₦1,800" />
        <span className="sx-link">See the full menu</span>
      </div>
      <Photo src={IMG.room} className="sx-banner"><div><b>The room</b><span>Indoor, terrace and private dining for up to 20</span></div></Photo>
      <div className="sx-quote"><Stars /><p>“Best party jollof in Lekki. We came for lunch and stayed for dinner.”</p><small>Ngozi A., Google review</small></div>
      <div className="sx-form"><h5>Reserve a table</h5><div className="sx-field"><span>Day</span><b>Saturday</b></div><div className="sx-field"><span>Time</span><b>7:30pm</b></div><div className="sx-field"><span>Guests</span><b>4 people</b></div><span className="sx-btn">Confirm reservation</span></div>
      <div className="sx-foot"><b>Mesa Kitchen &amp; Table</b><br />12 Admiralty Way, Lekki Phase 1<br />Mon to Sun, 12pm to 10pm<br />WhatsApp: 0801 234 5678</div>
    </div>
  );
}

function Salon() {
  return (
    <div className="sx">
      <Bar name="AUREL" />
      <Photo src={IMG.salon} className="sx-hero"><div><small>Beauty studio, Victoria Island</small><h4>A little time for your best self.</h4><p>Hair, nails and skincare by appointment.</p><span className="sx-btn">Book appointment</span><span className="sx-btn sx-ghost">Services</span></div></Photo>
      <div className="sx-info"><div><b>Open</b><span>Tue to Sun</span></div><div><b>Walk-ins</b><span>Welcome</span></div><div><b>Rated</b><span>4.9 of 5</span></div></div>
      <div className="sx-sec"><h5>Service menu</h5>
        <Row a="Silk press" b="2 hrs, wash and blow-dry included" c="₦15,000" />
        <Row a="Knotless braids" b="4 to 6 hrs, medium length" c="₦35,000" />
        <Row a="Gel manicure" b="1 hr, removal included" c="₦8,000" />
        <Row a="Facial glow" b="45 min, deep cleanse and mask" c="₦12,000" />
        <span className="sx-link">View all 24 services</span>
      </div>
      <div className="sx-sec sx-soft"><h5>Meet the team</h5>
        <div className="sx-person"><i className="sx-av">A</i><div><b>Adaeze</b><span>Lead stylist, 9 years</span></div></div>
        <div className="sx-person"><i className="sx-av">Z</i><div><b>Zainab</b><span>Nails and lashes</span></div></div>
        <div className="sx-person"><i className="sx-av">K</i><div><b>Kemi</b><span>Skin therapist</span></div></div>
      </div>
      <div className="sx-sec"><h5>Recent work</h5><div className="sx-grid2"><Photo src={IMG.makeup} className="sx-sq" /><Photo src={IMG.portrait} className="sx-sq" /></div></div>
      <div className="sx-quote"><Stars /><p>“I walked in stressed and left feeling brand new. My hair has never looked better.”</p><small>Funke O., returning client</small></div>
      <div className="sx-form"><h5>Book in three steps</h5><div className="sx-field"><span>1</span><b>Choose a service</b></div><div className="sx-field"><span>2</span><b>Pick a time</b></div><div className="sx-field"><span>3</span><b>Pay a small deposit</b></div><span className="sx-btn">Request appointment</span></div>
      <div className="sx-foot"><b>Aurel Beauty Studio</b><br />5 Adetokunbo Ademola St, Victoria Island<br />Tue to Sun, 9am to 7pm<br />WhatsApp: 0802 345 6789</div>
    </div>
  );
}

function Clinic() {
  return (
    <div className="sx">
      <Bar name="Wellspring" right={<span className="sx-call">Call us</span>} />
      <Photo src={IMG.clinic} className="sx-hero"><div><small>Medical centre, Ikeja</small><h4>Care you can trust, close to home.</h4><p>Family doctors, dental care and lab tests under one roof.</p><span className="sx-btn">Book a visit</span><span className="sx-btn sx-ghost">Our services</span></div></Photo>
      <div className="sx-info"><div><b>Open</b><span>8am to 8pm</span></div><div><b>Mon to Sat</b><span>Sun: emergencies</span></div><div><b>Results</b><span>Same day</span></div></div>
      <div className="sx-sec"><h5>What we treat</h5>
        <div className="sx-grid2">
          <div className="sx-tile"><Icon d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7z" />General care</div>
          <div className="sx-tile"><Icon d="M7 4c-2 0-3 2-3 4 0 3 2 4 2 8 0 3 1 4 2 4s1-3 2-3 1 3 2 3 2-1 2-4c0-4 2-5 2-8 0-2-1-4-3-4-1.5 0-2 .8-3 .8S8.5 4 7 4z" />Dental</div>
          <div className="sx-tile"><Icon d="M9 3h6v2h-1v5l5 9a1 1 0 0 1-1 2H6a1 1 0 0 1-1-2l5-9V5H9z" />Laboratory</div>
          <div className="sx-tile"><Icon d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z" />Child health</div>
        </div>
      </div>
      <div className="sx-sec sx-soft"><h5>Our doctors</h5>
        <div className="sx-person"><i className="sx-av">AB</i><div><b>Dr. Amina Bello</b><span>General practice, 12 years</span></div></div>
        <div className="sx-person"><i className="sx-av">CE</i><div><b>Dr. Chidi Eze</b><span>Dental surgeon</span></div></div>
        <div className="sx-person"><i className="sx-av">TO</i><div><b>Dr. Tolu Ojo</b><span>Paediatrics</span></div></div>
      </div>
      <div className="sx-sec"><h5>Why patients choose us</h5>
        <ul className="sx-ticks"><li>Prices explained before any treatment</li><li>Lab results the same day</li><li>Reminders by SMS and WhatsApp</li><li>Private rooms and short waiting times</li></ul>
        <Row a="General consultation" b="30 min" c="₦10,000" />
        <Row a="Dental check-up" b="45 min" c="₦15,000" />
      </div>
      <div className="sx-quote"><Stars /><p>“Quick, clear and kind. I knew the cost before I sat down.”</p><small>Mrs. Okafor, patient</small></div>
      <div className="sx-form"><h5>Request an appointment</h5><div className="sx-field"><span>Name</span><b>Your full name</b></div><div className="sx-field"><span>Phone</span><b>080…</b></div><div className="sx-field"><span>Service</span><b>Dental check-up</b></div><span className="sx-btn">Request appointment</span></div>
      <div className="sx-foot"><b>Wellspring Medical Centre</b><br />27 Obafemi Awolowo Way, Ikeja<br />Mon to Sat, 8am to 8pm<br />Emergency line: 0803 456 7890</div>
    </div>
  );
}

function Shop() {
  const items: [string, string, string][] = [[IMG.fash1, 'Ankara two-piece', '₦28,000'], [IMG.fash2, 'Linen co-ord set', '₦24,500'], [IMG.fash3, 'Wrap dress', '₦19,000']];
  return (
    <div className="sx">
      <div className="sx-ann">Free delivery in Lagos over ₦50,000</div>
      <Bar name="NAYA" right={<span className="sx-cart">Bag (2)</span>} />
      <Photo src={IMG.fash1} className="sx-hero"><div><small>New season</small><h4>The new edit has landed.</h4><p>Pieces made to move with you, from desk to dinner.</p><span className="sx-btn">Shop new arrivals</span></div></Photo>
      <div className="sx-sec sx-tight"><div className="sx-pills"><span className="sx-pill on">New</span><span className="sx-pill">Dresses</span><span className="sx-pill">Two-piece</span><span className="sx-pill">Bags</span><span className="sx-pill">Shoes</span></div></div>
      <div className="sx-sec"><h5>New arrivals</h5>
        <div className="sx-grid2">
          {items.map(([img, name, price]) => (
            <div className="sx-prod" key={name}><Photo src={img} className="sx-tall" /><b>{name}</b><span>{price}</span></div>
          ))}
          <div className="sx-prod"><div className="mh-ph sx-tall sx-more"><b>See all 86 pieces</b></div></div>
        </div>
      </div>
      <Photo src={IMG.fash2} className="sx-banner"><div><b>The lookbook</b><span>Five ways to wear one set</span></div></Photo>
      <div className="sx-info"><div><b>Pay on delivery</b><span>Lagos</span></div><div><b>Order on</b><span>WhatsApp</span></div><div><b>Easy</b><span>7-day returns</span></div></div>
      <div className="sx-quote"><Stars /><p>“The fit is perfect and it arrived in two days. Already ordering again.”</p><small>Bisi T., Abuja</small></div>
      <div className="sx-form"><h5>Get 10% off your first order</h5><div className="sx-field"><span>Email</span><b>you@email.com</b></div><span className="sx-btn">Join the list</span></div>
      <div className="sx-foot"><b>Naya Style House</b><br />Showroom: 8 Allen Avenue, Ikeja<br />Mon to Sat, 10am to 7pm<br />WhatsApp: 0805 678 9012</div>
    </div>
  );
}

type Sample = { key: string; label: string; color: string; name: string; Site: () => ReactNode };
const SAMPLES: Sample[] = [
  { key: 'food', label: 'Restaurant', color: '#9a3d2a', name: 'Mesa Kitchen', Site: Restaurant },
  { key: 'beauty', label: 'Salon', color: '#7a3d63', name: 'Aurel Beauty Studio', Site: Salon },
  { key: 'clinic', label: 'Clinic', color: '#087f79', name: 'Wellspring Medical Centre', Site: Clinic },
  { key: 'shop', label: 'Shop', color: '#2f4a7a', name: 'Naya Style House', Site: Shop },
];

export default function HeroPhone() {
  const [active, setActive] = useState(SAMPLES[0].key);
  const [fading, setFading] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const sample = SAMPLES.find((s) => s.key === active) ?? SAMPLES[0];

  function pick(key: string) {
    if (key === active) return;
    setFading(true);
    window.setTimeout(() => { setActive(key); setFading(false); }, 180);
  }

  // Slowly scroll the sample page so visitors see it is a full homepage. Any touch, wheel, key press or hover stops it.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTop = 0;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let stopped = false;
    let y = 0;
    const stop = () => { stopped = true; cancelAnimationFrame(raf); };
    const step = () => {
      if (stopped) return;
      y += 0.7;
      el.scrollTop = y;
      if (el.scrollTop + el.clientHeight < el.scrollHeight - 1) raf = requestAnimationFrame(step);
    };
    const timer = window.setTimeout(() => { raf = requestAnimationFrame(step); }, 1400);
    const events = ['wheel', 'touchstart', 'pointerdown', 'pointerenter', 'keydown', 'focusin'];
    events.forEach((name) => el.addEventListener(name, stop, { passive: true }));
    return () => { window.clearTimeout(timer); stop(); events.forEach((name) => el.removeEventListener(name, stop)); };
  }, [active]);

  const Site = sample.Site;

  return (
    <>
      <div className="mh-picker">
        <p id="mh-picker-label">Pick a business type to preview its homepage:</p>
        <div className="mh-tabs" role="tablist" aria-labelledby="mh-picker-label">
          {SAMPLES.map((s) => (
            <button key={s.key} type="button" role="tab" id={'mh-tab-' + s.key} aria-selected={s.key === active} aria-controls="mh-phone-screen" onClick={() => pick(s.key)}>{s.label}</button>
          ))}
        </div>
      </div>
      <div className="mh-stage">
        <div className="mh-phone">
          <div ref={scroller} id="mh-phone-screen" role="tabpanel" tabIndex={0} aria-label={sample.name + ' sample homepage. Scroll to browse.'} className={'mh-screen' + (fading ? ' is-swapping' : '')} style={{ '--c': sample.color } as CSSProperties}>
            <Site />
          </div>
        </div>
        <p className="mh-note">Sample brands. Scroll the phone to browse the whole page.</p>
      </div>
    </>
  );
}