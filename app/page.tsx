import Link from 'next/link';
import SiteNav from './components/SiteNav';
import ContactForm from './components/ContactForm';
import { getSiteContent } from '@/lib/site-content';

function ServiceIcon({ name }: { name: string }) {
  const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.65, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  if (name === 'website') return <svg {...base}><rect x="3" y="4" width="18" height="13" rx="1.8"/><path d="M8 21h8M12 17v4M7 8h10M7 11h6"/></svg>;
  if (name === 'store') return <svg {...base}><path d="M4 9.5 5.5 4h13L20 9.5"/><path d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0"/><path d="M5.5 12v8h13v-8M9 20v-5h6v5"/></svg>;
  if (name === 'apps') return <svg {...base}><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>;
  if (name === 'search') return <svg {...base}><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4.2 4.2M8 11h5.5M10.75 8.3v5.4"/></svg>;
  if (name === 'maintenance') return <svg {...base}><path d="M14.5 6.2a5 5 0 0 0 6.1 6.1l-9.9 9.1a2.4 2.4 0 0 1-3.4-3.4l9.1-9.9a5 5 0 0 0-6.1-6.1l3 3-2.9 2.9-3-3a5 5 0 0 0 6.1 6.3"/></svg>;
  return <svg {...base}><path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1v-6h3M4 13v6h3v-6H4Z"/><path d="M7 19a5 5 0 0 0 5 3h2"/></svg>;
}

export default async function Home() {
  const content = await getSiteContent();
  const visibleDemos = content.demos.filter((demo) => demo.visible !== false);
  const visibleProjects = content.projects.filter((project) => project.visible !== false);
  const section = content.sections;

  return (
    <div className="studio-shell">
      <SiteNav items={content.navigation} />
      <main>
        <section className="studio-hero">
          <div className="studio-container studio-hero-grid">
            <div className="studio-hero-copy">
              <div className="studio-eyebrow"><span /> {content.hero.eyebrow}</div>
              <p className="studio-kicker">{content.hero.kicker}</p>
              <h1>{content.hero.title} <em>{content.hero.emphasis}</em></h1>
              <p className="studio-lead">{content.hero.lead}</p>
              <div className="studio-actions">
                <a href={content.hero.primaryHref} className="studio-button studio-button-primary">{content.hero.primaryLabel}</a>
                <a href={content.hero.secondaryHref} className="studio-button studio-button-outline">{content.hero.secondaryLabel}</a>
              </div>
              <div className="studio-hero-foot"><span>BUILT AROUND YOUR BUSINESS</span><i /><span>MADE FOR REAL PEOPLE</span><i /><span>READY FOR EVERY SCREEN</span></div>
            </div>
            <div className="studio-visual" role="img" aria-label="A business owner working on her laptop in a bright, welcoming workspace" style={content.hero.visualImage ? { backgroundImage: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,.3)), url(" + content.hero.visualImage + ")" } : undefined}>
              <span className="studio-photo-note">{content.hero.visualNote.split('\\n').map((line, i) => <span key={i}>{line}{i === 0 ? <br /> : null}</span>)} <b>↙</b></span>
              <span className="studio-photo-index">{content.hero.visualIndex}</span>
            </div>
          </div>
          <div className="studio-ribbon"><div className="studio-container studio-ribbon-inner"><span>{content.hero.ribbonLead}</span><b>{content.hero.ribbonItems.map((item, i) => <span key={item}>{i > 0 && <> <i>✳</i> </>}{item}</span>)}</b></div></div>
        </section>

        <section className="studio-services studio-section" id="services">
          <div className="studio-container">
            <div className="studio-section-head"><div><p className="studio-label">{section.services.label}</p><h2>{section.services.title} <em>{section.services.emphasis}</em></h2></div><p>{section.services.intro}</p></div>
            <div className="studio-service-grid">{content.services.map((service, index) => <article className="studio-service" key={service.name + index}><div className="studio-service-icon"><ServiceIcon name={service.icon} /></div><h3>{service.name}</h3><p>{service.body}</p><span className="studio-service-number">{String(index + 1).padStart(2, '0')}</span></article>)}</div>
          </div>
        </section>

        <section className="studio-demos studio-section" id="demos">
          <div className="studio-container">
            <div className="studio-section-head"><div><p className="studio-label">{section.demos.label}</p><h2>{section.demos.title} <em>{section.demos.emphasis}</em></h2></div><p>{section.demos.intro}</p></div>
            <div className="studio-demo-grid">{visibleDemos.map((d) => {
              const href = d.href || '/demos/' + d.slug;
              return <article className="studio-demo-card" key={d.slug}>
                <Link className="studio-demo-art" href={href} aria-label={'Explore the ' + d.title + ' website demo'} style={{ backgroundImage: 'url(' + d.image + ')' }}>
                  <span className="studio-demo-photo-label">{d.title}</span><span className="studio-demo-photo-arrow">OPEN</span>
                </Link>
                <div className="studio-demo-info"><div><span>{d.n} / {d.title}</span><Link href={href} aria-label={'Open ' + d.title}></Link></div><h3>{d.brand}</h3><p>{d.text}</p><small>{d.tags.join('  ·  ')}</small><Link className="studio-demo-visit" href={href}>View demo</Link></div>
              </article>;
            })}</div>
            <div className="studio-demo-bottom"><p><strong>{section.demos.noteTitle}</strong> {section.demos.note}</p><a href="#contact">{section.demos.noteLink}</a></div>
          </div>
        </section>

        <section className="studio-work studio-section" id="work">
          <div className="studio-container">
            <div className="studio-section-head"><div><p className="studio-label">{section.work.label}</p><h2>{section.work.title} <em>{section.work.emphasis}</em></h2></div><p>{section.work.intro}</p></div>
            <div className="studio-work-grid">{visibleProjects.map((project, index) => {
              const projectHref = '/projects/' + project.slug;
              return <article className="studio-work-card" key={project.slug}>
                <Link className="studio-work-image" href={projectHref} style={{ backgroundImage: 'url(' + project.image + ')' }}>
                  <span>{String(index + 1).padStart(2, '0')}</span><b>VIEW PROJECT</b>
                </Link>
                <div className="studio-work-copy"><small>{project.type}</small><div><h3>{project.name}</h3><Link href={projectHref} aria-label={'View ' + project.name + ' project'}></Link></div><p>{project.text}</p>
                  <footer><Link href={projectHref}>Project details</Link>{project.websiteUrl ? <a href={project.websiteUrl} target="_blank" rel="noreferrer">Visit live website ↗</a> : <span>Portfolio project</span>}</footer>
                </div>
              </article>;
            })}</div>
          </div>
        </section>

        <section className="studio-intro studio-section" id="about"><div className="studio-container studio-intro-grid">
          <div><p className="studio-label">{section.about.label}</p><h2>{section.about.title} <em>{section.about.emphasis}</em></h2></div>
          <div>{section.about.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}<a className="studio-inline-link" href="#process">{section.about.linkLabel} <span></span></a></div>
        </div></section>

        <section className="studio-process studio-section" id="process"><div className="studio-container studio-process-grid">
          <div className="studio-process-intro"><p className="studio-label">{section.process.label}</p><h2>{section.process.title}<br/><em>{section.process.emphasis}</em></h2><p>{section.process.intro}</p><a href="#contact" className="studio-button studio-button-primary">{section.process.buttonLabel}</a></div>
          <div className="studio-stages">{content.stages.map((stage) => <article key={stage.n + stage.title}><span>{stage.n}</span><div><h3>{stage.title}</h3><p>{stage.body}</p></div><b></b></article>)}</div>
        </div></section>

        <section className="studio-guide"><div className="studio-container studio-guide-inner"><div><p className="studio-label">{section.guide.label}</p><h2>{section.guide.title}</h2><p>{section.guide.intro}</p><Link href={section.guide.href}>{section.guide.linkLabel}</Link></div><div className="studio-guide-mark">01<span> / FIELD GUIDE</span></div></div></section>

        <section className="studio-contact studio-section" id="contact"><div className="studio-container studio-contact-grid">
          <div className="studio-contact-copy"><p className="studio-label">{section.contact.label}</p><h2>{section.contact.title} <em>{section.contact.emphasis}</em></h2><p>{section.contact.intro}</p>
            <div className="studio-contact-email"><small>{section.contact.emailLabel}</small><a href={'mailto:' + section.contact.email}>{section.contact.email}</a></div><div className="studio-contact-note">{section.contact.note}</div>
          </div>
          <div className="studio-form-card"><div><span>{section.contact.formTitle}</span><small>{section.contact.formKicker}</small></div><ContactForm email={section.contact.email}/></div>
        </div></section>
      </main>
      <footer className="studio-footer">
        <div className="studio-container">
          <div className="studio-footer-main">
            <Link href="/" className="studio-footer-brand" aria-label="MifiTech home">
              <b aria-hidden="true">M</b>
              MifiTech<span>.</span>
            </Link>
            <p>{content.footer.tagline}</p>
            <nav aria-label="Footer navigation">
              {content.navigation.slice(0, 4).map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
              <a href={`mailto:${section.contact.email}`}>Email us</a>
            </nav>
          </div>
          <div className="studio-footer-bottom">
            <span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span>
            <span>Websites · Apps · Digital Solutions</span>
          </div>
        </div>
      </footer>
      <a
        className="studio-mobile-cta"
        href="#contact"
        aria-label="Let's build something great — tell us about your project"
      >
        <span className="studio-mobile-cta-icon" aria-hidden="true">↗</span>
        <span>
          <strong>Let's Build Something Great</strong>
          <small>Tell us about your project</small>
        </span>
        <b aria-hidden="true">→</b>
      </a>
    </div>
  );
}
