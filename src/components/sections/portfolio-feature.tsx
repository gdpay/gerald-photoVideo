import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/container';
import { SanityImage } from '@/components/shared/sanity-image';

type PortfolioFeatureImage = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
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
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-3 md:gap-4">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-72"
            >
              <SanityImage
                source={image.source}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? '(max-width: 768px) 100vw, 48vw'
                    : '(max-width: 768px) 100vw, 24vw'
                }
              />
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
