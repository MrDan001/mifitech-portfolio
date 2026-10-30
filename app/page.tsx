import Image from 'next/image';
import Link from 'next/link';
import SiteNav from './components/SiteNav';
import ContactForm from './components/ContactForm';

const demos = [
  { slug: 'event-planner', number: '01', name: 'Event & Experiences', brand: 'Gather & Grace', desc: 'A visual home for planners, decorators and event teams. Show the atmosphere, packages and make enquiries simple.', style: 'demo-card-event', tags: ['Portfolio', 'Packages', 'Enquiries'] },
  { slug: 'fashion-boutique', number: '02', name: 'Fashion & Boutique', brand: 'NAYA / STYLE HOUSE', desc: 'A polished digital storefront for collections, lookbooks and direct customer orders.', style: 'demo-card-fashion', tags: ['Lookbook', 'Catalogue', 'Orders'] },
  { slug: 'restaurant', number: '03', name: 'Restaurant & Catering', brand: 'MESA / kitchen', desc: 'Put your menu, atmosphere and reservations in one easy-to-use place.', style: 'demo-card-food', tags: ['Menu', 'Gallery', 'Bookings'] },
  { slug: 'beauty-salon', number: '04', name: 'Beauty & Salon', brand: 'AUREL / beauty studio', desc: 'Showcase your services, results and team while making appointment requests effortless.', style: 'demo-card-beauty', tags: ['Services', 'Gallery', 'Appointments'] },
  { slug: 'printing', number: '05', name: 'Printing & Creative', brand: 'FORM / print studio', desc: 'Present your print services, finished work and a clear path for customers to request a quote.', style: 'demo-card-print', tags: ['Services', 'Portfolio', 'Quotes'] },
];

const projects = [
  { slug: 'ludo-live', image: '/previews/ludo-live.svg', title: 'Ludo Live', type: 'MULTIPLAYER GAMING', desc: 'A real-time multiplayer game platform with player experiences, missions, tournaments and product systems.' },
  { slug: 'ehealthcare', image: '/previews/ehealthcare.svg', title: 'eHealthcare', type: 'HEALTHCARE PLATFORM', desc: 'A digital healthcare experience shaped around clear patient, appointment and care workflows.' },
  { slug: 'garrison-market', image: '/previews/garrison-market.svg', title: 'Garrison Market', type: 'BUSINESS OPERATIONS', desc: 'An operations platform for inventory, staff, sales and everyday business management.', live: 'https://gmstock.co' },
  { slug: 'the-africa-plug', image: '/previews/the-africa-plug.svg', title: 'The Africa Plug', type: 'MEDIA & PUBLISHING', desc: 'A content platform built around publishing, video and media experiences.' },
];

const services = [
  { number: '01', title: 'Business websites', text: 'A clear, credible online home that explains what you do and gives customers a reason to choose you.' },
  { number: '02', title: 'Online stores & catalogues', text: 'Show products, organise collections and make it easier for customers to place an order.' },
  { number: '03', title: 'Bookings & enquiries', text: 'Turn interest into action with appointment requests, booking forms and direct contact paths.' },
  { number: '04', title: 'Custom web applications', text: 'Purpose-built tools for the workflows, people and operations that make your business run.' },
];

const steps = [
  { number: '01', title: 'We learn your business', text: 'We understand your customers, services and what you need the website to achieve.' },
  { number: '02', title: 'We shape the experience', text: 'You review the structure and visual direction before the full build moves ahead.' },
  { number: '03', title: 'We build & refine', text: 'We develop the website, check it across screen sizes and refine the details with you.' },
  { number: '04', title: 'We launch together', text: 'We help get your website online and show you how to keep its content up to date.' },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="hero" id="top">
          <div className="wrap hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> DIGITAL STUDIO · NIGERIA</div>
              <p className="hero-overline">YOUR BUSINESS DESERVES MORE THAN A SOCIAL PAGE.</p>
              <h1>Make your business <em>impossible to overlook.</em></h1>
              <p className="hero-intro">We design and build modern websites that help people understand your business, trust what you offer and take the next step.</p>
              <div className="hero-actions">
                <a className="button button-dark" href="#showcase">Explore website demos <span>↘</span></a>
                <a className="button button-light" href="#contact">Discuss your project <span>↗</span></a>
              </div>
              <div className="hero-proof">
                <span>MADE FOR REAL BUSINESSES</span>
                <i />
                <span>DESIGNED FOR EVERY SCREEN</span>
                <i />
                <span>BUILT TO CONVERT INTEREST INTO ACTION</span>
              </div>
            </div>
            <div className="hero-art" aria-label="Preview of a modern business website">
              <div className="hero-art-top"><span className="browser-dots"><i /><i /><i /></span><span>YOUR NEXT WEBSITE</span><span className="browser-status">LIVE CONCEPT</span></div>
              <div className="hero-browser">
                <div className="browser-side">
                  <span className="browser-brand">STUDIO<span>.</span></span>
                  <span className="browser-menu">COLLECTIONS<br />ABOUT<br />CONTACT</span>
                  <span className="browser-small">DESIGNED TO<br />BE REMEMBERED.</span>
                </div>
                <div className="browser-main">
                  <div className="browser-photo">
                    <div className="photo-label">MADE FOR<br />YOUR MOMENT.</div>
                    <span className="photo-number">01 / 05</span>
                  </div>
                  <div className="browser-caption"><strong>A clearer way to show what you do.</strong><span>Thoughtful design. Useful details. Easy contact.</span></div>
                </div>
              </div>
              <div className="floating-note note-top"><span className="note-icon">↗</span><span><strong>Built around you</strong><small>Your brand, your story</small></span></div>
              <div className="floating-note note-bottom"><span className="note-pulse" /><span><strong>Phone-first experience</strong><small>Ready for the way people browse</small></span></div>
              <div className="hero-art-index">MIFITECH / DIGITAL PARTNER</div>
            </div>
          </div>
          <div className="hero-bottom-band"><div className="wrap band-inner"><span>WE CAN HELP YOU BUILD</span><div>BUSINESS WEBSITES <b>✳</b> ONLINE STORES <b>✳</b> BOOKING EXPERIENCES <b>✳</b> CUSTOM WEB APPS</div></div></div>
        </section>

        <section className="intro-section section-pad" id="about">
          <div className="wrap intro-grid">
            <div><p className="section-label">01 / THE OPPORTUNITY</p><h2>Your next customer is already looking for you.</h2></div>
            <div className="intro-copy"><p>Social media is a useful place to be discovered. Your website gives interested customers one place to understand your business, explore what you offer and contact you with confidence.</p><p>MifiTech turns that opportunity into a thoughtful digital experience — clear on a phone, easy to navigate and designed around the way your business works.</p><a className="text-link" href="#contact">Let's talk about your business <span>↗</span></a></div>
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="wrap">
            <div className="section-heading"><div><p className="section-label">02 / WHAT WE BUILD</p><h2>Useful by design.<br /><em>Made for your goals.</em></h2></div><p className="section-aside">From a first business website to a custom digital product, we focus on the features that make a real difference to your customers.</p></div>
            <div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><span className="service-number">{service.number}</span><div className="service-arrow">↗</div><h3>{service.title}</h3><p>{service.text}</p></article>)}</div>
          </div>
        </section>

        <section className="showcase-section section-pad" id="showcase">
          <div className="wrap">
            <div className="section-heading showcase-heading"><div><p className="section-label">03 / WEBSITE DEMO STUDIO</p><h2>See what your business<br /><em>could look like online.</em></h2></div><p className="section-aside">Choose an industry to explore a sample website. These are concept previews — we customise the real experience around your business.</p></div>
            <div className="demo-grid">{demos.map((demo) => <article className={'demo-card ' + demo.style} key={demo.slug}>
              <Link className="demo-card-visual" href={'/demos/' + demo.slug} aria-label={'Preview ' + demo.name}>
                <div className="demo-card-window"><div className="mini-window-top"><i /><i /><i /><span>PREVIEW / {demo.number}</span></div><div className="mini-window-content"><small>{demo.brand}</small><strong>{demo.slug === 'event-planner' ? 'Make room for moments.' : demo.slug === 'fashion-boutique' ? 'A style of your own.' : demo.slug === 'restaurant' ? 'Gather around good food.' : demo.slug === 'beauty-salon' ? 'Feel like your best.' : 'Make every detail count.'}</strong><span className="mini-window-cta">EXPLORE THE CONCEPT ↗</span><div className="mini-window-blocks"><i /><i /><i /></div></div></div>
                <span className="demo-card-open">View demo ↗</span>
              </Link>
              <div className="demo-card-body"><div className="demo-card-title"><span>{demo.number} / {demo.name}</span><Link href={'/demos/' + demo.slug} aria-label={'Open ' + demo.name}>↗</Link></div><h3>{demo.brand}</h3><p>{demo.desc}</p><div className="tag-list">{demo.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </article>)}</div>
            <p className="demo-disclaimer"><span>NOTE</span> All five demos use fictional sample brands and illustrative content. They are starting points, not finished client websites.</p>
          </div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="wrap">
            <div className="section-heading"><div><p className="section-label">04 / SELECTED BUILDS</p><h2>More than a pretty screen.<br /><em>Products that do the work.</em></h2></div><p className="section-aside">A selection of software and digital products from the MifiTech portfolio. Explore each project for more context.</p></div>
            <div className="work-grid">{projects.map((project, index) => <article className="work-card" key={project.slug}><Link href={'/projects/' + project.slug} className="work-image"><Image src={project.image} alt={project.title + ' preview'} fill sizes="(max-width: 760px) 100vw, 50vw" /><span className="work-image-index">0{index + 1}</span><span className="work-image-link">EXPLORE PROJECT ↗</span></Link><div className="work-content"><p className="section-label">{project.type}</p><div className="work-title-row"><h3>{project.title}</h3><Link href={'/projects/' + project.slug} aria-label={'Read about ' + project.title}>↗</Link></div><p>{project.desc}</p><div className="work-bottom"><Link href={'/projects/' + project.slug}>Project details <span>↗</span></Link>{project.live ? <a href={project.live} target="_blank" rel="noreferrer">Visit live site ↗</a> : <span>Portfolio project</span>}</div></div></article>)}</div>
          </div>
        </section>

        <section className="process-section section-pad" id="process">
          <div className="wrap process-layout"><div className="process-intro"><p className="section-label">05 / HOW WE WORK</p><h2>Clear steps.<br /><em>No guesswork.</em></h2><p>You'll know what we're creating, why it matters and what happens next. We keep the process collaborative and practical.</p><a className="button button-dark" href="#contact">Start a conversation <span>↗</span></a></div><div className="process-list">{steps.map((step) => <article className="process-step" key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><b>↗</b></article>)}</div></div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="wrap contact-layout"><div className="contact-copy"><p className="section-label">06 / LET'S BUILD</p><h2>Have a business in mind?<br /><em>Let's put it online.</em></h2><p>Tell us a little about your business and what you want your website to do. We'll take it from there.</p><div className="contact-direct"><span>DIRECT EMAIL</span><a href="mailto:officialsafebase@gmail.com">officialsafebase@gmail.com ↗</a></div><div className="contact-note">No complicated brief needed. A few sentences are enough to get started.</div></div><div className="contact-form-wrap"><div className="form-topline"><span>PROJECT ENQUIRY</span><span>LET'S START WITH THE BASICS ↘</span></div><ContactForm /></div></div>
        </section>
      </main>
      <footer className="footer"><div className="wrap footer-main"><Link href="/" className="footer-brand"><span className="brand-mark">M</span><span>MifiTech<span className="brand-period">.</span></span></Link><p>Thoughtful websites. Useful digital products.</p><div className="footer-links"><a href="#services">Services</a><a href="#showcase">Demo studio</a><a href="#work">Selected work</a><a href="/how-to-build-a-website-in-nigeria">Website guide</a><a href="mailto:officialsafebase@gmail.com">Email ↗</a><a href="https://github.com/MrDan001" target="_blank" rel="noreferrer">GitHub ↗</a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span>DESIGNED WITH INTENTION. BUILT FOR BUSINESS.</span></div></footer>
    </>
  );
}
