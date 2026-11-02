// Path: app/proposal/[token]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google';
import { db } from '@/lib/backend';
import ProposalView from './ProposalView';
import './proposal.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '800'], variable: '--pp-display', display: 'swap' });
const body = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--pp-body', display: 'swap' });

export const metadata: Metadata = { title: 'Project proposal', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function Proposal({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ accepted?: string }> }) {
  const { token } = await params;
  const { accepted } = await searchParams;
  if (!/^[a-f0-9]{64}$/.test(token)) notFound();
  let p: any;
  try {
    const rows = await db<any[]>(`proposals?token=eq.${token}&select=client_name,business_name,scope,timeline,amount,currency,payment_terms,payment_instructions,status&limit=1`);
    p = rows[0];
  } catch { notFound(); }
  if (!p) notFound();
  return <div className={display.variable + ' ' + body.variable}><ProposalView p={p} token={token} justAccepted={accepted === '1'} /></div>;
}