import type { Metadata } from 'next';
import { getSeo } from '@/lib/backend';
import { SITE_URL } from '@/lib/contact';
import { getSiteContent } from '@/lib/site-content';
import FloatingMenu from './components/FloatingMenu';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  return {
    metadataBase: new URL(String(seo.canonicalUrl)),
    title: { default: String(seo.title), template: '%s | MifiTech' },
    description: String(seo.description),
    applicationName: 'MifiTech',
    keywords: Array.isArray(seo.keywords) ? seo.keywords.map(String) : [],
    openGraph: { title: String(seo.ogTitle), description: String(seo.ogDescription), siteName: 'MifiTech', type: 'website', images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'MifiTech portfolio: Ludo Live, eHealthcare, Garrison Market and The Africa Plug' }] },
    twitter: { card: 'summary_large_image', title: String(seo.ogTitle), description: String(seo.ogDescription), images: ['/og-image.jpg'] },
    // Google Search supports PNG favicons; keep the SVG as a browser-friendly alternative.
    // Put the supported PNG first so crawlers select the correct brand artwork.
    icons: {
      icon: [
        { url: '/brand/logo-512.png', type: 'image/png', sizes: '512x512' },
        { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      ],
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

  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try { const saved = localStorage.getItem('mifitech-theme'); const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.dataset.theme = dark ? 'dark' : 'light'; } catch (_) {}` }} /></head><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><FloatingMenu navigation={siteContent.navigation} />{children}</body></html>;
}
