import type { Metadata } from 'next';
import ServiceLandingPage, { type ServicePageContent } from '../components/ServiceLandingPage';
import { SITE_URL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Custom Web Application Development in Nigeria',
  description: 'MifiTech builds custom web applications for Nigerian businesses, including portals, dashboards, workflow tools and secure browser-based systems.',
  alternates: { canonical: '/custom-web-application-development-nigeria' },
  openGraph: {
    title: 'Custom Web Application Development in Nigeria | MifiTech',
    description: 'Purpose-built web applications that bring business workflows, teams and information into one practical system.',
    type: 'website',
  },
};

const page: ServicePageContent = {
  eyebrow: 'CUSTOM SOFTWARE / WEB APPLICATIONS / NIGERIA',
  title: 'Custom web applications built around how your business works.',
  intro: 'When spreadsheets, disconnected tools and repetitive manual tasks start slowing a business down, a purpose-built web application can bring the work together. MifiTech plans and develops browser-based systems around your users, processes, data and operational goals.',
  previewLabel: 'MIFITECH / CUSTOM WEB APP',
  previewTitle: 'One system. Your workflow.',
  previewText: 'Useful dashboards, connected records and clear actions for the people running your business.',
  outcomes: [
    { title: 'A workflow that fits your operation', body: 'Map the real steps your team follows and shape the application around the work, rather than forcing the business into an unsuitable template.' },
    { title: 'Purpose-built dashboards', body: 'Bring relevant records, activity and actions into clear views for administrators, staff, customers or other approved users.' },
    { title: 'Accounts and permissions', body: 'Plan sign-in, user roles and access boundaries so people can reach the information and tools intended for them.' },
    { title: 'Connected business data', body: 'Organise records and relationships in a database, with integrations considered where they solve a defined business need.' },
    { title: 'Responsive browser access', body: 'Build interfaces that work across desktop, tablet and mobile screens without requiring every user to install separate software.' },
    { title: 'A maintainable foundation', body: 'Agree the first release carefully, document important workflows and leave room for future improvements as requirements evolve.' },
  ],
  process: [
    { title: 'Understand the problem', body: 'We discuss the users, current process, pain points, information involved and the outcome the application needs to support.' },
    { title: 'Plan the system', body: 'We map user roles, screens, data, permissions, integrations and the essential features for a realistic first release.' },
    { title: 'Build and validate', body: 'We develop the agreed workflows and test important actions, access rules, data handling and layouts across devices.' },
    { title: 'Launch and support', body: 'We prepare the production environment, hand over the agreed access and discuss maintenance, monitoring and future development.' },
  ],
  faqs: [
    { question: 'What is a custom web application?', answer: 'It is software accessed through a web browser and developed for a particular organisation or workflow. Examples include customer portals, staff dashboards, booking systems, internal tools and business platforms.' },
    { question: 'Can you build a system with different user roles?', answer: 'Yes. User roles and permissions can be designed around the responsibilities of administrators, employees, customers and other user groups in the agreed scope.' },
    { question: 'Can the application connect to an existing service?', answer: 'Integrations can be considered when the third-party service provides a suitable API and the required access is available. We assess the provider, data flow and limitations during planning.' },
    { question: 'Will it work on phones?', answer: 'The interface can be designed responsively so users can complete the supported tasks on phones, tablets and desktop browsers.' },
    { question: 'How much does custom web application development cost in Nigeria?', answer: 'The cost depends on workflows, user types, security requirements, integrations and the amount of functionality. MifiTech first defines the scope and then prepares a project proposal.' },
  ],
  related: [
    { label: 'Business management software', href: '/business-management-software-nigeria', description: 'Explore systems for bringing everyday business operations together.' },
    { label: 'eHealthcare case study', href: '/projects/ehealthcare', description: 'See a healthcare platform concept with patient and clinician workflows.' },
    { label: 'Garrison Market case study', href: '/projects/garrison-market', description: 'Explore a business operations product built around sales and inventory.' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom web application development',
  serviceType: 'Custom web application development',
  provider: { '@type': 'Organization', name: 'MifiTech', url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Nigeria' },
  url: SITE_URL + '/custom-web-application-development-nigeria',
};

export default function CustomWebApplicationDevelopmentNigeriaPage() {
  return <><ServiceLandingPage page={page} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /></>;
}
