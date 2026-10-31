'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type NavItem = { label: string; href: string };
const defaultLinks: NavItem[] = [
  { label: 'Services', href: '/#services' },
  { label: 'Demo studio', href: '/#demos' },
  { label: 'Our work', href: '/#work' },
  { label: 'Our approach', href: '/#process' },
  { label: 'Website guide', href: '/how-to-build-a-website-in-nigeria' },
];

export default function SiteNav({ items = defaultLinks }: { items?: NavItem[] }) {
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
          {items.map((item, index) => <Link href={item.href} key={item.label + index}>{item.label}</Link>)}
        </nav>
        <div className="studio-nav-actions">
          <a href="/#contact">Start a project</a>
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
          {items.map((item, index) => <Link href={item.href} key={item.label + index} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link href="/#contact" onClick={() => setOpen(false)}>Start a project</Link>
        </nav>
      )}
    </header>
  );
}
