// Path: app/demos/[industry]/DemoForm.tsx
'use client';

import { useState } from 'react';

export default function DemoForm({ fields, button }: { fields: string[]; button: string }) {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="rd-sent" role="status">Thank you. This is a concept preview, so nothing was sent. On a real site this would reach the business instantly.</p>;
  return (
    <form className="rd-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
      {fields.map((field) => <label key={field}><span>{field}</span><input name={field} required /></label>)}
      <button type="submit">{button}</button>
    </form>
  );
}