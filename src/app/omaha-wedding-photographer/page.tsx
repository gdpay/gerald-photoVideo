import { LocalSEOPage, generateLocalSEOMetadata } from '@/components/sections/local-seo-page';

export const metadata = generateLocalSEOMetadata({
  city: 'Omaha',
  state: 'NE',
  slug: 'omaha',
  services: ['Wedding Photographer', 'Wedding Videographer', 'Quinceañera Photographer'],
});

export default function OmahaPage() {
  return (
    <LocalSEOPage
      city="Omaha"
      state="NE"
      slug="omaha"
      services={['Wedding Photographer', 'Wedding Videographer', 'Quinceañera Photographer']}
    />
  );
}
