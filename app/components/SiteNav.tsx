'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.53 2 12.14c0 4.48 2.86 8.27 6.83 9.61.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.2-3.37-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.31.1-2.72 0 0 .83-.27 2.75 1.05a9.2 9.2 0 0 1 5 0c1.92-1.32 2.75-1.05 2.75-1.05.54 1.41.2 2.46.1 2.72.63.72 1.02 1.63 1.02 2.75 0 3.92-2.35 4.78-4.58 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.6.69.49A10.1 10.1 0 0 0 22 12.14C22 6.53 17.52 2 12 2Z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.75 5.5h16.5A1.75 1.75 0 0 1 22 7.25v9.5a1.75 1.75 0 0 1-1.75 1.75H3.75A1.75 1.75 0 0 1 2 16.75v-9.5A1.75 1.75 0 0 1 3.75 5.5Zm.2 2.1 7.41 5.3a1.1 1.1 0 0 0 1.28 0l7.41-5.3-.87-1.2-7.18 5.14-7.18-5.14-.87 1.2Z"/>
    </svg>
  );
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const close = () => setOpen(false);
  const mailto = 'mailto:officialsafebase@gmail.com?subject=Project%20Inquiry%20for%20Mifitech';

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link className="brand" href="/" onClick={close}>
          Mifi<span>.</span>
        </Link>

        <div className="links desktop-links">
          <a href="/">HOME</a>
          <a href="/#work">PROJECTS</a>
          <a href="/#about">ABOUT</a>
          <a href="/#contact">CONTACT</a>
        </div>

        <div className="nav-social">
          <a className="nav-icon" href="https://github.com/MrDan001" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a className="nav-icon" href={mailto} aria-label="Email">
            <MailIcon />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-line" />
            <span className="menu-line" />
            <span className="menu-line" />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="mobile-menu">
          <div className="wrap mobile-menu-inner">
            <a href="/" onClick={close}>HOME</a>
            <a href="/#work" onClick={close}>PROJECTS</a>
            <a href="/#about" onClick={close}>ABOUT</a>
            <a href="/#contact" onClick={close}>CONTACT</a>
            <a href="https://github.com/MrDan001" target="_blank" rel="noreferrer" onClick={close}>GITHUB ↗</a>
            <a href={mailto} onClick={close}>EMAIL ↗</a>
          </div>
        </div>
      )}
    </nav>
  );
}
