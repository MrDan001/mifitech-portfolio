import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLandingPage, { type ServicePageContent } from '../../components/ServiceLandingPage';
import { getSiteContent } from '@/lib/site-content';
import type { ProjectItem } from '@/lib/site-content-defaults';
import { projectPath } from '@/lib/project-slug';
import { SITE_URL } from '@/lib/contact';

type Service = { title: string; description: string; page: ServicePageContent };
const services: Record<string, Service> = {
  'web-design': {
    title: 'Website Design & Development',
    description: 'MifiTech designs and develops responsive business websites, service websites and digital experiences for organisations worldwide.',
    page: {
      eyebrow: 'GLOBAL WEBSITE DESIGN & DEVELOPMENT',
      title: 'Websites that help your business move forward.',
      intro: 'Your website should make it easy for the right people to understand what you do, trust your business and take the next step. MifiTech plans, designs and develops responsive websites around your goals, audience and day-to-day operations.',
      previewLabel: 'MIFITECH / BUSINESS WEBSITE',
      previewTitle: 'A clearer experience for every visitor.',
      previewText: 'Purposeful content, thoughtful design and straightforward ways to get in touch.',
      outcomes: [
        { title: 'A strong first impression', body: 'Present your business, services and value clearly with a visual direction that fits your brand.' },
        { title: 'Responsive on every screen', body: 'Create a consistent experience across mobile phones, tablets, laptops and desktop screens.' },
        { title: 'Pages with a clear purpose', body: 'Plan the right mix of home, about, services, portfolio, resources and contact pages.' },
        { title: 'Useful customer journeys', body: 'Guide visitors towards enquiries, bookings, purchases or the next action that matters to your business.' },
        { title: 'Search-ready foundations', body: 'Build with descriptive page titles, useful content, accessible structure and crawlable internal links.' },
        { title: 'Room to grow', body: 'Choose a structure that can support new services, content, markets and features as your business develops.' },
      ],
      process: [
        { title: 'Understand your goals', body: 'We discuss your audience, offer, existing materials and what the website needs to achieve.' },
        { title: 'Agree the scope', body: 'We map the pages and features, confirm responsibilities and provide a clear proposal and timeline.' },
        { title: 'Design, build and test', body: 'We develop the agreed experience and review key journeys across screen sizes.' },
        { title: 'Launch and hand over', body: 'We prepare the website for launch and explain access, updates and any agreed ongoing support.' },
      ],
      faqs: [
        { question: 'Can you work with a business outside Nigeria?', answer: 'Yes. MifiTech is based in Nigeria and works with businesses internationally. Project scope, communication and delivery arrangements are agreed before work begins.' },
        { question: 'Can you redesign an existing website?', answer: 'Yes. We can review the current website, identify the goals for the redesign and agree the pages, content and functionality required.' },
        { question: 'Will my website be mobile-friendly?', answer: 'Responsive layouts and usability across common screen sizes are part of the design and testing process.' },
        { question: 'Can you help with hosting and domain setup?', answer: 'We can discuss domain and hosting requirements as part of the project. The business should retain ownership and access to its domain and essential accounts.' },
      ],
      related: [
        { label: 'E-commerce development', href: '/services/ecommerce-development', description: 'Build a shopping experience around your products and customers.' },
        { label: 'Custom web applications', href: '/services/custom-web-applications', description: 'Create a digital product or workflow tool for your business.' },
        { label: 'Explore website demos', href: '/#demos', description: 'Browse sample website concepts for different industries.' },
        { label: 'Nigeria website design', href: '/website-design-nigeria', description: 'See our dedicated website design information for Nigeria.' },
      ],
    },
  },
  'ecommerce-development': {
    title: 'E-commerce Website Development',
    description: 'MifiTech builds online stores with product catalogues, shopping journeys, checkout planning and order workflows for businesses worldwide.',
    page: {
      eyebrow: 'GLOBAL E-COMMERCE DEVELOPMENT',
      title: 'An online store built around the way you sell.',
      intro: 'Give customers a clear place to discover products, compare options and place orders. MifiTech plans and develops e-commerce experiences around your catalogue, customer journey, fulfilment process and the payment providers available to your business.',
      previewLabel: 'MIFITECH / ONLINE STORE',
      previewTitle: 'From product discovery to order.',
      previewText: 'A useful catalogue, considered checkout and practical order workflows.',
      outcomes: [
        { title: 'Product catalogues', body: 'Organise products with clear categories, images, descriptions, options and pricing.' },
        { title: 'A smoother buying journey', body: 'Help customers move from browsing to product selection, cart and checkout with fewer obstacles.' },
        { title: 'Payment integration planning', body: 'Assess suitable payment providers based on your country, approved accounts, currencies and settlement requirements.' },
        { title: 'Order management', body: 'Plan the tools your team needs to review orders, update statuses and coordinate fulfilment.' },
        { title: 'Mobile-first shopping', body: 'Make product discovery, forms and checkout straightforward on phones and larger screens.' },
        { title: 'Flexible growth', body: 'Allow for catalogue expansion, promotions, delivery rules and integrations within the agreed scope.' },
      ],
      process: [
        { title: 'Map your sales process', body: 'Understand products, customers, delivery, returns, payment requirements and order handling.' },
        { title: 'Plan the store', body: 'Agree catalogue structure, shopping features, integrations and the responsibilities for product content.' },
        { title: 'Build and test', body: 'Develop the store and test product, cart, checkout and order journeys before launch.' },
        { title: 'Launch and support', body: 'Prepare the store for launch and agree the handover and support arrangements.' },
      ],
      faqs: [
        { question: 'Can you build an online store for customers in different countries?', answer: 'Yes. International selling requirements such as currencies, shipping, taxes, payment availability and fulfilment need to be scoped for the markets you intend to serve.' },
        { question: 'Can customers pay online?', answer: 'Payment integration can be planned after confirming the provider, merchant account approval, supported countries and settlement arrangements.' },
        { question: 'Can I manage products and orders?', answer: 'Product and order management tools can be included according to the way your business operates.' },
        { question: 'Can you migrate an existing online store?', answer: 'We can assess the current platform, catalogue and data, then agree a migration scope where the source systems allow it.' },
      ],
      related: [
        { label: 'Website design and development', href: '/services/web-design', description: 'Build the wider website experience for your brand.' },
        { label: 'Business management software', href: '/services/business-software', description: 'Connect sales and operational workflows.' },
        { label: 'Nigeria e-commerce development', href: '/ecommerce-website-development-nigeria', description: 'See our dedicated e-commerce information for Nigeria.' },
      ],
    },
  },
  'custom-web-applications': {
    title: 'Custom Web Application Development',
    description: 'MifiTech designs and develops custom web applications, portals, dashboards and workflow software for organisations worldwide.',
    page: {
      eyebrow: 'GLOBAL CUSTOM SOFTWARE DEVELOPMENT',
      title: 'Custom web applications for the way your organisation works.',
      intro: 'When off-the-shelf tools do not fit your process, a custom web application can bring the right people, information and workflows together. MifiTech plans and builds browser-based applications around your users, business rules and operational goals.',
      previewLabel: 'MIFITECH / CUSTOM WEB APPLICATION',
      previewTitle: 'Your process, connected in one place.',
      previewText: 'Purpose-built dashboards, portals and workflows for real work.',
      outcomes: [
        { title: 'Portals and dashboards', body: 'Give customers, teams or partners a focused place to access the information and tools they need.' },
        { title: 'Workflow automation', body: 'Reduce repetitive steps by connecting tasks, records, approvals and notifications.' },
        { title: 'Roles and permissions', body: 'Structure access around user roles and the information each person should manage.' },
        { title: 'Connected data', body: 'Plan databases and integrations around the records and systems your application depends on.' },
        { title: 'Security-minded foundations', body: 'Consider authentication, authorisation, data handling and operational safeguards from the start.' },
        { title: 'Maintainable delivery', body: 'Build a foundation that can be tested, maintained and extended as requirements evolve.' },
      ],
      process: [
        { title: 'Define the problem', body: 'Map users, current processes, pain points and the outcomes the application should support.' },
        { title: 'Design the solution', body: 'Agree the workflows, roles, data model, integrations and a realistic first release.' },
        { title: 'Develop in stages', body: 'Build and review the application against agreed requirements and user journeys.' },
        { title: 'Test and hand over', body: 'Validate key workflows, prepare deployment and document the agreed handover and support.' },
      ],
      faqs: [
        { question: 'What kinds of applications can you build?', answer: 'Examples include customer portals, staff dashboards, booking systems, internal workflow tools and business-specific web platforms.' },
        { question: 'Can the application connect to existing services?', answer: 'Integrations can be assessed during discovery. Feasibility depends on the other service, its API and access permissions.' },
        { question: 'Can different users have different access?', answer: 'Yes. User roles and permissions can be designed around the responsibilities and information access required.' },
        { question: 'Do you provide ongoing maintenance?', answer: 'Maintenance and technical support can be agreed as part of a separate or continuing service arrangement.' },
      ],
      related: [
        { label: 'Business management software', href: '/services/business-software', description: 'Explore software for connected business operations.' },
        { label: 'Website design and development', href: '/services/web-design', description: 'Create the public-facing website for your organisation.' },
        { label: 'Custom applications in Nigeria', href: '/custom-web-application-development-nigeria', description: 'See our dedicated custom development information for Nigeria.' },
      ],
    },
  },
  'business-software': {
    title: 'Business Management Software',
    description: 'MifiTech develops business software that connects operational workflows such as inventory, sales, customers, staff and reporting.',
    page: {
      eyebrow: 'BUSINESS SOFTWARE & DIGITAL OPERATIONS',
      title: 'Bring everyday business operations into one connected workspace.',
      intro: 'Disconnected spreadsheets and separate tools can make routine work harder to manage. MifiTech builds business management software around the records, people and processes your organisation needs to run more clearly.',
      previewLabel: 'MIFITECH / BUSINESS SOFTWARE',
      previewTitle: 'A clearer view of day-to-day operations.',
      previewText: 'Connected records, role-based workspaces and useful business workflows.',
      outcomes: [
        { title: 'Inventory and stock workflows', body: 'Track products, quantities, adjustments and stock movement according to your operation.' },
        { title: 'Sales and order records', body: 'Bring transactions and order information into a more organised workflow.' },
        { title: 'Customer management', body: 'Keep useful customer records and interaction history connected to business activity.' },
        { title: 'Staff roles and permissions', body: 'Give team members access to the tasks and information relevant to their responsibilities.' },
        { title: 'Expenses and reporting', body: 'Organise business expenses and present useful summaries for operational decisions.' },
        { title: 'Workflows that can expand', body: 'Start with the most important processes and plan additional modules as requirements grow.' },
      ],
      process: [
        { title: 'Review your operation', body: 'Understand the people, records, tools and everyday processes the software needs to support.' },
        { title: 'Prioritise the workflows', body: 'Agree what belongs in the first release and which integrations or reports matter most.' },
        { title: 'Build around real tasks', body: 'Develop the agreed workspaces, permissions, records and reporting flows.' },
        { title: 'Validate and improve', body: 'Test with realistic scenarios and agree the handover and future improvement plan.' },
      ],
      faqs: [
        { question: 'Can you build software for my specific business?', answer: 'Yes. The scope starts with your actual processes and the problems the software should solve.' },
        { question: 'Can owners and staff have different permissions?', answer: 'Yes. Role-based access can be designed around who should view, create, approve or manage each type of record.' },
        { question: 'Can the system work across multiple locations?', answer: 'Multi-location workflows can be included where they are part of the agreed requirements.' },
        { question: 'Can it connect to other tools?', answer: 'Possible integrations are assessed based on the services involved, available APIs and access requirements.' },
      ],
      related: [
        { label: 'Custom web applications', href: '/services/custom-web-applications', description: 'Explore portals, dashboards and tailored workflow tools.' },
        { label: 'E-commerce development', href: '/services/ecommerce-development', description: 'Build an online store and order journey.' },
        { label: 'Business software in Nigeria', href: '/business-management-software-nigeria', description: 'See our dedicated local business software page.' },
      ],
    },
  },
};

export function generateStaticParams() {
  return Object.keys(services).map((service) => ({ service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const item = services[service];
  if (!item) return { title: 'Digital services | MifiTech' };
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: '/services/' + service },
    openGraph: { title: item.title + ' | MifiTech', description: item.description, type: 'website' },
  };
}

export default async function GlobalServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const item = services[service];
  if (!item) notFound();
  const content = await getSiteContent();
  const relatedSlugs: Record<string, string[]> = {
    'web-design': ['the-africa-plug'],
    'custom-web-applications': ['ehealthcare', 'prestige-life-rp'],
    'business-software': ['garrison-market'],
  };
  const projects = (relatedSlugs[service] || [])
    .map((slug) => content.projects.find((project) => project.visible !== false && project.slug === slug))
    .filter((project): project is ProjectItem => Boolean(project));
  const url = new URL('/services/' + service, SITE_URL).toString();
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: item.title,
    serviceType: item.title,
    description: item.description,
    provider: { '@id': SITE_URL + '/#business' },
    areaServed: 'Worldwide',
    url,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: SITE_URL + '/#services' },
      { '@type': 'ListItem', position: 3, name: item.title, item: url },
    ],
  };
  return (
    <>
      <ServiceLandingPage page={item.page} projects={projects} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }} />
    </>
  );
}
