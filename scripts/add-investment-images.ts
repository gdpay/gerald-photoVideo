/**
 * Script: Adds more images to the Investment Portfolio gallery in Sanity.
 *
 * Downloads fresh stock photos and appends them to the existing gallery's
 * images array so the investment page gallery preview has more variety.
 *
 * Usage:
 *    npx tsx scripts/add-investment-images.ts
 *
 * Requires SANITY_API_TOKEN in .env.local with write access.
 */

import { createClient } from '@sanity/client';
import https from 'https';

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

const GALLERY_ID = 'RPLhY3joW8ryZXw3lPeftk';

// Luxury wedding details, decor, and venue shots
const NEW_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1200&q=90',
    alt: 'Luxury wedding table setting with gold decor',
    caption: 'Elegant reception table design',
  },
  {
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=90',
    alt: 'Wedding cake detail with floral decoration',
    caption: 'Custom wedding cake design',
  },
  {
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=90',
    alt: 'Romantic wedding ceremony arch with flowers',
    caption: 'Ceremony setup with floral arch',
  },
];

function downloadImage(url: string): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 15000 }, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadImage(response.headers.location).then(resolve);
        req.destroy();
        return;
      }
      if (response.statusCode !== 200) {
        console.error(`      ⚠️  HTTP ${response.statusCode}`);
        resolve(null);
        return;
      }
      const chunks: Buffer[] = [];
      response.on('data', (chunk: Buffer) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', () => resolve(null));
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

async function main() {
  console.log('🖼️  Adding images to Investment Portfolio gallery...\n');

  // Get current image count to determine starting key index
  const gallery = await client.fetch(
    `*[_id == $id][0]`,
    { id: GALLERY_ID }
  );

  if (!gallery) {
    console.error('❌ Gallery not found');
    process.exit(1);
  }

  const existingCount = gallery.images?.length || 0;
  console.log(`   Existing images: ${existingCount}`);
  console.log(`   Adding ${NEW_IMAGES.length} new images...\n`);

  const newImageEntries: Array<{
    _key: string;
    _type: string;
    asset: { _type: string; _ref: string };
    alt: string;
    caption: string;
  }> = [];

  for (let i = 0; i < NEW_IMAGES.length; i++) {
    const image = NEW_IMAGES[i];
    const index = existingCount + i;
    const key = `img${index}`;

    console.log(`   [${i + 1}/${NEW_IMAGES.length}] Downloading: ${image.alt}...`);
    const buffer = await downloadImage(image.url);

    if (!buffer) {
      console.error(`      ❌ Download failed, skipping`);
      continue;
    }

    try {
      const asset = await client.assets.upload('image', buffer, {
        filename: `investment-${key}.jpg`,
        contentType: 'image/jpeg',
      });
      console.log(`      ✅ Uploaded asset: ${asset._id}`);

      newImageEntries.push({
        _key: key,
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: image.alt,
        caption: image.caption,
      });
    } catch (err) {
      console.error(`      ❌ Upload failed:`, (err as Error).message);
    }
  }

  if (newImageEntries.length === 0) {
    console.error('\n❌ No images were successfully uploaded.');
    process.exit(1);
  }

  // Patch the gallery — append new images at the end of the array
  await client
    .patch(GALLERY_ID)
    .setIfMissing({ images: [] })
    .append('images', newImageEntries)
    .commit();

  console.log(`\n🎉 Done! Added ${newImageEntries.length} new image(s) to the Investment Portfolio gallery.`);
  console.log(`   Total images: ${existingCount + newImageEntries.length}`);
  console.log('   Visit /investment to see the updated gallery.');
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message);
  process.exit(1);
});
