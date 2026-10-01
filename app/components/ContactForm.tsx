'use client';

import { FormEvent, useState } from 'react';

const email = 'officialsafebase@gmail.com';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set('_subject', 'New project inquiry from Mifitech portfolio');
    formData.set('_template', 'table');
    formData.set('_url', window.location.href);
    formData.set('_honey', '');

    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Unable to send your message right now.');
      }

      form.reset();
      setStatus('success');
      setMessage('Your project details have been sent. I’ll get back to you by email.');
    } catch {
      setStatus('error');
      setMessage(
        'The message could not be sent. Please try again, or email me directly at officialsafebase@gmail.com.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success">
        <div className="success-icon">✓</div>
        <div>
          <div className="eyebrow">MESSAGE SENT</div>
          <h3>Thanks — I’ve got the brief.</h3>
          <p>{message}</p>
          <a className="btn primary" href={`mailto:${email}`}>
            Open email ↗
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="form-row">
        <label>
          <span>Full name</span>
          <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>What are you building?</span>
          <select name="project_type" defaultValue="" required>
            <option value="" disabled>Select a project type</option>
            <option>Business website</option>
            <option>Web application</option>
            <option>Mobile application</option>
            <option>Business management system</option>
            <option>E-commerce platform</option>
            <option>AI / automation product</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          <span>Target timeline</span>
          <select name="timeline" defaultValue="">
            <option value="">Choose a timeline</option>
            <option>As soon as possible</option>
            <option>Within 1 month</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>Still planning</option>
          </select>
        </label>
      </div>

      <label>
        <span>What should the product do?</span>
        <textarea
          name="project_details"
          rows={4}
          placeholder="Tell me what you want to build, the main features, and who it is for."
          required
        />
      </label>

      <label>
        <span>What are you expecting from me?</span>
        <textarea
          name="expectations"
          rows={3}
          placeholder="For example: UI design, full development, database, payments, deployment, maintenance..."
          required
        />
      </label>

      <div className="form-row">
        <label>
          <span>Approx. budget</span>
          <select name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            <option>Under ₦250,000</option>
            <option>₦250,000 – ₦500,000</option>
            <option>₦500,000 – ₦1,000,000</option>
            <option>₦1,000,000+</option>
            <option>We need to discuss it</option>
          </select>
        </label>
        <label>
          <span>Current stage</span>
          <select name="stage" defaultValue="">
            <option value="">Choose one</option>
            <option>Just an idea</option>
            <option>Planning / design</option>
            <option>Already started</option>
            <option>Existing product needs work</option>
          </select>
        </label>
      </div>

      <button className="form-submit btn primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending brief…' : 'Send project brief ↗'}
      </button>

      {status === 'error' && <p className="form-error" role="alert">{message}</p>}

      <p className="form-footnote">
        Your details go directly to <a href={`mailto:${email}`}>{email}</a>.
      </p>
    </form>
  );
}
