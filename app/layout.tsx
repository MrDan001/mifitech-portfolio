import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mifitech-portfolio.vercel.app'),
  title: {
    default: 'MifiTech — Websites & Digital Products',
    template: '%s | MifiTech',
  },
  description: 'MifiTech designs and builds modern business websites, online stores, booking experiences and custom web applications for businesses in Nigeria.',
  applicationName: 'MifiTech',
  keywords: ['MifiTech', 'website design Nigeria', 'business websites', 'web development', 'online stores', 'custom web applications'],
  openGraph: {
    title: 'MifiTech — Websites & Digital Products',
    description: 'Thoughtful websites and useful digital products, built around your business.',
    siteName: 'MifiTech',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
