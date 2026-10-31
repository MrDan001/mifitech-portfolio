'use client';

import { FormEvent, useState } from 'react';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) {
      setError(d.error || 'Sign in failed.');
      return;
    }
    location.reload();
  }

  return <main className="admin-login"><form onSubmit={submit}>
    <a className="admin-brand" href="/">MifiTech<span>.</span></a>
    <p className="admin-kicker">PRIVATE WORKSPACE</p>
    <h1>Admin sign in</h1>
    <p>Manage your website content, demo cards, project links, enquiries and proposals without editing code.</p>
    <label>Admin password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>
    {error && <output>{error}</output>}
    <button disabled={busy}>{busy ? 'Signing in…' : 'Sign in →'}</button>
  </form></main>;
}
