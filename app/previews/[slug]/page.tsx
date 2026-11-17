import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Private Website Concept Preview | MifiTech',
  robots: { index: false, follow: false, noarchive: true },
};

type Concept = {
  company: string;
  eyebrow: string;
  headline: string;
  intro: string;
  accent: string;
  image: string;
  facts: string[];
  services: { title: string; body: string }[];
  journey: { title: string; body: string }[];
  closing: string;
};

const concepts: Record<string, Concept> = {
  'odogwu-group': {
    company: 'Odogwu Group of Companies',
    eyebrow: 'A digital home for a diversified group',
    headline: 'Many industries. One connected story.',
    intro: 'A group-level experience that introduces the organisation clearly, helps visitors explore its business interests and creates a direct path for partnership enquiries.',
    accent: '#c18a4a',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
    facts: ['Manufacturing', 'Real estate', 'Hospitality', 'Travel & tourism', 'Publishing', 'Telecommunications', 'Agriculture', 'Financial services'],
    services: [
      { title: 'Explore the group', body: 'A clear introduction to the group and the range of industries represented across its business portfolio.' },
      { title: 'Business divisions', body: 'Dedicated spaces for each business interest, with room for its services, projects and contact details.' },
      { title: 'Partnership enquiries', body: 'A more direct route for distributors, investors, suppliers and prospective business partners to make contact.' },
    ],
    journey: [
      { title: 'Understand the group', body: 'Visitors quickly learn who the organisation is and the sectors in which it operates.' },
      { title: 'Find the right division', body: 'A structured portfolio helps visitors move to the area relevant to their needs.' },
      { title: 'Start a conversation', body: 'A focused enquiry path captures the purpose of each business conversation.' },
    ],
    closing: 'A clearer digital presence for the group’s many areas of work.',
  },
  'ansett-group': {
    company: 'Ansett Group',
    eyebrow: 'A connected experience across specialist businesses',
    headline: 'Specialist capabilities, easier to explore.',
    intro: 'A group website concept that brings healthcare, oil and gas services, laboratory capabilities and industrial operations into a clearer, more connected visitor experience.',
    accent: '#3c9b91',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1800&q=85',
    facts: ['Diagnostic healthcare', 'Core analysis & oilfield services', 'Industrial production', 'Facilities & laboratories'],
    services: [
      { title: 'Ansett Diagnostic Hospital', body: 'A dedicated healthcare pathway for hospital information, care areas, location details and patient enquiries.' },
      { title: 'Ansett Integrated Services', body: 'A structured technical services area for core handling, core analysis, laboratory services and specialist capabilities.' },
      { title: 'Ansett Industries', body: 'A product and industrial services showcase with clearer routes for project, supply and distribution enquiries.' },
    ],
    journey: [
      { title: 'Choose a business', body: 'Visitors can identify the right Ansett company without searching through unrelated information.' },
      { title: 'Understand capabilities', body: 'Service pages explain the work, facilities and relevant expertise in a consistent format.' },
      { title: 'Send a focused enquiry', body: 'Enquiries can be routed by business area so the right team receives the request.' },
    ],
    closing: 'One connected group experience, with a distinct path for each specialist business.',
  },
  'balmoral-group': {
    company: 'Balmoral Group',
    eyebrow: 'A venue discovery and event enquiry concept',
    headline: 'Find the right space for every occasion.',
    intro: 'A venue-led experience designed to help event planners compare locations, explore the atmosphere and take the next step towards a venue tour or event enquiry.',
    accent: '#b48b52',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=85',
    facts: ['Ikoyi', 'Victoria Island', 'Ikeja', 'Oregun'],
    services: [
      { title: 'Discover the venues', body: 'A visual overview of the group’s event spaces, with clear location and venue details.' },
      { title: 'Plan an occasion', body: 'Dedicated enquiry paths for weddings, conferences, celebrations and corporate events.' },
      { title: 'Arrange a venue tour', body: 'A simple way for prospective clients to request a viewing and share their event requirements.' },
    ],
    journey: [
      { title: 'Browse by occasion', body: 'Visitors begin with the kind of event they are planning.' },
      { title: 'Explore suitable spaces', body: 'Venue details and imagery help them shortlist the right location.' },
      { title: 'Request a tour', body: 'A focused enquiry captures preferred date, guest count and contact details.' },
    ],
    closing: 'A smoother path from discovering a venue to arranging a visit.',
  },
};

export function generateStaticParams() {
  return Object.keys(concepts).map((slug) => ({ slug }));
}

export default async function PrivateConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = concepts[slug];
  if (!c) notFound();

  const wa = 'https://wa.me/2349067859200?text=' + encodeURIComponent('Hello MifiTech, I saw the website concept created for ' + c.company + ' and would like to discuss it.');
  return (
    <main style={{ minHeight: '100vh', background: '#f7f6f2', color: '#18201f', fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        *{box-sizing:border-box}.pc-wrap{width:min(1160px,calc(100% - 40px));margin:auto}
        .pc-top{padding:14px 0;background:#17211f;color:#e9eee9;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
        .pc-nav{display:flex;align-items:center;justify-content:space-between;padding:22px 0}
        .pc-brand{font-weight:800;letter-spacing:.12em;font-size:17px}.pc-brand span{display:block;font-size:9px;font-weight:500;letter-spacing:.2em;color:#78827d;margin-top:5px}
        .pc-nav a,.pc-cta a{color:inherit;text-decoration:none}.pc-pill{display:inline-block;border:1px solid #a9b2ab;border-radius:30px;padding:12px 18px;font-size:13px}
        .pc-hero{position:relative;min-height:560px;display:flex;align-items:center;color:white;background:#1b2725;overflow:hidden}
        .pc-hero:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(13,24,22,.92),rgba(13,24,22,.68) 54%,rgba(13,24,22,.2)),var(--hero) center/cover}
        .pc-hero-inner{position:relative;padding:90px 0;max-width:760px}.pc-kicker{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:700}
        .pc-hero h1{font-family:Georgia,serif;font-weight:400;font-size:clamp(42px,6vw,76px);line-height:1.02;letter-spacing:-.04em;margin:22px 0}
        .pc-hero p{font-size:18px;line-height:1.7;color:#e0e6e1;max-width:630px}.pc-button{display:inline-block;background:var(--accent);color:#14201e!important;text-decoration:none;padding:15px 22px;border-radius:3px;font-weight:700;font-size:13px;margin:18px 10px 0 0}
        .pc-section{padding:86px 0}.pc-section h2{font-family:Georgia,serif;font-weight:400;font-size:clamp(32px,4vw,50px);line-height:1.12;max-width:700px;margin:12px 0 18px}
        .pc-lead{font-size:17px;line-height:1.7;color:#64706a;max-width:700px}.pc-facts{background:#e9ece6;padding:26px 0}.pc-facts-grid{display:flex;gap:12px;flex-wrap:wrap}.pc-facts span{border:1px solid #cbd2ca;padding:11px 15px;border-radius:30px;font-size:13px}
        .pc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}.pc-card{background:white;border:1px solid #e2e4de;padding:28px;min-height:220px}.pc-num{font-size:11px;letter-spacing:.15em;color:var(--accent);font-weight:700}.pc-card h3{font-family:Georgia,serif;font-weight:400;font-size:25px;margin:22px 0 12px}.pc-card p{color:#68736d;line-height:1.65;font-size:14px}
        .pc-dark{background:#182320;color:white}.pc-dark .pc-lead{color:#c5d0c9}.pc-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:25px;margin-top:35px}.pc-step{border-top:1px solid #53615b;padding-top:20px}.pc-step b{font-family:Georgia,serif;font-size:23px;font-weight:400}.pc-step p{color:#bfcac3;line-height:1.65}
        .pc-cta{padding:76px 0;background:#e6e9e2}.pc-cta h2{font-family:Georgia,serif;font-size:clamp(34px,4vw,54px);font-weight:400;max-width:740px;line-height:1.1}.pc-note{font-size:12px;color:#7b847d;margin-top:34px;line-height:1.6}
        @media(max-width:760px){.pc-hero{min-height:560px}.pc-hero-inner{padding:70px 0}.pc-grid,.pc-steps{grid-template-columns:1fr}.pc-section{padding:64px 0}.pc-nav{gap:15px}.pc-nav .pc-pill{padding:10px 12px}}
      `}</style>
      <div className="pc-top"><div className="pc-wrap">A private concept preview prepared by MifiTech · Not the official website</div></div>
      <header className="pc-wrap pc-nav"><div className="pc-brand">MIFITECH<span>WEBSITES · APPLICATIONS · DIGITAL SOLUTIONS</span></div><a className="pc-pill" href={wa}>Discuss this concept</a></header>
      <section className="pc-hero" style={{ ['--hero' as string]: 'url(' + c.image + ')', ['--accent' as string]: c.accent }}>
        <div className="pc-wrap pc-hero-inner"><div className="pc-kicker">{c.eyebrow}</div><h1>{c.headline}</h1><p>{c.intro}</p><a className="pc-button" href="#experience">Explore the concept</a><a className="pc-button" href={wa}>Talk to MifiTech</a></div>
      </section>
      <section className="pc-facts"><div className="pc-wrap pc-facts-grid">{c.facts.map((x) => <span key={x}>{x}</span>)}</div></section>
      <section className="pc-section" id="experience"><div className="pc-wrap"><div className="pc-kicker" style={{color:c.accent}}>THE OPPORTUNITY</div><h2>A more considered way to introduce {c.company} online.</h2><p className="pc-lead">This concept uses publicly available business information as a starting point. The final website would be refined with your team’s preferred content, photography, brand assets and enquiry process.</p><div className="pc-grid">{c.services.map((s,i)=><article className="pc-card" key={s.title}><div className="pc-num">0{i+1} / BUSINESS EXPERIENCE</div><h3>{s.title}</h3><p>{s.body}</p></article>)}</div></div></section>
      <section className="pc-section pc-dark"><div className="pc-wrap"><div className="pc-kicker" style={{color:c.accent}}>A SIMPLE CUSTOMER JOURNEY</div><h2>{c.closing}</h2><p className="pc-lead">The aim is to make the next step clear for every visitor, whether they are researching, comparing services or ready to make an enquiry.</p><div className="pc-steps">{c.journey.map((s,i)=><div className="pc-step" key={s.title}><div className="pc-kicker" style={{color:c.accent}}>STEP 0{i+1}</div><b>{s.title}</b><p>{s.body}</p></div>)}</div></div></section>
      <section className="pc-cta"><div className="pc-wrap"><div className="pc-kicker" style={{color:c.accent}}>PREPARED FOR {c.company.toUpperCase()}</div><h2>We would be glad to walk you through what we envisioned.</h2><p className="pc-lead">This is an independent, no-obligation concept preview by MifiTech. It is not affiliated with or endorsed by {c.company}.</p><a className="pc-button" href={wa}>Chat with MifiTech on WhatsApp</a><a className="pc-pill" href="https://mifitech.top">View MifiTech portfolio</a><p className="pc-note">Concept only · No business relationship is implied · All final content and functionality subject to the company’s approval.</p></div></section>
      <footer style={{padding:'24px 0',background:'#17211f',color:'#bfcac3',fontSize:12}}><div className="pc-wrap">A MifiTech concept preview for {c.company} · © MifiTech</div></footer>
    </main>
  );
}
