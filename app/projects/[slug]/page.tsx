import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getHomepageContent } from '@/lib/site-content';
import SiteNav from '../../components/SiteNav';

type Project = {
  image: string;
  title: string;
  type: string;
  intro: string;
  repo: string;
  live?: string;
  stack: string[];
  features: string[];
};

const projects: Record<string, Project> = {
  'ludo-live': {
    image: '/previews/ludo-live.svg',
    title: 'Ludo Live',
    type: 'Multiplayer Gaming Platform',
    intro: 'A production multiplayer game platform with player experiences and a substantial admin and product ecosystem.',
    repo: 'https://github.com/MrDan001/ludo-live',
    live: 'https://ludo-live.up.railway.app',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Railway'],
    features: ['Multiplayer game experiences', 'Missions and reward systems', 'Tournament and admin tooling', 'Player shop and inventory systems', 'Player audit and transaction visibility', 'Production deployment and debugging'],
  },
  ehealthcare: {
    image: '/previews/ehealthcare.svg',
    title: 'eHealthcare',
    type: 'Healthcare Platform',
    intro: 'A healthcare-focused digital product represented in the portfolio with repository-backed project information.',
    repo: 'https://github.com/MrDan001/ehealthcare-system',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    features: ['Healthcare-focused digital experience', 'Service and information workflows', 'Product UI and system design', 'Repository-backed project documentation'],
  },
  'garrison-market': {
    image: '/previews/garrison-market.svg',
    title: 'Garrison Market',
    type: 'Inventory & Business Management',
    intro: 'A business operations app for shop owners and staff to manage inventory, staff, sales and day-to-day operations from one place.',
    repo: 'https://github.com/MrDan001/garrison-market',
    live: 'https://gmstock.co',
    stack: ['Next.js', 'TypeScript', 'Database'],
    features: ['Inventory management', 'Staff operations', 'Sales workflows', 'Day-to-day business management', 'Single-place operational view'],
  },
  'the-africa-plug': {
    image: '/previews/the-africa-plug.svg',
    title: 'The Africa Plug',
    type: 'Media & Content Platform',
    intro: 'A content platform focused on media and publishing, including video content and production content updates.',
    repo: 'https://github.com/MrDan001/the-africa-plug',
    stack: ['Next.js', 'TypeScript', 'Media'],
    features: ['Video and media section', 'Publishing workflow', 'Content updates', 'Production deployment'],
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const website = await getHomepageContent();
  const managed = website.projects.find((item) => item.slug === slug && item.active);
  const original = projects[slug];
  const project: Project | undefined = managed ? {
    ...(original || { repo: '', stack: [], features: [] }),
    image: managed.image || original?.image || '',
    title: managed.name,
    type: managed.type,
    intro: managed.text,
    live: managed.live || undefined,
    repo: original?.repo || '',
    stack: original?.stack || [],
    features: original?.features || [],
  } : original;
  if (!project) notFound();

  return (
    <>
      <SiteNav />
      <main className="case wrap">
        <Link href="/#work" className="back-link">Back to selected work</Link>
        <div className="case-hero">
          <div>
            <p className="section-label">CASE STUDY / {project.type.toUpperCase()}</p>
            <h1>{project.title}</h1>
            <p className="case-intro">{project.intro}</p>
            <div className="hero-actions">
              {project.live && <a className="button button-dark" href={project.live} target="_blank" rel="noreferrer">Visit live website</a>}
              {project.repo && <a className="button button-light" href={project.repo} target="_blank" rel="noreferrer">View GitHub</a>}
              <a className="button button-light" href="mailto:officialsafebase@gmail.com?subject=Project%20enquiry%20for%20MifiTech">Discuss a project</a>
            </div>
          </div>
          <div className="case-preview" role="img" aria-label={project.title + ' project preview'} style={{ backgroundImage: 'url("' + project.image + '")' }} />
        </div>
        {project.stack.length > 0 && <section className="case-section"><p className="section-label">THE STACK</p><h2>Technology</h2><div className="tag-row-new">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></section>}
        {project.features.length > 0 && <section className="case-section"><p className="section-label">PROJECT SCOPE</p><h2>What&apos;s included</h2><div className="facts">{project.features.map((item, index) => <div className="fact" key={item}><small>{String(index + 1).padStart(2, '0')}</small><strong>{item}</strong></div>)}</div></section>}
        <section className="case-section case-cta"><div><p className="section-label">YOUR NEXT BUILD</p><h2>Have a project in mind?</h2></div><div className="hero-actions"><a className="button button-dark" href="/#contact">Start a conversation</a></div></section>
      </main>
      <footer className="footer"><div className="wrap footer-main"><Link href="/" className="footer-brand"><span className="brand-mark">M</span><span>MifiTech<span className="brand-period">.</span></span></Link><p>Thoughtful websites. Useful digital products.</p><div className="footer-links"><Link href="/">Back home</Link><Link href="/#showcase">Website demos</Link><a href="mailto:officialsafebase@gmail.com">Email</a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span>DESIGNED WITH INTENTION. BUILT FOR BUSINESS.</span></div></footer>
    </>
  );
}
