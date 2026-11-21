'use client';
import { useState } from 'react';

const items = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
];

export default function SalonMobileNav({ whatsapp }: { whatsapp: string }) {
  const [active, setActive] = useState('Home');
  return (
    <nav className="salonMobileAppNav" aria-label="Salon navigation">
      {items.map((item) => (
        <a key={item.label} href={item.href} className={active === item.label ? 'isActive' : ''} onClick={() => setActive(item.label)}>
          <span>{item.label}</span>
        </a>
      ))}
      <a className="salonMobileBook" href={whatsapp}><span>Book</span></a>
    </nav>
  );
}
