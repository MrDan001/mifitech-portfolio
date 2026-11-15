import type { Metadata } from 'next';
import SEOGuideArticle, { type GuideArticle } from '../components/SEOGuideArticle';

export const metadata: Metadata = {
  title: 'How Much Does Website Design Cost in Nigeria?',
  description: 'Understand what affects website design cost in Nigeria, from page count and content to custom features, hosting, maintenance and online payments.',
  alternates: { canonical: '/website-design-cost-nigeria' },
  openGraph: { title: 'How Much Does Website Design Cost in Nigeria? | MifiTech', description: 'A practical guide to website pricing factors for Nigerian businesses.', type: 'article' },
};

const article: GuideArticle = {
  eyebrow: 'WEBSITE PLANNING / COST GUIDE',
  title: 'How much does website design cost in Nigeria?',
  intro: 'There is no single price that fits every business website. The cost depends on what the site needs to do, how much content it contains and whether it requires custom functionality. This guide explains the main things to consider before requesting a quote.',
  sections: [
    { heading: 'Why website prices differ', paragraphs: [
      'A simple business website and a custom online platform are different projects. One may need a small set of information pages and a contact form. Another may need customer accounts, staff dashboards, payments, inventory, booking or connections to other systems. The amount of planning, design, development and testing is therefore different.',
      'A useful quote should describe the work being priced. Be cautious about comparing two totals if one proposal includes content support, mobile testing, deployment and handover while the other only covers a basic design.'
    ]},
    { heading: 'The main factors that affect website design cost', paragraphs: [
      'Page count matters, but functionality and content often matter just as much. Before requesting a quote, list the pages and explain what visitors should be able to do on each one.'
    ], bullets: [
      'Number and type of pages: home, about, services, product pages, FAQs, contact and landing pages.',
      'Design requirements: a tailored visual identity and layouts versus a simple adaptation of an existing design system.',
      'Content: writing, editing, photography, product descriptions and other materials that need to be prepared.',
      'Features: forms, search, booking, customer accounts, dashboards, online payments and integrations.',
      'E-commerce needs: catalogue size, product variations, checkout, delivery rules and order management.',
      'Ongoing needs: hosting, domain renewals, security updates, backups, maintenance and technical support.'
    ]},
    { heading: 'What should a website design quote include?', paragraphs: [
      'Ask for a written scope that explains the deliverables, what you need to provide, the expected timeline, payment milestones and what counts as a change to the agreed work. It should also say who owns the domain, hosting account, source code and website content after handover.',
      'For an online store or custom application, ask which payment provider or third-party services are included, who is responsible for account approval, and how those services are billed. Provider fees and domain or hosting renewals may be separate from the development fee.'
    ]},
    { heading: 'Do not forget the cost of running the website', paragraphs: [
      'Launching the website is not always the end of the expense. A business may need a domain renewal, hosting, email service, payment-provider charges, software subscriptions, backups or ongoing technical support. Confirm which costs are recurring and which are one-time project costs before you approve a proposal.',
      'Keep ownership of your domain and essential accounts under the business wherever possible. Make sure more than one trusted person knows how to access important services.'
    ]},
    { heading: 'How to get a more accurate quote', paragraphs: [
      'Prepare a short brief with your business type, target customers, examples of websites you like, the pages you need, features you expect and your preferred launch window. If you are replacing an existing website, include its address and explain what is not working today.',
      'MifiTech scopes website projects around the business and the customer journey rather than applying one fixed price to every request. Start with the website design service page to understand the process, then send an enquiry with your requirements.'
    ]}
  ],
  related: [
    { label: 'Website design in Nigeria', href: '/website-design-nigeria', description: 'See the website design process, deliverables and common questions.' },
    { label: 'How to build a website in Nigeria', href: '/how-to-build-a-website-in-nigeria', description: 'Plan your domain, content, hosting and launch.' },
    { label: 'E-commerce website development', href: '/ecommerce-website-development-nigeria', description: 'Explore online store features and checkout planning.' }
  ]
};

export default function WebsiteDesignCostNigeriaPage() {
  return <SEOGuideArticle article={article} />;
}
