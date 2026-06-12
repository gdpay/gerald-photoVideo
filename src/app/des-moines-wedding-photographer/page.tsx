import { LocalSEOPage, generateLocalSEOMetadata } from '@/components/sections/local-seo-page';

export const metadata = generateLocalSEOMetadata({
  city: 'Des Moines',
  state: 'IA',
  slug: 'des-moines',
  services: ['Wedding Photographer', 'Wedding Videographer', 'Engagement Photographer'],
});

export default function DesMoinesPage() {
  return (
    <LocalSEOPage
      city="Des Moines"
      state="IA"
      slug="des-moines"
      services={['Wedding Photographer', 'Wedding Videographer', 'Engagement Photographer']}
    />
  );
}
