import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type DemoCard = { title: string; description: string; image: string; alt: string; label: string };

type DemoSite = {
  name: string;
  descriptor: string;
  title: string;
  intro: string;
  primaryAction: string;
  sectionTitle: string;
  sectionIntro: string;
  cards: DemoCard[];
  closingTitle: string;
  closingText: string;
};

const demos: Record<string, DemoSite> = {
  'event-planner': {
    name: 'Gather & Grace', descriptor: 'EVENT DESIGN · PLANNING · EXPERIENCES', title: 'Make room for moments that stay with you.', intro: 'Thoughtful celebrations, beautifully brought together. From the first idea to the final detail, every moment deserves care.', primaryAction: 'Start planning', sectionTitle: 'Every detail, considered.', sectionIntro: 'A flexible showcase for event styling, planning services and the kind of atmosphere your clients want to see before they enquire.',
    cards: [
      { title: 'The celebration edit', description: 'A visual story for weddings, milestone celebrations and once-in-a-lifetime days.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85', alt: 'Elegant wedding reception styling', label: 'WEDDINGS & CELEBRATIONS' },
      { title: 'Spaces with feeling', description: 'Showcase tablescapes, floral details, lighting and venue transformations.', image: 'https://images.unsplash.com/photo-1507504031003-b417219a0d6b?auto=format&fit=crop&w=1000&q=85', alt: 'Warmly styled event space', label: 'EVENT STYLING' },
      { title: 'Made to come together', description: 'Explain your planning approach and help clients understand how to get started.', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85', alt: 'Thoughtful event table details', label: 'PLANNING & COORDINATION' },
    ], closingTitle: 'Your next celebration starts with a conversation.', closingText: 'A clear enquiry path helps the right clients tell you what they are planning and how you can help.',
  },
  'fashion-boutique': {
    name: 'NAYA / STYLE HOUSE', descriptor: 'CURATED FASHION · EVERYDAY EXPRESSION', title: 'A style of your own. A story in every piece.', intro: 'A considered edit of pieces made to move with you. Discover the latest collection, find your look and make an enquiry with ease.', primaryAction: 'Explore the edit', sectionTitle: 'A collection worth exploring.', sectionIntro: 'Give each collection its own space with a strong visual identity, clear product details and a simple route to order.',
    cards: [
      { title: 'The new edit', description: 'Introduce new arrivals and seasonal highlights with a strong editorial image.', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85', alt: 'Contemporary fashion editorial', label: 'NEW ARRIVALS' },
      { title: 'Everyday signatures', description: 'Organise pieces into easy-to-browse categories and collections.', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85', alt: 'Fashion styling and shopping', label: 'THE WARDROBE' },
      { title: 'The lookbook', description: 'Use a visual journal to help visitors imagine how pieces work together.', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85', alt: 'Fashion lookbook portrait', label: 'STYLE NOTES' },
    ], closingTitle: 'Let your next collection find its audience.', closingText: 'A boutique website can bring your collections, brand story and ordering process together in one place.',
  },
  restaurant: {
    name: 'MESA / kitchen & table', descriptor: 'GOOD FOOD · GOOD COMPANY', title: 'Gather around something good.', intro: 'A welcoming place for memorable meals and good company. Explore the menu, discover the atmosphere and plan your next visit.', primaryAction: 'View the menu', sectionTitle: 'A taste of what we do.', sectionIntro: 'Put your menu, food photography, location details and booking enquiries where customers can find them quickly.',
    cards: [
      { title: 'From the kitchen', description: 'Highlight signature plates and give customers a reason to browse the menu.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85', alt: 'Beautifully presented restaurant meal', label: 'THE MENU' },
      { title: 'The table is ready', description: 'Show the dining atmosphere and help guests picture the experience.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85', alt: 'Warm restaurant interior', label: 'THE EXPERIENCE' },
      { title: 'Made for sharing', description: 'Give catering and group enquiries a clear path from interest to conversation.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=85', alt: 'Food prepared for sharing', label: 'CATERING & EVENTS' },
    ], closingTitle: 'Make it easy to choose your table.', closingText: 'A restaurant website can answer the essentials before a customer even picks up the phone.',
  },
  'beauty-salon': {
    name: 'AUREL / beauty studio', descriptor: 'BEAUTY · CARE · CONFIDENCE', title: 'A little time for your best self.', intro: 'A calm space for thoughtful beauty services and personal care. Explore the treatments, meet the studio and request an appointment.', primaryAction: 'Request an appointment', sectionTitle: 'The details make the difference.', sectionIntro: 'Present your services, results and studio atmosphere in a way that builds confidence before the first appointment.',
    cards: [
      { title: 'The service menu', description: 'Make treatments, service descriptions and essential information easy to scan.', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85', alt: 'Beauty and makeup styling', label: 'SERVICES' },
      { title: 'The studio', description: 'Bring the look and feeling of your space into the online experience.', image: 'https://images.unsplash.com/photo-1600948836101-f9f03dd557db?auto=format&fit=crop&w=1000&q=85', alt: 'Modern beauty studio interior', label: 'OUR SPACE' },
      { title: 'The finished look', description: 'Showcase your work and help new clients understand your style.', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85', alt: 'Beauty portrait', label: 'THE PORTFOLIO' },
    ], closingTitle: 'Turn a first visit into a booked appointment.', closingText: 'A focused website gives new and returning clients a simple way to explore services and get in touch.',
  },
  printing: {
    name: 'FORM / print studio', descriptor: 'PRINT · DESIGN · FINISH', title: 'Make every detail count.', intro: 'Ideas deserve a great finish. Explore print services, see the possibilities and tell us what you need to bring to life.', primaryAction: 'Request a quote', sectionTitle: 'From idea to finished piece.', sectionIntro: 'A digital catalogue helps customers understand your capabilities, see examples and request the right service.',
    cards: [
      { title: 'Print that gets noticed', description: 'Show flyers, brochures, business stationery and promotional materials.', image: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=1000&q=85', alt: 'Printed design materials on a desk', label: 'COMMERCIAL PRINT' },
      { title: 'Packaging & presentation', description: 'Highlight the materials, finishes and packaging work you can produce.', image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=1000&q=85', alt: 'Packaging and printed paper details', label: 'PACKAGING' },
      { title: 'Designed to be seen', description: 'Build confidence with a portfolio of completed design and print work.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85', alt: 'Creative work and design tools', label: 'DESIGN & BRANDING' },
    ], closingTitle: 'Have a project that needs a great finish?', closingText: 'A quote request form can capture the size, quantity, finish and deadline details you need to prepare an accurate response.',
  },
  'auto-workshop': {
    name: 'MOTION / AUTO CARE', descriptor: 'AUTO DIAGNOSTICS · SERVICE · REPAIR', title: 'Know what your car needs before you approve the work.', intro: 'A professional digital home for an auto workshop, built around diagnostics, transparent service information and easy enquiries.', primaryAction: 'Book a diagnostic', sectionTitle: 'Trust starts before the bonnet opens.', sectionIntro: 'For mechanics and auto specialists, a website can explain expertise, show the workshop and turn searches into inspection requests.',
    cards: [
      { title: 'Diagnostics first', description: 'Explain your inspection process and give customers confidence before repairs begin.', image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1000&q=85', alt: 'Mechanic working on a vehicle', label: 'DIAGNOSTICS' },
      { title: 'Workshop capability', description: 'Show the services you handle, from routine maintenance to specialist repairs.', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1000&q=85', alt: 'Professional vehicle workshop', label: 'AUTO SERVICE' },
      { title: 'Proof of the work', description: 'Use before-and-after projects and customer stories to build trust.', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85', alt: 'Clean modern vehicle', label: 'RECENT WORK' },
    ], closingTitle: 'Turn a Google search into a workshop visit.', closingText: 'A clear service menu, location, WhatsApp enquiry and diagnostic request can make a local workshop much easier to choose.',
  },
  laundry: {
    name: 'FRESH / LAUNDRY CO.', descriptor: 'LAUNDRY · DRY CLEANING · PICKUP', title: 'Clean clothes. Less running around.', intro: 'A polished laundry website that makes services, pricing, pickup and delivery information simple to understand.', primaryAction: 'Request pickup', sectionTitle: 'Make laundry feel effortless.', sectionIntro: 'Laundry businesses can turn repeat customers into a real digital service journey with clear service options and pickup requests.',
    cards: [
      { title: 'Wash, dry & fold', description: 'Explain everyday laundry packages and help customers choose the right service.', image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1000&q=85', alt: 'Freshly folded laundry', label: 'EVERYDAY LAUNDRY' },
      { title: 'Care for special pieces', description: 'Showcase dry cleaning, ironing and garment-care services.', image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1000&q=85', alt: 'Clean clothing ready for care', label: 'DRY CLEANING' },
      { title: 'Pickup made simple', description: 'Give busy customers a quick way to request collection and delivery.', image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1000&q=85', alt: 'Laundry service preparation', label: 'PICKUP & DELIVERY' },
    ], closingTitle: 'Make your next pickup one tap away.', closingText: 'A local laundry site can answer service questions and collect pickup requests while you keep the machines running.',
  },
  catering: {
    name: 'TABLE / CATERING HOUSE', descriptor: 'CATERING · PRIVATE DINING · EVENTS', title: 'Food that gives the occasion its character.', intro: 'A premium catering concept for weddings, corporate events, private dinners and celebrations across Nigeria.', primaryAction: 'Plan an event', sectionTitle: 'Let the food sell the experience.', sectionIntro: 'Caterers need more than a menu: they need a visual portfolio, packages, event types and an enquiry path that qualifies clients.',
    cards: [
      { title: 'Menus with personality', description: 'Present sample menus, cuisine styles and flexible package options.', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85', alt: 'Beautiful catered food spread', label: 'MENUS' },
      { title: 'Built for the occasion', description: 'Show how your catering adapts to weddings, corporate events and private gatherings.', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=85', alt: 'Elegant catered event table', label: 'EVENT CATERING' },
      { title: 'From kitchen to table', description: 'Use a strong portfolio to show presentation, service and attention to detail.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85', alt: 'Professional food preparation', label: 'THE PORTFOLIO' },
    ], closingTitle: 'Give your next client a reason to enquire.', closingText: 'A catering website can package your expertise and make it easier to request a quote for an event.',
  },
  'interior-design': {
    name: 'FORM / INTERIORS', descriptor: 'INTERIOR DESIGN · FIT-OUT · BESPOKE', title: 'Spaces designed around the way you live.', intro: 'A visual-first website concept for Nigerian interior designers, architects and fit-out studios that want their work to speak before the meeting.', primaryAction: 'View the portfolio', sectionTitle: 'Let the work do the talking.', sectionIntro: 'High-value design services need a portfolio that feels as considered as the spaces themselves, plus a clear consultation journey.',
    cards: [
      { title: 'Residential stories', description: 'Present completed homes through photography, project notes and a strong visual narrative.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85', alt: 'Contemporary residential interior', label: 'RESIDENTIAL' },
      { title: 'Commercial spaces', description: 'Show offices, hospitality and retail projects to attract larger commissions.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85', alt: 'Modern commercial interior', label: 'COMMERCIAL' },
      { title: 'Made to measure', description: 'Explain design, furniture, renovation and project-management capabilities.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85', alt: 'Elegant interior design details', label: 'BESPOKE & FIT-OUT' },
    ], closingTitle: 'Your next space deserves a better first impression.', closingText: 'A premium portfolio website helps serious clients understand your taste, process and scope before they book a consultation.',
  },
  cleaning: {
    name: 'NEAT / HOME & OFFICE', descriptor: 'CLEANING · FUMIGATION · FACILITIES', title: 'A cleaner space, without the guesswork.', intro: 'A service-led website concept for professional cleaning companies serving homes, offices, short-lets and commercial spaces.', primaryAction: 'Request a quote', sectionTitle: 'Make the service easy to understand.', sectionIntro: 'Cleaning businesses can win trust online by clearly showing service areas, packages, proof of work and a fast quote path.',
    cards: [
      { title: 'Home care', description: 'Present recurring, deep-cleaning and move-in or move-out services clearly.', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85', alt: 'Professional home cleaning', label: 'RESIDENTIAL' },
      { title: 'Workplace ready', description: 'Show office and commercial cleaning packages for businesses and facilities.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85', alt: 'Clean professional office', label: 'COMMERCIAL' },
      { title: 'Specialist cleaning', description: 'Explain fumigation, post-construction and other specialist services.', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1000&q=85', alt: 'Professional cleaning equipment', label: 'SPECIALIST SERVICES' },
    ], closingTitle: 'Let customers see the standard before they book.', closingText: 'A strong local-service website can turn map searches and referrals into structured quote requests.',
  },
};

export function generateStaticParams() { return Object.keys(demos).map((industry) => ({ industry })); }

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params; const demo = demos[industry];
  if (!demo) return { title: 'Website demo' };
  return { title: demo.name + ' — Website concept', description: demo.intro, robots: { index: false, follow: false } };
}

export default async function IndustryDemo({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params; const demo = demos[industry];
  if (!demo) notFound();
  const subject = encodeURIComponent('Website concept for my business');
  const body = encodeURIComponent('Hello MifiTech,\n\nI viewed the ' + demo.name + ' demo and would like to discuss a website for my business.\n\nBusiness name:\nWhat I need:\n');
  const contactHref = '/?demo=' + encodeURIComponent(industry) + '#contact';
  return (
    <main className={'demo-page demo-' + industry}>
      <div className="demo-disclaimer-bar"><span>CONCEPT PREVIEW</span><span>FICTIONAL BRAND · ILLUSTRATIVE CONTENT · NOT A CLIENT WEBSITE</span><Link href="/#showcase">All demos</Link></div>
      <header className="demo-header"><div className="demo-brand"><Link href="/">{demo.name}</Link><span>{demo.descriptor}</span></div><nav><a href="#story">The experience</a><a href="#offer">Explore</a><a href="#contact">Enquiries</a></nav><a className="demo-header-cta" href="#contact">{demo.primaryAction}</a></header>
      <section className="demo-hero"><div className="demo-hero-copy"><span className="demo-overline">{demo.descriptor}</span><h1>{demo.title}</h1><p>{demo.intro}</p><a className="demo-button" href="#offer">{demo.primaryAction}</a><span className="demo-hero-foot">A SAMPLE WEBSITE EXPERIENCE · MADE FOR MOBILE AND DESKTOP</span></div><div className="demo-hero-image" role="img" aria-label={demo.cards[0].alt} style={{ backgroundImage: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,.36)), url(' + demo.cards[0].image + ')' }}><span className="demo-image-caption">{demo.cards[0].label}</span><span className="demo-image-index">01 — 03</span></div></section>
      <section className="demo-story" id="story"><span className="demo-section-kicker">A DIGITAL HOME THAT FEELS LIKE YOU</span><h2>{demo.sectionTitle}</h2><p>{demo.sectionIntro}</p></section>
      <section className="demo-offer" id="offer"><div className="demo-offer-heading"><span>DISCOVER THE EXPERIENCE</span><h2>Made to be explored.</h2></div><div className="demo-feature-grid">{demo.cards.map((card, index) => <article className="demo-feature" key={card.title}><div className="demo-feature-image" role="img" aria-label={card.alt} style={{ backgroundImage: 'url(' + card.image + ')' }}><span>0{index + 1}</span></div><div className="demo-feature-copy"><span>{card.label}</span><h3>{card.title}</h3><p>{card.description}</p></div></article>)}</div></section>
      <section className="demo-quote" id="contact"><span>LET'S MAKE THIS YOURS</span><h2>{demo.closingTitle}</h2><p>{demo.closingText}</p><a className="demo-button" href={contactHref}>Build a website like this</a><a className="demo-email-link" href={'mailto:officialsafebase@gmail.com?subject=' + subject + '&body=' + body}>Email MifiTech directly</a></section>
      <footer className="demo-footer"><Link href="/" className="demo-powered">A CONCEPT BY <strong>MIFITECH.</strong></Link><span>Illustrative design preview · Not a live business</span><Link href="/#showcase">Explore other demos</Link></footer>
    </main>
  );
}
