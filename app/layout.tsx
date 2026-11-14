// Path: app/layout.tsx
import type { Metadata } from 'next';
import { getSeo } from '@/lib/backend';
import { SITE_URL } from '@/lib/contact';
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
    // Use the existing square brand mark; the previously configured /icon.svg
    // and /apple-icon.svg files did not exist, so browsers showed a generic icon.
    icons: {
      icon: [{ url: '/brand/logo-512.png', type: 'image/png', sizes: '512x512' }],
      apple: [{ url: '/brand/logo-512.png', type: 'image/png', sizes: '512x512' }],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': SITE_URL + '/#business',
        name: 'MifiTech',
        url: SITE_URL,
        logo: SITE_URL + '/brand/logo-512.png',
        email: 'officialsafebase@gmail.com',
        telephone: '+2349067859200',
        description: 'Website design, web development, ecommerce and custom web application services for businesses in Nigeria.',
        areaServed: { '@type': 'Country', name: 'Nigeria' },
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

  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try { const saved = localStorage.getItem('mifitech-theme'); const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.dataset.theme = dark ? 'dark' : 'light'; } catch (_) {}` }} /></head><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
