import Link from 'next/link';

type NavigationItem = { label: string; href: string };

export default function FloatingMenu({ navigation }: { navigation: NavigationItem[] }) {
  return (
    <div className="mifi-floating-menu">
      <Link className="mifi-floating-brand" href="/" aria-label="MifiTech home">
        <img src="/brand/logo-b-horizontal-dark.svg" alt="MifiTech" width={150} height={33} />
      </Link>
      <details className="mifi-floating-details">
        <summary aria-label="Open site menu">
          <span>Menu</span>
          <i aria-hidden="true"><b /><b /></i>
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
