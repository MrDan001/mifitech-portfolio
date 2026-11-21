'use client';
export default function SalonMobileNav({whatsapp}:{whatsapp:string}) {
  return <nav className="salonMobileAppNav" aria-label="Salon mobile navigation">
    <a href="#home"><span>⌂</span><small>Home</small></a>
    <a href="#services"><span>✂</span><small>Services</small></a>
    <a href="#gallery"><span>▧</span><small>Gallery</small></a>
    <a href="#visit"><span>⌖</span><small>Visit</small></a>
    <a className="salonMobileBook" href={whatsapp}><span>↗</span><small>Book</small></a>
  </nav>;
}
