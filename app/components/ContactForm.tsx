// Path: app/components/ContactForm.tsx
'use client';

import { FormEvent, useRef, useState } from 'react';
import { whatsappLink } from '@/lib/contact';
import { track } from '@/lib/track';

type ContactFormProps = { email?: string };
const WA_FALLBACK = 'Hello MifiTech, I tried the website form but could not send it. I would like to discuss a project.';

export default function ContactForm({ email = 'officialsafebase@gmail.com' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const openedAt = useRef(Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending'); setMessage('');
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get('name'), email: data.get('email'), business: data.get('business'),
      project_type: data.get('project_type'), project_details: data.get('project_details'),
      website: data.get('website'), source_url: window.location.href,
      demo: new URLSearchParams(window.location.search).get('demo') || '',
      elapsed: Date.now() - openedAt.current,
    };
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'We could not send your enquiry.');
      form.reset(); setStatus('success'); track('generate_lead', { project_type: String(payload.project_type || '') });
      setMessage('We have received your enquiry and will reply by email within one working day.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'We could not send your enquiry.');
    }
  }

  if (status === 'success') return <div className="form-success" role="status"><span className="success-mark">✓</span><div><span className="form-kicker">MESSAGE RECEIVED</span><h3>Thanks for reaching out.</h3><p>{message}</p><a href={whatsappLink('Hello MifiTech, I just sent an enquiry through your website.')} target="_blank" rel="noreferrer">Message us on WhatsApp too</a></div></div>;

  return <form className="contact-form" onSubmit={handleSubmit}>
    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
    <div className="form-row">
      <label><span>Your name</span><input name="name" type="text" placeholder="Name" autoComplete="name" required /></label>
      <label><span>Email address</span><input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
    </div>
    <div className="form-row">
      <label><span>Business name</span><input name="business" type="text" placeholder="Your business" autoComplete="organization" /></label>
      <label><span>What do you need?</span><select name="project_type" defaultValue="Business website"><option>Business website</option><option>Online store or catalogue</option><option>Booking or enquiry website</option><option>Custom web application</option><option>Redesign an existing website</option><option>Not sure yet</option></select></label>
    </div>
    <label><span>Tell us a little about it</span><textarea name="project_details" rows={5} minLength={10} placeholder="What does your business do, and what would you like your website to help with?" required /></label>
    <button className="form-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending enquiry…' : 'Send project enquiry'} <span></span></button>
    {status === 'error' && <p className="form-error" role="alert">{message} You can also <a href={whatsappLink(WA_FALLBACK)} target="_blank" rel="noreferrer">message us on WhatsApp</a> or email <a href={'mailto:' + email}>{email}</a>.</p>}
    <p className="form-footnote">We reply within one working day. Prefer WhatsApp? <a href={whatsappLink('Hello MifiTech, I would like to discuss a website for my business.')} target="_blank" rel="noreferrer">Chat with us</a>.</p>
  </form>;
}