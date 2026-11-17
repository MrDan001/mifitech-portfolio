import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import { getSiteContent } from '@/lib/site-content';
import { SITE_URL } from '@/lib/contact';
import { projectPath } from '@/lib/project-slug';

export const metadata: Metadata = {
  title: { absolute: 'About MifiTech | Digital Solutions & Web Development' },
  description: 'Learn about MifiTech, a digital solutions company delivering business websites, ecommerce, custom web applications and ongoing website management for organisations worldwide.',
  alternates: { canonical: new URL('/about', SITE_URL).toString() },
  openGraph: {
    title: 'About MifiTech | Digital Solutions & Web Development',
    description: 'MifiTech helps organisations build, improve and manage useful digital experiences.',
    url: new URL('/about', SITE_URL).toString(),
    type: 'website',
  },
};

const services = [
  { title: 'Business website design', body: 'Responsive, accessible websites that explain an organisation’s services, communicate credibility and make it easy for customers to take the next step.' },
  { title: 'Ecommerce development', body: 'Online stores with product discovery, ordering journeys and practical tools for presenting and selling products.' },
  { title: 'Custom web applications', body: 'Purpose-built platforms, dashboards and business tools shaped around real workflows, users and operational requirements.' },
  { title: 'Website management & support', body: 'Ongoing content updates, maintenance, performance checks, security-conscious improvements and technical support.' },
  { title: 'Search visibility & SEO', body: 'Technical foundations, structured content and practical search optimisation that help people discover the right services.' },
  { title: 'Integrations & infrastructure', body: 'API connections, databases, forms, payments and deployment workflows that help digital products work together.' },
];

export default async function AboutPage() {
  const content = await getSiteContent();
  const projects = content.projects.filter((project) => project.visible !== false);
  const email = content.sections.contact.email;

  return (
    <div className="studio-shell">
      <SiteNav items={[...content.navigation, { label: 'About MifiTech', href: '/about' }]} />
      <main className="case wrap" style={{ paddingTop: 'clamp(3rem, 8vw, 7rem)', paddingBottom: '5rem' }}>
        <header className="case-hero">
          <div>
            <p className="section-label">ABOUT MIFITECH / DIGITAL SOLUTIONS</p>
            <h1>A digital solutions company built around the way businesses work.</h1>
            <p className="case-intro">MifiTech helps organisations establish, improve and manage their digital presence through business websites, ecommerce platforms, custom web applications and ongoing technical support. We work with a global outlook, shaping each solution around its audience, goals and day-to-day needs.</p>
          </div>
        </header>

        <section className="case-section">
          <p className="section-label">COMPANY OVERVIEW</p>
          <h2>Practical technology. Thoughtful delivery.</h2>
          <p>MifiTech brings design, development and technical problem-solving together to deliver digital experiences that are clear to use and useful to the organisation behind them. Work can range from a focused business website to a connected application with accounts, databases, payments and operational workflows.</p>
          <p>Our approach is collaborative and delivery-led: understand the requirement, agree the scope, build carefully, test important journeys and provide support as the product evolves. We pay particular attention to mobile usability, performance, accessibility, maintainability and clear communication.</p>
        </section>

        <section className="case-section">
          <p className="section-label">OUR MISSION</p>
          <h2>Make useful digital tools accessible to more businesses.</h2>
          <p>Our mission is to help organisations use the web and software with confidence—whether that means reaching customers, simplifying an internal process, taking enquiries online or managing a digital product over time.</p>
        </section>

        <section className="case-section">
          <p className="section-label">SERVICES & CAPABILITIES</p>
          <h2>One partner for building and improving digital services.</h2>
          <div className="case-study-grid">
            {services.map((service) => <div key={service.title}><h3>{service.title}</h3><p>{service.body}</p></div>)}
          </div>
        </section>

        <section className="case-section">
          <p className="section-label">DELIVERY APPROACH</p>
          <h2>Clear scope. Careful build. Ongoing improvement.</h2>
          <ol>
            <li><strong>Understand the goal.</strong> We clarify the audience, business need and what the solution should achieve.</li>
            <li><strong>Plan the experience.</strong> We agree the structure, content, features, responsibilities and project scope before development.</li>
            <li><strong>Build and test.</strong> We develop the agreed solution and check its key journeys across devices and screen sizes.</li>
            <li><strong>Launch and support.</strong> We prepare the project for release and can continue with maintenance, updates and improvements.</li>
          </ol>
        </section>

        {projects.length > 0 && <section className="case-section">
          <p className="section-label">SELECTED PORTFOLIO</p>
          <h2>Explore our digital project work.</h2>
          <p>A selection of websites, platforms and product concepts represented in the MifiTech portfolio.</p>
          <div className="facts">
            {projects.map((project) => <div className="fact" key={project.slug}>
              <div><strong>{project.name}</strong><p>{project.text}</p><Link href={projectPath(project.slug)}>View project details ↗</Link></div>
            </div>)}
          </div>
        </section>}

        <section className="case-section case-cta">
          <div><p className="section-label">WORK WITH MIFITECH</p><h2>Have a website or digital product to build or manage?</h2><p>Tell us about your organisation, what you are working on and the support you need.</p></div>
          <div className="hero-actions"><Link className="button button-dark" href="/#contact">Discuss a project</Link><a className="button button-light" href={'mailto:' + email}>Email MifiTech</a></div>
        </section>
      </main>
      <footer className="footer"><div className="wrap footer-main"><Link href="/" className="footer-brand"><span className="brand-mark">M</span><span>MifiTech<span className="brand-period">.</span></span></Link><p>{content.footer.tagline}</p><div className="footer-links"><Link href="/">Home</Link><Link href="/website-design-nigeria">Website design</Link><Link href="/ecommerce-website-development-nigeria">Ecommerce</Link><Link href="/privacy">Privacy</Link></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span>DIGITAL SOLUTIONS. BUILT FOR BUSINESS.</span></div></footer>
    </div>
  );
}
