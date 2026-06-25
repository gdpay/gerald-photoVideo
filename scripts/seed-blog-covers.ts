/**
 * Seed script: Uploads cover images to existing Sanity blog posts.
 *
 * Usage:
 *    npx tsx scripts/seed-blog-covers.ts
 *
 * Requires SANITY_API_TOKEN in .env.local with write access.
 *
 * Each blog post gets a free, high-quality cover image from Unsplash
 * that matches the post's category/theme.
 */

import { createClient } from '@sanity/client';
import https from 'https';
import { Readable } from 'stream';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9vm83yjc';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('❌ SANITY_API_TOKEN is required. Add it to .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

/**
 * Free-to-use Unsplash photos matching each blog post theme.
 * Using specific photo IDs so images are stable and relevant.
 */
const COVER_IMAGES: Record<string, { url: string; alt: string }> = {
  wedding: {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=90',
    alt: 'Romantic wedding couple portrait',
  },
  quinceanera: {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=90',
    alt: 'Beautiful quinceañera celebration',
  },
  venue: {
    url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=90',
    alt: 'Elegant wedding venue decoration',
  },
  behind_scenes: {
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=90',
    alt: 'Professional camera and photography equipment',
  },
};

function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 15000 }, (response) => {
      // Handle redirects (3xx status codes)
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Follow the redirect
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

async function uploadImageToSanity(
  imageBuffer: Buffer,
  filename: string,
  altText: string,
): Promise<string> {
  // Upload the image buffer as a Sanity image asset
  const asset = await client.assets.upload('image', Readable.from(imageBuffer), {
    filename,
    contentType: 'image/jpeg',
  });

  console.log(`   📷 Uploaded asset: ${asset._id}`);
  return asset._id;
}

async function main() {
  console.log('🖼️  Adding cover images to blog posts...\n');

  // Fetch all blog posts that don't have a cover image
  const posts = await client.fetch(
    `*[_type == "blog" && !defined(coverImage)] { _id, title, category }`,
  );

  if (posts.length === 0) {
    console.log('   ✅ All blog posts already have cover images!');
    return;
  }

  console.log(`   Found ${posts.length} blog post(s) without cover images.\n`);

  for (const post of posts) {
    const title: string = post.title;
    const category: string = post.category || '';

    // Pick the best matching image based on category
    let imageKey = 'wedding'; // default
    if (category?.toLowerCase().includes('quince')) {
      imageKey = 'quinceanera';
    } else if (category?.toLowerCase().includes('venue') || category?.toLowerCase().includes('guide')) {
      imageKey = 'venue';
    } else if (category?.toLowerCase().includes('behind') || category?.toLowerCase().includes('lens')) {
      imageKey = 'behind_scenes';
    }

    const { url, alt } = COVER_IMAGES[imageKey];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').slice(0, 40);

    console.log(`   📄 Processing: "${title}"`);
    console.log(`      Category: ${category} → using "${imageKey}" image`);

    try {
      // Download the image
      const buffer = await downloadImage(url);

      // Upload to Sanity as an image asset
      const assetId = await uploadImageToSanity(buffer, `cover-${slug}.jpg`, alt);

      // Patch the blog post with the cover image reference
      await client
        .patch(post._id)
        .set({
          coverImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
          },
        })
        .commit();

      console.log(`      ✅ Cover image set!\n`);
    } catch (err) {
      console.error(`      ❌ Failed for "${title}":`, (err as Error).message, '\n');
    }
  }

  console.log('🎉 Done! All blog posts now have cover images.');
  console.log('   Visit http://localhost:3000/blog to see them.\n');
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message);
  process.exit(1);
});
