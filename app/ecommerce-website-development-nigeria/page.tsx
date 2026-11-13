import type { Metadata } from 'next';
import ServiceLandingPage, { type ServicePageContent } from '@/app/components/ServiceLandingPage';

export const metadata: Metadata = {
  title: 'E-commerce Website Development in Nigeria | MifiTech',
  description: 'Build an online store for your Nigerian business with MifiTech. Plan product catalogues, checkout, payment integration and order workflows.',
  alternates: { canonical: '/ecommerce-website-development-nigeria' },
  openGraph: {
    title: 'E-commerce Website Development in Nigeria | MifiTech',
    description: 'Practical online stores designed to help customers browse products and place orders with confidence.',
    type: 'website',
  },
};

const page: ServicePageContent = {
  eyebrow: 'ONLINE STORES / E-COMMERCE DEVELOPMENT',
  title: 'E-commerce websites built for the way you sell.',
  intro: 'Take your products beyond social media and give customers a clear place to browse, understand and order. MifiTech plans and develops online shopping experiences around your catalogue, customers, fulfilment process and the payment options available to your business.',
  previewLabel: 'MIFITECH / ONLINE STORE',
  previewTitle: 'From product discovery to order.',
  previewText: 'A clear catalogue and checkout journey, shaped around your operation.',
  outcomes: [
    { title: 'Organised product catalogues', body: 'Present products with useful descriptions, categories, images, options and details customers need before ordering.' },
    { title: 'A considered shopping journey', body: 'Help customers move from browsing to product selection, cart and checkout without unnecessary steps.' },
    { title: 'Payment integration planning', body: 'Choose and configure a suitable payment provider based on your business, country, account approval and settlement needs.' },
    { title: 'Order management workflows', body: 'Give the business a practical way to review incoming orders, update order status and coordinate fulfilment.' },
    { title: 'Mobile-first shopping', body: 'Make product discovery, forms and checkout usable on the phones many customers already use to shop.' },
    { title: 'A foundation that can expand', body: 'Plan for future catalogue growth, delivery rules, promotions and integrations according to the agreed scope.' },
  ],
  process: [
    { title: 'Map how you sell', body: 'We review your products, customer journey, delivery or collection process, payment needs and how orders are handled today.' },
    { title: 'Define the store scope', body: 'We agree catalogue structure, product information, checkout steps, payment provider, order tools and what is included in the first release.' },
    { title: 'Build and test the store', body: 'We develop the agreed shopping experience and test product browsing, cart behaviour, checkout, notifications and key mobile layouts.' },
    { title: 'Prepare for launch', body: 'We confirm the domain, payment-provider readiness, store content and handover steps before the store is made available to customers.' },
  ],
  faqs: [
    { question: 'Can customers pay online?', answer: 'Online payment can be integrated when the selected provider supports your business and the required account has been approved. Provider choice and setup are confirmed during project scoping.' },
    { question: 'Can I manage products and orders myself?', answer: 'An administration area for product and order management can be included in the agreed scope. The exact controls depend on the catalogue and workflow your business needs.' },
    { question: 'Can the store support delivery or pickup?', answer: 'Delivery, pickup and fulfilment rules can be planned around the way your business operates. Requirements such as delivery zones, fees and order status updates should be agreed before development.' },
    { question: 'How much does an e-commerce website cost?', answer: 'Pricing depends on catalogue size, product variations, payment and delivery integrations, design and management features. MifiTech prepares a proposal after understanding the requirements.' },
    { question: 'Can I start small and add features later?', answer: 'Yes. The first release can focus on the essential catalogue, checkout and order workflow, with additional features planned as the business grows.' },
  ],
  related: [
    { label: 'Website design in Nigeria', href: '/website-design-nigeria', description: 'Explore business websites and the design process.' },
    { label: 'Garrison Market case study', href: '/projects/garrison-market', description: 'See a business operations product built around inventory and sales workflows.' },
    { label: 'Explore website demos', href: '/#demos', description: 'View sample concepts for retail and other business types.' },
  ],
};

export default function EcommerceWebsiteDevelopmentNigeriaPage() {
  return <ServiceLandingPage page={page} />;
}
