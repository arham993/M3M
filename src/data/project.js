import {
  TrendUp, Coins, Eye, Path, Buildings,
  TShirt, Diamond, ForkKnife, Coffee, FilmStrip, Champagne, BowlFood, FlowerLotus, Car, Drop,
} from '../icons.js';

export const RERA_NO = 'UPRERAPRJ690055/10/2025';

export const NAV = [
  { href: '#overview', label: 'Overview' },
  { href: '#highlights', label: 'Highlights' },
  { href: '#pricing', label: 'Price List' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#location', label: 'Location' },
];

export const FACTS = [
  { value: '~6 Acres', label: 'Land parcel' },
  { value: '680 ft', label: 'Frontage (~207 m)' },
  { value: '3-Side', label: 'Open layout' },
  { value: '5 Levels', label: 'Retail and F&B' },
  { value: '30:70', label: 'Payment plan' },
  { value: '₹65 L*', label: 'Starting price' },
];

/** Bento tiles. `image` tiles use a photo background; `tint` tiles use the copper tint. */
export const HIGHLIGHTS = [
  { title: 'Brand-led demand', text: 'A curated premium tenant mix designed to draw high-spending shoppers from Noida, Delhi and Greater Noida.', image: 'images/thumbs/retail-arcade.jpg', size: 'big' },
  { title: 'Capital appreciation', text: 'Entry on an emerging stretch of the Expressway.', icon: TrendUp },
  { title: 'Rental income', text: 'Retail assets positioned for steady lease yields.', icon: Coins, tint: true },
  { title: 'Continuous visibility', text: 'Three open sides and ~680 ft of road frontage.', icon: Eye },
  { title: 'Arterial connectivity', text: 'Direct access from the Noida-Greater Noida Expressway.', icon: Path },
  { title: 'Atrium-led experience', text: 'Intuitive circulation that spreads footfall across every level.', image: 'images/thumbs/atrium-tree.jpg', size: 'wide' },
  { title: 'Long-term wealth creation', text: 'A grade-A commercial asset in an integrated development, on a corridor where retail demand is outpacing supply.', icon: Buildings, tint: true, size: 'wide' },
];

/** Project rate sheet. `null` renders as NA. */
export const RATE_SHEET = [
  { floor: 'Lower Ground Floor (Anchor)', armg: '38,000', rental: '200', cap: null },
  { floor: 'Ground Floor', armg: '55,000', rental: null, cap: '44,000' },
  { floor: 'First Floor', armg: '40,000', rental: '215', cap: '30,000' },
  { floor: 'Second Floor', armg: '36,000', rental: '200', cap: '28,000' },
  { floor: 'Third Floor (Restaurants)', armg: '29,500', rental: null, cap: '26,000' },
  { floor: 'Third Floor (Food Court)', armg: '35,000', rental: '180', cap: '26,500' },
  { floor: 'Third Floor (Anchor)', armg: '36,000', rental: '190', cap: null },
];

export const PAYMENT_PLAN = [
  { pct: '30%', when: 'Within 30 days of booking', weight: 30 },
  { pct: '20%', when: 'On completion of structure', weight: 20 },
  { pct: '40%', when: 'On application of OC', weight: 40 },
  { pct: '10%', when: 'On offer of possession', weight: 10 },
];

export const GALLERY_TABS = [
  { id: 'all', label: 'All' },
  { id: 'retail', label: 'Retail & Atrium' },
  { id: 'towers', label: 'Elevations' },
  { id: 'aerial', label: 'Aerial' },
];

export const GALLERY = [
  ['retail-podium-night', 'retail', 'Retail podium at night'],
  ['towers-sunset', 'towers', 'Towers above the clouds at sunset'],
  ['atrium-sphere', 'retail', 'Central atrium with sculptural sphere'],
  ['aerial-view', 'aerial', 'Aerial view of the development'],
  ['retail-arcade', 'retail', 'Retail arcade and drop-off'],
  ['clock-facade', 'towers', 'Signature clock facade'],
  ['atrium-tree', 'retail', 'Multi-level atrium'],
  ['day-elevation', 'towers', 'Day elevation with retail podium'],
  ['retail-mall', 'retail', 'Retail concourse'],
  ['sky-canopy', 'retail', 'Rooftop canopy'],
  ['towers-night', 'towers', 'Towers at dusk'],
  ['podium-day', 'retail', 'Retail podium by day'],
  ['aerial-day', 'aerial', 'Aerial view by day'],
  ['podium-moon', 'retail', 'Podium under moonlight'],
  ['tower-crowns', 'towers', 'Tower crowns'],
  ['towers-mist', 'towers', 'Towers in morning mist'],
  ['towers-golf', 'towers', 'Towers from the greens'],
  ['clock-facade-2', 'towers', 'Clock facade detail'],
  ['towers-dusk', 'towers', 'Tower skyline'],
  ['tower-evening', 'towers', 'Evening view'],
].map(([file, cat, alt]) => ({ file, cat, alt }));

export const DISTANCES = [
  { time: '~15 min', place: 'Sector 18, Noida' },
  { time: '~20 min', place: 'Noida City Centre' },
  { time: '~25 min', place: 'Greater Noida' },
  { time: '30-35 min', place: 'Dwarka and IGI Airport' },
  { time: '~40 min', place: 'Gurugram' },
  { time: 'Short drive', place: 'DLF Mall of India' },
];

export const LIFESTYLE_MIX = [
  { icon: TShirt, label: 'Global fashion' },
  { icon: Diamond, label: 'Luxury couture' },
  { icon: ForkKnife, label: 'Fine dining' },
  { icon: Coffee, label: 'Artisanal cafés' },
  { icon: FilmStrip, label: 'Entertainment' },
  { icon: Champagne, label: 'Exclusive clubs' },
  { icon: BowlFood, label: 'Food court' },
  { icon: FlowerLotus, label: 'Spa' },
  { icon: Car, label: 'Parking' },
  { icon: Drop, label: 'Rainwater harvesting' },
];

export const MODAL_POINTS = [
  'Retail shops from ₹65 Lacs*',
  '30:70 payment plan',
  '680 ft Expressway frontage',
  'UP RERA approved',
];

/** Popup copy per enquiry type (the label on the button that opened it) */
export const ENQUIRY_COPY = {
  'Enquire Now': { sub: 'Get the price sheet, floor plans and a call back from our advisor.', cta: 'Get Call Back' },
  'Download Brochure': { sub: 'Share your details to download the e-brochure instantly.', cta: 'Download Now' },
  'Get Detailed Price Sheet': { sub: 'Get the complete floor-wise price sheet on WhatsApp and email.', cta: 'Get Call Back' },
  'Get Floor Plans': { sub: 'Get unit sizes and floor plans for your preferred level.', cta: 'Get Call Back' },
  'Book a Site Visit': { sub: 'Pick a convenient time and our advisor will arrange your visit.', cta: 'Book Visit' },
};

export const INTEREST_OPTIONS = ['Retail shop', 'Food court', 'Restaurant space', 'Anchor space', 'Just exploring'];
