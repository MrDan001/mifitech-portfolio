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

const profilePhoto = 'data:image/jpeg;base64,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';
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
                <img className="portrait-photo" src={profilePhoto} alt="Mifitech profile photo" />
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
