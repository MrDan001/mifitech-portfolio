import Image from 'next/image';
import Link from 'next/link';
import SiteNav from './components/SiteNav';
import ContactForm from './components/ContactForm';

const demos = [
  { slug: 'event-planner', n: '01', title: 'Events & experiences', brand: 'Gather & Grace', text: 'A beautiful way to present your work, packages and event enquiries.', tags: ['Portfolio', 'Packages', 'Enquiries'], tone: 'sand' },
  { slug: 'fashion-boutique', n: '02', title: 'Fashion & retail', brand: 'NAYA / STYLE HOUSE', text: 'Collections, product stories and a smoother route from browsing to ordering.', tags: ['Lookbook', 'Catalogue', 'Orders'], tone: 'rose' },
  { slug: 'restaurant', n: '03', title: 'Restaurant & catering', brand: 'MESA / kitchen', text: 'Menus, atmosphere, location and reservations in one welcoming place.', tags: ['Menu', 'Gallery', 'Bookings'], tone: 'olive' },
  { slug: 'beauty-salon', n: '04', title: 'Beauty & wellness', brand: 'AUREL / beauty studio', text: 'Services, results and appointment requests presented with care.', tags: ['Services', 'Gallery', 'Appointments'], tone: 'lilac' },
  { slug: 'printing', n: '05', title: 'Printing & creative', brand: 'FORM / print studio', text: 'Show your capabilities, completed work and make quote requests easier.', tags: ['Services', 'Portfolio', 'Quotes'], tone: 'blue' },
];

const projects = [
  { slug: 'ludo-live', image: '/previews/ludo-live.svg', name: 'Ludo Live', type: 'GAMING PLATFORM', text: 'A multiplayer gaming experience with player journeys, missions and tournaments.' },
  { slug: 'ehealthcare', image: '/previews/ehealthcare.svg', name: 'eHealthcare', type: 'HEALTHCARE TECHNOLOGY', text: 'A digital healthcare platform built around patient access and care workflows.' },
  { slug: 'garrison-market', image: '/previews/garrison-market.svg', name: 'Garrison Market', type: 'BUSINESS OPERATIONS', text: 'An operations platform for inventory, staff, sales and everyday business management.', live: 'https://gmstock.co' },
  { slug: 'the-africa-plug', image: '/previews/the-africa-plug.svg', name: 'The Africa Plug', type: 'MEDIA & PUBLISHING', text: 'A publishing experience for stories, video and African media.' },
];

const services = [
  { n: '01', name: 'Business websites', body: 'A confident online home that explains what you do and turns interest into enquiries.' },
  { n: '02', name: 'Online stores', body: 'Product catalogues, shopping journeys and ordering experiences shaped around your customers.' },
  { n: '03', name: 'Bookings & enquiries', body: 'Practical forms and booking flows that make it easier for customers to take action.' },
  { n: '04', name: 'Custom web applications', body: 'Purpose-built digital tools for the real work happening inside your business.' },
];

const stages = [
  { n: '01', title: 'Understand', body: 'We get to know your business, your customers and the result you need.' },
  { n: '02', title: 'Shape', body: 'We agree the structure, visual direction, scope and project plan before building.' },
  { n: '03', title: 'Build', body: 'We develop the experience, test the details and refine it with your feedback.' },
  { n: '04', title: 'Launch', body: 'We take your website live and walk you through what happens next.' },
];

export default function Home() {
  return (
    <div className="studio-shell">
      <SiteNav />
      <main>
        <section className="studio-hero">
          <div className="studio-container studio-hero-grid">
            <div className="studio-hero-copy">
              <div className="studio-eyebrow"><span /> WEB DESIGN · DEVELOPMENT · DIGITAL PRODUCTS</div>
              <p className="studio-kicker">YOUR BUSINESS, WITH A BETTER DIGITAL PRESENCE.</p>
              <h1>Make your next move <em>online.</em></h1>
              <p className="studio-lead">We build thoughtful websites and useful digital products that help businesses look credible, reach customers and move work forward.</p>
              <div className="studio-actions">
                <a href="#contact" className="studio-button studio-button-dark">Let's discuss your project <span>↗</span></a>
                <a href="#demos" className="studio-text-button">Explore website concepts <span>↓</span></a>
              </div>
              <div className="studio-hero-foot"><span>BUILT AROUND YOUR BUSINESS</span><i /> <span>MADE FOR REAL PEOPLE</span><i /> <span>READY FOR EVERY SCREEN</span></div>
            </div>
            <div className="studio-visual" aria-label="Illustrative preview of a MifiTech business website">
              <div className="studio-visual-label"><span>SELECTED DIGITAL EXPERIENCE</span><span>01 / 04</span></div>
              <div className="studio-browser">
                <div className="studio-browser-bar"><span><i/><i/><i/></span><small>YOURBRAND.COM</small><b>↗</b></div>
                <div className="studio-browser-body">
                  <div className="studio-browser-nav"><strong>YOUR<span>.</span> BRAND</strong><span>ABOUT&nbsp;&nbsp; SERVICES&nbsp;&nbsp; CONTACT</span></div>
                  <div className="studio-browser-image">
                    <div><small>MADE FOR WHAT'S NEXT</small><strong>Give your<br/>business room<br/>to grow.</strong><span>DISCOVER MORE ↗</span></div>
                  </div>
                  <div className="studio-browser-bottom"><strong>A clearer way to show what you do.</strong><span>Thoughtful design · Useful details · Easy contact</span></div>
                </div>
              </div>
              <div className="studio-float studio-float-one"><b>↗</b><span><strong>Built around you</strong><small>Not another template</small></span></div>
              <div className="studio-float studio-float-two"><b className="studio-online-dot" /><span><strong>Ready for mobile</strong><small>From first tap to enquiry</small></span></div>
              <div className="studio-visual-caption">MIFITECH / DIGITAL STUDIO</div>
            </div>
          </div>
          <div className="studio-ribbon"><div className="studio-container studio-ribbon-inner"><span>FROM FIRST IDEA TO LIVE WEBSITE</span><b>STRATEGY <i>✳</i> DESIGN <i>✳</i> DEVELOPMENT <i>✳</i> LAUNCH</b></div></div>
        </section>

        <section className="studio-intro studio-section" id="about">
          <div className="studio-container studio-intro-grid">
            <div><p className="studio-label">01 / WHY MIFITECH</p><h2>Your website should work as hard as <em>you do.</em></h2></div>
            <div><p>People discover businesses in many places. When they're ready to know more, your website should make the next step obvious.</p><p>We bring your story, services and customer journey together in one considered digital experience — so people can understand what you offer and feel confident getting in touch.</p><a className="studio-inline-link" href="#process">See how we work <span>↗</span></a></div>
          </div>
        </section>

        <section className="studio-services studio-section" id="services">
          <div className="studio-container">
            <div className="studio-section-head"><div><p className="studio-label">02 / WHAT WE DO</p><h2>Digital tools for <em>real business.</em></h2></div><p>Start with what your customers need. We'll help shape the right website, features and experience around it.</p></div>
            <div className="studio-service-grid">{services.map(s => <article className="studio-service" key={s.n}><div><span>{s.n}</span><b>↗</b></div><h3>{s.name}</h3><p>{s.body}</p></article>)}</div>
          </div>
        </section>

        <section className="studio-demos studio-section" id="demos">
          <div className="studio-container">
            <div className="studio-section-head"><div><p className="studio-label">03 / DEMO STUDIO</p><h2>Picture your business <em>online.</em></h2></div><p>Explore a concept for an industry like yours. These previews show what's possible — the final website is shaped around your brand.</p></div>
            <div className="studio-demo-grid">{demos.map(d => <article className="studio-demo-card" key={d.slug}>
              <Link className={'studio-demo-art tone-' + d.tone} href={'/demos/' + d.slug} aria-label={'Explore ' + d.title + ' website concept'}>
                <div className="studio-demo-window"><div className="studio-demo-windowbar"><i/><i/><i/><small>CONCEPT / {d.n}</small></div><div className="studio-demo-windowbody"><span>{d.brand}</span><strong>{d.slug === 'event-planner' ? 'Make room for moments.' : d.slug === 'fashion-boutique' ? 'Find your own kind of style.' : d.slug === 'restaurant' ? 'Gather around good food.' : d.slug === 'beauty-salon' ? 'A little time for your best.' : 'Make every detail count.'}</strong><b>EXPLORE THE WEBSITE ↗</b></div></div>
                <span className="studio-demo-open">OPEN CONCEPT ↗</span>
              </Link>
              <div className="studio-demo-info"><div><span>{d.n} / {d.title}</span><Link href={'/demos/' + d.slug} aria-label={'Open ' + d.title}>↗</Link></div><h3>{d.brand}</h3><p>{d.text}</p><small>{d.tags.join('  ·  ')}</small></div>
            </article>)}</div>
            <div className="studio-demo-note"><span>GOOD TO KNOW</span> These are fictional sample brands. We use them to explore direction before tailoring a website to your own business.</div>
          </div>
        </section>

        <section className="studio-work studio-section" id="work">
          <div className="studio-container">
            <div className="studio-section-head"><div><p className="studio-label">04 / SELECTED WORK</p><h2>Built to do more than <em>look good.</em></h2></div><p>Digital products and platforms from the MifiTech portfolio. Explore the thinking and experience behind each build.</p></div>
            <div className="studio-work-grid">{projects.map((p,i)=><article className="studio-work-card" key={p.slug}><Link className="studio-work-image" href={'/projects/' + p.slug}><Image src={p.image} alt={p.name + ' project preview'} fill sizes="(max-width: 760px) 100vw, 50vw"/><span>0{i+1}</span><b>VIEW PROJECT ↗</b></Link><div className="studio-work-copy"><small>{p.type}</small><div><h3>{p.name}</h3><Link href={'/projects/' + p.slug} aria-label={'View ' + p.name + ' project'}>↗</Link></div><p>{p.text}</p><footer><Link href={'/projects/' + p.slug}>Project details ↗</Link>{p.live ? <a href={p.live} target="_blank" rel="noreferrer">Visit live site ↗</a> : <span>Portfolio project</span>}</footer></div></article>)}</div>
          </div>
        </section>

        <section className="studio-process studio-section" id="process">
          <div className="studio-container studio-process-grid">
            <div className="studio-process-intro"><p className="studio-label">05 / THE APPROACH</p><h2>Good work.<br/><em>Clear process.</em></h2><p>No unnecessary complexity. You'll know what we're making, what it costs and what happens next.</p><a href="#contact" className="studio-button studio-button-dark">Start a conversation <span>↗</span></a></div>
            <div className="studio-stages">{stages.map(s=><article key={s.n}><span>{s.n}</span><div><h3>{s.title}</h3><p>{s.body}</p></div><b>↗</b></article>)}</div>
          </div>
        </section>

        <section className="studio-guide">
          <div className="studio-container studio-guide-inner"><div><p className="studio-label">A GOOD PLACE TO START</p><h2>Planning your first business website?</h2><p>Our practical guide covers domains, hosting, content, features, costs and the basics of SEO for Nigerian businesses.</p><Link href="/how-to-build-a-website-in-nigeria">Read: How to build a website in Nigeria <span>↗</span></Link></div><div className="studio-guide-mark">01<span> / FIELD GUIDE</span></div></div>
        </section>

        <section className="studio-contact studio-section" id="contact">
          <div className="studio-container studio-contact-grid"><div className="studio-contact-copy"><p className="studio-label">06 / YOUR PROJECT</p><h2>Let's make something <em>useful.</em></h2><p>Tell us about your business and what you want your website to achieve. We'll help you work out the right next step.</p><div className="studio-contact-email"><small>EMAIL THE STUDIO</small><a href="mailto:officialsafebase@gmail.com">officialsafebase@gmail.com ↗</a></div><div className="studio-contact-note">A few details are enough to begin. No complicated brief required.</div></div><div className="studio-form-card"><div><span>PROJECT ENQUIRY</span><small>LET'S START HERE ↘</small></div><ContactForm/></div></div>
        </section>
      </main>
      <footer className="studio-footer"><div className="studio-container"><div className="studio-footer-main"><Link href="/" className="studio-footer-brand"><b>M</b> MifiTech<span>.</span></Link><p>Thoughtful websites. Useful digital products.</p><nav><a href="#services">Services</a><a href="#demos">Demo studio</a><a href="#work">Selected work</a><Link href="/how-to-build-a-website-in-nigeria">Website guide</Link><a href="#contact">Contact</a></nav></div><div className="studio-footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span>MADE WITH INTENTION. BUILT FOR BUSINESS.</span></div></div></footer>
    </div>
  );
}
