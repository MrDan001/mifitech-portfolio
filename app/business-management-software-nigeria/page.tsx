import type { Metadata } from 'next';
import ServiceLandingPage, { type ServicePageContent } from '../components/ServiceLandingPage';
import { SITE_URL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Business Management Software in Nigeria',
  description: 'MifiTech develops business management software for Nigerian companies, bringing sales, inventory, customers, staff and reporting into one system.',
  alternates: { canonical: '/business-management-software-nigeria' },
  openGraph: {
    title: 'Business Management Software in Nigeria | MifiTech',
    description: 'Practical business software designed around your sales, stock, customers, staff and daily operations.',
    type: 'website',
  },
};

const page: ServicePageContent = {
  eyebrow: 'BUSINESS SOFTWARE / OPERATIONS / NIGERIA',
  title: 'Business management software that keeps the moving parts connected.',
  intro: 'Running a business across notebooks, spreadsheets and separate apps makes it harder to see what is happening. MifiTech develops business management software that can bring important activities such as sales, inventory, customers, staff and reporting into a more organised workspace.',
  previewLabel: 'MIFITECH / BUSINESS OPERATIONS',
  previewTitle: 'See the work. Manage the day.',
  previewText: 'Connected records and practical tools for the people responsible for daily operations.',
  outcomes: [
    { title: 'Sales and transaction records', body: 'Record sales and track transaction details so owners and authorised staff can review business activity.' },
    { title: 'Inventory and stock visibility', body: 'Organise products, quantities and stock movements to make it easier to understand what is available and what needs attention.' },
    { title: 'Customer information', body: 'Keep customer records and relevant interactions together, with access limited to the people who need them.' },
    { title: 'Staff and role management', body: 'Set up staff accounts and permissions that reflect responsibilities across the business.' },
    { title: 'Expenses and operational records', body: 'Bring agreed expense and business records into a consistent workflow instead of scattering information across separate files.' },
    { title: 'Useful reports and oversight', body: 'Give decision-makers clear summaries of the information captured by the system, based on the reporting needs agreed for the project.' },
  ],
  process: [
    { title: 'Review how the business runs', body: 'We look at the way sales, stock, customers, staff and records are handled today, and identify where information gets lost or repeated.' },
    { title: 'Choose the right first release', body: 'We prioritise the workflows that matter most, define user roles and agree what the system should and should not do.' },
    { title: 'Configure and build', body: 'We develop the agreed modules, connect their records and test the key tasks with realistic scenarios.' },
    { title: 'Train and improve', body: 'We prepare the system for use, explain the agreed workflows and identify future improvements from actual business needs.' },
  ],
  faqs: [
    { question: 'What can business management software include?', answer: 'Depending on the business, it may include sales, inventory, customers, staff accounts, expenses, orders, reports and other operational workflows. The modules are selected during project planning.' },
    { question: 'Can the software be tailored to my type of business?', answer: 'Yes. The right features depend on the way your business sells, manages stock, serves customers and organises staff. MifiTech scopes the system around those requirements.' },
    { question: 'Can I manage the business from my phone?', answer: 'The system can be designed for responsive browser access, allowing supported tasks to be completed on a phone, tablet or computer.' },
    { question: 'Can different staff members have different access?', answer: 'Yes. User roles and permissions can be planned so staff members only see the modules and records relevant to their responsibilities.' },
    { question: 'How much does business management software cost in Nigeria?', answer: 'Pricing depends on the number of modules, users, workflows, integrations and reporting requirements. MifiTech defines the scope with you before preparing a proposal.' },
  ],
  related: [
    { label: 'Custom web applications', href: '/custom-web-application-development-nigeria', description: 'Explore purpose-built portals, dashboards and browser-based systems.' },
    { label: 'Garrison Market case study', href: '/projects/garrison-market', description: 'A business operations product focused on inventory, sales and staff workflows.' },
    { label: 'E-commerce website development', href: '/ecommerce-website-development-nigeria', description: 'Add an online sales channel with catalogue, checkout and order workflows.' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Business management software development',
  serviceType: 'Business management software development',
  provider: { '@type': 'Organization', name: 'MifiTech', url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Nigeria' },
  url: SITE_URL + '/business-management-software-nigeria',
};

export default function BusinessManagementSoftwareNigeriaPage() {
  return <><ServiceLandingPage page={page} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /></>;
}
