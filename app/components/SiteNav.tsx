'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link className="brand" href="/" onClick={close}>
          Mifi<span>.</span>
        </Link>

        <div className="links desktop-links">
          <a href="/#work">WORK</a>
          <a href="/#about">ABOUT</a>
          <a href="/#contact">CONTACT</a>
          <a href="https://github.com/MrDan001" target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </div>

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

      {open && (
        <div id="mobile-navigation" className="mobile-menu">
          <div className="wrap mobile-menu-inner">
            <a href="/#work" onClick={close}>WORK</a>
            <a href="/#about" onClick={close}>ABOUT</a>
            <a href="/#contact" onClick={close}>CONTACT</a>
            <a href="https://github.com/MrDan001" target="_blank" rel="noreferrer" onClick={close}>
              GITHUB ↗
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
