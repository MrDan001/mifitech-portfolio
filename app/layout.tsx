import type { Metadata } from 'next';
import { getSeo } from '@/lib/backend';
import { getBusinessSettings } from '@/lib/site-content';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  return {
    metadataBase: new URL(String(seo.canonicalUrl)),
    title: { default: String(seo.title), template: '%s | MifiTech' },
    description: String(seo.description),
    applicationName: 'MifiTech',
    keywords: Array.isArray(seo.keywords) ? seo.keywords.map(String) : [],
    openGraph: { title: String(seo.ogTitle), description: String(seo.ogDescription), siteName: 'MifiTech', type: 'website' },
    twitter: { card: 'summary_large_image', title: String(seo.ogTitle), description: String(seo.ogDescription) },
    icons: { icon: '/icon.svg', apple: '/apple-icon.svg' },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const business = await getBusinessSettings();
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: business.businessName,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mifitech-portfolio.vercel.app',
    email: business.contactEmail,
    telephone: business.phone || undefined,
    description: business.tagline + ' Website design, web development, ecommerce and custom web application services.',
    areaServed: { '@type': 'Country', name: business.location || 'Nigeria' },
    serviceType: ['Website design', 'Website development', 'Ecommerce website development', 'Custom web applications'],
  };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
