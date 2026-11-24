'use client';

import { FormEvent, useState } from 'react';

export default function TestimonialForm() {
  const [rating, setRating] = useState(5);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage(''); setError('');
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || ''),
      company: String(data.get('company') || ''),
      role: String(data.get('role') || ''),
      email: String(data.get('email') || ''),
      quote: String(data.get('quote') || ''),
      rating,
      consent: data.get('consent') === 'on',
      website: String(data.get('website') || ''),
    };
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your testimony could not be submitted.');
      setMessage(result.message || 'Thank you. Your testimony has been sent for review.');
      form.reset(); setRating(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Please try again.');
    } finally { setBusy(false); }
  }

  return (
    <form className="mh-testimonial-form" onSubmit={submit}>
      <div className="mh-testimonial-form-head">
        <span>SHARE YOUR EXPERIENCE</span>
        <h3>Worked with MifiTech?</h3>
        <p>Tell others what the experience was like. Every submission is reviewed before it appears on the website.</p>
      </div>
      <div className="mh-testimonial-rating">
        <span>Your rating</span>
        <div role="radiogroup" aria-label="Your rating">
          {[1,2,3,4,5].map((value) => (
            <button key={value} type="button" role="radio" aria-checked={rating === value} aria-label={value + ' star' + (value === 1 ? '' : 's')} className={value <= rating ? 'is-selected' : ''} onClick={() => setRating(value)}>★</button>
          ))}
        </div>
        <small>{rating} out of 5</small>
      </div>
      <div className="mh-testimonial-fields">
        <label>Your name<input name="name" autoComplete="name" maxLength={100} required placeholder="e.g. Ada Okafor" /></label>
        <label>Business / company <span>(optional)</span><input name="company" maxLength={120} placeholder="Your business name" /></label>
        <label>Your role <span>(optional)</span><input name="role" maxLength={100} placeholder="e.g. Founder" /></label>
        <label>Email <span>(optional, kept private)</span><input name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" /></label>
        <label className="mh-testimonial-full">Your testimony<textarea name="quote" required minLength={20} maxLength={1200} rows={5} placeholder="Share what we worked on and how it went…" /></label>
      </div>
      <label className="mh-testimonial-consent"><input type="checkbox" name="consent" required /><span>I confirm this is my genuine experience and give MifiTech permission to publish my testimony and rating if it is approved. My email address will not be displayed.</span></label>
      <label className="mh-testimonial-trap" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="mh-btn mh-btn-ink" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Submit testimony'}</button>
      {message && <p className="mh-testimonial-success" role="status">{message}</p>}
      {error && <p className="mh-testimonial-error" role="alert">{error}</p>}
    </form>
  );
}
