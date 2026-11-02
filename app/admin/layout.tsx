// Path: app/admin/layout.tsx
import type { ReactNode } from 'react';
import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google';
import './admin.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '800'], variable: '--ad-display', display: 'swap' });
const body = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--ad-body', display: 'swap' });

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className={'ad ' + display.variable + ' ' + body.variable}>{children}</div>;
}