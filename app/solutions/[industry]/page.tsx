import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/contact';

type Solution = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  demo: string;
  demoLabel: string;
  outcomes: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

const solutions: Record<string, Solution> = {
  restaurant: {
    slug: 'restaurant-website-development-nigeria',
    title: 'Restaurant Website Development in Nigeria',
    description: 'MifiTech builds mobile-friendly restaurant websites in Nigeria with menus, food galleries, location details, reservations and customer enquiry journeys.',
    eyebrow: 'RESTAURANT WEBSITE DESIGN & DEVELOPMENT / NIGERIA',
    intro: 'Help customers discover your restaurant, explore the menu and decide what to do next. MifiTech designs restaurant websites around your food, location, service style and the way customers place enquiries or bookings.',
    demo: 'restaurant',
    demoLabel: 'Explore the restaurant website demo',
    outcomes: [
      { title: 'Menus customers can find', body: 'Present food, drinks, prices and menu categories in a clear format that works on mobile phones.' },
      { title: 'Food and venue photography', body: 'Give signature dishes, the dining space and special experiences room to make a strong first impression.' },
      { title: 'Bookings and enquiries', body: 'Make it easy for customers to ask about tables, private dining, catering and group reservations.' },
      { title: 'Location and opening details', body: 'Show your address, opening hours, contact options and useful visit information.' },
    ],
    faqs: [
      { question: 'Can a restaurant website show our menu?', answer: 'Yes. Menus can be organised into categories with descriptions, prices and images where required.' },
      { question: 'Can customers make reservations online?', answer: 'A booking or reservation enquiry flow can be included in the agreed project scope.' },
      { question: 'Will the website work on phones?', answer: 'MifiTech plans responsive layouts so customers can browse menus and contact the restaurant on mobile devices.' },
    ],
  },
  salon: {
    slug: 'salon-website-design-nigeria',
    title: 'Salon Website Design in Nigeria',
    description: 'MifiTech creates salon and beauty studio websites in Nigeria for showcasing treatments, prices, portfolios, locations and appointment enquiries.',
    eyebrow: 'SALON & BEAUTY WEBSITE DESIGN / NIGERIA',
    intro: 'Give clients a simple way to discover your salon, understand your services and request an appointment. MifiTech builds beauty business websites around your treatments, team, work and customer journey.',
    demo: 'beauty-salon',
    demoLabel: 'Explore the salon website demo',
    outcomes: [
      { title: 'Service and treatment menu', body: 'Organise hair, beauty, nail, spa and wellness services with descriptions and pricing information.' },
      { title: 'Portfolio and results', body: 'Showcase styles, treatments and completed work with a visual gallery.' },
      { title: 'Appointment enquiries', body: 'Give new and returning clients a clear way to request a preferred service and appointment time.' },
      { title: 'Salon information', body: 'Make your location, opening hours, contact details and social links easy to find.' },
    ],
    faqs: [
      { question: 'Can customers request appointments through the website?', answer: 'Yes. An appointment request or booking integration can be planned according to the salon’s workflow.' },
      { question: 'Can I display service prices?', answer: 'Yes. Services can be grouped with descriptions and prices, and updated as your offerings change.' },
      { question: 'Can the website show photos of our work?', answer: 'Yes. A portfolio or gallery can help visitors understand your style and services.' },
    ],
  },
  ecommerce: {
    slug: 'ecommerce-website-development-nigeria',
    title: 'E-commerce Website Development in Nigeria',
    description: 'MifiTech develops ecommerce websites for Nigerian businesses, with product catalogues, shopping carts, checkout journeys and payment integration planning.',
    eyebrow: 'E-COMMERCE WEBSITE DEVELOPMENT / NIGERIA',
    intro: 'Sell beyond a social media page with an online store designed around your products and customers. MifiTech plans ecommerce experiences with clear product discovery, useful product information and a practical route from browsing to order.',
    demo: 'fashion-boutique',
    demoLabel: 'Explore the online store demo',
    outcomes: [
      { title: 'Product catalogues', body: 'Organise products into categories with images, descriptions, options and pricing.' },
      { title: 'Shopping cart and checkout', body: 'Plan a straightforward buying journey from product selection to order submission.' },
      { title: 'Payment integration', body: 'Discuss suitable payment providers and connect the agreed payment workflow.' },
      { title: 'Order and customer journeys', body: 'Make order information, delivery details and customer contact routes clear.' },
    ],
    faqs: [
      { question: 'Can you build an online store for a Nigerian business?', answer: 'Yes. MifiTech can scope ecommerce websites for businesses selling physical or digital products.' },
      { question: 'Can customers pay online?', answer: 'Payment integration can be included after confirming the provider, settlement requirements and checkout workflow.' },
      { question: 'Can I manage products after launch?', answer: 'Product management requirements can be included in the project scope so the store can be maintained by the business.' },
    ],
  },
  clinic: {
    slug: 'clinic-website-development-nigeria',
    title: 'Clinic Website Development in Nigeria',
    description: 'MifiTech designs clinic and healthcare websites in Nigeria to present services, clinician information, opening hours, location and appointment enquiries.',
    eyebrow: 'CLINIC & HEALTHCARE WEBSITE DEVELOPMENT / NIGERIA',
    intro: 'Help patients find accurate information about your clinic and understand how to contact you. MifiTech can build a clear healthcare website for services, clinician profiles, clinic information and appointment enquiries.',
    demo: 'private-clinic',
    demoLabel: 'Explore the clinic website demo',
    outcomes: [
      { title: 'Healthcare services', body: 'Explain available services and provide practical information before a patient contacts the clinic.' },
      { title: 'Clinician profiles', body: 'Present approved professional biographies, qualifications and areas of practice.' },
      { title: 'Appointment enquiries', body: 'Provide a clear route for patients to request appointments and ask administrative questions.' },
      { title: 'Patient information', body: 'Display opening hours, location, contact details and relevant clinic guidance.' },
    ],
    faqs: [
      { question: 'Can a clinic website include doctor profiles?', answer: 'Yes. Clinician profiles can present information supplied and approved by the clinic.' },
      { question: 'Can patients request appointments?', answer: 'An appointment enquiry flow can be included, with the process agreed to suit the clinic.' },
      { question: 'Can the website explain our services?', answer: 'Yes. Service pages can help patients understand what the clinic offers and how to make contact.' },
    ],
  },
  'real-estate': {
    slug: 'real-estate-website-development-nigeria',
    title: 'Real Estate Website Development in Nigeria',
    description: 'MifiTech builds real estate websites for Nigerian property businesses, with property listings, agent information, viewing enquiries and contact details.',
    eyebrow: 'REAL ESTATE WEBSITE DEVELOPMENT / NIGERIA',
    intro: 'Make it easier for property buyers, renters and investors to explore your listings and contact your team. MifiTech plans real estate websites around property discovery, useful listing details and viewing enquiries.',
    demo: 'real-estate',
    demoLabel: 'Explore the real estate website demo',
    outcomes: [
      { title: 'Property listings', body: 'Present properties with photographs, descriptions, location information and key details.' },
      { title: 'Search and categories', body: 'Organise listings by property type, location or the categories relevant to your agency.' },
      { title: 'Viewing enquiries', body: 'Give interested visitors a clear way to ask questions or request a property viewing.' },
      { title: 'Agent and agency profiles', body: 'Introduce your team, explain your services and make contact information easy to find.' },
    ],
    faqs: [
      { question: 'Can I display properties for sale and rent?', answer: 'Yes. Listings can be organised by transaction type, property category and other agreed filters.' },
      { question: 'Can visitors request a viewing?', answer: 'A property enquiry or viewing request flow can be included in the website scope.' },
      { question: 'Can the agency update listings?', answer: 'Property management requirements can be planned so authorised team members can maintain listings.' },
    ],
  },
  school: {
    slug: 'school-website-development-nigeria',
    title: 'School Website Development in Nigeria',
    description: 'MifiTech creates school websites in Nigeria for presenting programmes, admissions information, school news, facilities and parent enquiries.',
    eyebrow: 'SCHOOL WEBSITE DESIGN & DEVELOPMENT / NIGERIA',
    intro: 'Give parents and prospective families one reliable place to learn about your school. MifiTech builds school websites around academic programmes, admissions information, school life and clear enquiry routes.',
    demo: 'school',
    demoLabel: 'Explore the school website demo',
    outcomes: [
      { title: 'Programmes and academics', body: 'Explain classes, curriculum, extracurricular activities and the learning experience.' },
      { title: 'Admissions information', body: 'Present entry requirements, application steps, important dates and admissions contacts.' },
      { title: 'School life and facilities', body: 'Showcase facilities, activities, events and the wider school community.' },
      { title: 'Parent enquiries', body: 'Make it straightforward for families to contact the school and request further information.' },
    ],
    faqs: [
      { question: 'Can the website include admissions information?', answer: 'Yes. Admissions pages can explain the process, requirements, dates and how to contact the school.' },
      { question: 'Can we publish school news and events?', answer: 'A news or updates area can be included, with a suitable content management approach.' },
      { question: 'Can parents make enquiries online?', answer: 'Yes. Contact and admissions enquiry forms can be planned around the school’s process.' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(solutions).map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const page = solutions[industry];
  if (!page) return { title: 'Industry website solutions | MifiTech' };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: '/solutions/' + industry },
    openGraph: { title: page.title + ' | MifiTech', description: page.description, type: 'website' },
  };
}

export default async function IndustrySolutionPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const page = solutions[industry];
  if (!page) notFound();
  const url = SITE_URL + '/solutions/' + industry;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    serviceType: page.title,
    description: page.description,
    provider: { '@id': SITE_URL + '/#business' },
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    url,
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  return (
    <div className="studio-shell">
      <main className="case wrap service-landing">
        <Link href="/" className="back-link">MifiTech home</Link>
        <article>
          <header className="case-hero">
            <div>
              <p className="section-label">{page.eyebrow}</p>
              <h1>{page.title}</h1>
              <p className="case-intro">{page.intro}</p>
              <div className="hero-actions">
                <Link className="button button-dark" href={'/demos/' + page.demo}>Explore the working concept</Link>
                <Link className="button button-light" href={'/?demo=' + encodeURIComponent(page.demo) + '#contact'}>Request a similar website</Link>
              </div>
            </div>
          </header>
          <section className="case-section">
            <p className="section-label">BUILT AROUND YOUR INDUSTRY</p>
            <h2>What your website can include.</h2>
            <div className="facts">
              {page.outcomes.map((item, index) => <div className="fact" key={item.title}><small>{String(index + 1).padStart(2, '0')}</small><strong>{item.title}</strong><p>{item.body}</p></div>)}
            </div>
          </section>
          <section className="case-section">
            <p className="section-label">EXPLORE THE EXPERIENCE</p>
            <h2>Try an industry website concept.</h2>
            <p>This demonstration uses an illustrative sample brand and content. It shows the kind of customer journey MifiTech can tailor to your actual business.</p>
            <div className="hero-actions"><Link className="button button-dark" href={'/demos/' + page.demo}>{page.demoLabel}</Link></div>
          </section>
          <section className="case-section">
            <p className="section-label">COMMON QUESTIONS</p>
            <h2>Questions about {page.title.toLowerCase()}.</h2>
            {page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </section>
          <section className="case-section case-cta">
            <div><p className="section-label">START YOUR PROJECT</p><h2>Need a website for your business?</h2><p>Tell MifiTech about your business, the features you need and the result you want to achieve.</p></div>
            <div className="hero-actions"><Link className="button button-dark" href={'/?demo=' + encodeURIComponent(page.demo) + '#contact'}>Discuss your website</Link></div>
          </section>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, faqSchema]) }} />
    </div>
  );
}
