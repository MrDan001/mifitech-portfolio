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
    desc: 'A real-time multiplayer game platform with game modes, missions, tournaments, shop systems, admin tools and player-facing experiences.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Railway'],
  },
  {
    slug: 'ehealthcare',
    image: '/previews/ehealthcare.svg',
    title: 'eHealthcare',
    type: 'Healthcare Platform',
    desc: 'A modern healthcare product focused on making healthcare services and information more accessible through a digital experience.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    slug: 'garrison-market',
    image: '/previews/garrison-market.svg',
    title: 'Garrison Market',
    type: 'Inventory & Business Management',
    desc: 'A business operations app for shop owners and staff to manage inventory, staff, sales and day-to-day operations from one place.',
    tags: ['Next.js', 'TypeScript', 'Database'],
  },
  {
    slug: 'the-africa-plug',
    image: '/previews/the-africa-plug.svg',
    title: 'The African Plug',
    type: 'Media & Content Platform',
    desc: 'A content platform built around media, video and publishing workflows, with production deployment and content updates.',
    tags: ['Next.js', 'TypeScript', 'Media'],
  },
];

const others = [
  { name: 'Security Assessment Platform', href: 'https://github.com/MrDan001/security-assessment-platform' },
  { name: 'Banking System', href: 'https://github.com/MrDan001/Banking-System' },
  { name: 'one-drop', href: 'https://github.com/MrDan001/one-drop' },
];

const email = 'officialsafebase@gmail.com';

export default function Home() {
  return (
    <>
      <SiteNav />

      <main>
        <section className="hero wrap">
          <div>
            <div className="eyebrow">FULL-STACK DEVELOPER · PRODUCT BUILDER</div>
            <h1>I build <em>real products,</em> not just demos.</h1>
            <p>
              I turn ideas into working web applications, build practical systems,
              and take products from code to production.
            </p>
            <div className="actions">
              <a className="btn primary" href="#work">View my work →</a>
              <a className="btn" href="#contact">Start a project</a>
            </div>
          </div>

          <div className="hero-art">
            <div className="eyebrow">BUILD / DEPLOY / IMPROVE</div>
            <div className="code">
              $ <span className="c">npm</span> run build
              <br /><br />
              ✓ compiled successfully
              <br />
              ✓ production ready
              <br /><br />
              $ <span className="c">git</span> push origin main
              <br /><br />
              → deployment triggered
              <br />
              → product goes live
            </div>
          </div>
        </section>

        <div className="wrap statbar">
          <div className="stat"><strong>4+</strong><span>Featured products</span></div>
          <div className="stat"><strong>14</strong><span>GitHub repositories found</span></div>
          <div className="stat"><strong>1</strong><span>Developer focused on real solutions</span></div>
        </div>

        <section id="work" className="section wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">SELECTED WORK</div>
              <h2>Products worth showing.</h2>
            </div>
            <p>
              Start with the products. Open a case study to see the build, scope and source.
            </p>
          </div>

          <div className="grid">
            {featured.map((project) => (
              <Link className="card" key={project.slug} href={`/projects/${project.slug}`}>
                <div className="project-image">
                  <Image
                    src={project.image}
                    alt={`${project.title} product preview`}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                  />
                  <span className="preview-badge">PRODUCT PREVIEW</span>
                </div>
                <div className="card-copy">
                  <h3>{project.title}</h3>
                  <p>
                    <b className="card-type">{project.type}</b>
                    <br />
                    {project.desc}
                  </p>
                  <div className="tags">
                    {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                  </div>
                  <span className="card-link">View case study →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">OTHER WORK</div>
              <h2>More from the GitHub shelf.</h2>
            </div>
            <p>Smaller projects are still accessible with one tap.</p>
          </div>

          <div className="work-links">
            {others.map((project) => (
              <a
                className="work-link"
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{project.name}</span>
                <span className="work-link-arrow">↗</span>
              </a>
            ))}
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
              <h2>Tell me what you’re trying to build.</h2>
              <p>
                Give me the idea, the outcome you want, and the stage you’re at.
                I’ll use the brief to understand the project before we talk next steps.
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
          <span>© 2026 Mifitech · Full-stack developer</span>
          <a href={`mailto:${email}`}>{email} ↗</a>
        </div>
      </footer>
    </>
  );
}
