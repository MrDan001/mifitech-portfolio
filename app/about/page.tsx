import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteContent } from '@/lib/site-content';
import { SITE_URL } from '@/lib/contact';
import { projectPath } from '@/lib/project-slug';

export const metadata: Metadata = {
  title: { absolute: 'About MifiTech | Digital Solutions & Web Development' },
  description: 'Meet MifiTech, the digital studio building practical websites, web applications and software. Learn about our approach, founder and technical experience.',
  alternates: { canonical: new URL('/about', SITE_URL).toString() },
  openGraph: {
    title: 'About MifiTech | Digital Solutions & Web Development',
    description: 'The people, experience and practical approach behind MifiTech.',
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

const skills = [
  'HTML & CSS', 'JavaScript', 'React', 'Next.js', 'Node.js',
  'Search engine optimisation (SEO)', 'REST APIs & integrations',
  'Supabase & database design', 'Vercel & Railway deployment',
];

export default async function AboutPage() {
  const content = await getSiteContent();
  const projects = content.projects.filter((project) => project.visible !== false);
  const email = content.sections.contact.email;
  const profile = content.studioProfile;
  const founderName = profile?.name?.trim() || 'Okechukwu Daniel Ernest';
  const founderRole = profile?.role?.trim() || 'Founder & Lead Developer';
  const founderHeadline = profile?.headline?.trim() || 'Building useful digital products from the ground up.';
  const founderBio = profile?.bio?.trim() || 'Okechukwu is the founder of MifiTech and a hands-on web developer focused on building practical digital products. His work spans business websites, web applications, ecommerce experiences and software tools, taking projects from the initial idea through development, deployment and ongoing improvement.';
  const founderImage = profile?.image?.trim();

  return (
    <div className="studio-shell">
      <main className="case wrap mf-about-page" style={{ paddingTop: 'clamp(3rem, 8vw, 7rem)', paddingBottom: '5rem' }}>
        <header className="case-hero">
          <div>
            <p className="section-label">ABOUT MIFITECH / DIGITAL SOLUTIONS</p>
            <h1>A digital solutions studio built around the way businesses work.</h1>
            <p className="case-intro">MifiTech helps organisations establish, improve and manage their digital presence through business websites, ecommerce platforms, custom web applications and ongoing technical support. We bring a practical, hands-on approach to every project, with a global outlook and a focus on what each organisation actually needs.</p>
          </div>
        </header>

        <section className="case-section mf-about-gap">
          <p className="section-label">THE GAP WE CLOSE</p>
          <h2>Good businesses deserve better digital tools.</h2>
          <p>Many businesses have strong products, valuable services and ambitious plans, but their online presence does not always communicate that value. Others need more than a website: they need software that helps customers, staff and day-to-day operations work better.</p>
          <p>MifiTech exists to close that gap. We turn business needs into clear digital experiences, from the first public-facing website to the custom systems that support the work behind it.</p>
        </section>

        <section className="case-section">
          <p className="section-label">WHAT MIFITECH FOCUSES ON</p>
          <div className="mf-about-focus">
            <article><span>01</span><h3>WEB PRESENCE</h3><p>Professional websites that help organisations explain what they do, build trust and reach the right audience.</p></article>
            <article><span>02</span><h3>DIGITAL PRODUCTS</h3><p>Web applications and online platforms designed around real users, useful features and clear workflows.</p></article>
            <article><span>03</span><h3>CONNECTED SYSTEMS</h3><p>Integrations, databases and deployment infrastructure that help digital services work reliably together.</p></article>
          </div>
        </section>

        <section className="case-section mf-about-founder" id="founder">
          <div className="mf-about-founder-visual">
            {founderImage ? <img src={founderImage} alt={founderName} /> : <div className="mf-about-initials" aria-label={founderName}>OD</div>}
            <div className="mf-about-founder-caption"><span>THE PERSON BEHIND THE WORK</span><strong>{founderName}</strong><small>{founderRole}</small></div>
          </div>
          <div className="mf-about-founder-copy">
            <p className="section-label">MEET THE FOUNDER</p>
            <h2>{founderName}</h2>
            <p className="mf-about-founder-headline">{founderHeadline}</p>
            <p>{founderBio}</p>
            <p>MifiTech is built on a straightforward idea: technology should solve a real problem, feel clear to use and be delivered with care. That principle guides how we approach client work and the products we build ourselves.</p>
            <div className="mf-about-founder-contact"><a href={'mailto:' + email}>Get in touch <span aria-hidden="true">↗</span></a><a href="https://wa.me/2349067859200" target="_blank" rel="noreferrer">WhatsApp <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section className="case-section mf-about-resume">
          <div className="mf-about-resume-heading"><div><p className="section-label">FOUNDER PROFILE / EXPERIENCE</p><h2>Skills built through hands-on development.</h2></div><span className="mf-about-resume-tag">MIFITECH PROFILE</span></div>
          <div className="mf-about-resume-grid">
            <article className="mf-about-education"><p className="mf-about-mini-label">EDUCATION</p><h3>BSc Computer Science</h3><p>Academic foundation in computing, software and the principles behind building digital systems.</p></article>
            <article className="mf-about-skills"><p className="mf-about-mini-label">TECHNICAL SKILLS</p><div>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>
          </div>
          <div className="mf-about-experience"><p className="mf-about-mini-label">PRACTICAL EXPERIENCE</p><p>Planning, building, testing and deploying real-world web projects, including interactive platforms, business management tools, healthcare workflows and responsive company websites. Experience includes frontend development, backend integrations, database-backed features, SEO foundations and production deployment.</p></div>
        </section>

        <section className="case-section">
          <p className="section-label">SERVICES & CAPABILITIES</p>
          <h2>One partner for building and improving digital services.</h2>
          <div className="case-study-grid">
            {services.map((service) => <div key={service.title}><h3>{service.title}</h3><p>{service.body}</p></div>)}
          </div>
        </section>

        <section className="case-section">
          <p className="section-label">OUR DELIVERY APPROACH</p>
          <h2>Clear scope. Careful build. Ongoing improvement.</h2>
          <ol>
            <li><strong>Understand the goal.</strong> We clarify the audience, business need and what the solution should achieve.</li>
            <li><strong>Plan the experience.</strong> We agree the structure, content, features, responsibilities and project scope before development.</li>
            <li><strong>Build and test.</strong> We develop the agreed solution and check its key journeys across devices and screen sizes.</li>
            <li><strong>Launch and support.</strong> We prepare the project for release and can continue with maintenance, updates and improvements.</li>
          </ol>
        </section>

        {projects.length > 0 && <section className="case-section">
          <p className="section-label">SELECTED PROJECT EXPERIENCE</p>
          <h2>Work that puts the skills into practice.</h2>
          <p>A selection of products and platforms from the MifiTech portfolio, showing the range of problems and workflows we work on.</p>
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
      <style>{`
        .mf-about-page .case-section{margin-top:clamp(3.5rem,7vw,6rem)}
        .mf-about-gap{max-width:850px}
        .mf-about-gap>p:not(.section-label){max-width:760px}
        .mf-about-focus{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line,#d8dcd5);border:1px solid var(--line,#d8dcd5);margin-top:2rem}
        .mf-about-focus article{background:var(--surface,#fff);padding:clamp(1.3rem,3vw,2rem)}
        .mf-about-focus article>span{display:block;color:var(--accent,#8bbd38);font-size:.8rem;font-weight:800;letter-spacing:.12em;margin-bottom:2.4rem}
        .mf-about-focus h3{font-size:.86rem;letter-spacing:.08em;margin:0 0 .7rem}
        .mf-about-focus p,.mf-about-founder-copy>p:not(.section-label){color:var(--muted,#68716c);line-height:1.8}
        .mf-about-founder{display:grid;grid-template-columns:minmax(240px,.8fr) minmax(0,1.2fr);gap:clamp(2rem,6vw,5rem);align-items:center}
        .mf-about-founder-visual{position:relative;min-height:390px;background:#172326;overflow:hidden;border-radius:4px}
        .mf-about-founder-visual>img{width:100%;height:100%;min-height:390px;object-fit:cover;display:block}
        .mf-about-initials{min-height:390px;display:grid;place-items:center;color:#c7f36b;font-size:clamp(7rem,16vw,12rem);font-weight:800;letter-spacing:-.1em}
        .mf-about-founder-caption{position:absolute;left:1rem;right:1rem;bottom:1rem;display:flex;flex-direction:column;gap:.3rem;padding:1rem 1.1rem;background:rgba(12,21,23,.91);color:#f4f3ed}
        .mf-about-founder-caption span,.mf-about-mini-label{font-size:.68rem;font-weight:800;letter-spacing:.13em;color:#85a18e}
        .mf-about-founder-caption strong{font-size:1.2rem}
        .mf-about-founder-caption small{color:#b6c3c0}
        .mf-about-founder-copy h2{margin:.2rem 0 1rem}
        .mf-about-founder-headline{font-size:1.15rem;font-weight:650;color:var(--ink,#172326)!important}
        .mf-about-founder-contact{display:flex;flex-wrap:wrap;gap:1.4rem;margin-top:1.6rem}
        .mf-about-founder-contact a{font-size:.9rem;font-weight:750;color:var(--ink,#172326);text-decoration:none;border-bottom:1px solid #a4c96b;padding-bottom:.35rem}
        .mf-about-resume{padding:clamp(1.4rem,4vw,3rem);background:#111d20;color:#f4f3ed;border-radius:5px}
        .mf-about-resume-heading{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem}
        .mf-about-resume-heading h2{max-width:650px;color:#f4f3ed;margin:.5rem 0 0}
        .mf-about-resume-tag{border:1px solid #465b50;color:#c7f36b;padding:.5rem .7rem;font-size:.65rem;letter-spacing:.12em;white-space:nowrap}
        .mf-about-resume-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:1rem;margin-top:2rem}
        .mf-about-resume-grid article,.mf-about-experience{padding:1.35rem;border:1px solid #354648;background:#172629}
        .mf-about-mini-label{margin:0 0 1rem;color:#c7f36b}
        .mf-about-education h3{font-size:1.3rem;margin:0 0 .6rem;color:#f4f3ed}
        .mf-about-education p:last-child,.mf-about-experience>p:last-child{font-size:.9rem;line-height:1.8;color:#b6c3c0;margin:0}
        .mf-about-skills>div{display:flex;flex-wrap:wrap;gap:.55rem}
        .mf-about-skills span{padding:.55rem .7rem;border:1px solid #405253;border-radius:2px;color:#e0e8df;font-size:.8rem}
        .mf-about-experience{margin-top:1rem}
        @media(max-width:760px){.mf-about-focus{grid-template-columns:1fr}.mf-about-focus article>span{margin-bottom:1rem}.mf-about-founder{grid-template-columns:1fr}.mf-about-founder-visual,.mf-about-founder-visual>img,.mf-about-initials{min-height:340px}.mf-about-resume-grid{grid-template-columns:1fr}.mf-about-resume-heading{flex-direction:column}}
        @media(prefers-reduced-motion:reduce){.mf-about-page *{scroll-behavior:auto!important}}
      `}</style>
    </div>
  );
}
