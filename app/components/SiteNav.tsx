'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { label: 'Services', href: '/#services' },
  { label: 'Demo studio', href: '/#showcase' },
  { label: 'Our work', href: '/#work' },
  { label: 'Process', href: '/#process' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="wrap nav-inner">
        <Link className="site-brand" href="/" onClick={() => setOpen(false)} aria-label="MifiTech home">
          <span className="brand-mark">M</span>
          <span>MifiTech<span className="brand-period">.</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="/#contact">Start a project <span>↗</span></a>
          <button className="mobile-menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}>
            <span /><span />
          </button>
        </div>
      </div>
      {open && <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
        <div className="wrap mobile-nav-inner">
          {links.map((link) => <Link href={link.href} key={link.label} onClick={() => setOpen(false)}>{link.label}<span>↗</span></Link>)}
          <a href="/#contact" onClick={() => setOpen(false)}>Start a project <span>↗</span></a>
        </div>
      </nav>}
    </header>
  );
}
