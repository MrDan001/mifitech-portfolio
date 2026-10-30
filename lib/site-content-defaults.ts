export type HomepageContent = {
  hero: { eyebrow: string; kicker: string; title: string; accent: string; description: string; primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string; image: string; imageAlt: string; note: string };
  sections: {
    servicesTitle: string; servicesAccent: string; servicesDescription: string;
    demosTitle: string; demosAccent: string; demosDescription: string;
    workTitle: string; workAccent: string; workDescription: string;
    aboutTitle: string; aboutAccent: string; aboutParagraphOne: string; aboutParagraphTwo: string;
    processTitle: string; processAccent: string; processDescription: string;
    guideTitle: string; guideDescription: string; guideLinkLabel: string;
    contactTitle: string; contactAccent: string; contactDescription: string; contactNote: string;
  };
  services: Array<{ id: string; icon: string; name: string; body: string; active: boolean }>;
  demos: Array<{ id: string; slug: string; n: string; title: string; brand: string; text: string; image: string; tags: string; active: boolean }>;
  projects: Array<{ id: string; slug: string; image: string; name: string; type: string; text: string; live: string; active: boolean }>;
  stages: Array<{ id: string; title: string; body: string; active: boolean }>;
  contact: { email: string };
};

export const defaultHomepageContent: HomepageContent = {
  hero: {
    eyebrow: 'MODERN WEBSITES FOR REAL BUSINESSES', kicker: 'WEB DESIGN · DEVELOPMENT · DIGITAL PRODUCTS',
    title: 'Turn Your Business Into a Powerful', accent: 'Online Presence.',
    description: 'MifiTech is a digital studio that designs and builds beautiful, fast and secure websites for businesses in Nigeria and beyond.',
    primaryLabel: 'View Our Demo Websites', primaryHref: '#demos', secondaryLabel: 'Contact Us', secondaryHref: '#contact',
    image: 'https://images.unsplash.com/photo-1610473199899-fc0ec6e204bb?auto=format&fit=crop&fm=jpg&q=85&w=1800',
    imageAlt: 'A business owner working on her laptop in a bright, welcoming workspace', note: 'Great websites build trust',
  },
  sections: {
    servicesTitle: 'Everything You Need to', servicesAccent: 'Succeed Online.',
    servicesDescription: 'Practical digital solutions, from the first design decision to the support that keeps your business moving.',
    demosTitle: 'Explore Our Industry', demosAccent: 'Website Demos.',
    demosDescription: 'See how your business could look with a professional website. Choose an industry to explore a live concept, then tell us what you need.',
    workTitle: 'Selected work.', workAccent: 'Real products.',
    workDescription: 'Digital products and platforms from the MifiTech portfolio. Explore the thinking and experience behind each build.',
    aboutTitle: 'Your website should work as hard as', aboutAccent: 'you do.',
    aboutParagraphOne: "People discover businesses in many places. When they're ready to know more, your website should make the next step obvious.",
    aboutParagraphTwo: 'We bring your story, services and customer journey together in one considered digital experience — so people can understand what you offer and feel confident getting in touch.',
    processTitle: 'Good work.', processAccent: 'Clear process.',
    processDescription: "No unnecessary complexity. You'll know what we're making, what it costs and what happens next.",
    guideTitle: 'Planning your first business website?',
    guideDescription: 'Our practical guide covers domains, hosting, content, features, costs and the basics of SEO for Nigerian businesses.',
    guideLinkLabel: 'Read: How to build a website in Nigeria',
    contactTitle: "Let's build something", contactAccent: 'great.',
    contactDescription: 'Tell us about your business and what you want your website to achieve. We’ll help you work out the right next step.',
    contactNote: 'A few details are enough to begin. No complicated brief required.',
  },
  services: [
    {id:'service-website-design',icon:'website',name:'Website Design',body:'Beautiful, modern websites that work smoothly on every screen.',active:true},
    {id:'service-ecommerce',icon:'store',name:'E-commerce Solutions',body:'Product catalogues and shopping journeys that make it easier to sell.',active:true},
    {id:'service-web-apps',icon:'apps',name:'Web Applications',body:'Custom digital tools built around the way your business works.',active:true},
    {id:'service-seo',icon:'search',name:'SEO & Digital Marketing',body:'A stronger foundation for search visibility and customer discovery.',active:true},
    {id:'service-maintenance',icon:'maintenance',name:'Website Maintenance',body:'Updates, improvements and the practical care your website needs.',active:true},
    {id:'service-support',icon:'support',name:'Ongoing Support',body:'A dependable technical partner as your business keeps moving.',active:true}
  ],
  demos: [
    {id:'demo-restaurant',slug:'restaurant',n:'01',title:'Restaurant & catering',brand:'MESA / KITCHEN',text:'Menus, food galleries and reservations in one welcoming place.',image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=85',tags:'Menu, Gallery, Bookings',active:true},
    {id:'demo-beauty',slug:'beauty-salon',n:'02',title:'Beauty & wellness',brand:'AUREL / BEAUTY STUDIO',text:'Services, results and appointment requests presented with care.',image:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1100&q=85',tags:'Services, Gallery, Appointments',active:true},
    {id:'demo-fashion',slug:'fashion-boutique',n:'03',title:'Fashion & retail',brand:'NAYA / STYLE HOUSE',text:'Collections, product stories and a smoother route to ordering.',image:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=85',tags:'Lookbook, Catalogue, Orders',active:true},
    {id:'demo-events',slug:'event-planner',n:'04',title:'Events & experiences',brand:'GATHER & GRACE',text:'A beautiful way to present your work, packages and enquiries.',image:'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=85',tags:'Portfolio, Packages, Enquiries',active:true},
    {id:'demo-printing',slug:'printing',n:'05',title:'Printing & creative',brand:'FORM / PRINT STUDIO',text:'Show your capabilities, completed work and request a quote.',image:'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=1100&q=85',tags:'Services, Portfolio, Quotes',active:true}
  ],
  projects: [
    {id:'project-ludo',slug:'ludo-live',image:'/previews/ludo-live.svg',name:'Ludo Live',type:'GAMING PLATFORM',text:'A multiplayer gaming experience with player journeys, missions and tournaments.',live:'https://ludo-live.up.railway.app',active:true},
    {id:'project-ehealthcare',slug:'ehealthcare',image:'/previews/ehealthcare.svg',name:'eHealthcare',type:'HEALTHCARE TECHNOLOGY',text:'A digital healthcare platform built around patient access and care workflows.',live:'',active:true},
    {id:'project-garrison',slug:'garrison-market',image:'/previews/garrison-market.svg',name:'Garrison Market',type:'BUSINESS OPERATIONS',text:'An operations platform for inventory, staff, sales and everyday business management.',live:'https://gmstock.co',active:true},
    {id:'project-africa-plug',slug:'the-africa-plug',image:'/previews/the-africa-plug.svg',name:'The Africa Plug',type:'MEDIA & PUBLISHING',text:'A publishing experience for stories, video and African media.',live:'',active:true}
  ],
  stages: [
    {id:'stage-understand',title:'Understand',body:'We get to know your business, your customers and the result you need.',active:true},
    {id:'stage-shape',title:'Shape',body:'We agree the structure, visual direction, scope and project plan before building.',active:true},
    {id:'stage-build',title:'Build',body:'We develop the experience, test the details and refine it with your feedback.',active:true},
    {id:'stage-launch',title:'Launch',body:'We take your website live and walk you through what happens next.',active:true}
  ],
  contact: { email: 'officialsafebase@gmail.com' },
};

