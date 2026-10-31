'use client';

import { useState, type CSSProperties } from 'react';

type Sample = { key: string; label: string; color: string; name: string; line: string; items: [string, string, string][]; cta: string };

const SAMPLES: Sample[] = [
  { key: 'food', label: 'Restaurant', color: '#9a3d2a', name: 'Mesa Kitchen', line: 'Jollof, grills and small chops. Order ahead or book a table.', items: [['Smoky party jollof', 'Rice, chicken', '₦4,500'], ['Suya platter', 'Spiced beef, onions', '₦6,000'], ['Chapman', 'Chilled, 500ml', '₦1,800']], cta: 'Book a table' },
  { key: 'beauty', label: 'Salon', color: '#7a3d63', name: 'Aurel Studio', line: 'Hair, nails and skincare by appointment.', items: [['Silk press', '2 hrs', '₦15,000'], ['Gel manicure', '1 hr', '₦8,000'], ['Facial glow', '45 min', '₦12,000']], cta: 'Request appointment' },
  { key: 'clinic', label: 'Clinic', color: '#087f79', name: 'Wellspring Clinic', line: 'Family care, dental and lab tests. Open 8am to 8pm.', items: [['General consultation', '30 min', '₦10,000'], ['Dental check-up', '45 min', '₦15,000'], ['Malaria and typhoid test', 'Same day', '₦6,500']], cta: 'Book a visit' },
  { key: 'shop', label: 'Shop', color: '#2f4a7a', name: 'Naya Style House', line: 'New arrivals, delivered to your door across Lagos.', items: [['Ankara two-piece', 'Sizes 8 to 18', '₦28,000'], ['Leather slides', 'Sizes 38 to 45', '₦12,500'], ['Beaded clutch', 'One size', '₦9,000']], cta: 'Order on WhatsApp' },
];

export default function HeroPhone() {
  const [active, setActive] = useState(SAMPLES[0].key);
  const [fading, setFading] = useState(false);
  const sample = SAMPLES.find((s) => s.key === active) ?? SAMPLES[0];

  function pick(key: string) {
    if (key === active) return;
    setFading(true);
    window.setTimeout(() => { setActive(key); setFading(false); }, 180);
  }

  return (
    <>
      <div className="mh-picker">
        <p id="mh-picker-label">Pick a business type and watch the site change:</p>
        <div className="mh-tabs" role="tablist" aria-labelledby="mh-picker-label">
          {SAMPLES.map((s) => (
            <button key={s.key} type="button" role="tab" id={'mh-tab-' + s.key} aria-selected={s.key === active} aria-controls="mh-phone-screen" onClick={() => pick(s.key)}>{s.label}</button>
          ))}
        </div>
      </div>
      <div className="mh-stage">
        <div className="mh-phone">
          <div id="mh-phone-screen" role="tabpanel" aria-labelledby={'mh-tab-' + active} className={'mh-screen' + (fading ? ' is-swapping' : '')} style={{ '--c': sample.color } as CSSProperties}>
            <div className="mh-s-top"><small>Sample brand</small><h3>{sample.name}</h3><p>{sample.line}</p></div>
            <div className="mh-s-list">
              {sample.items.map(([name, detail, price]) => (
                <div className="mh-s-item" key={name}><div><b>{name}</b><br /><span>{detail}</span></div><strong>{price}</strong></div>
              ))}
            </div>
            <div className="mh-s-cta">{sample.cta}</div>
          </div>
        </div>
        <p className="mh-note">Sample brands. Your site is designed around your business.</p>
      </div>
    </>
  );
}