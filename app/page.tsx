import Link from 'next/link';
import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google';
import ContactForm from './components/ContactForm';
import HeroPhone from './components/HeroPhone';
import { getSiteContent } from '@/lib/site-content';
import './home.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '800'], variable: '--mh-display', display: 'swap' });
const body = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--mh-body', display: 'swap' });

const VISIBLE_DEMOS = 6;

export default async function Home() {
  const content = await getSiteContent();
  const demos = content.demos.filter((demo) => demo.visible !== false);
  const projects = content.projects.filter((project) => project.visible !== false);
  const contact = content.sections.contact;
  const guide = content.sections.guide;
  const featured = projects.find((project) => project.websiteUrl) ?? projects[0];
  const others = projects.filter((project) => project !== featured);
  const featuredIsLive = Boolean(featured?.websiteUrl);
  const featuredHost = featured?.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const profile = content.studioProfile;

  const demoCard = (d: (typeof demos)[number]) => (
    <Link key={d.slug} className="mh-demo" href={d.href || '/demos/' + d.slug} style={{ backgroundImage: 'url(' + d.image + ')' }} aria-label={'Open the ' + d.title + ' website demo'}>
      <h3>{d.title}</h3>
      <span>{d.tags.join(', ')}</span>
    </Link>
  );

  return (
    <div className={'mh ' + display.variable + ' ' + body.variable}>
      <div className="mh-dark">
        <header className="mh-header">
          <div className="mh-wrap">
            <Link className="mh-logo" href="/" aria-label="MifiTech home"><b>M</b>MifiTech</Link>
            <nav className="mh-nav" aria-label="Main navigation">
              {content.navigation.map((item, index) => <Link key={item.label + index} href={item.href}>{item.label}</Link>)}
            </nav>
            <div className="mh-header-actions">
              <a className="mh-btn mh-btn-lime" href="#contact">Start a project</a>
              <details className="mh-menu">
                <summary>Menu</summary>
                <div>
                  {content.navigation.map((item, index) => <Link key={item.label + index} href={item.href}>{item.label}</Link>)}
                  <a href="#contact">Start a project</a>
                </div>
              </details>
            </div>
          </div>
        </header>

        <section className="mh-hero">
          <div className="mh-wrap">
            <div className="mh-copy">
              <h1>Your business, open on every phone.</h1>
              <p className="mh-lead">MifiTech builds websites, online stores and business apps for Nigerian businesses, designed for the phone your customers already hold.</p>
              <div className="mh-cta">
                <a className="mh-btn mh-btn-lime" href="#contact">Start a project</a>
                <a className="mh-btn mh-btn-line" href="#demos">See website demos</a>
              </div>
            </div>
            <HeroPhone />
          </div>
        </section>
      </div>

      <main>
        {featured && featuredIsLive && (
          <div className="mh-proof">
            <div className="mh-wrap">
              <h2><span className="mh-dot" />In daily use</h2>
              <p>{featured.name} is live at {featuredHost}, built for the shop owners and staff who run it every day. Your website gets the same care.</p>
              <a className="mh-btn mh-btn-ink" href={featured.websiteUrl} target="_blank" rel="noreferrer">Visit {featuredHost}</a>
            </div>
          </div>
        )}

        {content.services.length > 0 && (
          <section className="mh-sec mh-services" id="services">
            <div className="mh-wrap">
              <div className="mh-head"><h2>What we build.</h2><p>From a first business website to custom software, and the support that keeps it running.</p></div>
              <ul className="mh-service-list">
                {content.services.map((service, index) => <li key={service.name + index}><h3>{service.name}</h3><p>{service.body}</p></li>)}
              </ul>
            </div>
          </section>
        )}

        <section className="mh-sec" id="demos">
          <div className="mh-wrap">
            <div className="mh-head">
              <h2>See your industry before we build it.</h2>
              <p>{demos.length} sample websites, each a working concept you can open and tap through. Pick the one closest to your business.</p>
            </div>
            <div className="mh-demos">{demos.slice(0, VISIBLE_DEMOS).map(demoCard)}</div>
            {demos.length > VISIBLE_DEMOS && (
              <details className="mh-more">
                <summary>Show the other {demos.length - VISIBLE_DEMOS} demos</summary>
                <div className="mh-demos">{demos.slice(VISIBLE_DEMOS).map(demoCard)}</div>
              </details>
            )}
            <p className="mh-demo-note">{content.sections.demos.note} <a href="#contact">{content.sections.demos.noteLink}</a></p>
          </div>
        </section>

        {featured && (
          <section className="mh-sec mh-work" id="work">
            <div className="mh-wrap">
              <div className="mh-head"><h2>Real products we have built.</h2><p>Beyond brochure sites: apps with logins, payments, databases and daily users.</p></div>
              <div className="mh-projects">
                <article className="mh-proj mh-proj-main">
                  <div>
                    <span className="mh-tag">{featuredIsLive && <span className="mh-dot" />}{featuredIsLive ? 'Live product' : featured.type}</span>
                    <h3>{featured.name}</h3>
                    <p>{featured.text}</p>
                    <ul className="mh-stack">{featured.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                    <div className="mh-proj-links">
                      {featuredIsLive && <a href={featured.websiteUrl} target="_blank" rel="noreferrer">Visit {featuredHost}</a>}
                      <Link href={'/projects/' + featured.slug}>Read the case study</Link>
                    </div>
                  </div>
                  {featured.features.length > 0 && <ul className="mh-kpis">{featured.features.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>}
                </article>
                {others.length > 0 && (
                  <div className="mh-others">
                    {others.map((project) => (
                      <article className="mh-proj" key={project.slug}>
                        <span className="mh-tag">{project.type}</span>
                        <h3>{project.name}</h3>
                        <p>{project.text}</p>
                        <ul className="mh-stack">{project.stack.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
                        <div className="mh-proj-links">
                          <Link href={'/projects/' + project.slug}>Project details</Link>
                          {project.websiteUrl && <a href={project.websiteUrl} target="_blank" rel="noreferrer">Visit website</a>}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {(profile.name || profile.bio || profile.image) && (
          <section className="mh-sec" id="studio-profile">
            <div className="mh-wrap mh-profile">
              {profile.image && <img src={profile.image} alt={profile.name ? profile.name + ', MifiTech' : 'MifiTech studio profile'} loading="lazy" />}
              <div>
                <h2>{profile.headline}</h2>
                {profile.name && <p><strong>{profile.name}{profile.role ? ', ' + profile.role : ''}</strong></p>}
                {profile.bio && <p>{profile.bio}</p>}
              </div>
            </div>
          </section>
        )}

        {content.testimonials.length > 0 && (
          <section className="mh-sec" aria-label="Client feedback">
            <div className="mh-wrap">
              <div className="mh-head"><h2>What clients say.</h2><p>Published only when a client has approved the wording and name.</p></div>
              <div className="mh-quotes">
                {content.testimonials.map((item, index) => (
                  <blockquote key={item.name + index}>
                    <p>“{item.quote}”</p>
                    <footer>{item.name}{[item.role, item.company].filter(Boolean).length > 0 ? ', ' + [item.role, item.company].filter(Boolean).join(', ') : ''}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mh-sec" id="process">
          <div className="mh-wrap">
            <div className="mh-head"><h2>From first chat to live site.</h2><p>You know the scope, the timeline and the cost before any building starts.</p></div>
            <ol className="mh-steps">
              {content.stages.map((stage) => <li className="mh-step" key={stage.n + stage.title}><b>{stage.n}</b><h3>{stage.title}</h3><p>{stage.body}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="mh-sec mh-faq" id="faqs">
          <div className="mh-wrap mh-two">
            <div>
              <h2>Questions, answered.</h2>
              <p className="mh-aside">New to websites? Read our <Link href={guide.href}><strong>plain-language guide</strong></Link> to domains, hosting, costs and SEO.</p>
            </div>
            <div>
              {content.faqs.map((item, index) => (
                <details key={item.question + index}><summary>{item.question}</summary><p>{item.answer}</p></details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="mh-dark">
        <section className="mh-sec mh-contact" id="contact">
          <div className="mh-wrap mh-two">
            <div>
              <h2>Tell us about your business.</h2>
              <p className="mh-sub">{contact.intro}</p>
              <a className="mh-mail" href={'mailto:' + contact.email}>{contact.email}</a>
              {contact.whatsappUrl?.startsWith('https://wa.me/') && <a className="mh-mail mh-wa" href={contact.whatsappUrl} target="_blank" rel="noreferrer">Message MifiTech on WhatsApp</a>}
              <p className="mh-note-line">{contact.note}</p>
            </div>
            <div className="studio-form-card mh-form"><ContactForm email={contact.email} /></div>
          </div>
        </section>
        <footer className="mh-footer">
          <div className="mh-wrap">
            <span>© {new Date().getFullYear()} MifiTech. {content.footer.tagline}</span>
            <span>
              {content.navigation.slice(0, 3).map((item, index) => <Link key={item.label + index} href={item.href}>{item.label}</Link>)}
              <Link href="/privacy">Privacy</Link>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}