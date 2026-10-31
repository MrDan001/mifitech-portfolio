import { db } from '@/lib/backend';

export type NavigationItem = { label: string; href: string };
export type ServiceItem = { icon: string; name: string; body: string };
export type DemoItem = {
  slug: string; n: string; title: string; brand: string; text: string;
  image: string; tags: string[]; href?: string; visible?: boolean;
};
export type ProjectItem = {
  slug: string; image: string; name: string; type: string; text: string;
  websiteUrl: string; repoUrl: string; visible?: boolean;
  stack: string[]; features: string[];
};
export type StageItem = { n: string; title: string; body: string };
export type SiteContent = {
  navigation: NavigationItem[];
  hero: {
    eyebrow: string; kicker: string; title: string; emphasis: string; lead: string;
    primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string;
    visualNote: string; visualIndex: string; ribbonLead: string; ribbonItems: string[];
  };
  sections: {
    services: { label: string; title: string; emphasis: string; intro: string };
    demos: { label: string; title: string; emphasis: string; intro: string; noteTitle: string; note: string; noteLink: string };
    work: { label: string; title: string; emphasis: string; intro: string };
    about: { label: string; title: string; emphasis: string; paragraphs: string[]; linkLabel: string };
    process: { label: string; title: string; emphasis: string; intro: string; buttonLabel: string };
    guide: { label: string; title: string; intro: string; linkLabel: string; href: string };
    contact: { label: string; title: string; emphasis: string; intro: string; emailLabel: string; email: string; note: string; formTitle: string; formKicker: string };
  };
  services: ServiceItem[];
  demos: DemoItem[];
  projects: ProjectItem[];
  stages: StageItem[];
  footer: { tagline: string; exploreLabel: string; projectLabel: string; projectCta: string };
};

export const defaultSiteContent: SiteContent = {
  navigation: [
    { label: 'Services', href: '/#services' },
    { label: 'Demo studio', href: '/#demos' },
    { label: 'Our work', href: '/#work' },
    { label: 'Our approach', href: '/#process' },
    { label: 'Website guide', href: '/how-to-build-a-website-in-nigeria' },
  ],
  hero: {
    eyebrow: 'MODERN WEBSITES FOR REAL BUSINESSES',
    kicker: 'WEB DESIGN · DEVELOPMENT · DIGITAL PRODUCTS',
    title: 'Turn Your Business Into a Powerful',
    emphasis: 'Online Presence.',
    lead: 'MifiTech is a digital studio that designs and builds beautiful, fast and secure websites for businesses in Nigeria and beyond.',
    primaryLabel: 'View Our Demo Websites',
    primaryHref: '#demos',
    secondaryLabel: 'Contact Us',
    secondaryHref: '#contact',
    visualNote: 'Great websites\\nbuild trust',
    visualIndex: 'MIFITECH / DIGITAL STUDIO',
    ribbonLead: 'FROM FIRST IDEA TO LIVE WEBSITE',
    ribbonItems: ['STRATEGY', 'DESIGN', 'DEVELOPMENT', 'LAUNCH'],
  },
  sections: {
    services: {
      label: '01 / OUR SERVICES',
      title: 'Everything You Need to',
      emphasis: 'Succeed Online.',
      intro: 'Practical digital solutions, from the first design decision to the support that keeps your business moving.',
    },
    demos: {
      label: '02 / WEBSITE DEMO STUDIO',
      title: 'Explore Our Industry',
      emphasis: 'Website Demos.',
      intro: 'See how your business could look with a professional website. Choose an industry to explore a live concept, then tell us what you need.',
      noteTitle: 'GOOD TO KNOW',
      note: 'These are sample brands and illustrative concepts. Your final website is designed around your business.',
      noteLink: 'Request Your Own Website',
    },
    work: {
      label: '03 / OUR WORK',
      title: 'Selected work.',
      emphasis: 'Real products.',
      intro: 'Digital products and platforms from the MifiTech portfolio. Explore the thinking and experience behind each build.',
    },
    about: {
      label: '04 / WHY MIFITECH',
      title: 'Your website should work as hard as',
      emphasis: 'you do.',
      paragraphs: [
        "People discover businesses in many places. When they're ready to know more, your website should make the next step obvious.",
        'We bring your story, services and customer journey together in one considered digital experience — so people can understand what you offer and feel confident getting in touch.',
      ],
      linkLabel: 'See how we work',
    },
    process: {
      label: '05 / THE APPROACH',
      title: 'Good work.',
      emphasis: 'Clear process.',
      intro: "No unnecessary complexity. You'll know what we're making, what it costs and what happens next.",
      buttonLabel: 'Start a conversation',
    },
    guide: {
      label: 'A GOOD PLACE TO START',
      title: 'Planning your first business website?',
      intro: 'Our practical guide covers domains, hosting, content, features, costs and the basics of SEO for Nigerian businesses.',
      linkLabel: 'Read: How to build a website in Nigeria',
      href: '/how-to-build-a-website-in-nigeria',
    },
    contact: {
      label: '06 / YOUR PROJECT',
      title: "Let's build something",
      emphasis: 'great.',
      intro: 'Tell us about your business and what you want your website to achieve. We\'ll help you work out the right next step.',
      emailLabel: 'EMAIL THE STUDIO',
      email: 'officialsafebase@gmail.com',
      note: 'A few details are enough to begin. No complicated brief required.',
      formTitle: 'PROJECT ENQUIRY',
      formKicker: "LET'S START HERE ↘",
    },
  },
  services: [
    { icon: 'website', name: 'Website Design', body: 'Beautiful, modern websites that work smoothly on every screen.' },
    { icon: 'store', name: 'E-commerce Solutions', body: 'Product catalogues and shopping journeys that make it easier to sell.' },
    { icon: 'apps', name: 'Web Applications', body: 'Custom digital tools built around the way your business works.' },
    { icon: 'search', name: 'SEO & Digital Marketing', body: 'A stronger foundation for search visibility and customer discovery.' },
    { icon: 'maintenance', name: 'Website Maintenance', body: 'Updates, improvements and the practical care your website needs.' },
    { icon: 'support', name: 'Ongoing Support', body: 'A dependable technical partner as your business keeps moving.' },
  ],
  demos: [
    { slug: 'restaurant', n: '01', title: 'Restaurant & catering', brand: 'MESA / KITCHEN', text: 'Menus, food galleries and reservations in one welcoming place.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=85', tags: ['Menu', 'Gallery', 'Bookings'] },
    { slug: 'beauty-salon', n: '02', title: 'Beauty & wellness', brand: 'AUREL / BEAUTY STUDIO', text: 'Services, results and appointment requests presented with care.', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1100&q=85', tags: ['Services', 'Gallery', 'Appointments'] },
    { slug: 'fashion-boutique', n: '03', title: 'Fashion & retail', brand: 'NAYA / STYLE HOUSE', text: 'Collections, product stories and a smoother route to ordering.', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=85', tags: ['Lookbook', 'Catalogue', 'Orders'] },
    { slug: 'event-planner', n: '04', title: 'Events & experiences', brand: 'GATHER & GRACE', text: 'A beautiful way to present your work, packages and enquiries.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=85', tags: ['Portfolio', 'Packages', 'Enquiries'] },
    { slug: 'printing', n: '05', title: 'Printing & creative', brand: 'FORM / PRINT STUDIO', text: 'Show your capabilities, completed work and request a quote.', image: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=1100&q=85', tags: ['Services', 'Portfolio', 'Quotes'] },
    { slug: 'auto-workshop', n: '06', title: 'Auto workshops', brand: 'MOTION / AUTO CARE', text: 'Diagnostics, services, recent work and easy workshop enquiries.', image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1100&q=85', tags: ['Diagnostics', 'Services', 'Bookings'] },
    { slug: 'laundry', n: '07', title: 'Laundry & dry cleaning', brand: 'FRESH / LAUNDRY CO.', text: 'Services, garment care and pickup requests built for busy customers.', image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1100&q=85', tags: ['Services', 'Pickup', 'Delivery'] },
    { slug: 'catering', n: '08', title: 'Catering services', brand: 'TABLE / CATERING HOUSE', text: 'Menus, event packages and visual proof that turn enquiries into conversations.', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1100&q=85', tags: ['Menus', 'Events', 'Quotes'] },
    { slug: 'interior-design', n: '09', title: 'Interior design', brand: 'FORM / INTERIORS', text: 'A premium portfolio for residential, commercial and bespoke projects.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85', tags: ['Portfolio', 'Projects', 'Consultations'] },
    { slug: 'cleaning', n: '10', title: 'Cleaning & facilities', brand: 'NEAT / HOME & OFFICE', text: 'Service packages, proof of work and fast quote requests for local customers.', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1100&q=85', tags: ['Services', 'Commercial', 'Quotes'] },
    { slug: 'private-clinic', n: '11', title: 'Private clinics & dental', brand: 'WELLSPRING / MEDICAL CENTRE', text: 'Doctor profiles, services, opening hours and appointment requests in a reassuring format.', image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=1100&q=85', tags: ['Care services', 'Doctors', 'Appointments'] },
    { slug: 'school', n: '12', title: 'Private schools', brand: 'NORTHSTAR / ACADEMY', text: 'Admissions, academics, school life and parent enquiries in one clear digital home.', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1100&q=85', tags: ['Admissions', 'Academics', 'School life'] },
    { slug: 'logistics', n: '13', title: 'Logistics & dispatch', brand: 'ROUTE / LOGISTICS', text: 'Delivery services, coverage areas and quote requests designed for businesses on the move.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1100&q=85', tags: ['Delivery', 'Coverage', 'Quotes'] },
    { slug: 'real-estate', n: '14', title: 'Real estate agencies', brand: 'HOMESTEAD / REALTY', text: 'Property listings, agent profiles and viewing requests with a polished property-search feel.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1100&q=85', tags: ['Properties', 'Agents', 'Viewings'] },
    { slug: 'car-dealership', n: '15', title: 'Car dealerships', brand: 'APEX / MOTOR HOUSE', text: 'Vehicle inventory, inspection details and buyer enquiries in a showroom-style experience.', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=85', tags: ['Inventory', 'Inspections', 'Enquiries'] },
  ],
  projects: [
    { slug: 'ludo-live', image: '/previews/ludo-live.svg', name: 'Ludo Live', type: 'GAMING PLATFORM', text: 'A multiplayer gaming experience with player journeys, missions and tournaments.', websiteUrl: '', repoUrl: 'https://github.com/MrDan001/ludo-live', stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Railway'], features: ['Multiplayer game experiences', 'Missions and reward systems', 'Tournament and admin tooling', 'Player shop and inventory systems', 'Player audit and transaction visibility', 'Production deployment and debugging'] },
    { slug: 'ehealthcare', image: '/previews/ehealthcare.svg', name: 'eHealthcare', type: 'HEALTHCARE TECHNOLOGY', text: 'A digital healthcare platform built around patient access and care workflows.', websiteUrl: '', repoUrl: 'https://github.com/MrDan001/ehealthcare-system', stack: ['Next.js', 'TypeScript', 'PostgreSQL'], features: ['Healthcare-focused digital experience', 'Service and information workflows', 'Product UI and system design', 'Repository-backed project documentation'] },
    { slug: 'garrison-market', image: '/previews/garrison-market.svg', name: 'Garrison Market', type: 'BUSINESS OPERATIONS', text: 'An operations platform for inventory, staff, sales and everyday business management.', websiteUrl: 'https://gmstock.co', repoUrl: 'https://github.com/MrDan001/garrison-market', stack: ['Next.js', 'TypeScript', 'Database'], features: ['Inventory management', 'Staff operations', 'Sales workflows', 'Day-to-day business management', 'Single-place operational view'] },
    { slug: 'the-africa-plug', image: '/previews/the-africa-plug.svg', name: 'The Africa Plug', type: 'MEDIA & PUBLISHING', text: 'A publishing experience for stories, video and African media.', websiteUrl: '', repoUrl: 'https://github.com/MrDan001/the-africa-plug', stack: ['Next.js', 'TypeScript', 'Media'], features: ['Video and media section', 'Publishing workflow', 'Content updates', 'Production deployment'] },
  ],
  stages: [
    { n: '01', title: 'Understand', body: 'We get to know your business, your customers and the result you need.' },
    { n: '02', title: 'Shape', body: 'We agree the structure, visual direction, scope and project plan before building.' },
    { n: '03', title: 'Build', body: 'We develop the experience, test the details and refine it with your feedback.' },
    { n: '04', title: 'Launch', body: 'We take your website live and walk you through what happens next.' },
  ],
  footer: {
    tagline: 'Modern websites and digital products for businesses in Nigeria and beyond.',
    exploreLabel: 'EXPLORE',
    projectLabel: 'START A PROJECT',
    projectCta: 'Tell us what you need',
  },
};

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const rows = await db<Array<{ value: Partial<SiteContent> }>>('site_settings?key=eq.content&select=value&limit=1');
    const saved = rows[0]?.value;
    if (!saved || typeof saved !== 'object') return defaultSiteContent;

    const savedSections = saved.sections || {};
    const content: SiteContent = {
      ...defaultSiteContent,
      ...saved,
      hero: { ...defaultSiteContent.hero, ...(saved.hero || {}) },
      sections: {
        services: { ...defaultSiteContent.sections.services, ...(savedSections.services || {}) },
        demos: { ...defaultSiteContent.sections.demos, ...(savedSections.demos || {}) },
        work: { ...defaultSiteContent.sections.work, ...(savedSections.work || {}) },
        about: { ...defaultSiteContent.sections.about, ...(savedSections.about || {}) },
        process: { ...defaultSiteContent.sections.process, ...(savedSections.process || {}) },
        guide: { ...defaultSiteContent.sections.guide, ...(savedSections.guide || {}) },
        contact: { ...defaultSiteContent.sections.contact, ...(savedSections.contact || {}) },
      },
      footer: { ...defaultSiteContent.footer, ...(saved.footer || {}) },
      navigation: Array.isArray(saved.navigation) ? saved.navigation : defaultSiteContent.navigation,
      services: Array.isArray(saved.services) ? saved.services : defaultSiteContent.services,
      demos: Array.isArray(saved.demos) ? saved.demos : defaultSiteContent.demos,
      projects: Array.isArray(saved.projects) ? saved.projects : defaultSiteContent.projects,
      stages: Array.isArray(saved.stages) ? saved.stages : defaultSiteContent.stages,
    };
    return content;
  } catch {
    return defaultSiteContent;
  }
}
