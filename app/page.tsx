import Link from 'next/link';
import Image from 'next/image';
import SiteNav from './components/SiteNav';
import ContactForm from './components/ContactForm';

const featured = [
  {
    number: '01',
    slug: 'ludo-live',
    image: '/previews/ludo-live.svg',
    title: 'Ludo Live',
    type: 'Multiplayer Gaming Platform',
    desc: 'A real-time multiplayer game with missions, tournaments, shop systems and player-facing experiences.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Railway'],
  },
  {
    number: '02',
    slug: 'ehealthcare',
    image: '/previews/ehealthcare.svg',
    title: 'eHealthcare',
    type: 'Healthcare Platform',
    desc: 'A digital healthcare experience focused on clear patient, appointment and care workflows.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    number: '03',
    slug: 'garrison-market',
    image: '/previews/garrison-market.svg',
    title: 'Garrison Market',
    type: 'Inventory & Business Management',
    desc: 'A business operations app for shop owners and staff to manage inventory, staff, sales and daily operations.',
    tags: ['Next.js', 'TypeScript', 'Database'],
    live: 'https://gmstock.co',
  },
  {
    number: '04',
    slug: 'the-africa-plug',
    image: '/previews/the-africa-plug.svg',
    title: 'The African Plug',
    type: 'Media & Content Platform',
    desc: 'A media platform built around video, publishing and content updates for a modern audience.',
    tags: ['Next.js', 'TypeScript', 'Media'],
  },
];

const others = [
  ['Security Assessment Platform', 'Security & Risk Analysis', 'Security assessment and reporting project.', 'https://github.com/MrDan001/security-assessment-platform'],
  ['Banking System', 'Financial Management', 'Banking workflows around accounts, transactions and user roles.', 'https://github.com/MrDan001/Banking-System'],
  ['one-drop', 'Productivity & Utilities', 'A focused utility project from the GitHub shelf.', 'https://github.com/MrDan001/one-drop'],
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.53 2 12.14c0 4.48 2.86 8.27 6.83 9.61.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.2-3.37-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.31.1-2.72 0 0 .83-.27 2.75 1.05a9.2 9.2 0 0 1 5 0c1.92-1.32 2.75-1.05 2.75-1.05.54 1.41.2 2.46.1 2.72.63.72 1.02 1.63 1.02 2.75 0 3.92-2.35 4.78-4.58 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.6.69.49A10.1 10.1 0 0 0 22 12.14C22 6.53 17.52 2 12 2Z" />
    </svg>
  );
}

const email = 'officialsafebase@gmail.com';
const mailto = 'mailto:officialsafebase@gmail.com?subject=Project%20Inquiry%20for%20Mifitech';

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="new-hero">
          <div className="wrap hero-grid-new">
            <div className="hero-copy-new">
              <div className="hero-kicker"><span className="kicker-dot" /> AVAILABLE FOR SELECT PROJECTS</div>
              <p className="hero-mini">FULL-STACK DEVELOPER · PRODUCT BUILDER</p>
              <h1>I turn ideas into <span>products people can use.</span></h1>
              <p className="hero-lead">From multiplayer platforms to business systems, healthcare experiences and media products, I build the interface, logic and infrastructure behind useful digital products.</p>
              <div className="hero-actions-new">
                <a className="button button-primary" href="#work">Explore selected work <ArrowIcon /></a>
                <a className="button button-secondary" href={mailto}>Start a conversation</a>
              </div>
              <div className="hero-metrics">
                <div><strong>04</strong><span>Featured products</span></div>
                <div><strong>09+</strong><span>Projects & experiments</span></div>
                <div><strong>01</strong><span>Builder mindset</span></div>
              </div>
            </div>

            <div className="portrait-stage">
              <div className="portrait-glow" />
              <div className="portrait-frame">
                <Image src="/profile.jpg" alt="Mifitech profile photo" fill priority sizes="(max-width: 800px) 100vw, 42vw" />
              </div>
              <div className="portrait-label">
                <span className="portrait-label-top">MIFITECH</span>
                <strong>Build. Solve. Make an impact.</strong>
                <small>Full-stack development / product engineering</small>
              </div>
              <div className="floating-chip chip-one">Next.js</div>
              <div className="floating-chip chip-two">TypeScript</div>
              <div className="floating-chip chip-three">PostgreSQL</div>
            </div>
          </div>
        </section>

        <section id="work" className="section-new">
          <div className="wrap">
            <div className="section-title-row">
              <div>
                <p className="section-eyebrow">SELECTED WORK</p>
                <h2>Products with a purpose.</h2>
                <p>Real products, systems and experiments I&apos;ve built—not concept shots.</p>
              </div>
              <a className="text-link" href="https://github.com/MrDan001" target="_blank" rel="noreferrer">View GitHub <ArrowIcon /></a>
            </div>

            <div className="work-grid-new">
              {featured.map((project) => (
                <article className="work-card-new" key={project.slug}>
                  <Link href={'/projects/' + project.slug} className="work-media-new" aria-label={'Open ' + project.title + ' case study'}>
                    <Image src={project.image} alt={project.title + ' project preview'} fill sizes="(max-width: 800px) 100vw, 44vw" />
                    <span className="work-number">{project.number}</span>
                    <span className="work-open">Open case study <ArrowIcon /></span>
                  </Link>
                  <div className="work-body-new">
                    <div className="work-heading">
                      <div>
                        <p className="work-type-new">{project.type}</p>
                        <h3>{project.title}</h3>
                      </div>
                      <Link className="round-link" href={'/projects/' + project.slug} aria-label={'View ' + project.title}>↗</Link>
                    </div>
                    <p className="work-desc-new">{project.desc}</p>
                    <div className="tag-row-new">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="work-footer">
                      {project.live ? <a href={project.live} target="_blank" rel="noreferrer" className="inline-live">Live website <ArrowIcon /></a> : <span className="inline-muted">Project case study</span>}
                      <Link href={'/projects/' + project.slug} className="inline-case">Explore <ArrowIcon /></Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="statement-section">
          <div className="wrap statement-grid">
            <div className="statement-mark">01</div>
            <div>
              <p className="section-eyebrow">HOW I BUILD</p>
              <h2>Good software should feel <em>obvious.</em></h2>
              <p className="statement-copy">I care about clean interfaces, dependable systems and the little details that make a product easier to trust. The stack matters, but the outcome matters more.</p>
            </div>
            <div className="principles">
              <div><strong>01</strong><span>Start with the problem</span></div>
              <div><strong>02</strong><span>Build the smallest useful system</span></div>
              <div><strong>03</strong><span>Ship, learn, improve</span></div>
            </div>
          </div>
        </section>

        <section className="shelf-section-new">
          <div className="wrap">
            <div className="section-title-row compact">
              <div>
                <p className="section-eyebrow">MORE WORK</p>
                <h2>From the GitHub shelf.</h2>
              </div>
              <a className="text-link" href="https://github.com/MrDan001" target="_blank" rel="noreferrer">Browse repositories <ArrowIcon /></a>
            </div>
            <div className="shelf-grid-new">
              {others.map((item, index) => (
                <a href={item[3]} target="_blank" rel="noreferrer" className="shelf-card-new" key={item[0]}>
                  <span className="shelf-index">0{index + 1}</span>
                  <span className="shelf-content"><small>{item[1]}</small><strong>{item[0]}</strong><em>{item[2]}</em></span>
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section-new">
          <div className="wrap about-grid-new">
            <div>
              <p className="section-eyebrow">ABOUT MIFITECH</p>
              <h2>Engineering with a builder&apos;s mindset.</h2>
              <p className="about-lead">I enjoy taking something from a blank page to a working product. That means thinking through the user experience, building the frontend, shaping the backend, connecting data and getting the whole thing into production.</p>
              <a className="text-link" href="#contact">Talk about your project <ArrowIcon /></a>
            </div>
            <div className="capability-grid">
              <div><span>01</span><strong>Frontend</strong><p>Responsive interfaces and product UI.</p></div>
              <div><span>02</span><strong>Backend</strong><p>APIs, business logic and integrations.</p></div>
              <div><span>03</span><strong>Data</strong><p>Database design, auth and workflows.</p></div>
              <div><span>04</span><strong>Delivery</strong><p>Deployment, debugging and iteration.</p></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section-new">
          <div className="wrap contact-grid-new">
            <div>
              <p className="section-eyebrow">LET&apos;S BUILD</p>
              <h2>Have an idea?<br /><span>Let&apos;s make it real.</span></h2>
              <p className="contact-lead">Tell me what you&apos;re trying to build, who it&apos;s for and what success looks like. I&apos;ll use the brief to understand the project before we talk next steps.</p>
              <a className="contact-email-new" href={mailto}>{email} <ArrowIcon /></a>
            </div>
            <div className="contact-form-new">
              <div className="form-heading-new"><span>PROJECT INQUIRY</span><span>Available for select builds</span></div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="new-footer">
        <div className="wrap footer-new-inner">
          <div><strong>Mifi<span>.</span></strong><small>Full-stack developer · Product builder</small></div>
          <div className="footer-new-links"><a href="https://github.com/MrDan001" target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a><a href={mailto}>Email ↗</a></div>
        </div>
      </footer>
    </>
  );
}
