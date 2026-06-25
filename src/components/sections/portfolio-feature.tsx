import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/container';
import { SanityImage } from '@/components/shared/sanity-image';

type PortfolioFeatureImage = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source?: any;
  imageUrl?: string;
  alt?: string;
};

interface PortfolioFeatureProps {
  images?: PortfolioFeatureImage[];
  buttonLabel?: string;
  buttonHref?: string;
}

export function PortfolioFeature({
  images,
  buttonLabel = 'View Full Portfolio',
  buttonHref = '/portfolio',
}: PortfolioFeatureProps) {
  if (!images?.length) return null;

  const visibleImages = images.slice(0, 3);
  const label = buttonLabel || 'View Full Portfolio';
  const href = buttonHref || '/portfolio';

  return (
    <section className="bg-[#FAF7F2] py-12 md:py-16 border-b border-[#C8A23D]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden aspect-[4/3]"
            >
              {image.source ? (
                <SanityImage
                  source={image.source}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : image.imageUrl ? (
                <Image
                  src={image.imageUrl}
                  alt={image.alt || ''}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="secondary" size="lg" href={href}>
            {label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
