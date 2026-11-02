// Path: app/api/proposals/[token]/route.ts
import { NextResponse, after } from 'next/server';
import { db } from '@/lib/backend';
import { SITE_URL } from '@/lib/contact';
import { notifyOwner } from '@/lib/notify';
import { clientIp, isLimited, record } from '@/lib/rate-limit';

export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[a-f0-9]{64}$/.test(token)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const key = 'accept:' + clientIp(req);
  if (isLimited(key, 10, 3600_000)) return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  record(key, 3600_000);
  try {
    const rows = await db<any[]>(`proposals?token=eq.${token}&select=id,status,business_name,client_name,amount,currency&limit=1`);
    const proposal = rows[0];
    if (!proposal || proposal.status !== 'sent') return NextResponse.json({ error: 'Proposal is no longer awaiting a response.' }, { status: 409 });
    await db('proposals?id=eq.' + encodeURIComponent(proposal.id), { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: 'accepted', accepted_at: new Date().toISOString() }) });
    after(() => notifyOwner({ title: 'Proposal accepted: ' + proposal.business_name, lines: [proposal.client_name + ' accepted the proposal.', 'Amount: ' + (proposal.currency || 'NGN') + ' ' + Number(proposal.amount || 0).toLocaleString('en-NG'), 'Next: confirm the first payment in the admin.'] }));
    return NextResponse.redirect(new URL('/proposal/' + token + '?accepted=1', SITE_URL), 303);
  } catch { return NextResponse.json({ error: 'Unable to accept proposal.' }, { status: 503 }); }
}