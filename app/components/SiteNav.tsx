// Path: app/components/SiteNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type NavItem = { label: string; href: string };
const defaultLinks: NavItem[] = [
  { label: 'Services', href: '/#services' },
  { label: 'Demo studio', href: '/#demos' },
  { label: 'Our work', href: '/#work' },
  { label: 'Client reviews', href: '/#testimonials' },
  { label: 'Our approach', href: '/#process' },
  { label: 'FAQs', href: '/#faqs' },
  { label: 'Website guide', href: '/how-to-build-a-website-in-nigeria' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export default function SiteNav({ items = defaultLinks }: { items?: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [...items];
  for (const item of defaultLinks) {
    if (!links.some((link) => link.href === item.href)) links.push(item);
  }

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  if (pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/demos/') || pathname.startsWith('/previews/') || pathname.startsWith('/proposal/')) return null;

  return (
    <header className="studio-header mifi-primary-header">
      <div className="studio-container studio-nav-inner">
        <Link className="studio-brand" href="/" aria-label="MifiTech home">
          <img src="/brand/logo-b-mark.svg" alt="" width={40} height={40} style={{ flex: 'none' }} />
          <span className="studio-brand-copy">
            <strong><span className="brand-mifi">Mifi</span>Tech<span className="brand-period">.</span></strong>
            <small>Websites · Apps · Digital Solutions</small>
          </span>
        </Link>
        <nav className="studio-desktop-nav" aria-label="Main navigation">
          {links.map((item, index) => {
            const active = item.href === '/blog' ? pathname === '/blog' || pathname.startsWith('/blog/') : item.href === '/about' ? pathname === '/about' : item.href.startsWith('/#') ? false : pathname === item.href || pathname.startsWith(item.href + '/');
            return <Link href={item.href} key={item.label + index} className={active ? 'active' : undefined}>{item.label}</Link>;
          })}
        </nav>
        <div className="studio-nav-actions">
          <Link href="/#contact">Start a project</Link>
          <button
            type="button"
            className="studio-menu-button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="studio-mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <nav className="studio-mobile-nav" id="studio-mobile-navigation" aria-label="Mobile navigation">
          {links.map((item, index) => <Link href={item.href} key={item.label + index} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link href="/#contact" onClick={() => setOpen(false)}>Start a project</Link>
        </nav>
      )}
    </header>
  );
}
