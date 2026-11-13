import type { Metadata } from 'next';
import ServiceLandingPage, { type ServicePageContent } from '../components/ServiceLandingPage';

export const metadata: Metadata = {
  title: 'Website Design in Nigeria | MifiTech',
  description: 'MifiTech designs and builds mobile-friendly business websites for Nigerian companies, with clear project scope, enquiry paths and support.',
  alternates: { canonical: '/website-design-nigeria' },
  openGraph: {
    title: 'Website Design in Nigeria | MifiTech',
    description: 'Professional, mobile-friendly websites designed around your business and your customers.',
    type: 'website',
  },
};

const page: ServicePageContent = {
  eyebrow: 'WEBSITE DESIGN & DEVELOPMENT / NIGERIA',
  title: 'Website design for Nigerian businesses.',
  intro: 'A good business website should do more than look polished. It should help people understand what you offer, trust your business and take the next step. MifiTech plans, designs and builds responsive websites around your services, customers and day-to-day needs.',
  previewLabel: 'MIFITECH / BUSINESS WEBSITE',
  previewTitle: 'Make it easy to choose your business.',
  previewText: 'Clear information, thoughtful design and useful ways to get in touch.',
  outcomes: [
    { title: 'A clear first impression', body: 'Explain what your business does, who it serves and why a customer should speak with you.' },
    { title: 'A smooth mobile experience', body: 'Responsive layouts, readable content and touch-friendly navigation for customers using phones and tablets.' },
    { title: 'Pages with a purpose', body: 'Plan the right mix of home, about, services, portfolio, FAQs and contact information for your business.' },
    { title: 'Simple enquiry routes', body: 'Make it straightforward to call, email, send an enquiry or continue a conversation through WhatsApp.' },
    { title: 'Search-friendly foundations', body: 'Use descriptive page titles, useful headings, sensible page addresses, internal links and crawlable content.' },
    { title: 'Room to grow', body: 'Choose a structure that can support new services, locations, content and features as the business develops.' },
  ],
  process: [
    { title: 'Understand the business', body: 'We discuss your audience, services, goals, existing materials and what customers need to do on the site.' },
    { title: 'Agree the scope', body: 'We map the pages and features, confirm who supplies content, and agree the timeline and proposal before development begins.' },
    { title: 'Design, build and test', body: 'We shape the visual direction, build the agreed pages and check the experience across screen sizes and key enquiry paths.' },
    { title: 'Launch and hand over', body: 'We prepare the site for launch, connect the agreed domain and walk through access, updates and any ongoing support.' },
  ],
  faqs: [
    { question: 'How much does a business website cost in Nigeria?', answer: 'The cost depends on the number of pages, design requirements, content, integrations and features. MifiTech discusses the scope first and provides a project proposal rather than quoting one price for every business.' },
    { question: 'How long does website development take?', answer: 'The timeline depends on the agreed scope and how quickly content, feedback and approvals are available. We confirm a realistic timeline in the proposal before work begins.' },
    { question: 'Will the website work well on mobile phones?', answer: 'Yes. Responsive layouts, readable text, touch-friendly controls and mobile navigation are considered as part of the design and testing process.' },
    { question: 'Can you help with the domain and hosting?', answer: 'We can discuss domain and hosting setup as part of the project. We recommend that the business retains ownership and access to its domain and essential accounts.' },
    { question: 'Can the website be updated after launch?', answer: 'Yes. The right update approach depends on the site. Content changes, new pages, maintenance and technical support can be discussed as part of the handover or a separate support arrangement.' },
  ],
  related: [
    { label: 'How to build a website in Nigeria', href: '/how-to-build-a-website-in-nigeria', description: 'A practical guide to planning, costs, domains and launch.' },
    { label: 'Explore website demos', href: '/#demos', description: 'Open sample website concepts for different business types.' },
    { label: 'E-commerce website development', href: '/ecommerce-website-development-nigeria', description: 'Explore online stores, catalogues and order journeys.' },
  ],
};

export default function WebsiteDesignNigeriaPage() {
  return <ServiceLandingPage page={page} />;
}
