'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

export default function SiteFooter({ items = defaultLinks, tagline = 'Websites, apps and digital solutions built for business.' }: { items?: NavItem[]; tagline?: string }) {
  const pathname = usePathname();
  if (pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/demos/') || pathname.startsWith('/previews/') || pathname.startsWith('/proposal/')) return null;
  const links = [...items];
  for (const item of defaultLinks) if (!links.some((link) => link.href === item.href)) links.push(item);
  return (
    <footer className="mifi-site-footer">
      <div className="mifi-footer-main">
        <div className="mifi-footer-brand">
          <Link href="/" className="mifi-footer-wordmark" aria-label="MifiTech home"><span>Mifi</span>Tech<span className="mifi-footer-period">.</span></Link>
          <p>{tagline}</p>
          <div className="mifi-footer-contact"><a href="mailto:officialsafebase@gmail.com">officialsafebase@gmail.com</a><a href="https://wa.me/2349067859200" target="_blank" rel="noreferrer">WhatsApp: +234 906 785 9200</a></div>
        </div>
        <div className="mifi-footer-navigation">
          <p className="mifi-footer-label">EXPLORE MIFITECH</p>
          <nav aria-label="Footer navigation">
            {links.map((item, index) => <Link href={item.href} key={item.href + index}>{item.label}</Link>)}
          </nav>
        </div>
        <div className="mifi-footer-action">
          <p className="mifi-footer-label">HAVE SOMETHING IN MIND?</p>
          <h2>Let’s build something useful.</h2>
          <p>Tell us what your business needs. We’ll help you plan the right digital solution.</p>
          <Link className="mifi-footer-cta" href="/#contact">Start a project <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="mifi-footer-bottom">
        <span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span>
        <span><Link href="/privacy">Privacy policy</Link><span className="mifi-footer-dot">·</span><span>Designed with intention. Built for business.</span></span>
      </div>
    </footer>
  );
}
