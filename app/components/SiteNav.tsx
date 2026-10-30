'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { label: 'Services', href: '/#services' },
  { label: 'Demo studio', href: '/#demos' },
  { label: 'Selected work', href: '/#work' },
  { label: 'Our approach', href: '/#process' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="studio-header"><div className="studio-container studio-nav-inner">
    <Link className="studio-brand" href="/" aria-label="MifiTech home"><b>M</b><span>MifiTech<span>.</span></span></Link>
    <nav className="studio-desktop-nav" aria-label="Main navigation">{links.map(l=><Link href={l.href} key={l.label}>{l.label}</Link>)}</nav>
    <div className="studio-nav-actions"><a href="/#contact">Start a project <span>↗</span></a><button type="button" className="studio-menu-button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(v=>!v)}><i/><i/></button></div>
  </div>{open&&<nav className="studio-mobile-nav">{links.map(l=><Link href={l.href} key={l.label} onClick={()=>setOpen(false)}>{l.label}<span>↗</span></Link>)}<Link href="/#contact" onClick={()=>setOpen(false)}>Start a project <span>↗</span></Link><Link href="/how-to-build-a-website-in-nigeria" onClick={()=>setOpen(false)}>Website guide <span>↗</span></Link></nav>}</header>;
}
