// Path: app/components/Analytics.tsx
'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { track } from '@/lib/track';
import './analytics.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = 'mifitech-analytics';

export default function Analytics() {
  const [choice, setChoice] = useState<'yes' | 'no' | null | undefined>(undefined);

  useEffect(() => {
    try { const saved = localStorage.getItem(KEY); setChoice(saved === 'yes' || saved === 'no' ? saved : null); } catch { setChoice(null); }
  }, []);

  useEffect(() => {
    if (choice !== 'yes') return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a');
      const href = link?.getAttribute('href') || '';
      if (href.includes('wa.me/')) track('whatsapp_click', { page: location.pathname });
      else if (href.startsWith('/demos/')) track('demo_open', { demo: href.replace('/demos/', '') });
      else if (href.startsWith('mailto:')) track('email_click', { page: location.pathname });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [choice]);

  if (!GA_ID) return null;
  const decide = (value: 'yes' | 'no') => { try { localStorage.setItem(KEY, value); } catch { /* ignore */ } setChoice(value); };

  return (
    <>
      {choice === 'yes' && <>
        <Script src={'https://www.googletagmanager.com/gtag/js?id=' + GA_ID} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}</Script>
      </>}
      {choice === null && (
        <div className="an-banner" role="dialog" aria-label="Analytics choice">
          <p>We use Google Analytics to see which pages are useful. No ads and no selling of data. <a href="/privacy">Read more</a></p>
          <div><button type="button" className="an-no" onClick={() => decide('no')}>Decline</button><button type="button" className="an-yes" onClick={() => decide('yes')}>Accept</button></div>
        </div>
      )}
    </>
  );
}