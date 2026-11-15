import type { Metadata } from 'next';
import SEOGuideArticle, { type GuideArticle } from '../components/SEOGuideArticle';

export const metadata: Metadata = {
  title: 'How to Choose a Website Design Company in Nigeria',
  description: 'A practical checklist for choosing a website design company in Nigeria: portfolio, project scope, mobile experience, SEO, ownership and support.',
  alternates: { canonical: '/choose-website-design-company-nigeria' },
  openGraph: { title: 'How to Choose a Website Design Company in Nigeria | MifiTech', description: 'Questions to ask before hiring a web design and development partner.', type: 'article' },
};

const article: GuideArticle = {
  eyebrow: 'BUSINESS WEBSITE / BUYER CHECKLIST',
  title: 'How to choose a website design company in Nigeria.',
  intro: 'Choosing a web design partner is about more than finding an attractive homepage or the lowest quote. You need a team that understands your business, explains the work clearly and can deliver a website you can confidently use and manage.',
  sections: [
    { heading: 'Look beyond screenshots in a portfolio', paragraphs: [
      'Ask to open live websites and try them on a phone. Check whether pages load, navigation makes sense, text is readable and contact routes work. A portfolio should help you understand the type of work the company has actually delivered.',
      'If the project needs more than a brochure website, look for relevant examples. An online store, booking platform and internal business application involve different workflows and technical decisions.'
    ]},
    { heading: 'Check whether they understand your business', paragraphs: [
      'A good discovery conversation should cover your customers, services, competitors, business goals and the actions you want visitors to take. The company should ask questions before recommending features or promising a timeline.',
      'Be ready to explain what is currently difficult for your customers or staff. That helps the developer recommend a useful solution instead of adding features that do not solve a real problem.'
    ]},
    { heading: 'Ask for a clear scope and written proposal', paragraphs: [
      'The proposal should list pages, features, integrations, content responsibilities, milestones, timeline assumptions and payment terms. It should also explain how revisions and requests outside the original scope will be handled.',
      'For e-commerce and custom software, ask for a clear description of user roles, payment or third-party integrations, notifications, data handling and administration tools.'
    ], bullets: [
      'What pages and features are included in the quoted price?',
      'Who supplies the text, images, product information and branding materials?',
      'How will progress, feedback and approvals be handled?',
      'What testing happens before launch?',
      'What support is available after the website goes live?'
    ]},
    { heading: 'Make sure mobile experience and SEO are considered', paragraphs: [
      'Many customers will first visit from a phone. Ask how the company tests mobile layouts, menus, forms, buttons and page performance. A website should be usable on common screen sizes, not simply shrink a desktop design.',
      'SEO foundations should include descriptive page titles, useful meta descriptions, logical headings, crawlable page content, canonical URLs, an XML sitemap and internal links. These help search engines understand the site, but no developer can guarantee a particular Google ranking.'
    ]},
    { heading: 'Confirm ownership, access and ongoing support', paragraphs: [
      'Your business should know who controls the domain, hosting, website files, analytics and other important accounts. Ask how administrator access is handed over and whether you can move the site or work with another developer later.',
      'Clarify what happens after launch. Some businesses need occasional content updates; others need regular security, backups, monitoring and feature development. Understand what is included and what is charged separately.'
    ]},
    { heading: 'Choose the partner that explains the trade-offs', paragraphs: [
      'A trustworthy provider should be able to explain why a feature is needed, what it will cost to operate and whether a simpler option would work. Be careful with vague promises, unclear ownership, pressure to pay before the scope is understood or guarantees of instant search rankings.',
      'MifiTech works with businesses to plan websites, online stores and custom applications around their actual requirements. Review the service details and send a project enquiry when you are ready to discuss your needs.'
    ]}
  ],
  related: [
    { label: 'Website design in Nigeria', href: '/website-design-nigeria', description: 'Review MifiTech’s process and website design deliverables.' },
    { label: 'Website design cost in Nigeria', href: '/website-design-cost-nigeria', description: 'Understand the factors that shape a website project quote.' },
    { label: 'Custom web applications', href: '/custom-web-application-development-nigeria', description: 'Explore portals, dashboards and workflow tools.' }
  ]
};

export default function ChooseWebsiteDesignCompanyNigeriaPage() {
  return <SEOGuideArticle article={article} />;
}
