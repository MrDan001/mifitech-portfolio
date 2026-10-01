import Link from 'next/link';
import SiteNav from './components/SiteNav';

const featured = [
  {
    slug: 'ludo-live',
    icon: '🎲',
    title: 'Ludo Live',
    type: 'Multiplayer Gaming Platform',
    desc: 'A real-time multiplayer game platform with game modes, missions, tournaments, shop systems, admin tools and player-facing experiences.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Railway'],
  },
  {
    slug: 'ehealthcare',
    icon: '🩺',
    title: 'eHealthcare',
    type: 'Healthcare Platform',
    desc: 'A modern healthcare product focused on making healthcare services and information more accessible through a digital experience.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    slug: 'garrison-market',
    icon: '📦',
    title: 'Garrison Market',
    type: 'Inventory & Business Management',
    desc: 'A business operations app for shop owners and staff to manage inventory, staff, sales and day-to-day operations from one place.',
    tags: ['Next.js', 'TypeScript', 'Database'],
  },
  {
    slug: 'the-africa-plug',
    icon: '▶',
    title: 'The African Plug',
    type: 'Media & Content Platform',
    desc: 'A content platform built around media, video and publishing workflows, with production deployment and content updates.',
    tags: ['Next.js', 'TypeScript', 'Media'],
  },
];

const others = [
  { name: 'Security Assessment Platform', href: 'https://github.com/MrDan001/security-assessment-platform' },
  { name: 'GURU-Ai', href: 'https://github.com/MrDan001/GURU-Ai' },
  { name: 'VAJIRA-MD-NEW', href: 'https://github.com/search?q=user%3AMrDan001+VAJIRA-MD-NEW&type=repositories' },
  { name: 'BMW-MD', href: 'https://github.com/search?q=user%3AMrDan001+BMW-MD&type=repositories' },
  { name: 'NORMAL-BOT', href: 'https://github.com/MrDan001/NORMAL-BOT' },
  { name: 'Levanter', href: 'https://github.com/MrDan001/levanter' },
  { name: 'Suhail-Md-Media', href: 'https://github.com/MrDan001/Suhail-Md-Media' },
  { name: 'ReverseKing', href: 'https://github.com/MrDan001/ReverseKing' },
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
              <a className="btn" href="#contact">Contact me</a>
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
              Real products first, then smaller experiments and supporting work
              with direct links to the code.
            </p>
          </div>

          <div className="grid">
            {featured.map((project) => (
              <Link className="card" key={project.slug} href={`/projects/${project.slug}`}>
                <div className="icon">{project.icon}</div>
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
            <p>Every project here is now a real link instead of a decorative label.</p>
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
              <div className="eyebrow">GET IN TOUCH</div>
              <h2>Have an idea? Let&apos;s turn it into something real.</h2>
              <p>
                Whether it&apos;s a product, a business system, a collaboration or a
                technical build, email me directly and I&apos;ll get back to you.
              </p>
              <div className="contact-actions">
                <a className="btn primary contact-cta" href={`mailto:${email}?subject=Project%20Inquiry%20for%20Mifitech`}>
                  Send me an email ↗
                </a>
                <a className="btn" href="https://github.com/MrDan001" target="_blank" rel="noreferrer">
                  View GitHub ↗
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-top">
                <span className="contact-status"><span className="status-dot" /> OPEN TO PROJECTS</span>
                <span className="contact-arrow">↗</span>
              </div>
              <span className="contact-label">EMAIL</span>
              <a className="contact-email" href={`mailto:${email}?subject=Project%20Inquiry%20for%20Mifitech`}>
                {email}
              </a>
              <span className="contact-note">
                Tap the address to open your email app with a ready-to-send project inquiry.
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <span>© 2026 Mifitech · Full-stack developer</span>
          <a href="mailto:officialsafebase@gmail.com">officialsafebase@gmail.com ↗</a>
        </div>
      </footer>
    </>
  );
}
