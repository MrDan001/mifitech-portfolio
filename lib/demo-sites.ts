// Path: lib/demo-sites.ts
export type Item = { t: string; d?: string; p?: string; img?: string };
export type Section =
  | { k: 'list'; title: string; intro?: string; items: Item[] }
  | { k: 'cards'; title: string; intro?: string; items: Item[] }
  | { k: 'steps'; title: string; items: Item[] }
  | { k: 'people'; title: string; items: Item[] }
  | { k: 'gallery'; title: string; imgs: string[] }
  | { k: 'quote'; q: string; by: string }
  | { k: 'faq'; title: string; items: { q: string; a: string }[] };

export type RichDemo = {
  name: string; tag: string; nav: string[]; accent: string; ink: string; bg: string; soft: string; serif?: boolean;
  hero: { kicker: string; title: string; intro: string; cta: string; cta2: string; img: string };
  facts: [string, string][];
  sections: Section[];
  form: { title: string; intro: string; fields: string[]; button: string };
  footer: { address: string; hours: string; phone: string };
};

const u = (id: string) => 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=1100&q=80';
const I = {
  food: u('1414235077428-338989a2e8c0'), room: u('1517248135467-4c7edcad34c4'), share: u('1555939594-58d7cb561ad1'), plate: u('1504674900247-0877df9cc836'),
  salon: u('1600948836101-f9f03dd557db'), makeup: u('1522335789203-aabd1fc54bc9'), portrait: u('1487412720507-e7ab37603c6f'),
  clinic: u('1622902046580-2b47f47f5471'),
  f1: u('1539109136881-3be0616acf4b'), f2: u('1483985988355-763728e1935b'), f3: u('1529139574466-a303027c1d8b'),
  h1: u('1600596542815-ffad4c1539a9'), h2: u('1600607687939-ce8a6c25118c'), h3: u('1600607687920-4e2a09cf159d'), h4: u('1600210492486-724fe5c67fb0'),
};

const J = {
  e1: u('1519741497674-611481863552'), e2: u('1507504031003-b417219a0d6b'), e3: u('1464366400600-7168b8af9bc3'),
  p1: u('1504274066651-8d31a536b11a'), p2: u('1602523961358-f9f03dd557db'), p3: u('1455390582262-044cdead277a'),
  a1: u('1486006920555-c77dcf18193c'), a2: u('1487754180451-c456f719a1fc'), a3: u('1492144534655-ae79c964c9d7'),
  l1: u('1604335399105-a0c585fd81a1'), l2: u('1556909212-d5b604d0c90d'), l3: u('1545173168-9f1947eebb7f'),
  c1: u('1504674900247-0877df9cc836'), c2: u('1519167758481-83f550bb49b3'), c3: u('1547592180-85f173990554'),
  n1: u('1600607687939-ce8a6c25118c'), n2: u('1600607687920-4e2a09cf159d'), n3: u('1600210492486-724fe5c67fb0'),
  k1: u('1581578731548-c64695cc6952'), k2: u('1497366754035-f200968a6e72'), k3: u('1585421514738-01798e348b17'),
  s1: u('1580582932707-520aed937b7b'), g1: u('1586528116311-ad8dd3c8310d'),
};

export const richDemos: Record<string, RichDemo> = {
  restaurant: {
    name: 'MESA', tag: 'Kitchen & table, Lekki', nav: ['Menu', 'Gallery', 'Visit'], accent: '#b4472f', ink: '#241812', bg: '#fffaf3', soft: '#f6ebdc', serif: true,
    hero: { kicker: 'Lekki, Lagos', title: 'Gather around something good.', intro: 'Jollof, grills and small chops, cooked fresh every day. Book a table or order ahead for pickup.', cta: 'Book a table', cta2: 'See the menu', img: I.food },
    facts: [['Open daily', '12pm to 10pm'], ['Delivery', 'About 45 minutes'], ['Private dining', 'Up to 20 guests'], ['Rated', '4.8 from 640 reviews']],
    sections: [
      { k: 'list', title: 'From the kitchen', intro: 'A short menu, done properly. Everything is made to order.', items: [
        { t: 'Smoky party jollof', d: 'Long-grain rice, grilled chicken, fried plantain', p: '₦4,500' }, { t: 'Suya platter', d: 'Spiced beef, onions, tomato, yaji', p: '₦6,000' },
        { t: 'Pepper soup', d: 'Goat meat or catfish, served hot', p: '₦5,200' }, { t: 'Egusi and pounded yam', d: 'Assorted meat, stockfish', p: '₦6,800' },
        { t: 'Grilled croaker', d: 'Whole fish, peppered sauce, dodo', p: '₦9,500' }, { t: 'Small chops basket', d: 'Puff-puff, spring rolls, samosa, gizzard', p: '₦7,500' },
        { t: 'Chapman', d: 'Chilled, 500ml', p: '₦1,800' }, { t: 'Zobo and ginger', d: 'House-made, lightly sweet', p: '₦1,500' }] },
      { k: 'gallery', title: 'The room and the table', imgs: [I.room, I.share, I.plate] },
      { k: 'steps', title: 'Planning a bigger meal?', items: [{ t: 'Tell us the occasion', d: 'Birthdays, office lunches, family dinners.' }, { t: 'Choose a set menu', d: 'We suggest options for your budget and headcount.' }, { t: 'Pay a deposit', d: 'Your date and table are held for you.' }] },
      { k: 'quote', q: 'Best party jollof in Lekki. We came for lunch and stayed for dinner.', by: 'Ngozi A., Google review' },
      { k: 'faq', title: 'Before you visit', items: [{ q: 'Do I need to book?', a: 'Walk-ins are welcome, but weekends and evenings fill up, so we recommend booking.' }, { q: 'Do you cater for events?', a: 'Yes. We cater for office lunches, weddings and private dinners across Lagos.' }, { q: 'Is there parking?', a: 'Yes, secure parking is available for guests.' }] },
    ],
    form: { title: 'Reserve a table', intro: 'Tell us when you are coming and we will confirm on WhatsApp.', fields: ['Your name', 'Phone number', 'Day and time', 'Number of guests'], button: 'Request reservation' },
    footer: { address: '12 Admiralty Way, Lekki Phase 1, Lagos', hours: 'Mon to Sun, 12pm to 10pm', phone: '+234 906 785 9200' },
  },
  'beauty-salon': {
    name: 'AUREL', tag: 'Beauty studio, Victoria Island', nav: ['Services', 'Team', 'Book'], accent: '#8a3d6e', ink: '#2a1824', bg: '#fdf8fa', soft: '#f5e8ef', serif: true,
    hero: { kicker: 'Victoria Island, Lagos', title: 'A little time for your best self.', intro: 'Hair, nails and skincare by appointment, in a calm studio where nobody rushes you.', cta: 'Book appointment', cta2: 'View services', img: I.salon },
    facts: [['Open', 'Tuesday to Sunday'], ['Walk-ins', 'Welcome when we have space'], ['Studio', '4 stylists, 2 skin rooms'], ['Rated', '4.9 from 310 reviews']],
    sections: [
      { k: 'list', title: 'Service menu', intro: 'Prices include products. Deposits secure your slot.', items: [
        { t: 'Silk press', d: '2 hrs, wash and blow-dry included', p: '₦15,000' }, { t: 'Knotless braids', d: '4 to 6 hrs, medium length', p: '₦35,000' },
        { t: 'Gel manicure', d: '1 hr, removal included', p: '₦8,000' }, { t: 'Acrylic full set', d: '1.5 hrs, shape and colour of your choice', p: '₦18,000' },
        { t: 'Facial glow', d: '45 min, deep cleanse and mask', p: '₦12,000' }, { t: 'Lash lift and tint', d: '1 hr', p: '₦14,000' },
        { t: 'Bridal makeup trial', d: '1.5 hrs, look planning included', p: '₦40,000' }] },
      { k: 'people', title: 'Meet the team', items: [{ t: 'Adaeze', d: 'Lead stylist, 9 years in hair' }, { t: 'Zainab', d: 'Nails and lashes' }, { t: 'Kemi', d: 'Skin therapist' }] },
      { k: 'gallery', title: 'Recent work', imgs: [I.makeup, I.portrait, I.salon] },
      { k: 'steps', title: 'Book in three steps', items: [{ t: 'Choose a service', d: 'Pick one or combine a few.' }, { t: 'Pick a time', d: 'We confirm by WhatsApp within the hour.' }, { t: 'Pay a small deposit', d: 'It comes off your final bill.' }] },
      { k: 'quote', q: 'I walked in stressed and left feeling brand new. My hair has never looked better.', by: 'Funke O., returning client' },
      { k: 'faq', title: 'Good to know', items: [{ q: 'Can I bring a photo?', a: 'Please do. It helps us agree the look before we start.' }, { q: 'What if I need to reschedule?', a: 'Tell us 24 hours ahead and your deposit moves to the new date.' }, { q: 'Do you do bridal parties?', a: 'Yes. We offer on-site and in-studio packages for the bride and her team.' }] },
    ],
    form: { title: 'Request an appointment', intro: 'Share what you would like and your preferred day.', fields: ['Your name', 'Phone number', 'Service you want', 'Preferred day and time'], button: 'Request appointment' },
    footer: { address: '5 Adetokunbo Ademola Street, Victoria Island, Lagos', hours: 'Tue to Sun, 9am to 7pm', phone: '+234 906 785 9200' },
  },
  'fashion-boutique': {
    name: 'NAYA', tag: 'Style House', nav: ['New in', 'Lookbook', 'Order'], accent: '#274a7c', ink: '#14202e', bg: '#ffffff', soft: '#eef2f7',
    hero: { kicker: 'New season', title: 'The new edit has landed.', intro: 'Pieces made to move with you, from desk to dinner. Delivered across Nigeria.', cta: 'Shop new arrivals', cta2: 'See the lookbook', img: I.f1 },
    facts: [['Delivery', 'Free in Lagos over ₦50,000'], ['Pay', 'On delivery in Lagos'], ['Order', 'On WhatsApp or online'], ['Returns', 'Within 7 days']],
    sections: [
      { k: 'cards', title: 'New arrivals', intro: 'Small batches, so pieces sell out.', items: [
        { t: 'Ankara two-piece', d: 'Sizes 8 to 18', p: '₦28,000', img: I.f1 }, { t: 'Linen co-ord set', d: 'Sizes 8 to 20', p: '₦24,500', img: I.f2 }, { t: 'Wrap dress', d: 'Sizes 8 to 18', p: '₦19,000', img: I.f3 }] },
      { k: 'list', title: 'Shop by category', items: [{ t: 'Dresses', d: '42 pieces' }, { t: 'Two-piece sets', d: '28 pieces' }, { t: 'Bags and accessories', d: '31 pieces' }, { t: 'Shoes', d: '19 pieces' }] },
      { k: 'gallery', title: 'The lookbook', imgs: [I.f2, I.f3, I.f1] },
      { k: 'steps', title: 'How ordering works', items: [{ t: 'Pick your pieces', d: 'Add to your bag or send us a screenshot.' }, { t: 'Confirm size and address', d: 'We reply on WhatsApp within minutes.' }, { t: 'Delivered to you', d: '1 to 2 days in Lagos, 3 to 5 days elsewhere.' }] },
      { k: 'quote', q: 'The fit is perfect and it arrived in two days. Already ordering again.', by: 'Bisi T., Abuja' },
      { k: 'faq', title: 'Delivery and returns', items: [{ q: 'Can I try before I pay?', a: 'In Lagos, yes. Pay on delivery after you have checked your order.' }, { q: 'What if it does not fit?', a: 'Message us within 7 days and we will arrange an exchange.' }, { q: 'Do you ship outside Lagos?', a: 'Yes, to all states through trusted dispatch partners.' }] },
    ],
    form: { title: 'Order or ask a question', intro: 'Tell us what you want and we will reply on WhatsApp.', fields: ['Your name', 'WhatsApp number', 'Item and size', 'Delivery area'], button: 'Send order request' },
    footer: { address: 'Showroom: 8 Allen Avenue, Ikeja, Lagos', hours: 'Mon to Sat, 10am to 7pm', phone: '+234 906 785 9200' },
  },
  'private-clinic': {
    name: 'WELLSPRING', tag: 'Medical centre, Ikeja', nav: ['Services', 'Doctors', 'Appointments'], accent: '#087f79', ink: '#0d2a2c', bg: '#f7fbfb', soft: '#e4f1f1',
    hero: { kicker: 'Ikeja, Lagos', title: 'Care you can trust, close to home.', intro: 'Family doctors, dental care and laboratory tests under one roof, with clear prices before treatment.', cta: 'Book a visit', cta2: 'Our services', img: I.clinic },
    facts: [['Open', 'Mon to Sat, 8am to 8pm'], ['Sundays', 'Emergencies only'], ['Lab results', 'Same day'], ['Reminders', 'SMS and WhatsApp']],
    sections: [
      { k: 'list', title: 'Services and prices', intro: 'Starting prices. Your doctor confirms the final cost before treatment.', items: [
        { t: 'General consultation', d: '30 minutes with a family doctor', p: '₦10,000' }, { t: 'Dental check-up and scale', d: '45 minutes', p: '₦15,000' },
        { t: 'Malaria and typhoid test', d: 'Results the same day', p: '₦6,500' }, { t: 'Child wellness visit', d: 'Growth check and vaccinations advice', p: '₦12,000' },
        { t: 'Antenatal consultation', d: 'Routine check with a doctor', p: '₦15,000' }, { t: 'Full health screening', d: 'Blood tests, BP, BMI and review', p: '₦45,000' }] },
      { k: 'people', title: 'Our doctors', items: [{ t: 'Dr. Amina Bello', d: 'General practice, 12 years' }, { t: 'Dr. Chidi Eze', d: 'Dental surgeon' }, { t: 'Dr. Tolu Ojo', d: 'Paediatrics' }] },
      { k: 'steps', title: 'What to expect', items: [{ t: 'Book online or call', d: 'Choose a doctor and a time that suits you.' }, { t: 'Arrive and be seen', d: 'Short waits, private consulting rooms.' }, { t: 'Get a clear plan', d: 'You leave with results, prescriptions and costs in writing.' }] },
      { k: 'quote', q: 'Quick, clear and kind. I knew the cost before I sat down.', by: 'Mrs. Okafor, patient' },
      { k: 'faq', title: 'Common questions', items: [{ q: 'Do you accept health insurance?', a: 'We work with several providers. Call us with your plan details and we will confirm.' }, { q: 'Can I get my results online?', a: 'Yes, lab results are sent securely to your phone or email.' }, { q: 'What if I need urgent care on Sunday?', a: 'Our emergency line is answered every day of the week.' }] },
    ],
    form: { title: 'Request an appointment', intro: 'Fill in your details and our team will confirm your slot.', fields: ['Full name', 'Phone number', 'Service needed', 'Preferred day and time'], button: 'Request appointment' },
    footer: { address: '27 Obafemi Awolowo Way, Ikeja, Lagos', hours: 'Mon to Sat, 8am to 8pm', phone: '+234 906 785 9200' },
  },
  'real-estate': {
    name: 'HOMESTEAD', tag: 'Realty, Lagos and Abuja', nav: ['Listings', 'Agents', 'Viewings'], accent: '#1f5d46', ink: '#14231d', bg: '#fbfaf6', soft: '#eef0e6', serif: true,
    hero: { kicker: 'Homes for sale and rent', title: 'Find a home you can picture yourself in.', intro: 'Verified listings, honest pricing and agents who answer the phone. Book a viewing in minutes.', cta: 'Browse listings', cta2: 'Talk to an agent', img: I.h1 },
    facts: [['Listings', '180 verified properties'], ['Areas', 'Lekki, Ikoyi, Ajah, Maitama'], ['Documents', 'Checked before listing'], ['Viewings', 'Seven days a week']],
    sections: [
      { k: 'cards', title: 'Featured listings', intro: 'Every property is inspected and its documents checked by our team.', items: [
        { t: '4-bedroom terrace, Lekki Phase 1', d: '4 bed, 5 bath, 2 parking, BQ', p: '₦185m', img: I.h1 }, { t: '3-bedroom apartment, Ikoyi', d: '3 bed, 3 bath, pool, gym', p: '₦6.5m a year', img: I.h2 },
        { t: '5-bedroom detached, Maitama', d: '5 bed, 6 bath, garden, BQ', p: '₦420m', img: I.h3 }, { t: '2-bedroom flat, Ajah', d: '2 bed, 2 bath, gated estate', p: '₦3.2m a year', img: I.h4 }] },
      { k: 'people', title: 'Your agents', items: [{ t: 'Emeka Nwosu', d: 'Sales, Lekki and Ajah' }, { t: 'Halima Yusuf', d: 'Sales and lettings, Abuja' }, { t: 'Tunde Alabi', d: 'Lettings, Ikoyi and VI' }] },
      { k: 'steps', title: 'Buying with confidence', items: [{ t: 'Shortlist and view', d: 'We arrange viewings around your schedule.' }, { t: 'Verify the documents', d: 'Title and survey checks with your lawyer.' }, { t: 'Close and collect keys', d: 'We guide payment, agreement and handover.' }] },
      { k: 'quote', q: 'They showed me five homes in one afternoon and the paperwork was clear from day one.', by: 'Mr. and Mrs. Adeyemi, buyers' },
      { k: 'faq', title: 'Questions buyers ask', items: [{ q: 'Do you charge to list a property?', a: 'Listing is free. Our fee is agreed in writing before we start.' }, { q: 'Can you help with diaspora purchases?', a: 'Yes. We offer video viewings and a representative on the ground.' }, { q: 'How do you verify properties?', a: 'We check title documents, survey plans and seller identity before listing.' }] },
    ],
    form: { title: 'Request a viewing', intro: 'Tell us what you are looking for and an agent will call you.', fields: ['Full name', 'Phone number', 'Area and budget', 'Preferred viewing day'], button: 'Request viewing' },
    footer: { address: '14 Ozumba Mbadiwe Avenue, Victoria Island, Lagos', hours: 'Mon to Sun, 8am to 7pm', phone: '+234 906 785 9200' },
  },
  'event-planner': {
    name: 'GATHER & GRACE', tag: 'Event design and planning', nav: ['Packages', 'Process', 'Enquire'], accent: '#a65b4a', ink: '#2b1d1a', bg: '#fffaf7', soft: '#f6e9e3', serif: true,
    hero: { kicker: 'Weddings, birthdays and corporate events', title: 'Make room for moments that stay with you.', intro: 'From the first idea to the final detail, we plan, style and run events so you can enjoy them.', cta: 'Plan my event', cta2: 'See packages', img: J.e1 },
    facts: [['Events planned', 'Over 240 since 2018'], ['Guest sizes', '30 to 800 guests'], ['Cities', 'Lagos, Abuja, Port Harcourt'], ['Response', 'Within one working day']],
    sections: [
      { k: 'list', title: 'Planning packages', intro: 'Starting prices. We quote exactly once we know your date, venue and guest list.', items: [
        { t: 'Day-of coordination', d: 'A team runs your event on the day', p: 'from ₦250,000' }, { t: 'Partial planning', d: 'Vendors, timeline and styling support', p: 'from ₦600,000' },
        { t: 'Full planning and design', d: 'Concept, vendors, decor and management', p: 'from ₦1.5m' }, { t: 'Corporate events', d: 'Launches, dinners and award nights', p: 'Custom quote' }] },
      { k: 'gallery', title: 'Recent celebrations', imgs: [J.e1, J.e2, J.e3] },
      { k: 'steps', title: 'How we work', items: [{ t: 'Discovery call', d: 'We learn your vision, budget and date.' }, { t: 'Design and plan', d: 'You approve the look, vendors and timeline.' }, { t: 'Event day', d: 'We set up, run the programme and pack down.' }] },
      { k: 'quote', q: 'Everything was ready before the first guest arrived. We actually got to enjoy our own wedding.', by: 'Chioma and Dayo' },
      { k: 'faq', title: 'Before you book', items: [{ q: 'How early should we book?', a: 'For weddings, 6 to 9 months ahead is ideal. Smaller events can be arranged in 4 to 6 weeks.' }, { q: 'Can you work with our budget?', a: 'Yes. We tell you honestly what is possible and where to save.' }, { q: 'Do you handle vendors?', a: 'We source, brief and manage caterers, decorators, photographers and entertainers.' }] },
    ],
    form: { title: 'Tell us about your event', intro: 'Share a few details and we will reply with next steps.', fields: ['Your name', 'Phone number', 'Event type and date', 'Guest count and budget'], button: 'Send enquiry' },
    footer: { address: '9 Bourdillon Road, Ikoyi, Lagos', hours: 'Mon to Fri, 9am to 6pm', phone: '+234 906 785 9200' },
  },
  printing: {
    name: 'FORM', tag: 'Print and design studio', nav: ['Services', 'Process', 'Quote'], accent: '#d4491f', ink: '#171717', bg: '#fafafa', soft: '#eeeeee',
    hero: { kicker: 'Print, design and finishing', title: 'Make every detail count.', intro: 'Flyers, packaging, banners and branded stationery, designed and printed in one place with fast turnaround.', cta: 'Get a quote', cta2: 'See services', img: J.p1 },
    facts: [['Turnaround', 'From 24 hours'], ['Minimum order', 'No minimum on cards'], ['Delivery', 'Nationwide'], ['Proofs', 'Approved before print']],
    sections: [
      { k: 'list', title: 'What we print', intro: 'Starting prices for common jobs. Final quote depends on size, stock and finish.', items: [
        { t: 'Business cards', d: '500 cards, matte or gloss', p: '₦18,000' }, { t: 'Flyers (A5)', d: '1,000 pieces, full colour', p: '₦45,000' },
        { t: 'Roll-up banner', d: '85 x 200cm with stand', p: '₦28,000' }, { t: 'Branded packaging', d: 'Boxes, bags and labels', p: 'Custom quote' },
        { t: 'Brochures and menus', d: 'Folded or stapled', p: 'from ₦60,000' }, { t: 'T-shirt printing', d: 'Per piece, minimum 12', p: '₦4,500' }] },
      { k: 'gallery', title: 'Recent jobs', imgs: [J.p1, J.p2, J.p3] },
      { k: 'steps', title: 'From file to finished print', items: [{ t: 'Send your brief or file', d: 'We design from scratch or prepare your artwork.' }, { t: 'Approve a proof', d: 'Check colours, size and spelling before printing.' }, { t: 'Print and deliver', d: 'Collect in store or get it delivered.' }] },
      { k: 'quote', q: 'Our packaging looks like a brand twice our size. They caught three mistakes in our artwork.', by: 'Tola A., skincare founder' },
      { k: 'faq', title: 'Quick answers', items: [{ q: 'Can you design for me?', a: 'Yes. Our designers handle logos, flyers, packaging and full brand kits.' }, { q: 'How fast can you print?', a: 'Cards and flyers can be ready in 24 to 48 hours. Larger jobs take 3 to 5 days.' }, { q: 'Do you deliver outside Lagos?', a: 'Yes, through trusted dispatch partners to all states.' }] },
    ],
    form: { title: 'Request a quote', intro: 'Tell us what you need printed and by when.', fields: ['Your name', 'Phone number', 'What you need printed', 'Quantity and deadline'], button: 'Request quote' },
    footer: { address: '31 Opebi Road, Ikeja, Lagos', hours: 'Mon to Sat, 8am to 6pm', phone: '+234 906 785 9200' },
  },
  'auto-workshop': {
    name: 'MOTION', tag: 'Auto care and diagnostics', nav: ['Services', 'Process', 'Book'], accent: '#e0521b', ink: '#10151c', bg: '#f6f7f9', soft: '#e6e9ee',
    hero: { kicker: 'Diagnostics, service and repair', title: 'Know what your car needs before you approve the work.', intro: 'We inspect first, show you the findings and agree the price before any repair begins.', cta: 'Book an inspection', cta2: 'Our services', img: J.a1 },
    facts: [['Open', 'Mon to Sat, 8am to 6pm'], ['Inspection report', 'Sent to your phone'], ['Warranty', '90 days on repairs'], ['Pickup', 'Available in Lagos']],
    sections: [
      { k: 'list', title: 'Services and starting prices', items: [
        { t: 'Full diagnostic scan', d: 'Computer scan and written report', p: '₦15,000' }, { t: 'Oil and filter service', d: 'Engine oil, oil filter, top-ups', p: '₦25,000' },
        { t: 'Brake service', d: 'Pads, discs inspection and adjustment', p: '₦35,000' }, { t: 'AC repair and regas', d: 'Leak check and gas refill', p: '₦30,000' },
        { t: 'Suspension work', d: 'Shocks, bushings and alignment', p: 'from ₦60,000' }, { t: 'Pre-purchase inspection', d: '80-point check before you buy', p: '₦40,000' }] },
      { k: 'gallery', title: 'Inside the workshop', imgs: [J.a1, J.a2, J.a3] },
      { k: 'steps', title: 'How a visit works', items: [{ t: 'Drop off or book pickup', d: 'Tell us the symptoms you have noticed.' }, { t: 'Inspect and approve', d: 'You get a photo report and a fixed quote.' }, { t: 'Repair and collect', d: 'We fix only what you approve and test drive it.' }] },
      { k: 'quote', q: 'They showed me photos of the worn parts and priced everything upfront. No surprises at the end.', by: 'Mr. Okoro, Toyota Camry owner' },
      { k: 'faq', title: 'Common questions', items: [{ q: 'Do you fix all car brands?', a: 'We service most Japanese, Korean, German and American brands.' }, { q: 'Do you use genuine parts?', a: 'Yes, and we tell you the options and prices before fitting.' }, { q: 'How long does a service take?', a: 'A standard service takes 2 to 3 hours. We confirm repairs after inspection.' }] },
    ],
    form: { title: 'Book an inspection', intro: 'Tell us about your car and what you have noticed.', fields: ['Your name', 'Phone number', 'Car make, model and year', 'What is the problem?'], button: 'Book inspection' },
    footer: { address: '3 Ikorodu Road, Maryland, Lagos', hours: 'Mon to Sat, 8am to 6pm', phone: '+234 906 785 9200' },
  },
  laundry: {
    name: 'FRESH', tag: 'Laundry and dry cleaning', nav: ['Prices', 'Pickup', 'Book'], accent: '#1b7fd1', ink: '#0f2236', bg: '#f6fafe', soft: '#e3f0fb',
    hero: { kicker: 'Pickup and delivery across Lagos', title: 'Clean clothes. Less running around.', intro: 'Wash, dry, iron and dry cleaning, collected from your door and returned fresh in 48 hours.', cta: 'Book a pickup', cta2: 'See prices', img: J.l1 },
    facts: [['Turnaround', '48 hours'], ['Pickup', 'Free over ₦10,000'], ['Care', 'Stain and fabric checks'], ['Pay', 'Transfer or on delivery']],
    sections: [
      { k: 'list', title: 'Price list', intro: 'Simple prices per item or per kilo.', items: [
        { t: 'Wash, dry and fold', d: 'Everyday clothes', p: '₦1,500 per kg' }, { t: 'Shirt or blouse (iron)', d: 'Washed, pressed and hung', p: '₦1,000' },
        { t: 'Suit, 2 piece', d: 'Dry cleaned and pressed', p: '₦6,500' }, { t: 'Agbada or kaftan', d: 'Careful hand finish', p: '₦7,000' },
        { t: 'Duvet or bedspread', d: 'Washed and dried', p: '₦8,000' }, { t: 'Wedding gown', d: 'Specialist cleaning and boxing', p: 'from ₦45,000' }] },
      { k: 'steps', title: 'Pickup made simple', items: [{ t: 'Book in a minute', d: 'Choose a pickup time on WhatsApp or the form.' }, { t: 'We collect and clean', d: 'Items are tagged, checked and cleaned.' }, { t: 'Delivered fresh', d: 'Folded or hung, with a receipt.' }] },
      { k: 'gallery', title: 'Care for every garment', imgs: [J.l1, J.l2, J.l3] },
      { k: 'quote', q: 'My work shirts come back crisp every week and I never leave the office. Lifesaver.', by: 'Ifeoma K., Victoria Island' },
      { k: 'faq', title: 'Good to know', items: [{ q: 'What if something is damaged or lost?', a: 'Every item is tagged and checked. We cover verified damage or loss.' }, { q: 'Do you handle stains?', a: 'Yes. Tell us about the stain when you book and we treat it first.' }, { q: 'Which areas do you cover?', a: 'Lekki, Ikoyi, Victoria Island, Surulere, Yaba and Ikeja.' }] },
    ],
    form: { title: 'Book a pickup', intro: 'Tell us where and when and we will confirm on WhatsApp.', fields: ['Your name', 'Phone number', 'Pickup address', 'Preferred time'], button: 'Book pickup' },
    footer: { address: '18 Admiralty Way, Lekki Phase 1, Lagos', hours: 'Mon to Sat, 7am to 7pm', phone: '+234 906 785 9200' },
  },
  catering: {
    name: 'TABLE', tag: 'Catering house', nav: ['Menus', 'Events', 'Quote'], accent: '#7a4a1e', ink: '#241a12', bg: '#fdf9f3', soft: '#f3e8d8', serif: true,
    hero: { kicker: 'Weddings, corporate events and private dining', title: 'Food that gives the occasion its character.', intro: 'Chef-led menus for 30 to 1,000 guests, cooked fresh and served with care across Nigeria.', cta: 'Request a quote', cta2: 'See menus', img: J.c1 },
    facts: [['Guests', '30 to 1,000'], ['Menus', 'Nigerian and continental'], ['Service', 'Chefs, waiters and setup'], ['Tasting', 'Available before booking']],
    sections: [
      { k: 'list', title: 'Sample packages', intro: 'Per-guest pricing for sit-down and buffet service.', items: [
        { t: 'Classic buffet', d: 'Jollof, fried rice, two proteins, salad, dessert', p: '₦8,500 per guest' }, { t: 'Owambe feast', d: 'Four mains, small chops and drinks', p: '₦12,000 per guest' },
        { t: 'Plated dinner', d: 'Three courses with table service', p: '₦18,000 per guest' }, { t: 'Corporate lunch box', d: 'Individually packed, minimum 20', p: '₦6,500 each' },
        { t: 'Small chops platter', d: 'Serves 10', p: '₦35,000' }, { t: 'Live grill station', d: 'Suya and barbecue, chef included', p: '₦150,000' }] },
      { k: 'gallery', title: 'From our kitchen', imgs: [J.c1, J.c2, J.c3] },
      { k: 'steps', title: 'Planning your menu', items: [{ t: 'Tell us your event', d: 'Date, guests, venue and budget.' }, { t: 'Taste and choose', d: 'Sample dishes and shape the menu with our chef.' }, { t: 'We cook and serve', d: 'Our team handles setup, service and clean-up.' }] },
      { k: 'quote', q: 'Our guests are still talking about the food. Service was warm and nothing ran out.', by: 'Mrs. Bakare, 60th birthday' },
      { k: 'faq', title: 'Frequently asked', items: [{ q: 'Do you cater outside Lagos?', a: 'Yes, with a travel and setup fee agreed in advance.' }, { q: 'Can you handle dietary needs?', a: 'Yes. Vegetarian, halal and allergy-conscious menus are available.' }, { q: 'How much deposit do you need?', a: 'A 50 percent deposit secures your date.' }] },
    ],
    form: { title: 'Request a catering quote', intro: 'Share your event details and we will send a proposal.', fields: ['Your name', 'Phone number', 'Event date and venue', 'Guest count and budget'], button: 'Request quote' },
    footer: { address: '22 Awolowo Road, Ikoyi, Lagos', hours: 'Mon to Sat, 9am to 6pm', phone: '+234 906 785 9200' },
  },
  'interior-design': {
    name: 'FORM INTERIORS', tag: 'Design and fit-out studio', nav: ['Projects', 'Services', 'Consult'], accent: '#6b5b45', ink: '#1f1b16', bg: '#faf8f4', soft: '#eee8de', serif: true,
    hero: { kicker: 'Residential and commercial interiors', title: 'Spaces designed around the way you live.', intro: 'We design, furnish and deliver homes, offices and hospitality spaces with a clear budget and timeline.', cta: 'Book a consultation', cta2: 'See projects', img: J.n1 },
    facts: [['Projects', '120 completed'], ['Scope', 'Design to handover'], ['Furniture', 'Made locally to order'], ['Timeline', 'Agreed in writing']],
    sections: [
      { k: 'cards', title: 'Selected projects', intro: 'A few recent interiors from our studio.', items: [
        { t: 'Lekki family duplex', d: 'Full interior design and furnishing', p: '10 weeks', img: J.n1 }, { t: 'Ikoyi penthouse', d: 'Living, dining and master suite', p: '8 weeks', img: J.n2 }, { t: 'Victoria Island office', d: 'Open-plan workspace for 40 staff', p: '12 weeks', img: J.n3 }] },
      { k: 'list', title: 'What we do', items: [{ t: 'Interior design', d: 'Concepts, layouts and 3D visuals', p: 'from ₦400,000' }, { t: 'Furniture and joinery', d: 'Bespoke pieces built locally' }, { t: 'Renovation and fit-out', d: 'Contractors managed by our team' }, { t: 'Styling and decor', d: 'Art, lighting and finishing touches', p: 'from ₦250,000' }] },
      { k: 'steps', title: 'Our process', items: [{ t: 'Consultation', d: 'We visit, listen and measure.' }, { t: 'Design and approve', d: 'Moodboards, layouts and a costed plan.' }, { t: 'Build and handover', d: 'We manage works and style the finished space.' }] },
      { k: 'quote', q: 'They stayed within budget and the finished home looks better than the renders.', by: 'Dr. and Mrs. Ogunbanjo' },
      { k: 'faq', title: 'Questions we hear', items: [{ q: 'How is design priced?', a: 'A fixed design fee, with furniture and build costs quoted separately.' }, { q: 'Can you work with my contractor?', a: 'Yes. We can design only, or manage the whole project.' }, { q: 'How long does a project take?', a: 'Most homes take 8 to 14 weeks from approval to handover.' }] },
    ],
    form: { title: 'Book a design consultation', intro: 'Tell us about your space and what you would like to change.', fields: ['Your name', 'Phone number', 'Property type and location', 'Budget range'], button: 'Book consultation' },
    footer: { address: '6 Glover Road, Ikoyi, Lagos', hours: 'Mon to Fri, 9am to 6pm', phone: '+234 906 785 9200' },
  },
  cleaning: {
    name: 'NEAT', tag: 'Home and office cleaning', nav: ['Services', 'Process', 'Book'], accent: '#17917a', ink: '#0e2723', bg: '#f5fbf9', soft: '#e0f2ee',
    hero: { kicker: 'Homes, offices and short-lets', title: 'A cleaner space, without the guesswork.', intro: 'Trained, uniformed teams with the right equipment. Clear prices and a satisfaction guarantee.', cta: 'Get a quote', cta2: 'Our services', img: J.k1 },
    facts: [['Teams', 'Vetted and trained'], ['Supplies', 'Brought by us'], ['Guarantee', 'We re-clean free'], ['Booking', 'Same-week slots']],
    sections: [
      { k: 'list', title: 'Services and starting prices', items: [
        { t: 'Regular home cleaning', d: 'Weekly or fortnightly, 3 to 4 hours', p: '₦25,000' }, { t: 'Deep cleaning', d: 'Kitchens, bathrooms, floors and windows', p: '₦65,000' },
        { t: 'Move-in or move-out', d: 'Full property clean', p: '₦90,000' }, { t: 'Office cleaning', d: 'Daily or weekly contracts', p: 'Custom quote' },
        { t: 'Post-construction clean', d: 'Dust, paint and debris removal', p: 'from ₦120,000' }, { t: 'Fumigation', d: 'Pests and mosquitoes, 6 months cover', p: '₦45,000' }] },
      { k: 'gallery', title: 'The standard we keep', imgs: [J.k1, J.k2, J.k3] },
      { k: 'steps', title: 'How booking works', items: [{ t: 'Tell us about the space', d: 'Size, rooms and how often.' }, { t: 'Get a fixed quote', d: 'No hidden charges.' }, { t: 'Relax while we clean', d: 'A supervisor checks the finished job.' }] },
      { k: 'quote', q: 'The team arrived on time, worked hard and my apartment felt new again.', by: 'Adaobi N., Airbnb host' },
      { k: 'faq', title: 'Before you book', items: [{ q: 'Do I need to provide supplies?', a: 'No. Our team brings professional equipment and products.' }, { q: 'Are your cleaners vetted?', a: 'Yes. Every cleaner is background-checked, trained and uniformed.' }, { q: 'What if I am not happy?', a: 'Tell us within 24 hours and we will return to fix it at no cost.' }] },
    ],
    form: { title: 'Get a cleaning quote', intro: 'Tell us about your space and we will reply with a fixed price.', fields: ['Your name', 'Phone number', 'Property type and size', 'Service needed and date'], button: 'Get my quote' },
    footer: { address: '41 Adeniran Ogunsanya Street, Surulere, Lagos', hours: 'Mon to Sat, 7am to 6pm', phone: '+234 906 785 9200' },
  },
  school: {
    name: 'BRIGHTWAY', tag: 'Private primary and secondary school', nav: ['Programmes', 'Admissions', 'Contact'], accent: '#c2410c', ink: '#1c1917', bg: '#fffdf9', soft: '#faeee3',
    hero: { kicker: 'Nursery, primary and secondary', title: 'Where curious children grow into confident learners.', intro: 'Small classes, caring teachers and a safe campus in the heart of Lagos. Admissions are open for the new term.', cta: 'Apply for admission', cta2: 'Our programmes', img: J.s1 },
    facts: [['Class size', 'Maximum 20 pupils'], ['Curriculum', 'Nigerian and British'], ['Transport', 'Bus routes across Lagos'], ['Admissions', 'Open now']],
    sections: [
      { k: 'list', title: 'Programmes and termly fees', intro: 'Sample fees. A full fee schedule is shared during admission.', items: [
        { t: 'Nursery (ages 2 to 4)', d: 'Play-based learning and early reading', p: '₦350,000' }, { t: 'Primary (ages 5 to 11)', d: 'Core subjects, coding and creative arts', p: '₦450,000' },
        { t: 'Junior secondary', d: 'Preparing for WAEC and Cambridge IGCSE', p: '₦550,000' }, { t: 'Senior secondary', d: 'Science, arts and commercial tracks', p: '₦620,000' }] },
      { k: 'people', title: 'Leadership', items: [{ t: 'Mrs. Ngozi Adeleke', d: 'Principal, 20 years in education' }, { t: 'Mr. Samuel Obi', d: 'Head of Primary' }, { t: 'Mrs. Fatima Lawal', d: 'Head of Admissions' }] },
      { k: 'steps', title: 'Admissions in three steps', items: [{ t: 'Enquire and tour', d: 'Visit the campus and meet our teachers.' }, { t: 'Assessment', d: 'A friendly assessment helps us place your child.' }, { t: 'Offer and fees', d: 'You receive a written offer and fee schedule.' }] },
      { k: 'quote', q: 'My daughter looks forward to school every morning. The teachers know every child by name.', by: 'Mrs. Eze, parent of Year 4' },
      { k: 'faq', title: 'Parents often ask', items: [{ q: 'What are the school hours?', a: 'Classes run from 8am to 3pm, with optional after-school clubs until 5pm.' }, { q: 'Do you offer scholarships?', a: 'Yes. Merit and need-based places are available each year.' }, { q: 'Is there a school bus?', a: 'Yes, with trained drivers and a supervisor on each route.' }] },
    ],
    form: { title: 'Request an admission pack', intro: 'Share your details and we will invite you for a campus tour.', fields: ['Parent name', 'Phone number', 'Child name and age', 'Class applying for'], button: 'Request admission pack' },
    footer: { address: '15 Palm Avenue, Magodo, Lagos', hours: 'Mon to Fri, 7:30am to 4pm', phone: '+234 906 785 9200' },
  },
  logistics: {
    name: 'SWIFTLINE', tag: 'Dispatch and delivery', nav: ['Services', 'Rates', 'Book'], accent: '#e5a100', ink: '#14171c', bg: '#f7f7f5', soft: '#ecece6',
    hero: { kicker: 'Same-day delivery across Lagos', title: 'Deliveries that arrive when you said they would.', intro: 'Bikes, vans and trucks for businesses and individuals, with live tracking and proof of delivery.', cta: 'Book a delivery', cta2: 'See rates', img: J.g1 },
    facts: [['Coverage', 'Lagos and 12 other states'], ['Tracking', 'Live on your phone'], ['Proof', 'Photo and signature'], ['Pickup', 'Within 60 minutes']],
    sections: [
      { k: 'list', title: 'Sample rates', intro: 'Starting prices. Final price depends on distance, size and weight.', items: [
        { t: 'Bike dispatch (same area)', d: 'Documents and small parcels', p: 'from ₦2,500' }, { t: 'Bike dispatch (cross-city)', d: 'Mainland to Island', p: 'from ₦4,500' },
        { t: 'Van delivery', d: 'Up to 500kg', p: 'from ₦15,000' }, { t: 'Truck haulage', d: 'Pallets and bulk goods', p: 'Custom quote' },
        { t: 'Interstate delivery', d: 'Door to door, tracked', p: 'from ₦8,000' }, { t: 'Business account', d: 'Monthly invoicing and priority riders', p: 'Custom quote' }] },
      { k: 'steps', title: 'How it works', items: [{ t: 'Book your delivery', d: 'Enter pickup and drop-off details.' }, { t: 'We collect', d: 'A rider arrives within the hour.' }, { t: 'Track to delivery', d: 'Follow the rider and get proof when it lands.' }] },
      { k: 'people', title: 'Built for businesses', items: [{ t: 'Online stores', d: 'Daily pickups and customer updates' }, { t: 'Restaurants', d: 'Fast, careful food delivery' }, { t: 'Offices', d: 'Documents and equipment on demand' }] },
      { k: 'quote', q: 'Our customers get live tracking links and complaints about late delivery have almost disappeared.', by: 'Amaka O., online fashion store' },
      { k: 'faq', title: 'Delivery questions', items: [{ q: 'Is my parcel insured?', a: 'Yes. Every delivery has basic cover, with higher cover for valuable items.' }, { q: 'Can I pay on delivery?', a: 'Business accounts can collect payment on delivery and settle weekly.' }, { q: 'What can you not carry?', a: 'We do not carry illegal, hazardous or perishable items without prior approval.' }] },
    ],
    form: { title: 'Book a delivery', intro: 'Tell us what you are sending and where it is going.', fields: ['Your name', 'Phone number', 'Pickup and drop-off address', 'Item size and weight'], button: 'Book delivery' },
    footer: { address: '7 Apapa Oshodi Expressway, Lagos', hours: 'Mon to Sun, 6am to 9pm', phone: '+234 906 785 9200' },
  },
  'car-dealership': {
    name: 'APEX', tag: 'Motor house', nav: ['Inventory', 'Process', 'Visit'], accent: '#c0211f', ink: '#101114', bg: '#f6f6f7', soft: '#e8e8ea',
    hero: { kicker: 'Inspected cars, honest prices', title: 'Drive away in a car you can trust.', intro: 'Every car is inspected, documented and priced openly. Book a test drive or ask us to source your next car.', cta: 'Book a test drive', cta2: 'See inventory', img: J.a3 },
    facts: [['In stock', '60 inspected cars'], ['Inspection', '120-point check'], ['Documents', 'Verified and transferred'], ['Financing', 'Plans available']],
    sections: [
      { k: 'cards', title: 'Featured cars', intro: 'Every car has a full inspection report. Ask us for it.', items: [
        { t: '2019 Toyota Camry SE', d: '48,000 km, automatic, clean title', p: '₦14.5m', img: J.a3 }, { t: '2020 Lexus RX 350', d: '36,000 km, leather, panoramic roof', p: '₦38m', img: J.a2 }, { t: '2018 Honda Accord', d: '62,000 km, one owner', p: '₦11.8m', img: J.a1 }] },
      { k: 'steps', title: 'Buying with confidence', items: [{ t: 'Choose and inspect', d: 'View in person and read the full report.' }, { t: 'Agree the price', d: 'Transparent pricing with no hidden fees.' }, { t: 'Transfer and drive', d: 'We handle papers and registration support.' }] },
      { k: 'list', title: 'More from us', items: [{ t: 'Car sourcing', d: 'Tell us your budget and we find the car' }, { t: 'Trade-in', d: 'Get a fair offer on your current car' }, { t: 'Financing support', d: 'Work with partner lenders on a plan' }, { t: 'After-sales service', d: 'First service free within 3 months' }] },
      { k: 'quote', q: 'They showed me the inspection report line by line. I bought with total confidence.', by: 'Mr. Danjuma, Lexus buyer' },
      { k: 'faq', title: 'Buyer questions', items: [{ q: 'Can I bring my own mechanic?', a: 'Yes. We encourage independent inspections before you buy.' }, { q: 'Do you offer a warranty?', a: 'Yes. Every car comes with a limited 30-day mechanical warranty.' }, { q: 'Can you deliver the car?', a: 'We deliver nationwide with a trusted car carrier.' }] },
    ],
    form: { title: 'Book a test drive', intro: 'Tell us which car you would like to see.', fields: ['Your name', 'Phone number', 'Car you are interested in', 'Preferred day and time'], button: 'Book test drive' },
    footer: { address: '90 Lekki-Epe Expressway, Lagos', hours: 'Mon to Sat, 9am to 6pm', phone: '+234 906 785 9200' },
  },
};