export const SITE = {
  name: 'Gerald Photo Video',
  tagline: 'Timeless Storytelling for Life\'s Most Beautiful Moments',
  email: 'info@geraldphotovideo.com',
  phone: '(402) 541-4498',
  phoneRaw: '+14025414498',
  address: {
    city: 'Omaha',
    state: 'NE',
    region: 'Nebraska & Iowa',
  },
  social: {
    facebook: 'https://www.facebook.com/geraldphotovideo',
    instagram: 'https://www.instagram.com/geraldphotovideo',
    tiktok: 'https://www.tiktok.com/@geraldphotovideo',
  },
  url: 'https://www.geraldphotovideo.com',
  description:
    'Luxury wedding, quinceañera, and engagement photography & videography serving Nebraska and Iowa.',
  foundingYear: 2015,
  reviews: {
    facebook: { rating: 4.3, count: 40 },
    theKnot: { rating: 5.0, count: 6 },
    aggregate: { rating: 4.5, count: 46 },
  },
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Weddings', href: '/weddings' },
  { label: 'Quinceañeras', href: '/quinceaneras' },
  { label: 'Engagements', href: '/engagements' },
  { label: 'Videography', href: '/videography' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Investment', href: '/investment' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SERVICES = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Cinematic wedding photography and videography that tells your unique love story.',
    href: '/weddings',
    icon: 'Heart',
  },
  {
    id: 'quinceaneras',
    title: 'Quinceañeras',
    description: 'Celebrate her journey with stunning portraits and films that honor this milestone.',
    href: '/quinceaneras',
    icon: 'Crown',
  },
  {
    id: 'engagements',
    title: 'Engagements',
    description: 'Romantic engagement sessions that capture the excitement of your new chapter.',
    href: '/engagements',
    icon: 'Sparkles',
  },
  {
    id: 'videography',
    title: 'Videography',
    description: 'Cinematic wedding films and highlight reels that let you relive every moment.',
    href: '/videography',
    icon: 'Film',
  },
] as const;

export const LOCAL_CITIES = [
  { name: 'Omaha', state: 'NE', slug: 'omaha' },
  { name: 'Lincoln', state: 'NE', slug: 'lincoln' },
  { name: 'Council Bluffs', state: 'IA', slug: 'council-bluffs' },
  { name: 'Des Moines', state: 'IA', slug: 'des-moines' },
  { name: 'Sioux City', state: 'IA', slug: 'sioux-city' },
] as const;
