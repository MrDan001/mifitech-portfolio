
export type NavigationItem = { label: string; href: string };
export type ServiceItem = { icon: string; name: string; body: string };
export type DemoItem = {
  slug: string; n: string; title: string; brand: string; text: string;
  image: string; tags: string[]; href?: string; visible?: boolean;
  pageTitle?: string; pageIntro?: string; pageSectionTitle?: string; pageSectionIntro?: string; pageClosingTitle?: string; pageClosingText?: string;
};
export type ProjectCaseStudy = {
  challenge: string; approach: string; delivery: string; role: string; outcome: string;
  gallery: string[]; flyer: string;
};
export type ProjectItem = {
  slug: string; image: string; name: string; type: string; text: string;
  websiteUrl: string; repoUrl: string; visible?: boolean;
  stack: string[]; features: string[]; flyer?: string; caseStudy?: ProjectCaseStudy;
};
export type FAQItem = { question: string; answer: string };
export type TestimonialItem = { quote: string; name: string; role: string; company: string };
export type GuideArticle = { eyebrow: string; title: string; intro: string; closingTitle: string; closingText: string };
export type GuideSection = { heading: string; body: string };
export type StageItem = { n: string; title: string; body: string };
export type SiteContent = {
  navigation: NavigationItem[];
  hero: {
    eyebrow: string; kicker: string; title: string; emphasis: string; lead: string;
    primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string;
    visualNote: string; visualIndex: string; visualImage: string; ribbonLead: string; ribbonItems: string[];
  };
  sections: {
    services: { label: string; title: string; emphasis: string; intro: string };
    demos: { label: string; title: string; emphasis: string; intro: string; noteTitle: string; note: string; noteLink: string };
    work: { label: string; title: string; emphasis: string; intro: string };
    about: { label: string; title: string; emphasis: string; paragraphs: string[]; linkLabel: string };
    process: { label: string; title: string; emphasis: string; intro: string; buttonLabel: string };
    guide: { label: string; title: string; intro: string; linkLabel: string; href: string };
    contact: { label: string; title: string; emphasis: string; intro: string; emailLabel: string; email: string; note: string; formTitle: string; formKicker: string; whatsappUrl: string };
  };
  services: ServiceItem[];
  demos: DemoItem[];
  projects: ProjectItem[];
  guideArticle: GuideArticle;
  guideSections: GuideSection[];
  trustPoints: Array<{ title: string; body: string }>;
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
  stages: StageItem[];
  footer: { tagline: string; exploreLabel: string; projectLabel: string; projectCta: string };
};

export const defaultSiteContent: SiteContent = {
  navigation: [
    { label: 'Services', href: '/#services' },
    { label: 'Demo studio', href: '/#demos' },
    { label: 'Our work', href: '/#work' },
    { label: 'Our approach', href: '/#process' },
    { label: 'FAQs', href: '/#faqs' },
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
    visualImage: '/previews/hero-workspace.svg',
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
      title: 'A hands-on digital studio for',
      emphasis: 'real-world work.',
      paragraphs: [
        'MifiTech is a development-led digital studio building websites and software around the problems businesses and their customers actually need to solve.',
        'The work is practical by design: understand the goal, agree the scope, build carefully, test the details and make the next step clear. No inflated claims or unnecessary complexity.',
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
      whatsappUrl: '',
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
    { slug: 'ludo-live', image: '/previews/ludo-live.svg', flyer: '/flyers/ludo-live.svg', name: 'Ludo Live', type: 'GAMING PLATFORM', text: 'A multiplayer Ludo experience with rooms, missions, rewards and player progression.', websiteUrl: '', repoUrl: 'https://github.com/MrDan001/ludo-live', stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Railway'], features: ['Multiplayer game experiences', 'Daily and weekly missions', 'Spin-wheel rewards', 'Player shop, avatars and inventory', 'Tournament and admin tooling', 'Player audit and transaction visibility'], caseStudy: { challenge: 'Turn a familiar board game into a complete online experience with player journeys that go beyond a single match.', approach: 'Bring game rooms, player profiles, social features, missions and rewards into one connected product experience.', delivery: 'A multiplayer Ludo platform with game rooms, missions, reward journeys, player shop and inventory systems, tournaments and admin tooling.', role: 'MifiTech product build and implementation.', outcome: 'A feature-rich browser-based game experience with connected player, game and administration workflows. No unverified user or revenue metrics are claimed.', gallery: [], flyer: '/flyers/ludo-live.svg' } },
    { slug: 'ehealthcare', image: '/previews/ehealthcare.svg', flyer: '/flyers/ehealthcare.svg', name: 'eHealthcare', type: 'HEALTHCARE TECHNOLOGY', text: 'A PHP telemedicine platform built around patient access, consultations and care workflows.', websiteUrl: '', repoUrl: 'https://github.com/MrDan001/ehealthcare-system', stack: ['PHP', 'JavaScript', 'MySQL', 'Railway'], features: ['Patient-facing healthcare journeys', 'Appointment and booking workflows', 'Doctor and nurse service workflows', 'Consultation and patient dashboards', 'Administrative and care coordination tools'], caseStudy: { challenge: 'Make healthcare information and remote-care workflows easier to access through a connected digital service.', approach: 'Bring patient-facing journeys together with booking, consultation, clinical service and administrative workflows.', delivery: 'A PHP telemedicine application with appointment and booking flows, patient and clinician experiences, consultation tools and supporting administration.', role: 'MifiTech product build and implementation.', outcome: 'A broad telemedicine platform with patient, clinician and administrative workflows. The project description focuses on implemented product areas rather than unverified clinical outcomes.', gallery: [], flyer: '/flyers/ehealthcare.svg' } },
    { slug: 'garrison-market', image: '/previews/garrison-market.svg', flyer: '/flyers/garrison-market.svg', name: 'Garrison Market', type: 'BUSINESS OPERATIONS', text: 'An inventory and operations app for shop owners and staff to manage stock, sales and day-to-day work.', websiteUrl: 'https://gmstock.co', repoUrl: 'https://github.com/MrDan001/garrison-market', stack: ['Next.js', 'TypeScript', 'Database'], features: ['Inventory and stock management', 'Staff operations and permissions', 'Sales, orders and reporting workflows', 'Business records and everyday operations', 'Owner and staff workspaces'], caseStudy: { challenge: 'Help shop owners and staff manage the moving parts of daily retail operations without relying on disconnected records.', approach: 'Build an owner-and-staff operations workspace that brings inventory, sales and day-to-day business tasks into one place.', delivery: 'An inventory and business operations application covering stock, staff, sales and supporting workflows. It is an operations tool, not a consumer shopping marketplace.', role: 'MifiTech product build and implementation.', outcome: 'A single operations workspace for shop owners and staff, with the live product available at gmstock.co.', gallery: [], flyer: '/flyers/garrison-market.svg' } },
    { slug: 'the-africa-plug', image: '/previews/the-africa-plug.svg', flyer: '/flyers/the-africa-plug.svg', name: 'The Africa Plug', type: 'MEDIA & PUBLISHING', text: 'A media and publishing experience for African stories, video and editorial content.', websiteUrl: '', repoUrl: 'https://github.com/MrDan001/the-africa-plug', stack: ['Next.js', 'TypeScript', 'Media publishing'], features: ['Editorial and story publishing', 'Video and media content', 'Admin content management', 'Responsive media experience'], caseStudy: { challenge: 'Create a digital home where African stories and media can be presented through a clear, editorial experience.', approach: 'Bring publishing, video content and an admin workflow together so content can be managed without changing the public presentation.', delivery: 'A media and publishing website with story and video sections plus an administration workflow for content updates.', role: 'MifiTech product build and implementation.', outcome: 'A publishing-focused digital experience designed to present African stories, media and editorial content.', gallery: [], flyer: '/flyers/the-africa-plug.svg' } },
  ],
  guideArticle: {
    eyebrow: 'MIFITECH FIELD GUIDE',
    title: 'How to build a website in Nigeria: a practical guide for your business',
    intro: 'A business website helps customers understand what you offer, trust your business and take the next step. Here is how to plan, build and launch one.',
    closingTitle: 'Ready to build a website for your business?',
    closingText: 'MifiTech builds business websites, online stores, booking experiences and custom web applications. Explore our website demos or tell us about your project.',
  },
  guideSections: [
    { heading: '1. Decide what your website should achieve', body: 'Start with the business goal. Do you want more enquiries, bookings, online orders, store visits or a place to explain your services? Choose the main action you want visitors to take and design around it.' },
    { heading: '2. Plan the pages and features', body: 'Most businesses need a homepage, about section, services or products, and contact page. Depending on the business, add a portfolio, gallery, booking form, catalogue, online payments or customer account features. Only add functionality that helps your customers.' },
    { heading: '3. Choose a domain and hosting', body: 'Your domain is your website address. Pick a name that is easy to remember and spell. Hosting keeps your website available online. Confirm who owns the domain, how renewals work, where backups are kept and how you can access your website.' },
    { heading: '4. Prepare your content', body: 'Gather your logo, brand colours, real photos, service descriptions, product details, business hours and contact information. Write in clear language and answer the questions customers commonly ask before they buy.' },
    { heading: '5. Choose a website builder or professional developer', body: 'A DIY builder can work for a simple site if you have time to maintain it. A professional web designer or development studio is useful when you need custom design, ecommerce, booking workflows, integrations or help from planning to launch. Review previous work and get a written proposal with scope, timeline, ownership and support.' },
    { heading: '6. Make it mobile-friendly and fast', body: 'Many customers browse on phones. Make text readable, buttons easy to tap, menus simple and pages quick to load. Test forms, links, booking and checkout journeys on different screen sizes before launch.' },
    { heading: '7. Set up search engine optimisation (SEO)', body: 'Use a clear title and description for every important page, one descriptive main heading, useful subheadings, meaningful image alt text and internal links. Publish original answers to questions your customers search for. Mention only the locations you genuinely serve. Avoid keyword stuffing and copied content. After launch, submit your sitemap in Google Search Console and Bing Webmaster Tools, check that public pages can be crawled and monitor the search terms that bring visitors.' },
    { heading: '8. Understand the cost before you start', body: 'Website prices vary with page count, design, content, ecommerce, booking features, integrations and ongoing support. Ask for a proposal that separates development from domain, hosting and maintenance. Confirm deliverables, milestones, revision limits and payment terms before work begins.' },
    { heading: '9. Launch and keep improving', body: 'Check spelling, contact details, mobile layouts, security, page speed and every enquiry form. After launch, update your content and review enquiries and search performance so the site improves with your business.' },
  ],
  trustPoints: [
    { title: 'Useful before impressive', body: 'We start with the actual problem and build the features that help solve it.' },
    { title: 'Clear scope and next steps', body: 'The deliverables, timeline and investment are discussed before a project begins.' },
    { title: 'Built for everyday use', body: 'Responsive interfaces and practical workflows are considered from the start.' },
    { title: 'Support beyond launch', body: 'Maintenance and improvements can continue as your business evolves.' },
  ],
  faqs: [
    { question: 'What kinds of projects does MifiTech take on?', answer: 'Business websites, online stores and catalogues, booking and enquiry experiences, and custom web applications.' },
    { question: 'How does a project begin?', answer: 'Start with an enquiry. We clarify the goal and requirements, then agree the scope, timeline and proposal before development begins.' },
    { question: 'How long does a website take to build?', answer: 'Timing depends on the number of pages, content readiness and required features. Your proposed timeline is confirmed after the scope is understood.' },
    { question: 'Can you help after the website goes live?', answer: 'Yes. Ongoing support and maintenance can be discussed as part of the project or as a separate arrangement.' },
    { question: 'Who owns my domain and website?', answer: 'Ownership, access and handover expectations should be agreed in writing before the project starts. We recommend that clients retain access to their own domain and essential accounts.' },
    { question: 'Will my website work on mobile phones?', answer: 'Mobile layouts and touch-friendly navigation are part of the design and testing process.' },
  ],
  testimonials: [],
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