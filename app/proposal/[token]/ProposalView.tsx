// Path: app/proposal/[token]/ProposalView.tsx
import { whatsappLink, WHATSAPP_DISPLAY } from '@/lib/contact';
import { CopyText, PrintButton } from './ProposalActions';

export type ProposalData = { client_name: string; business_name: string; scope: string; timeline: string; amount: number | string; currency: string; payment_terms: string; payment_instructions: string; status: string };

const STEPS = ['Sent', 'Accepted', 'Payment', 'Building', 'Delivered'];
const STEP_OF: Record<string, number> = { draft: 0, sent: 0, accepted: 1, awaiting_payment: 2, paid: 3, in_progress: 3, completed: 4 };
const NOTE: Record<string, string> = {
  draft: 'This proposal is still being prepared.',
  sent: 'Please review the details below and accept when you are ready.',
  accepted: 'Thank you for accepting. Follow the payment instructions below to get started.',
  awaiting_payment: 'We are waiting for your first payment. The instructions are below.',
  paid: 'Payment received. We are scheduling your project now.',
  in_progress: 'Your project is in progress.',
  completed: 'Your project is complete. Thank you for working with MifiTech.',
  declined: 'This proposal was declined. Contact us if you would like to revisit it.',
};

function money(amount: number, currency: string) {
  try { return new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency || 'NGN', maximumFractionDigits: 0 }).format(amount); } catch { return (currency || '') + ' ' + amount.toLocaleString(); }
}

export default function ProposalView({ p, token, justAccepted }: { p: ProposalData; token: string; justAccepted: boolean }) {
  const amount = Number(p.amount) || 0;
  const step = STEP_OF[p.status] ?? 0;
  const declined = p.status === 'declined';
  const pcts = Array.from(p.payment_terms.matchAll(/(\d{1,3})\s*%/g)).map((m) => Number(m[1]));
  const split = pcts.length === 2 && pcts[0] + pcts[1] === 100 ? pcts : null;
  const lines = p.scope.split('\n').map((l) => l.trim()).filter(Boolean);
  const bulleted = lines.length > 1 && lines.every((l) => /^[-•*]\s*/.test(l));
  const question = 'Hello MifiTech, I have a question about the proposal for ' + p.business_name + '.';

  return (
    <main className="pp">
      <header className="pp-head"><div className="pp-wrap">
        <a href="/" aria-label="MifiTech home"><img src="/brand/logo-b-horizontal-light.svg" alt="MifiTech" width={150} height={32} /></a>
        <span className="pp-lock">Private proposal</span>
      </div></header>

      <section className="pp-hero"><div className="pp-wrap">
        <p className="pp-kicker">Prepared for {p.client_name}</p>
        <h1>{p.business_name}</h1>
        <div className="pp-amount"><span>Project investment</span><b>{money(amount, p.currency)}</b></div>
        {justAccepted && p.status !== 'sent' && <p className="pp-banner" role="status">You accepted this proposal. Thank you. We will be in touch shortly.</p>}
        <p className="pp-note">{NOTE[p.status] || ''}</p>
        {!declined && <ol className="pp-steps" aria-label="Project progress">{STEPS.map((s, i) => <li key={s} className={i < step || p.status === 'completed' ? 'done' : i === step ? 'now' : ''} aria-current={i === step ? 'step' : undefined}><i>{i < step || p.status === 'completed' ? '✓' : i + 1}</i>{s}</li>)}</ol>}
      </div></section>

      <div className="pp-wrap pp-body">
        <section className="pp-card"><h2>Scope and deliverables</h2>
          {bulleted ? <ul>{lines.map((l, i) => <li key={i}>{l.replace(/^[-•*]\s*/, '')}</li>)}</ul> : <p className="pp-text">{p.scope}</p>}
        </section>
        <div className="pp-two">
          <section className="pp-card"><h2>Timeline</h2><p className="pp-text">{p.timeline}</p></section>
          <section className="pp-card"><h2>Payment terms</h2><p className="pp-text">{p.payment_terms}</p>
            {split && <div className="pp-pay">{split.map((pc, i) => <div key={i}><span>{i === 0 ? 'First payment' : 'Second payment'} ({pc}%)</span><b>{money(Math.round((amount * pc) / 100), p.currency)}</b></div>)}</div>}
          </section>
        </div>
        {p.payment_instructions && <section className="pp-card pp-instr"><div className="pp-between"><h2>How to pay</h2><CopyText text={p.payment_instructions} label="Copy payment details" /></div><p className="pp-text">{p.payment_instructions}</p><small>Please use “{p.business_name}” as the payment reference and send us proof of payment on WhatsApp.</small></section>}

        <section className="pp-card pp-help"><div><h2>Questions?</h2><p className="pp-text">We are happy to explain anything before you decide.</p></div>
          <div className="pp-row"><a className="pp-btn pp-wa" href={whatsappLink(question)} target="_blank" rel="noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a><a className="pp-btn pp-ghost" href={'mailto:officialsafebase@gmail.com?subject=' + encodeURIComponent('Question about my proposal')}>Email us</a><PrintButton /></div>
        </section>
        <p className="pp-fine">This link is private to you. Please do not share it. Prices are shown in {p.currency || 'NGN'}.</p>
      </div>

      {p.status === 'sent' && <div className="pp-bar"><div className="pp-wrap">
        <form action={'/api/proposals/' + token} method="post">
          <label><input type="checkbox" required /> I have read the scope, timeline and payment terms</label>
          <button className="pp-btn pp-go">Accept this proposal</button>
        </form>
      </div></div>}
    </main>
  );
}