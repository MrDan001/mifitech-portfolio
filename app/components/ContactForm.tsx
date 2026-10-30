'use client';

import { FormEvent, useState } from 'react';

const email = 'officialsafebase@gmail.com';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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
    };
    let saved = false;
    try {
      const crm = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      saved = crm.ok;
    } catch { /* Keep the email enquiry fallback available if the CRM is temporarily offline. */ }

    try {
      const emailPayload = Object.fromEntries(data.entries());
      Object.assign(emailPayload, { _subject: 'New website enquiry from MifiTech', _template: 'table', _url: window.location.href });
      const response = await fetch('https://formsubmit.co/ajax/' + email, {
        method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(emailPayload),
      });
      const result = await response.json();
      if (!response.ok || result.success === false) throw new Error(result.message || 'Unable to send your enquiry.');
      form.reset(); setStatus('success');
      setMessage(saved ? 'Your enquiry has been received and added to our project pipeline. We will get back to you by email.' : 'Your email enquiry was sent. The project dashboard could not save a copy, so the admin database may need configuration.');
    } catch {
      if (saved) {
        form.reset(); setStatus('success');
        setMessage('Your enquiry has been saved to our project pipeline. Email notification is temporarily unavailable.');
      } else {
        setStatus('error'); setMessage('We could not send or save your enquiry. Please email officialsafebase@gmail.com directly.');
      }
    }
  }

  if (status === 'success') return <div className="form-success" role="status"><span className="success-mark">✓</span><div><span className="form-kicker">MESSAGE RECEIVED</span><h3>Thanks for reaching out.</h3><p>{message}</p><a href={'mailto:' + email}>Send another email ↗</a></div></div>;

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
    <label><span>Tell us a little about it</span><textarea name="project_details" rows={5} placeholder="What does your business do, and what would you like your website to help with?" required /></label>
    <button className="form-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending enquiry…' : 'Send project enquiry'} <span>↗</span></button>
    {status === 'error' && <p className="form-error" role="alert">{message}</p>}
    <p className="form-footnote">Your enquiry goes directly to <a href={'mailto:' + email}>{email}</a>.</p>
  </form>;
}
