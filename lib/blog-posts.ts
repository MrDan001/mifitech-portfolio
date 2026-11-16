export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  intro: string;
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
  related: Array<{ label: string; href: string; description: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-your-business-website-needs-to-win-customers',
    title: 'What your business website needs to turn visitors into customers',
    description: 'A practical checklist for Nigerian businesses planning a website that builds trust, answers customer questions and makes enquiries easier.',
    category: 'Website strategy',
    publishedAt: '2026-11-16',
    updatedAt: '2026-11-16',
    readTime: '6 min read',
    intro: 'A business website should do more than look attractive. It should help the right visitor understand what you offer, trust your business and take a clear next step. Here are the essentials to plan before you build.',
    sections: [
      { heading: 'Make your offer clear immediately', paragraphs: [
        'When someone lands on your homepage, they should quickly understand what your business does, who it serves and where it operates. Use a direct headline, a short explanation and a visible route to your main service or product.',
        'Avoid making visitors decode slogans or search through several pages to find out whether you can help them. Specific language is more useful than broad claims.'
      ]},
      { heading: 'Show visitors why they should trust you', paragraphs: [
        'Trust comes from useful evidence. Explain how your service works, show real examples of completed work where you have permission, identify the people or business behind the service and make your contact details easy to find.',
        'If you publish testimonials, use genuine feedback that the customer has approved. If you show project examples, describe your actual role and what was delivered.'
      ]},
      { heading: 'Design for the phone first', paragraphs: [
        'Many customers will visit from a mobile phone. Important information, navigation, forms and contact actions should work comfortably on a small screen. Text should be readable without zooming and buttons should be easy to tap.',
        'Check the complete enquiry journey on a real phone, including form validation and the confirmation message after submission.'
      ]},
      { heading: 'Give every important page a purpose', paragraphs: [
        'A useful website structure usually includes a homepage, an about page, individual service or product pages, answers to common questions and a contact page. Each page should answer a different customer question rather than repeating the same general description.',
        'For search visibility, give each important page its own descriptive title, helpful page content and a canonical URL. Link related pages together so visitors and search engines can discover them.'
      ]},
      { heading: 'Make the next step obvious', paragraphs: [
        'Decide what you want a visitor to do: request a quote, book a consultation, call, send a WhatsApp message or buy a product. Put the most useful action where it is easy to find and explain what happens after someone takes it.',
        'Keep enquiry forms focused. Ask for the details you need to respond, not every possible detail at the first contact.'
      ]},
      { heading: 'Plan for maintenance after launch', paragraphs: [
        'A website needs care after it goes live. Decide who will update its content, renew the domain, manage hosting, apply security updates, check backups and respond when something stops working.',
        'Keep ownership of your domain and essential accounts with your business, and make sure you know how to access them.'
      ]}
    ],
    related: [
      { label: 'Website design in Nigeria', href: '/website-design-nigeria', description: 'Explore MifiTech website design and development services.' },
      { label: 'Website design cost in Nigeria', href: '/website-design-cost-nigeria', description: 'Understand the factors that affect a website project quote.' },
      { label: 'How to build a website in Nigeria', href: '/how-to-build-a-website-in-nigeria', description: 'Plan your domain, content, hosting and launch.' }
    ]
  },
  {
    slug: 'how-to-prepare-for-an-ecommerce-website-in-nigeria',
    title: 'How to prepare your business for an e-commerce website in Nigeria',
    description: 'Prepare your products, delivery process, payment options and order workflow before launching an online store in Nigeria.',
    category: 'E-commerce',
    publishedAt: '2026-11-16',
    updatedAt: '2026-11-16',
    readTime: '7 min read',
    intro: 'An online store is not just a catalogue placed on a website. It connects product information, customer decisions, payment, delivery and order support. Preparing these parts early makes the build clearer and the store easier to operate.',
    sections: [
      { heading: 'Organise your product information', paragraphs: [
        'Start with a clean product list. For each item, prepare its name, description, price, images, available options and stock status. Use consistent names and make important differences such as size, colour or model clear.',
        'Good product information helps customers make decisions and reduces avoidable questions after they place an order.'
      ]},
      { heading: 'Decide how orders will be fulfilled', paragraphs: [
        'Write down what happens after a customer checks out. Who confirms the order, prepares the item, arranges delivery and updates the customer? Decide how you will handle unavailable products, cancellations, returns and failed deliveries.',
        'Your website should reflect the process your business can actually support. Do not promise delivery timelines or service areas that you cannot reliably meet.'
      ]},
      { heading: 'Choose payment options carefully', paragraphs: [
        'List the payment methods you want to offer and confirm that your business can open and maintain the required provider accounts. Check supported currencies, settlement arrangements, transaction fees, verification requirements and refund processes directly with each provider.',
        'Payment-provider approval and account availability are separate from website development. Plan time for verification and testing before announcing that online payments are ready.'
      ]},
      { heading: 'Make delivery costs and policies understandable', paragraphs: [
        'Decide whether delivery is a flat fee, based on location, calculated by weight or confirmed after an enquiry. Explain the areas you serve, expected delivery windows and how customers can contact you about an order.',
        'Clear delivery information helps customers understand the full cost before they commit to buying.'
      ]},
      { heading: 'Plan the store administration', paragraphs: [
        'Someone needs to add products, update prices, monitor stock, process orders and answer customer questions. Decide which staff members need access and what each person should be allowed to change.',
        'Use individual accounts and role-based permissions where available. Limit access to sensitive settings and payment information to people who need it.'
      ]},
      { heading: 'Test the complete customer journey', paragraphs: [
        'Before launch, test the store on a phone and a computer. Check product variations, cart updates, checkout, payment success and failure, order notifications, delivery information and customer support links.',
        'Run test orders using the payment provider’s recommended test process. Confirm that the business receives the right order details and can complete the fulfilment steps.'
      ]}
    ],
    related: [
      { label: 'E-commerce website development', href: '/ecommerce-website-development-nigeria', description: 'See how MifiTech approaches online store projects.' },
      { label: 'Business management software', href: '/business-management-software-nigeria', description: 'Explore tools for connected sales, stock and operations.' },
      { label: 'Discuss your online store', href: '/#contact', description: 'Tell MifiTech about your products and workflow.' }
    ]
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
