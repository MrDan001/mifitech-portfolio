// Path: app/admin/login.tsx
'use client';

import { FormEvent, useState } from 'react';
import { Icon } from './ui';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }).catch(() => null);
    const d = r ? await r.json().catch(() => ({})) : {};
    setBusy(false);
    if (!r || !r.ok) { setError(d.error || 'We could not sign you in. Check your connection and try again.'); return; }
    location.reload();
  }

  return (
    <main className="ad-login">
      <section className="ad-login-art" aria-hidden="true">
        <img src="/brand/logo-b-horizontal-dark.svg" alt="" />
        <h2>Run your studio from <em>one place.</em></h2>
        <ul>
          <li><Icon n="check" />Reply to enquiries and track every lead</li>
          <li><Icon n="check" />Send proposals and follow payments</li>
          <li><Icon n="check" />Edit your website without touching code</li>
        </ul>
      </section>
      <section className="ad-login-form">
        <form onSubmit={submit}>
          <div><p className="ad-sub">Private workspace</p><h1>Welcome back</h1></div>
          <label className="ad-field"><span>Admin password</span>
            <span className="ad-pw"><input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" autoFocus /><button type="button" onClick={() => setShow(!show)} aria-pressed={show}>{show ? 'Hide' : 'Show'}</button></span>
          </label>
          {error && <p className="ad-err" role="alert">{error}</p>}
          <button className="ad-btn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
          <a className="ad-sub" href="/">Back to the website</a>
        </form>
      </section>
    </main>
  );
}