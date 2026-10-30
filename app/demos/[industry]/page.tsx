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
    name: 'Gather & Grace',
    descriptor: 'EVENT DESIGN · PLANNING · EXPERIENCES',
    title: 'Make room for moments that stay with you.',
    intro: 'Thoughtful celebrations, beautifully brought together. From the first idea to the final detail, every moment deserves care.',
    primaryAction: 'Start planning',
    sectionTitle: 'Every detail, considered.',
    sectionIntro: 'A flexible showcase for event styling, planning services and the kind of atmosphere your clients want to see before they enquire.',
    cards: [
      { title: 'The celebration edit', description: 'A visual story for weddings, milestone celebrations and once-in-a-lifetime days.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85', alt: 'Elegant wedding reception styling', label: 'WEDDINGS & CELEBRATIONS' },
      { title: 'Spaces with feeling', description: 'Showcase tablescapes, floral details, lighting and venue transformations.', image: 'https://images.unsplash.com/photo-1507504031003-b417219a0d6b?auto=format&fit=crop&w=1000&q=85', alt: 'Warmly styled event space', label: 'EVENT STYLING' },
      { title: 'Made to come together', description: 'Explain your planning approach and help clients understand how to get started.', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85', alt: 'Thoughtful event table details', label: 'PLANNING & COORDINATION' },
    ],
    closingTitle: 'Your next celebration starts with a conversation.',
    closingText: 'A clear enquiry path helps the right clients tell you what they are planning and how you can help.',
  },
  'fashion-boutique': {
    name: 'NAYA / STYLE HOUSE',
    descriptor: 'CURATED FASHION · EVERYDAY EXPRESSION',
    title: 'A style of your own. A story in every piece.',
    intro: 'A considered edit of pieces made to move with you. Discover the latest collection, find your look and make an enquiry with ease.',
    primaryAction: 'Explore the edit',
    sectionTitle: 'A collection worth exploring.',
    sectionIntro: 'Give each collection its own space with a strong visual identity, clear product details and a simple route to order.',
    cards: [
      { title: 'The new edit', description: 'Introduce new arrivals and seasonal highlights with a strong editorial image.', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85', alt: 'Contemporary fashion editorial', label: 'NEW ARRIVALS' },
      { title: 'Everyday signatures', description: 'Organise pieces into easy-to-browse categories and collections.', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85', alt: 'Fashion styling and shopping', label: 'THE WARDROBE' },
      { title: 'The lookbook', description: 'Use a visual journal to help visitors imagine how pieces work together.', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85', alt: 'Fashion lookbook portrait', label: 'STYLE NOTES' },
    ],
    closingTitle: 'Let your next collection find its audience.',
    closingText: 'A boutique website can bring your collections, brand story and ordering process together in one place.',
  },
  restaurant: {
    name: 'MESA / kitchen & table',
    descriptor: 'GOOD FOOD · GOOD COMPANY',
    title: 'Gather around something good.',
    intro: 'A welcoming place for memorable meals and good company. Explore the menu, discover the atmosphere and plan your next visit.',
    primaryAction: 'View the menu',
    sectionTitle: 'A taste of what we do.',
    sectionIntro: 'Put your menu, food photography, location details and booking enquiries where customers can find them quickly.',
    cards: [
      { title: 'From the kitchen', description: 'Highlight signature plates and give customers a reason to browse the menu.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85', alt: 'Beautifully presented restaurant meal', label: 'THE MENU' },
      { title: 'The table is ready', description: 'Show the dining atmosphere and help guests picture the experience.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85', alt: 'Warm restaurant interior', label: 'THE EXPERIENCE' },
      { title: 'Made for sharing', description: 'Give catering and group enquiries a clear path from interest to conversation.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=85', alt: 'Food prepared for sharing', label: 'CATERING & EVENTS' },
    ],
    closingTitle: 'Make it easy to choose your table.',
    closingText: 'A restaurant website can answer the essentials before a customer even picks up the phone.',
  },
  'beauty-salon': {
    name: 'AUREL / beauty studio',
    descriptor: 'BEAUTY · CARE · CONFIDENCE',
    title: 'A little time for your best self.',
    intro: 'A calm space for thoughtful beauty services and personal care. Explore the treatments, meet the studio and request an appointment.',
    primaryAction: 'Request an appointment',
    sectionTitle: 'The details make the difference.',
    sectionIntro: 'Present your services, results and studio atmosphere in a way that builds confidence before the first appointment.',
    cards: [
      { title: 'The service menu', description: 'Make treatments, service descriptions and essential information easy to scan.', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85', alt: 'Beauty and makeup styling', label: 'SERVICES' },
      { title: 'The studio', description: 'Bring the look and feeling of your space into the online experience.', image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1000&q=85', alt: 'Modern beauty studio interior', label: 'OUR SPACE' },
      { title: 'The finished look', description: 'Showcase your work and help new clients understand your style.', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85', alt: 'Beauty portrait', label: 'THE PORTFOLIO' },
    ],
    closingTitle: 'Turn a first visit into a booked appointment.',
    closingText: 'A focused website gives new and returning clients a simple way to explore services and get in touch.',
  },
  printing: {
    name: 'FORM / print studio',
    descriptor: 'PRINT · DESIGN · FINISH',
    title: 'Make every detail count.',
    intro: 'Ideas deserve a great finish. Explore print services, see the possibilities and tell us what you need to bring to life.',
    primaryAction: 'Request a quote',
    sectionTitle: 'From idea to finished piece.',
    sectionIntro: 'A digital catalogue helps customers understand your capabilities, see examples and request the right service.',
    cards: [
      { title: 'Print that gets noticed', description: 'Show flyers, brochures, business stationery and promotional materials.', image: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=1000&q=85', alt: 'Printed design materials on a desk', label: 'COMMERCIAL PRINT' },
      { title: 'Packaging & presentation', description: 'Highlight the materials, finishes and packaging work you can produce.', image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=1000&q=85', alt: 'Packaging and printed paper details', label: 'PACKAGING' },
      { title: 'Designed to be seen', description: 'Build confidence with a portfolio of completed design and print work.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85', alt: 'Creative work and design tools', label: 'DESIGN & BRANDING' },
    ],
    closingTitle: 'Have a project that needs a great finish?',
    closingText: 'A quote request form can capture the size, quantity, finish and deadline details you need to prepare an accurate response.',
  },
};

export function generateStaticParams() {
  return Object.keys(demos).map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const demo = demos[industry];
  if (!demo) return { title: 'Website demo' };
  return {
    title: demo.name + ' — Website concept',
    description: demo.intro,
    robots: { index: false, follow: false },
  };
}

export default async function IndustryDemo({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const demo = demos[industry];
  if (!demo) notFound();

  const subject = encodeURIComponent('Website concept for my business');
  const body = encodeURIComponent('Hello MifiTech,\n\nI viewed the ' + demo.name + ' demo and would like to discuss a website for my business.\n\nBusiness name:\nWhat I need:\n');
  const contactHref = '/?demo=' + encodeURIComponent(industry) + '#contact';

  return (
    <main className={'demo-page demo-' + industry}>
      <div className="demo-disclaimer-bar"><span>CONCEPT PREVIEW</span><span>FICTIONAL BRAND · ILLUSTRATIVE CONTENT · NOT A CLIENT WEBSITE</span><Link href="/#showcase">All demos</Link></div>
      <header className="demo-header">
        <div className="demo-brand"><Link href="/">{demo.name}</Link><span>{demo.descriptor}</span></div>
        <nav><a href="#story">The experience</a><a href="#offer">Explore</a><a href="#contact">Enquiries</a></nav>
        <a className="demo-header-cta" href="#contact">{demo.primaryAction}</a>
      </header>
      <section className="demo-hero">
        <div className="demo-hero-copy">
          <span className="demo-overline">{demo.descriptor}</span>
          <h1>{demo.title}</h1>
          <p>{demo.intro}</p>
          <a className="demo-button" href="#offer">{demo.primaryAction}</a>
          <span className="demo-hero-foot">A SAMPLE WEBSITE EXPERIENCE · MADE FOR MOBILE AND DESKTOP</span>
        </div>
        <div className="demo-hero-image" role="img" aria-label={demo.cards[0].alt} style={{ backgroundImage: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,.36)), url(' + demo.cards[0].image + ')' }}>
          <span className="demo-image-caption">{demo.cards[0].label}</span><span className="demo-image-index">01 — 03</span>
        </div>
      </section>
      <section className="demo-story" id="story"><span className="demo-section-kicker">A DIGITAL HOME THAT FEELS LIKE YOU</span><h2>{demo.sectionTitle}</h2><p>{demo.sectionIntro}</p></section>
      <section className="demo-offer" id="offer">
        <div className="demo-offer-heading"><span>DISCOVER THE EXPERIENCE</span><h2>Made to be explored.</h2></div>
        <div className="demo-feature-grid">{demo.cards.map((card, index) => <article className="demo-feature" key={card.title}><div className="demo-feature-image" role="img" aria-label={card.alt} style={{ backgroundImage: 'url(' + card.image + ')' }}><span>0{index + 1}</span></div><div className="demo-feature-copy"><span>{card.label}</span><h3>{card.title}</h3><p>{card.description}</p></div></article>)}</div>
      </section>
      <section className="demo-quote" id="contact"><span>LET'S MAKE THIS YOURS</span><h2>{demo.closingTitle}</h2><p>{demo.closingText}</p><a className="demo-button" href={contactHref}>Build a website like this</a><a className="demo-email-link" href={'mailto:officialsafebase@gmail.com?subject=' + subject + '&body=' + body}>Email MifiTech directly</a></section>
      <footer className="demo-footer"><Link href="/" className="demo-powered">A CONCEPT BY <strong>MIFITECH.</strong></Link><span>Illustrative design preview · Not a live business</span><Link href="/#showcase">Explore other demos</Link></footer>
    </main>
  );
}
