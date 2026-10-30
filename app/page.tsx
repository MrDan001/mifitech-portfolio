import Image from 'next/image';
import Link from 'next/link';
import SiteNav from './components/SiteNav';
import ContactForm from './components/ContactForm';

const demos = [
  {
    slug: 'restaurant',
    n: '01',
    title: 'Restaurant & catering',
    brand: 'MESA / KITCHEN',
    text: 'Menus, food galleries and reservations in one welcoming place.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=85',
    tags: ['Menu', 'Gallery', 'Bookings'],
  },
  {
    slug: 'beauty-salon',
    n: '02',
    title: 'Beauty & wellness',
    brand: 'AUREL / BEAUTY STUDIO',
    text: 'Services, results and appointment requests presented with care.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1100&q=85',
    tags: ['Services', 'Gallery', 'Appointments'],
  },
  {
    slug: 'fashion-boutique',
    n: '03',
    title: 'Fashion & retail',
    brand: 'NAYA / STYLE HOUSE',
    text: 'Collections, product stories and a smoother route to ordering.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=85',
    tags: ['Lookbook', 'Catalogue', 'Orders'],
  },
  {
    slug: 'event-planner',
    n: '04',
    title: 'Events & experiences',
    brand: 'GATHER & GRACE',
    text: 'A beautiful way to present your work, packages and enquiries.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=85',
    tags: ['Portfolio', 'Packages', 'Enquiries'],
  },
  {
    slug: 'printing',
    n: '05',
    title: 'Printing & creative',
    brand: 'FORM / PRINT STUDIO',
    text: 'Show your capabilities, completed work and request a quote.',
    image: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=1100&q=85',
    tags: ['Services', 'Portfolio', 'Quotes'],
  },
];

const projects = [
  { slug: 'ludo-live', image: '/previews/ludo-live.svg', name: 'Ludo Live', type: 'GAMING PLATFORM', text: 'A multiplayer gaming experience with player journeys, missions and tournaments.' },
  { slug: 'ehealthcare', image: '/previews/ehealthcare.svg', name: 'eHealthcare', type: 'HEALTHCARE TECHNOLOGY', text: 'A digital healthcare platform built around patient access and care workflows.' },
  { slug: 'garrison-market', image: '/previews/garrison-market.svg', name: 'Garrison Market', type: 'BUSINESS OPERATIONS', text: 'An operations platform for inventory, staff, sales and everyday business management.', live: 'https://gmstock.co' },
  { slug: 'the-africa-plug', image: '/previews/the-africa-plug.svg', name: 'The Africa Plug', type: 'MEDIA & PUBLISHING', text: 'A publishing experience for stories, video and African media.' },
];

const services = [
  { icon: '▱', name: 'Website Design', body: 'Beautiful, modern websites that work smoothly on every screen.' },
  { icon: '▣', name: 'E-commerce Solutions', body: 'Product catalogues and shopping journeys that make it easier to sell.' },
  { icon: '⌘', name: 'Web Applications', body: 'Custom digital tools built around the way your business works.' },
  { icon: '↗', name: 'SEO & Digital Marketing', body: 'A stronger foundation for search visibility and customer discovery.' },
  { icon: '⌁', name: 'Website Maintenance', body: 'Updates, improvements and the practical care your website needs.' },
  { icon: '◉', name: 'Ongoing Support', body: 'A dependable technical partner as your business keeps moving.' },
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
              <div className="studio-eyebrow"><span /> MODERN WEBSITES FOR REAL BUSINESSES</div>
              <p className="studio-kicker">WEB DESIGN · DEVELOPMENT · DIGITAL PRODUCTS</p>
              <h1>Turn Your Business Into a Powerful <em>Online Presence.</em></h1>
              <p className="studio-lead">MifiTech is a digital studio that designs and builds beautiful, fast and secure websites for businesses in Nigeria and beyond.</p>
              <div className="studio-actions">
                <a href="#demos" className="studio-button studio-button-primary">View Our Demo Websites <span>→</span></a>
                <a href="#contact" className="studio-button studio-button-outline">Contact Us</a>
              </div>
              <div className="studio-hero-foot"><span>BUILT AROUND YOUR BUSINESS</span><i /> <span>MADE FOR REAL PEOPLE</span><i /> <span>READY FOR EVERY SCREEN</span></div>
            </div>
            <div
              className="studio-visual"
              role="img"
              aria-label="A business owner working on her laptop in a bright, welcoming workspace"
            >
              <span className="studio-photo-note">Great websites<br />build trust <b>↙</b></span>
              <span className="studio-photo-index">MIFITECH / DIGITAL STUDIO</span>
            </div>
          </div>
          <div className="studio-ribbon"><div className="studio-container studio-ribbon-inner"><span>FROM FIRST IDEA TO LIVE WEBSITE</span><b>STRATEGY <i>✳</i> DESIGN <i>✳</i> DEVELOPMENT <i>✳</i> LAUNCH</b></div></div>
        </section>

        <section className="studio-services studio-section" id="services">
          <div className="studio-container">
            <div className="studio-section-head"><div><p className="studio-label">01 / OUR SERVICES</p><h2>Everything You Need to <em>Succeed Online.</em></h2></div><p>Practical digital solutions, from the first design decision to the support that keeps your business moving.</p></div>
            <div className="studio-service-grid">{services.map((service, index) => <article className="studio-service" key={service.name}><div className="studio-service-icon" aria-hidden="true">{service.icon}</div><h3>{service.name}</h3><p>{service.body}</p><span className="studio-service-number">0{index + 1}</span></article>)}</div>
          </div>
        </section>

        <section className="studio-demos studio-section" id="demos">
          <div className="studio-container">
            <div className="studio-section-head"><div><p className="studio-label">02 / WEBSITE DEMO STUDIO</p><h2>Explore Our Industry <em>Website Demos.</em></h2></div><p>See how your business could look with a professional website. Choose an industry to explore a live concept, then tell us what you need.</p></div>
            <div className="studio-demo-grid">{demos.map(d => <article className="studio-demo-card" key={d.slug}>
              <Link className="studio-demo-art" href={'/demos/' + d.slug} aria-label={'Explore the ' + d.title + ' website demo'} style={{ backgroundImage: 'url(' + d.image + ')' }}>
                <span className="studio-demo-photo-label">{d.title}</span><span className="studio-demo-photo-arrow">↗</span>
              </Link>
              <div className="studio-demo-info"><div><span>{d.n} / {d.title}</span><Link href={'/demos/' + d.slug} aria-label={'Open ' + d.title}>↗</Link></div><h3>{d.brand}</h3><p>{d.text}</p><small>{d.tags.join('  ·  ')}</small><Link className="studio-demo-visit" href={'/demos/' + d.slug}>View demo <span>→</span></Link></div>
            </article>)}</div>
            <div className="studio-demo-bottom"><p><strong>GOOD TO KNOW</strong> These are sample brands and illustrative concepts. Your final website is designed around your business.</p><a href="#contact">Request Your Own Website <span>↗</span></a></div>
          </div>
        </section>

        <section className="studio-work studio-section" id="work">
          <div className="studio-container">
            <div className="studio-section-head"><div><p className="studio-label">03 / OUR WORK</p><h2>Selected work. <em>Real products.</em></h2></div><p>Digital products and platforms from the MifiTech portfolio. Explore the thinking and experience behind each build.</p></div>
            <div className="studio-work-grid">{projects.map((project, index) => <article className="studio-work-card" key={project.slug}><Link className="studio-work-image" href={'/projects/' + project.slug}><Image src={project.image} alt={project.name + ' project preview'} fill sizes="(max-width: 760px) 84vw, (max-width: 1100px) 48vw, 560px"/><span>0{index + 1}</span><b>VIEW PROJECT ↗</b></Link><div className="studio-work-copy"><small>{project.type}</small><div><h3>{project.name}</h3><Link href={'/projects/' + project.slug} aria-label={'View ' + project.name + ' project'}>↗</Link></div><p>{project.text}</p><footer><Link href={'/projects/' + project.slug}>Project details ↗</Link>{project.live ? <a href={project.live} target="_blank" rel="noreferrer">Visit live site ↗</a> : <span>Portfolio project</span>}</footer></div></article>)}</div>
          </div>
        </section>

        <section className="studio-intro studio-section" id="about">
          <div className="studio-container studio-intro-grid">
            <div><p className="studio-label">04 / WHY MIFITECH</p><h2>Your website should work as hard as <em>you do.</em></h2></div>
            <div><p>People discover businesses in many places. When they're ready to know more, your website should make the next step obvious.</p><p>We bring your story, services and customer journey together in one considered digital experience — so people can understand what you offer and feel confident getting in touch.</p><a className="studio-inline-link" href="#process">See how we work <span>↗</span></a></div>
          </div>
        </section>

        <section className="studio-process studio-section" id="process">
          <div className="studio-container studio-process-grid">
            <div className="studio-process-intro"><p className="studio-label">05 / THE APPROACH</p><h2>Good work.<br/><em>Clear process.</em></h2><p>No unnecessary complexity. You'll know what we're making, what it costs and what happens next.</p><a href="#contact" className="studio-button studio-button-primary">Start a conversation <span>↗</span></a></div>
            <div className="studio-stages">{stages.map(stage=><article key={stage.n}><span>{stage.n}</span><div><h3>{stage.title}</h3><p>{stage.body}</p></div><b>↗</b></article>)}</div>
          </div>
        </section>

        <section className="studio-guide">
          <div className="studio-container studio-guide-inner"><div><p className="studio-label">A GOOD PLACE TO START</p><h2>Planning your first business website?</h2><p>Our practical guide covers domains, hosting, content, features, costs and the basics of SEO for Nigerian businesses.</p><Link href="/how-to-build-a-website-in-nigeria">Read: How to build a website in Nigeria <span>↗</span></Link></div><div className="studio-guide-mark">01<span> / FIELD GUIDE</span></div></div>
        </section>

        <section className="studio-contact studio-section" id="contact">
          <div className="studio-container studio-contact-grid"><div className="studio-contact-copy"><p className="studio-label">06 / YOUR PROJECT</p><h2>Let's build something <em>great.</em></h2><p>Tell us about your business and what you want your website to achieve. We'll help you work out the right next step.</p><div className="studio-contact-email"><small>EMAIL THE STUDIO</small><a href="mailto:officialsafebase@gmail.com">officialsafebase@gmail.com ↗</a></div><div className="studio-contact-note">A few details are enough to begin. No complicated brief required.</div></div><div className="studio-form-card"><div><span>PROJECT ENQUIRY</span><small>LET'S START HERE ↘</small></div><ContactForm/></div></div>
        </section>
      </main>
      <footer className="studio-footer"><div className="studio-container"><div className="studio-footer-main"><Link href="/" className="studio-footer-brand"><b>M</b> MifiTech<span>.</span></Link><p>Thoughtful websites. Useful digital products.</p><nav><a href="#services">Services</a><a href="#demos">Demo studio</a><a href="#work">Selected work</a><Link href="/how-to-build-a-website-in-nigeria">Website guide</Link><a href="#contact">Contact</a></nav></div><div className="studio-footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span>MADE WITH INTENTION. BUILT FOR BUSINESS.</span></div></div></footer>
      <Link href="#contact" className="studio-mobile-cta" aria-label="Let's build something great, start a project"><span className="studio-mobile-cta-icon">↗</span><span><strong>Let&apos;s Build Something Great</strong><small>Tell us about your project</small></span><b>→</b></Link>
    </div>
  );
}
