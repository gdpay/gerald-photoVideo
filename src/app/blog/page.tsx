import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata } from '@/lib/seo-metadata';
import { Calendar, ArrowRight } from 'lucide-react';
import { client } from '../../../sanity/lib/client';
import { blogPostsQuery } from '../../../sanity/lib/queries';
import { SanityImage } from '@/components/shared/sanity-image';

export const metadata: Metadata = generateMetadata({
  title: 'Blog',
  description: 'Real wedding stories, planning tips, and venue guides from Gerald Photo Video. Serving Nebraska and Iowa.',
  path: '/blog',
  keywords: [
    'wedding blog Omaha',
    'real wedding stories Nebraska',
    'wedding planning tips Iowa',
    'Omaha wedding venues',
  ],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author?: string;
  publishedAt?: string;
  category?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage?: any;
  excerpt?: string;
}

export default async function BlogPage() {
  let blogPosts: BlogPost[] = [];

  try {
    blogPosts = await client.fetch(blogPostsQuery);
  } catch {
    // Sanity not configured, use empty array
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
      ]} />
      <PageHero
        title="Our Blog"
        subtitle="Real weddings, planning tips, and stories from Nebraska & Iowa."
        typewriterWords={['Our Blog', 'Stories', 'Wedding Tips', 'Inspiration']}
      />

      <SectionWrapper>
        <Container>
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="border border-cream/5 rounded-sm overflow-hidden hover:border-gold/20 transition-all duration-300">
                    <div className="aspect-[16/10] overflow-hidden">
                      {post.coverImage ? (
                        <SanityImage
                          source={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-charcoal to-dark" />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        {post.category && (
                          <span className="text-xs font-accent uppercase tracking-wider text-gold">
                            {post.category}
                          </span>
                        )}
                        {post.publishedAt && (
                          <span className="text-xs text-cream/30 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.publishedAt)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-xl text-cream group-hover:text-gold transition-colors mb-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-cream/50 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 mt-4 text-xs font-accent uppercase tracking-wider text-gold/70 group-hover:text-gold transition-colors">
                        Read More <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-cream/50">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </Container>
      </SectionWrapper>
    </>
  );
}
