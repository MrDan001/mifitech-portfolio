import Link from 'next/link';
import './salon.css';
import SalonMobileNav from './MobileNav';

export const metadata = {
  title: 'Unisex Salon Website Demo | MifiTech',
  description: 'Explore a salon website concept with services, style gallery and WhatsApp appointment requests.',
};
const services = [
  { name: 'Classic & modern cuts', detail: 'Fade, trim, shape-up and signature cuts', price: 'From ₦5,000' },
  { name: 'Braids & protective styles', detail: 'Knotless, cornrows, twists and more', price: 'From ₦18,000' },
  { name: 'Wash & treatment', detail: 'Healthy hair care, wash and conditioning', price: 'From ₦8,000' },
  { name: 'Colour & styling', detail: 'Colour refresh, blowout and finishing', price: 'From ₦15,000' },
  { name: 'Locs & maintenance', detail: 'Retwist, repair and loc care', price: 'From ₦12,000' },
  { name: 'Special occasion', detail: 'Looks for events, celebrations and photos', price: 'Quote on request' },
];
const photos = [
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1503951458645-4e4b7a3f5f0b?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=85',
];
export default function UnisexSalonDemo() {
  const whatsapp = 'https://wa.me/2349067859200?text=' + encodeURIComponent('Hello MifiTech, I would like to enquire about this salon website demo.');
  return (
    <main className="salonDemo">
      <div className="salonDemoNotice"><span>MIFITECH WEBSITE DEMO</span><span>Concept showcase · Details can be customised</span></div>
      <header className="salonNav"><a className="salonLogo" href="#home"><span className="salonMark">✂</span><span>THE CHAIR<small>HAIR STUDIO</small></span></a><nav><a href="#services">Services</a><a href="#gallery">Gallery</a><a href="#visit">Visit</a></nav><a className="salonBook" href={whatsapp}>Book on WhatsApp</a></header>
      <section className="salonHero" id="home"><div className="salonHeroCopy"><span className="salonEyebrow">THE ART OF GOOD HAIR</span><h1>Your style.<br/><em>Your confidence.</em></h1><p>Hair care and styling for everyone. A good cut, a fresh look and a little time for yourself.</p><div className="salonHeroActions"><a href={whatsapp} className="salonGoldBtn">Book an appointment</a><a href="#services" className="salonTextLink">Explore services</a></div><div className="salonHeroMeta"><span>01 — PERSONAL STYLE</span><span>02 — CARE & CRAFT</span></div></div><div className="salonHeroImage"><img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1100&q=85" alt="Barber working on a client" onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1100&q=85"; }} /><div className="salonHeroOverlay"><span>GOOD HAIR IS A FEELING.</span><strong>Find yours.</strong></div></div></section>
      <section className="salonIntro"><span>NOT JUST A HAIRCUT</span><h2>A studio for <i>every</i> style.</h2><p>From sharp fades and clean cuts to braids, treatments and loc maintenance — browse the work, choose what you need and book your time without the back-and-forth.</p></section>
      <section className="salonServices" id="services"><div className="salonSectionHead"><div><span>THE MENU</span><h2>Services & care</h2></div><p>Clear options, helpful details and a simple way to request the appointment that suits you.</p></div><div className="salonServiceGrid">{services.map((s,i)=><article className="salonService" key={s.name}><span className="salonServiceNo">0{i+1}</span><h3>{s.name}</h3><p>{s.detail}</p><span className="salonPrice">{s.price}</span></article>)}</div></section>
      <section className="salonGallery" id="gallery"><div className="salonSectionHead"><div><span>THE LOOKBOOK</span><h2>Find your next look.</h2></div><p>Every style tells a story. A gallery helps new clients see the quality and range before they book.</p></div><div className="salonPhotoGrid">{photos.map((p,i)=><a key={p} href={p} target="_blank" rel="noreferrer" className={'salonPhoto salonPhoto'+i}><img src={p} alt={'Salon hairstyle inspiration '+(i+1)} loading="lazy"/></a>)}</div></section>
      <section className="salonBooking"><div><span>YOUR NEXT APPOINTMENT</span><h2>Ready for a<br/><i>fresh start?</i></h2><p>Choose your service and preferred time. We’ll make it easy to get in touch and confirm your visit.</p><a href={whatsapp} className="salonGoldBtn">Request a booking</a></div><div className="salonBookingImage"><img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85" alt="Salon interior" loading="lazy" onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=85"; }}/></div></section>
      <section className="salonVisit" id="visit"><div><span>COME THROUGH</span><h2>Find us. Get comfortable.</h2><p>Location, opening hours and contact information can be updated for the real salon.</p></div><div className="salonVisitDetails"><p><b>LOCATION</b><br/>Your salon address goes here</p><p><b>OPENING HOURS</b><br/>Monday – Saturday · 9am – 7pm<br/>Sunday · By appointment</p><p><b>CONTACT</b><br/>WhatsApp appointment requests</p></div></section>
      <footer className="salonFooter"><a className="salonLogo" href="#home"><span className="salonMark">✂</span><span>THE CHAIR<small>HAIR STUDIO</small></span></a><p>Good hair. Good energy.</p><a href={whatsapp}>WhatsApp</a></footer>
      <div className="salonDemoBottom"><Link href="/demos">Back to website demos</Link><span>Built as a MifiTech concept</span></div>
    <SalonMobileNav whatsapp={whatsapp} />
    </main>
  );
}
