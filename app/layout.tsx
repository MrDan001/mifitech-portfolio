import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mifitech — Full-Stack Developer',
  description: 'A portfolio of real products, systems, and experiments built by Mifitech.',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
