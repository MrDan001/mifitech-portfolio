import type { Metadata } from 'next';
import { getSeo } from '@/lib/backend';
import { SITE_URL } from '@/lib/contact';
import { getSiteContent } from '@/lib/site-content';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import './globals.css';
import './mobile-layout.css';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  return {
    metadataBase: new URL(String(seo.canonicalUrl)),
    title: { default: String(seo.title), template: '%s | MifiTech' },
    description: String(seo.description),
    applicationName: 'MifiTech',
    keywords: Array.isArray(seo.keywords) ? seo.keywords.map(String) : [],
    openGraph: { title: String(seo.ogTitle), description: String(seo.ogDescription), siteName: 'MifiTech', type: 'website', images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'MifiTech digital products and services' }] },
    twitter: { card: 'summary_large_image', title: String(seo.ogTitle), description: String(seo.ogDescription), images: ['/og-image.jpg'] },
    icons: {
      icon: [
        { url: '/favicon.svg?v=2', type: 'image/svg+xml', sizes: 'any' },
        { url: '/brand/logo-512.png', type: 'image/png', sizes: '512x512' },
      ],
      shortcut: ['/favicon.svg?v=2'],
      apple: [{ url: '/brand/logo-512.png', type: 'image/png', sizes: '512x512' }],
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteContent = await getSiteContent();
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': SITE_URL + '/#business',
        name: 'MifiTech',
        url: SITE_URL,
        logo: SITE_URL + '/brand/logo-512.png',
        image: SITE_URL + '/brand/logo-512.png',
        sameAs: [
          'https://www.instagram.com/mifi.tech/',
          'https://www.facebook.com/profile.php?id=61593251797989',
        ],
        email: 'officialsafebase@gmail.com',
        telephone: '+2349067859200',
        description: 'Website design, web development, ecommerce and custom web application services for businesses worldwide.',
        areaServed: 'Worldwide',
        serviceType: ['Website design', 'Website development', 'Ecommerce website development', 'Custom web applications'],
      },
      {
        '@type': 'WebSite',
        '@id': SITE_URL + '/#website',
        name: 'MifiTech',
        alternateName: ['MifiTech Nigeria', 'mifitech.top'],
        url: SITE_URL + '/',
        publisher: { '@id': SITE_URL + '/#business' },
      },
    ],
  };

  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteNav items={siteContent.navigation} />{children}<SiteFooter items={siteContent.navigation} tagline={siteContent.footer.tagline} /></body></html>;
}
