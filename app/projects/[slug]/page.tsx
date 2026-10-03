import Link from 'next/link';
import Image from 'next/image';
import SiteNav from '../../components/SiteNav';

const projects: Record<string, {
  image: string;
  title: string;
  type: string;
  intro: string;
  repo: string;
  live?: string;
  stack: string[];
  features: string[];
}> = {
  'ludo-live': {
    image: '/previews/ludo-live.svg',
    title: 'Ludo Live',
    type: 'Multiplayer Gaming Platform',
    intro: 'A production multiplayer game platform with player experiences and a substantial admin/product ecosystem.',
    repo: 'https://github.com/MrDan001/ludo-live',
    live: 'https://ludo-live.up.railway.app',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Railway'],
    features: [
      'Multiplayer game experiences',
      'Missions and reward systems',
      'Tournament and admin tooling',
      'Player shop and inventory systems',
      'Player audit and transaction visibility',
      'Production deployment and debugging',
    ],
  },
  'ehealthcare': {
    image: '/previews/ehealthcare.svg',
    title: 'eHealthcare',
    type: 'Healthcare Platform',
    intro: 'A healthcare-focused digital product represented in the portfolio with repository-backed project information.',
    repo: 'https://github.com/MrDan001/ehealthcare-system',
    live: 'https://ehealthcare-system-g81n5o9i5-mifi-tech.vercel.app',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    features: [
      'Healthcare-focused digital experience',
      'Service and information workflows',
      'Product UI and system design',
      'Repository-backed project documentation',
    ],
  },
  'garrison-market': {
    image: '/previews/garrison-market.svg',
    title: 'Garrison Market',
    type: 'Inventory & Business Management',
    intro: 'A business operations app for shop owners and staff to manage inventory, staff, sales and day-to-day operations from one place.',
    repo: 'https://github.com/MrDan001/garrison-market',
    live: 'https://gmstock.co',
    stack: ['Next.js', 'TypeScript', 'Database'],
    features: [
      'Inventory management',
      'Staff operations',
      'Sales workflows',
      'Day-to-day business management',
      'Single-place operational view',
    ],
  },
  'the-africa-plug': {
    image: '/previews/the-africa-plug.svg',
    title: 'The African Plug',
    type: 'Media & Content Platform',
    intro: 'A content platform focused on media and publishing, including video content and production content updates.',
    repo: 'https://github.com/MrDan001/the-africa-plug',
    live: 'https://the-africa-plug-2g1gc0rli-mifi-tech.vercel.app',
    stack: ['Next.js', 'TypeScript', 'Media'],
    features: [
      'Video and media section',
      'Publishing workflow',
      'Content updates',
      'Production deployment',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return null;
  }

  return (
    <>
      <SiteNav />

      <main className="case wrap">
        <Link href="/#work" className="back-link">← Back to projects</Link>

        <div className="case-hero">
          <div>
            <div className="eyebrow">CASE STUDY · {project.type.toUpperCase()}</div>
            <h1>{project.title}</h1>
            <p className="case-intro">{project.intro}</p>
            <div className="actions">
              {project.live && <a className="btn primary" href={project.live} target="_blank" rel="noreferrer">Live Website ↗</a>}
              <a className="btn" href={project.repo} target="_blank" rel="noreferrer">
                View GitHub ↗
              </a>
              <a className="btn" href="mailto:officialsafebase@gmail.com?subject=Project%20Inquiry%20for%20Mifitech">
                Discuss a project
              </a>
            </div>
          </div>

          <div className="case-preview">
            <Image src={project.image} alt={`${project.title} preview`} fill sizes="(max-width: 800px) 100vw, 45vw" />
          </div>
        </div>

        <section className="case-section">
          <div className="eyebrow">STACK</div>
          <h2>Technology</h2>
          <div className="tags">
            {project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}
          </div>
        </section>

        <section className="case-section">
          <div className="eyebrow">SCOPE</div>
          <h2>What&apos;s here</h2>
          <div className="facts">
            {project.features.map((item, index) => (
              <div className="fact" key={item}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section case-cta">
          <div>
            <div className="eyebrow">KEEP EXPLORING</div>
            <h2>See the source or start a conversation.</h2>
          </div>
          <div className="actions">
            {project.live && <a className="btn primary" href={project.live} target="_blank" rel="noreferrer">Visit live website ↗</a>}
            <a className="btn" href={project.repo} target="_blank" rel="noreferrer">Open repository ↗</a>
            <a className="btn" href="mailto:officialsafebase@gmail.com?subject=Project%20Inquiry%20for%20Mifitech">Email Mifitech ↗</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <span>© 2026 Mifitech · Full-stack developer</span>
          <Link href="/">Back home</Link>
        </div>
      </footer>
    </>
  );
}
