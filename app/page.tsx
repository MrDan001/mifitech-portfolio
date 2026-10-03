import Link from 'next/link';
import Image from 'next/image';
import SiteNav from './components/SiteNav';
import ContactForm from './components/ContactForm';

const featured = [
  {
    slug: 'ludo-live',
    image: '/previews/ludo-live.svg',
    title: 'Ludo Live',
    type: 'Multiplayer Gaming Platform',
    desc: 'A real-time multiplayer game with missions, tournaments, shop systems and player-facing experiences.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    accent: 'ludo',
  },
  {
    slug: 'ehealthcare',
    image: '/previews/ehealthcare.svg',
    title: 'eHealthcare',
    type: 'Healthcare Platform',
    desc: 'A digital healthcare experience focused on clear patient, appointment and care workflows.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    accent: 'health',
  },
  {
    slug: 'garrison-market',
    image: '/previews/garrison-market.svg',
    title: 'Garrison Market',
    type: 'Inventory & Business Management',
    desc: 'A business operations app for shop owners and staff to manage inventory, staff, sales and daily operations.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Database'],
    live: 'https://gmstock.co',
    liveLabel: 'Live Website',
    accent: 'market',
  },
  {
    slug: 'the-africa-plug',
    image: '/previews/the-africa-plug.svg',
    title: 'The African Plug',
    type: 'Media & Content Platform',
    desc: 'A media platform built around video, publishing and content updates for a modern audience.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Media'],
    accent: 'africa',
  },
];

const others = [
  {
    name: 'Security Assessment Platform',
    type: 'Security & Risk Analysis',
    desc: 'Security assessment and reporting project.',
    href: 'https://github.com/MrDan001/security-assessment-platform',
    accent: 'security',
  },
  {
    name: 'Banking System',
    type: 'Financial Management',
    desc: 'Banking workflows around accounts, transactions and user roles.',
    href: 'https://github.com/MrDan001/Banking-System',
    accent: 'bank',
  },
  {
    name: 'one-drop',
    type: 'Productivity & Utilities',
    desc: 'A focused utility project from the GitHub shelf.',
    href: 'https://github.com/MrDan001/one-drop',
    accent: 'drop',
  },
];

const email = 'officialsafebase@gmail.com';
const mailto = 'mailto:officialsafebase@gmail.com?subject=Project%20Inquiry%20for%20Mifitech';

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.53 2 12.14c0 4.48 2.86 8.27 6.83 9.61.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.2-3.37-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.31.1-2.72 0 0 .83-.27 2.75 1.05a9.2 9.2 0 0 1 5 0c1.92-1.32 2.75-1.05 2.75-1.05.54 1.41.2 2.46.1 2.72.63.72 1.02 1.63 1.02 2.75 0 3.92-2.35 4.78-4.58 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.6.69.49A10.1 10.1 0 0 0 22 12.14C22 6.53 17.52 2 12 2Z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.75 5.5h16.5A1.75 1.75 0 0 1 22 7.25v9.5a1.75 1.75 0 0 1-1.75 1.75H3.75A1.75 1.75 0 0 1 2 16.75v-9.5A1.75 1.75 0 0 1 3.75 5.5Zm.2 2.1 7.41 5.3a1.1 1.1 0 0 0 1.28 0l7.41-5.3-.87-1.2-7.18 5.14-7.18-5.14-.87 1.2Z"/>
    </svg>
  );
}

function ShelfIcon({ type }: { type: string }) {
  if (type === 'security') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 4 39 10v11c0 10-6.4 18-15 23-8.6-5-15-13-15-23V10l15-6Z" fill="currentColor" opacity=".2"/>
        <path d="M24 7 36 12v9c0 8.1-4.8 14.7-12 19-7.2-4.3-12-10.9-12-19v-9l12-5Z" fill="none" stroke="currentColor" strokeWidth="2.4"/>
        <path d="m18.5 24 3.7 3.8 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === 'bank') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="m7 18 17-10 17 10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round"/>
        <path d="M10 20h28M11 39h26M14 21v15M22 21v15M30 21v15M38 21v15" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 7c5.8 7.3 11.5 12.4 11.5 19.1A11.5 11.5 0 1 1 13 26.1C13 19.4 18.2 14.7 24 7Z" fill="currentColor" opacity=".22"/>
      <path d="M24 7c5.8 7.3 11.5 12.4 11.5 19.1A11.5 11.5 0 1 1 13 26.1C13 19.4 18.2 14.7 24 7Z" fill="none" stroke="currentColor" strokeWidth="2.4"/>
      <path d="M17 31c2.7 3 6.3 4.4 10.7 3.9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <SiteNav />

      <main>
        <section className="hero">
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">FULL-STACK DEVELOPER</div>
              <h1>I build <em>real products,</em><br />not just demos.</h1>
              <p>
                I&apos;m a full-stack developer who turns ideas into powerful, scalable applications.
                I build modern web and mobile solutions — from gaming platforms to business tools,
                healthcare systems and media products.
              </p>
              <div className="actions hero-actions">
                <a className="btn primary" href="#work">View My Projects <span>→</span></a>
                <a className="btn" href={mailto}><MailIcon />Contact Me</a>
              </div>
            </div>

            <div className="hero-art">
              <Image
                src="/previews/hero-workspace.svg"
                alt="Modern developer workspace with laptop and mobile product interface"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 55vw"
              />
            </div>
          </div>
        </section>

        <section id="work" className="section wrap">
          <div className="section-head featured-head">
            <div>
              <div className="eyebrow">FEATURED PROJECTS</div>
              <h2>Real products. Real impact.</h2>
              <p>Featured products I&apos;ve built and shipped. Click to explore, view live and read the case studies.</p>
            </div>
            <a className="section-action" href="https://github.com/MrDan001" target="_blank" rel="noreferrer">
              View All Projects <span>→</span>
            </a>
          </div>

          <div className="project-grid">
            {featured.map((project) => (
              <article className={`project-card project-${project.accent}`} key={project.slug}>
                <Link href={`/projects/${project.slug}`} className="project-media-link" aria-label={`Open ${project.title} case study`}>
                  <div className="project-media">
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="(max-width: 800px) 100vw, 25vw"
                    />
                    <span className="live-badge">● LIVE</span>
                  </div>
                </Link>

                <div className="project-copy">
                  <div className="project-title-row">
                    <div>
                      <h3>{project.title}</h3>
                      <div className="project-type">{project.type}</div>
                    </div>
                    <Link className="round-arrow" href={`/projects/${project.slug}`} aria-label={`Open ${project.title} case study`}>↗</Link>
                  </div>

                  <p>{project.desc}</p>

                  <div className="tags">
                    {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                  </div>

                  <div className="card-actions">
                    {project.live ? (
                      <a className="card-btn primary" href={project.live} target="_blank" rel="noreferrer">{project.liveLabel} ↗</a>
                    ) : null}
                    <a className={`card-btn ${project.live ? '' : 'primary'}`} href={
                      project.slug === 'ludo-live'
                        ? 'https://github.com/MrDan001/ludo-live'
                        : project.slug === 'ehealthcare'
                          ? 'https://github.com/MrDan001/ehealthcare-system'
                          : project.slug === 'garrison-market'
                            ? 'https://github.com/MrDan001/garrison-market'
                            : 'https://github.com/MrDan001/the-africa-plug'
                    } target="_blank" rel="noreferrer">
                      <GithubIcon /> GitHub ↗
                    </a>
                    <Link className="card-btn" href={`/projects/${project.slug}`}>Case Study →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section wrap shelf-section">
          <div className="github-shelf">
            <div className="shelf-head">
              <div className="shelf-brand">
                <span className="shelf-github"><GithubIcon /></span>
                <div>
                  <h3>More from the GitHub shelf</h3>
                  <p>Additional projects, experiments and open-source work.</p>
                </div>
              </div>
              <a className="section-action" href="https://github.com/MrDan001" target="_blank" rel="noreferrer">
                View All on GitHub <span>→</span>
              </a>
            </div>

            <div className="shelf-grid">
              {others.map((project) => (
                <a
                  className={`shelf-card shelf-${project.accent}`}
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="shelf-icon"><ShelfIcon type={project.accent} /></span>
                  <span className="shelf-copy">
                    <strong>{project.name}</strong>
                    <b>{project.type}</b>
                    <small>{project.desc}</small>
                    <em>GitHub ↗</em>
                  </span>
                  <span className="shelf-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section wrap">
          <div className="about">
            <div className="panel">
              <div className="eyebrow">ABOUT</div>
              <h2>Turning ideas into working products.</h2>
              <p>
                I like building things that have a purpose: games, business tools,
                healthcare systems, media products and developer-focused experiments.
                The goal is not to collect technologies; it is to turn a problem into
                something people can actually use.
              </p>
            </div>

            <div className="panel">
              <h3>Core capabilities</h3>
              <div className="skills">
                <div className="skill">Frontend development</div>
                <div className="skill">Backend &amp; APIs</div>
                <div className="skill">Database systems</div>
                <div className="skill">Authentication</div>
                <div className="skill">Production deployment</div>
                <div className="skill">Debugging &amp; iteration</div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section wrap">
          <div className="contact-shell">
            <div className="contact-copy">
              <div className="eyebrow">START A PROJECT</div>
              <h2>Tell me what you&apos;re trying to build.</h2>
              <p>
                Give me the idea, the outcome you want, and the stage you&apos;re at.
                I&apos;ll use the brief to understand the project before we talk next steps.
              </p>
              <div className="contact-mini">
                <span>Direct email</span>
                <a href={`mailto:${email}`}>{email} ↗</a>
              </div>
              <div className="contact-note-card">
                <span className="contact-note-icon">01</span>
                <div>
                  <strong>Be specific</strong>
                  <p>Features, audience, timeline and expectations help me understand the build.</p>
                </div>
              </div>
            </div>

            <div className="contact-card form-card">
              <div className="contact-card-top">
                <span className="contact-status"><span className="status-dot" /> PROJECT INQUIRY</span>
                <span className="contact-arrow">↗</span>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <strong>Mifi<span>.</span></strong>
            <span>Build · Solve · Make an Impact</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/MrDan001" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={`mailto:${email}`} aria-label="Email"><MailIcon /></a>
            <a className="footer-email" href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
