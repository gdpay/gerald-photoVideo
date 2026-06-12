import { LocalSEOPage, generateLocalSEOMetadata } from '@/components/sections/local-seo-page';

export const metadata = generateLocalSEOMetadata({
  city: 'Council Bluffs',
  state: 'IA',
  slug: 'council-bluffs',
  services: ['Wedding Photographer', 'Wedding Videographer', 'Quinceañera Photographer'],
});

export default function CouncilBluffsPage() {
  return (
    <LocalSEOPage
      city="Council Bluffs"
      state="IA"
      slug="council-bluffs"
      services={['Wedding Photographer', 'Wedding Videographer', 'Quinceañera Photographer']}
    />
  );
}
