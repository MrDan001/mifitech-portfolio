// Path: app/proposal/[token]/ProposalActions.tsx
'use client';

import { useState } from 'react';

export function CopyText({ text, label = 'Copy details' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return <button type="button" className="pp-btn pp-ghost" onClick={() => navigator.clipboard.writeText(text).then(() => { setDone(true); window.setTimeout(() => setDone(false), 2500); }).catch(() => setDone(false))}>{done ? 'Copied' : label}</button>;
}

export function PrintButton() {
  return <button type="button" className="pp-btn pp-ghost" onClick={() => window.print()}>Save or print as PDF</button>;
}