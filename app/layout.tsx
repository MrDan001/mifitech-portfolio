import type { Metadata } from 'next';
import { getSeo } from '@/lib/backend';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  return {
    metadataBase: new URL(String(seo.canonicalUrl)),
    title: { default: String(seo.title), template: '%s | MifiTech' },
    description: String(seo.description),
    applicationName: 'MifiTech',
    keywords: Array.isArray(seo.keywords) ? seo.keywords.map(String) : [],
    alternates: { canonical: '/' },
    openGraph: { title: String(seo.ogTitle), description: String(seo.ogDescription), siteName: 'MifiTech', type: 'website', url: '/' },
    twitter: { card: 'summary_large_image', title: String(seo.ogTitle), description: String(seo.ogDescription) },
    icons: { icon: '/icon.svg', apple: '/apple-icon.svg' },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'MifiTech',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mifitech-portfolio.vercel.app',
    email: 'officialsafebase@gmail.com',
    description: 'Website design, web development, ecommerce and custom web application services for businesses in Nigeria.',
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    serviceType: ['Website design', 'Website development', 'Ecommerce website development', 'Custom web applications'],
  };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
