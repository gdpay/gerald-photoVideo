import { LocalSEOPage, generateLocalSEOMetadata } from '@/components/sections/local-seo-page';

export const metadata = generateLocalSEOMetadata({
  city: 'Lincoln',
  state: 'NE',
  slug: 'lincoln',
  services: ['Wedding Photographer', 'Wedding Videographer', 'Engagement Photographer'],
});

export default function LincolnPage() {
  return (
    <LocalSEOPage
      city="Lincoln"
      state="NE"
      slug="lincoln"
      services={['Wedding Photographer', 'Wedding Videographer', 'Engagement Photographer']}
    />
  );
}
