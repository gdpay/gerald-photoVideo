import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata as generatePageMetadata } from '@/lib/seo-metadata';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { client } from '../../../../sanity/lib/client';
import { blogPostBySlugQuery, blogPostsQuery } from '../../../../sanity/lib/queries';
import { SanityImage } from '@/components/shared/sanity-image';
import { urlFor } from '../../../../sanity/lib/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderContent(content: any[]) {
  if (!content) return null;

  return content.map((block, index) => {
    if (block._type === 'block') {
      // Render text blocks
      const text = block.children?.map((child: any) => child.text).join('') || '';
      return <p key={index} className="text-[#736D63] leading-relaxed mb-4">{text}</p>;
    }
    if (block._type === 'image') {
      // Render inline images
      return (
        <figure key={index} className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden">
            <SanityImage
              source={block}
              alt={block.alt || 'Blog image'}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {block.alt && (
            <figcaption className="mt-2 text-sm text-[#A39D93] text-center">
              {block.alt}
            </figcaption>
          )}
        </figure>
      );
    }
    return null;
  });
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(blogPostsQuery);
    return posts.map((post: { slug: string }) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await client.fetch(blogPostBySlugQuery(slug));
    if (!post) return {};
    return generatePageMetadata({
      title: post.title,
      description: post.excerpt || `Read about ${post.title} — a beautiful celebration captured by Gerald Photo Video.`,
      path: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      image: post.coverImage ? urlFor(post.coverImage).width(1200).url() : undefined,
    });
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post = null;
  try {
    post = await client.fetch(blogPostBySlugQuery(slug));
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${slug}` },
      ]} />

      {/* Hero with cover image */}
      {post.coverImage && (
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <SanityImage
            source={post.coverImage}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/70 via-[#0A1F44]/30 to-[#0A1F44]/10" />
        </section>
      )}

      <SectionWrapper className={post.coverImage ? "-mt-20 relative z-10" : "pt-32"}>
        <Container narrow>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#A39D93] hover:text-[#C8A23D] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="flex items-center gap-4 mb-4">
            {post.category && (
              <span className="text-xs font-body uppercase tracking-wider text-[#C8A23D]">
                {post.category}
              </span>
            )}
            {post.publishedAt && (
              <span className="text-xs text-[#A39D93] flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>

          <h1 className="font-heading text-4xl md:text-5xl text-[#0A1F44] mb-6">
            {post.title}
          </h1>

          {post.author && (
            <div className="flex items-center gap-2 text-sm text-[#A39D93] mb-8">
              <User className="h-3 w-3" />
              {post.author}
            </div>
          )}

          {post.excerpt && (
            <p className="text-lg text-[#736D63] mb-8 font-light italic">
              {post.excerpt}
            </p>
          )}

          <div className="max-w-none 
            [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:text-[#0A1F44] [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:font-heading [&_h3]:text-xl [&_h3]:text-[#0A1F44] [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:text-[#736D63] [&_p]:leading-relaxed [&_p]:mb-4
            [&_a]:text-[#C8A23D] [&_a]:no-underline hover:[&_a]:text-[#A8842E]
            [&_strong]:text-[#0A1F44]
            [&_ul]:text-[#736D63]
            [&_li]:text-[#736D63]
            [&_blockquote]:font-heading [&_blockquote]:italic [&_blockquote]:text-lg [&_blockquote]:text-[#0A1F44]/80 [&_blockquote]:border-l-2 [&_blockquote]:border-[#C8A23D] [&_blockquote]:pl-4 [&_blockquote]:my-8">
            {post.content ? renderContent(post.content) : (
              <p className="text-[#A39D93]">No content available.</p>
            )}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper navy>
        <Container narrow className="text-center">
          <h2 className="font-heading text-3xl text-[#FAF7F2] mb-4">Want Your Story Featured?</h2>
          <p className="text-[#FAF7F2]/60 mb-8 max-w-md mx-auto">
            Every love story is unique. Let us capture yours.
          </p>
          <Button variant="primary" size="lg" href="/contact">
            Book Your Session
          </Button>
        </Container>
      </SectionWrapper>
    </>
  );
}
