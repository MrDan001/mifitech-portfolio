'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { label: 'Services', href: '/#services' },
  { label: 'Demo studio', href: '/#demos' },
  { label: 'Our work', href: '/#work' },
  { label: 'Our approach', href: '/#process' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <header className="studio-header">
      <div className="studio-container studio-nav-inner">
        <Link className="studio-brand" href="/" aria-label="MifiTech home">
          <b>M</b>
          <span className="studio-brand-copy">
            <strong>MifiTech<span>.</span></strong>
            <small>Websites · Apps · Digital Solutions</small>
          </span>
        </Link>
        <nav className="studio-desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
          <Link href="/how-to-build-a-website-in-nigeria">Website guide</Link>
        </nav>
        <div className="studio-nav-actions">
          <a href="/#contact">Start a project <span>↗</span></a>
          <button
            type="button"
            className="studio-menu-button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="studio-mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <i/><i/>
          </button>
        </div>
      </div>
      {open && (
        <nav className="studio-mobile-nav" id="studio-mobile-navigation" aria-label="Mobile navigation">
          {links.map((link) => <Link href={link.href} key={link.label} onClick={() => setOpen(false)}>{link.label}<span>↗</span></Link>)}
          <Link href="/how-to-build-a-website-in-nigeria" onClick={() => setOpen(false)}>Website guide <span>↗</span></Link>
          <Link href="/#contact" onClick={() => setOpen(false)}>Start a project <span>↗</span></Link>
        </nav>
      )}
    </header>
  );
}
