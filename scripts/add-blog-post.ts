/**
 * Append script: Adds a single new blog post to Sanity without deleting existing ones.
 *
 * Usage:
 *    npx tsx scripts/add-blog-post.ts
 *
 * Requires SANITY_API_TOKEN in .env.local with write access.
 *
 * This script also uploads a cover image from Unsplash so the post
 * satisfies the `defined(coverImage.asset)` filter in the blog query.
 */

import { createClient } from '@sanity/client';
import https from 'https';
import { Readable } from 'stream';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9vm83yjc';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('❌ SANITY_API_TOKEN is required. Add it to .env.local');
  console.error('   Get a write token from https://www.sanity.io/manage');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

const COVER_IMAGE_URL = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=90';
const COVER_ALT = 'Beautiful Iowa wedding venue with elegant decorations';

const NEW_POST = {
  _type: 'blog',
  title: "Iowa's Most Photogenic Wedding Venues: A Couple's Guide",
  slug: { _type: 'slug', current: 'iowa-wedding-venues-photography-guide' },
  author: 'Gerald Photo Video',
  publishedAt: '2025-07-01T10:00:00Z',
  category: 'Venue Guides',
  excerpt:
    'From charming barn venues in Council Bluffs to elegant ballrooms in Des Moines, explore the most photogenic wedding venues Iowa has to offer with photography tips for each.',
  content: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: "Iowa is home to some incredibly photogenic wedding venues, each offering unique backdrops for your special day. As photographers who regularly work across the state, we've compiled our favorite venues for stunning wedding photography.",
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '1. The Scottish Rite Consistory in Des Moines — A stunning Beaux-Arts building with grand columns, sweeping staircases, and incredible natural light. The architecture alone provides endless portrait opportunities.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '2. The River Center in Council Bluffs — Modern riverfront venue with floor-to-ceiling windows overlooking the Missouri River. The sunset views are absolutely breathtaking.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '3. Barn at Rush Creek in Adel — A rustic-chic barn venue with beautiful grounds, twinkling lights, and a charming ceremony site by the pond. Perfect for couples who love the countryside aesthetic.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '4. Hotel Fort Des Moines — A historic hotel with timeless elegance. The lobby, ballroom, and vintage details create a sophisticated atmosphere for both ceremonies and receptions.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '5. The Meadows at Norland in Ames — A beautiful estate venue with manicured gardens, a charming chapel, and a reception barn. The variety of settings makes for incredibly diverse photo galleries.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Each venue offers unique lighting conditions and backdrops. We recommend scheduling a venue tour with your photographer to identify the best photo locations and plan your timeline accordingly.',
        },
      ],
    },
  ],
  seo: {
    metaTitle: "Iowa's Most Photogenic Wedding Venues: A Couple's Guide",
    metaDescription:
      'Explore the most photogenic wedding venues across Iowa, from Council Bluffs to Des Moines, with expert photography tips for each location.',
  },
};

function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 15000 }, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadImage(response.headers.location).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} when downloading image`));
        return;
      }
      const chunks: Buffer[] = [];
      response.on('data', (chunk: Buffer) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Image download timed out'));
    });
  });
}

async function main() {
  console.log('📝 Adding a new blog post to Sanity...\n');

  // Check if post already exists by slug
  const existing = await client.fetch(
    `*[_type == "blog" && slug.current == "${NEW_POST.slug.current}"] { _id, title }`,
  );
  if (existing.length > 0) {
    console.log(`   ⚠️  A post with slug "${NEW_POST.slug.current}" already exists:`);
    console.log(`      "${existing[0].title}" (ID: ${existing[0]._id})`);
    console.log('   Skipping to avoid duplicate.\n');
    console.log('   Tip: Delete it from Sanity Studio first if you want to recreate it.');
    return;
  }

  // Count current posts
  const count = await client.fetch(`count(*[_type == "blog"])`);
  console.log(`   Current posts in Sanity: ${count}`);

  // Download cover image
  console.log(`\n   📷 Downloading cover image from Unsplash...`);
  const buffer = await downloadImage(COVER_IMAGE_URL);

  // Upload to Sanity
  console.log(`   📤 Uploading cover image to Sanity...`);
  const asset = await client.assets.upload('image', Readable.from(buffer), {
    filename: 'cover-iowa-wedding-venues.jpg',
    contentType: 'image/jpeg',
  });
  console.log(`      ✅ Image asset ID: ${asset._id}`);

  // Create the post with cover image attached
  const postWithImage = {
    ...NEW_POST,
    coverImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    },
  };

  const result = await client.create(postWithImage);
  console.log(`\n   ✅ Created blog post: "${result.title}"`);
  console.log(`      ID: ${result._id}`);
  console.log(`      Slug: /blog/${result.slug.current}`);
  console.log(`      Cover image: ${asset._id}`);

  const newCount = await client.fetch(`count(*[_type == "blog"])`);
  console.log(`\n🎉 Done! Total blog posts in Sanity: ${newCount}`);
  console.log('   Visit http://localhost:3000/blog to see the new post.');
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message);
  process.exit(1);
});
