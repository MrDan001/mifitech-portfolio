'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationItem = { label: string; href: string };

export default function FloatingMenu({ navigation }: { navigation: NavigationItem[] }) {
  const pathname = usePathname();
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;

  return (
    <div className="mifi-floating-menu">
      <details className="mifi-floating-details">
        <summary aria-label="Open site menu">
          <span>Menu</span>
          
        </summary>
        <nav aria-label="Site navigation">
          {navigation.map((item, index) => (
            <Link key={item.label + index} href={item.href}>{item.label}<span aria-hidden="true">↗</span></Link>
          ))}
          <Link className="mifi-floating-cta" href="/#contact">Start a project <span aria-hidden="true">↗</span></Link>
        </nav>
      </details>
    </div>
  );
}
