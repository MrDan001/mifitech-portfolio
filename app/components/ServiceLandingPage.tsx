import Link from 'next/link';
import SiteNav from './SiteNav';

export type ServicePageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  previewLabel: string;
  previewTitle: string;
  previewText: string;
  outcomes: Array<{ title: string; body: string }>;
  process: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string; description: string }>;
};

export default function ServiceLandingPage({ page }: { page: ServicePageContent }) {
  return (
    <div className="studio-shell">
      <SiteNav />
      <main className="case wrap service-landing">
        <Link href="/#services" className="back-link">Back to services</Link>
        <section className="case-hero">
          <div>
            <p className="section-label">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="case-intro">{page.intro}</p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/#contact">Discuss your project</Link>
              <Link className="button button-light" href="/#demos">Explore website demos</Link>
            </div>
          </div>
          <div className="case-preview service-page-preview">
            <div className="service-preview-card">
              <span>{page.previewLabel}</span>
              <strong>{page.previewTitle}</strong>
              <p>{page.previewText}</p>
              <i>Designed around your business</i>
            </div>
          </div>
        </section>

        <section className="case-section">
          <p className="section-label">WHAT THE PROJECT SHOULD DELIVER</p>
          <h2>Built around what your customers need to do.</h2>
          <div className="facts">
            {page.outcomes.map((item, index) => (
              <div className="fact" key={item.title}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <div><strong>{item.title}</strong><p>{item.body}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section">
          <p className="section-label">A CLEAR WORKING PROCESS</p>
          <h2>From first conversation to launch.</h2>
          <div className="facts">
            {page.process.map((item, index) => (
              <div className="fact" key={item.title}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <div><strong>{item.title}</strong><p>{item.body}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section service-faqs">
          <p className="section-label">COMMON QUESTIONS</p>
          <h2>Before you get started.</h2>
          {page.faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>

        <section className="case-section">
          <p className="section-label">KEEP EXPLORING</p>
          <h2>More from MifiTech.</h2>
          <div className="service-related">
            {page.related.map((item) => (
              <Link href={item.href} key={item.href}>
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="case-section case-cta">
          <div><p className="section-label">YOUR NEXT STEP</p><h2>Tell us what your business needs.</h2></div>
          <div className="hero-actions"><Link className="button button-dark" href="/#contact">Start a project enquiry</Link></div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap footer-main">
          <Link href="/" className="footer-brand"><span className="brand-mark">M</span><span>MifiTech<span className="brand-period">.</span></span></Link>
          <p>Modern websites and digital products for businesses in Nigeria and beyond.</p>
          <div className="footer-links"><Link href="/">Home</Link><Link href="/#services">Services</Link><Link href="/privacy">Privacy</Link><a href="mailto:officialsafebase@gmail.com">Email</a></div>
        </div>
        <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span>DESIGNED WITH INTENTION. BUILT FOR BUSINESS.</span></div>
      </footer>
    </div>
  );
}
