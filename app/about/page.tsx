import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import { getSiteContent } from '@/lib/site-content';
import { SITE_URL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'About MifiTech | Nigerian Website Design & Software Studio',
  description: 'Meet MifiTech, a Nigerian digital studio building business websites, ecommerce stores and custom web applications. Learn about our services, approach and selected projects.',
  alternates: { canonical: new URL('/about', SITE_URL).toString() },
  openGraph: {
    title: 'About MifiTech | Digital Studio in Nigeria',
    description: 'Learn what MifiTech builds, who we serve and how we approach practical digital projects for businesses.',
    url: new URL('/about', SITE_URL).toString(),
    type: 'website',
  },
};

const services = [
  { title: 'Business website design', body: 'Clear, responsive websites that explain what a business offers, build trust and make it easy for customers to get in touch.' },
  { title: 'Ecommerce development', body: 'Online stores with product discovery, ordering journeys and the tools a business needs to present and sell its products.' },
  { title: 'Custom web applications', body: 'Purpose-built platforms and business tools shaped around real workflows, users and operational needs.' },
  { title: 'Ongoing website support', body: 'Practical maintenance, improvements and technical support as a website or digital product evolves.' },
];

export default async function AboutPage() {
  const content = await getSiteContent();
  const projects = content.projects.filter((project) => project.visible !== false);
  const email = content.sections.contact.email;

  return (
    <div className="studio-shell">
      <SiteNav items={[...content.navigation, { label: 'About MifiTech', href: '/about' }]} />
      <main className="wrap" style={{ paddingTop: 'clamp(3rem, 8vw, 7rem)', paddingBottom: '5rem' }}>
        <header className="case-hero">
          <div>
            <p className="section-label">ABOUT THE STUDIO / NIGERIA</p>
            <h1>MifiTech builds practical digital experiences for business.</h1>
            <p className="case-intro">MifiTech is a Nigerian digital studio focused on website design, ecommerce development and custom web applications. We help businesses establish a useful online presence and turn operational needs into digital products people can use.</p>
          </div>
        </header>

        <section className="case-section">
          <p className="section-label">WHO WE ARE</p>
          <h2>A development-led digital studio.</h2>
          <p>MifiTech works across the full journey of a digital project: understanding the business objective, shaping the experience, building the website or application, testing important details and preparing it for launch. The aim is to make technology useful, understandable and appropriate to the work it needs to do.</p>
          <p>Our work is rooted in the needs of Nigerian businesses and users, while building for the wider web. That means paying attention to mobile experiences, clear communication, reliable functionality and the practical steps customers take to make an enquiry, place an order or use a service.</p>
        </section>

        <section className="case-section">
          <p className="section-label">WHAT WE DO</p>
          <h2>Digital services built around real needs.</h2>
          <div className="case-study-grid">
            {services.map((service) => <div key={service.title}><h3>{service.title}</h3><p>{service.body}</p></div>)}
          </div>
        </section>

        <section className="case-section">
          <p className="section-label">HOW WE WORK</p>
          <h2>Clear scope. Careful build. Useful outcome.</h2>
          <ol>
            <li><strong>Understand the goal.</strong> We clarify the audience, business need and what success should look like.</li>
            <li><strong>Plan the experience.</strong> We agree the structure, content, features and project scope before development.</li>
            <li><strong>Build and test.</strong> We develop the agreed solution and check its key journeys across screen sizes.</li>
            <li><strong>Launch and improve.</strong> We prepare the project for release and identify sensible next improvements.</li>
          </ol>
        </section>

        {projects.length > 0 && <section className="case-section">
          <p className="section-label">SELECTED WORK</p>
          <h2>Projects in the MifiTech portfolio.</h2>
          <p>Explore selected websites, platforms and digital products built by MifiTech.</p>
          <div className="facts">
            {projects.map((project) => <div className="fact" key={project.slug}>
              <strong>{project.name}</strong>
              <p>{project.text}</p>
              <Link href={'/projects/' + encodeURIComponent(project.slug)}>View project details ↗</Link>
            </div>)}
          </div>
        </section>}

        <section className="case-section case-cta">
          <div><p className="section-label">START A PROJECT</p><h2>Have a business or product to build?</h2><p>Tell us what you are working on and what you need the website or application to achieve.</p></div>
          <div className="hero-actions"><Link className="button button-dark" href="/#contact">Contact MifiTech</Link><a className="button button-light" href={'mailto:' + email}>Email the studio</a></div>
        </section>
      </main>
      <footer className="footer"><div className="wrap footer-main"><Link href="/" className="footer-brand"><span className="brand-mark">M</span><span>MifiTech<span className="brand-period">.</span></span></Link><p>{content.footer.tagline}</p><div className="footer-links"><Link href="/">Home</Link><Link href="/website-design-nigeria">Website design</Link><Link href="/ecommerce-website-development-nigeria">Ecommerce</Link><Link href="/privacy">Privacy</Link></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span>DESIGNED WITH INTENTION. BUILT FOR BUSINESS.</span></div></footer>
    </div>
  );
}
