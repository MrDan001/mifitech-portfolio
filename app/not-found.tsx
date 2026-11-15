import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for could not be found. Return to the MifiTech homepage.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mf-not-found">
      <div className="mf-not-found-inner">
        <Link href="/" className="mf-not-found-brand" aria-label="MifiTech home">
          <span className="mf-not-found-mark">M</span><span>MifiTech<span className="mf-not-found-dot">.</span></span>
        </Link>
        <p className="mf-not-found-kicker">ERROR 404 / PAGE NOT FOUND</p>
        <h1>This page took a wrong turn.</h1>
        <p className="mf-not-found-copy">The address may be incorrect, or the page may have moved. Let’s get you back to the right place.</p>
        <Link href="/" className="mf-not-found-home">Back to MifiTech home <span aria-hidden="true">→</span></Link>
        <p className="mf-not-found-foot">Need something specific? Start again from the homepage.</p>
      </div>
      <style>{`
        .mf-not-found{min-height:100svh;display:grid;place-items:center;padding:32px 22px;background:#111b1d;color:#f4f3ed;font-family:Arial,Helvetica,sans-serif}
        .mf-not-found-inner{width:min(100%,680px);padding:clamp(30px,7vw,76px);border:1px solid #344345;border-radius:18px;background:radial-gradient(ellipse at 90% 0%,#26383a 0,transparent 48%),#172326}
        .mf-not-found-brand{display:inline-flex;align-items:center;gap:11px;color:#f4f3ed;text-decoration:none;font-size:22px;font-weight:800;letter-spacing:-1px}
        .mf-not-found-mark{display:grid;place-items:center;width:38px;height:38px;border-radius:10px;background:#c7f36b;color:#15201c;font-size:22px}
        .mf-not-found-dot{color:#c7f36b}
        .mf-not-found-kicker{margin:64px 0 15px;color:#c7f36b;font-size:11px;font-weight:800;letter-spacing:2px}
        .mf-not-found h1{max-width:560px;margin:0;color:#f4f3ed;font-size:clamp(42px,8vw,76px);line-height:.98;letter-spacing:-4px}
        .mf-not-found-copy{max-width:470px;margin:24px 0 30px;color:#b6c3c0;font-size:16px;line-height:1.8}
        .mf-not-found-home{display:inline-flex;align-items:center;gap:24px;padding:15px 19px;border-radius:7px;background:#c7f36b;color:#15201c;text-decoration:none;font-size:14px;font-weight:800}
        .mf-not-found-home:hover{background:#d7ff8b;transform:translateY(-1px)}
        .mf-not-found-foot{margin:46px 0 0;color:#82918d;font-size:12px}
        @media(max-width:520px){.mf-not-found-kicker{margin-top:48px}.mf-not-found h1{letter-spacing:-2.5px}.mf-not-found-copy{font-size:14px}}
      `}</style>
    </main>
  );
}
