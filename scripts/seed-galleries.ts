/**
 * Seed script: Creates gallery collections for Portraits, Investment, and About pages.
 *
 * Downloads placeholder images and creates gallery documents in Sanity
 * so the GalleryPreview component renders on those pages.
 *
 * Usage:
 *    npx tsx scripts/seed-galleries.ts
 *
 * Requires SANITY_API_TOKEN in .env.local with write access.
 */

import { createClient } from '@sanity/client';
import https from 'https';
import http from 'http';

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

function downloadImage(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(
      url,
      { headers: { 'Accept': 'image/avif,image/webp,image/jpeg,image/png,*/*' } },
      (response) => {
        // Follow redirects
        if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          downloadImage(response.headers.location).then(resolve);
          req.destroy();
          return;
        }

        if (response.statusCode !== 200) {
          console.error(`      ⚠️  HTTP ${response.statusCode} for ${url}`);
          resolve(null);
          return;
        }

        const contentType = response.headers['content-type'] || 'image/jpeg';
        const chunks: Buffer[] = [];
        response.on('data', (chunk: Buffer) => chunks.push(chunk));
        response.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType }));
        response.on('error', () => resolve(null));
      }
    );
    req.on('error', () => resolve(null));
    req.setTimeout(15000, () => { req.destroy(); resolve(null); });
  });
}

async function uploadImage(buffer: Buffer, filename: string, mimeType: string): Promise<string | null> {
  try {
    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType: mimeType,
    });
    return asset._id;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`      ⚠️  Upload failed for ${filename}: ${message}`);
    return null;
  }
}

function buildGallery(
  title: string,
  serviceType: string,
  slug: string,
  coverImageAssetId: string,
  imageAssetIds: string[],
  descriptions: string[]
) {
  const images = imageAssetIds
    .filter(Boolean)
    .map((assetId, i) => ({
      _key: `img${i}`,
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
      alt: descriptions[i] || `${title} image ${i + 1}`,
      caption: descriptions[i] || '',
    }));

  return {
    _type: 'gallery',
    title,
    slug: { _type: 'slug', current: slug },
    serviceType,
    featured: false,
    coverImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: coverImageAssetId },
    },
    images,
  };
}

const portraitDescriptions = [
  'Elegant portrait session with natural window light',
  'Senior portrait in golden hour outdoor light',
  'Professional headshot with clean studio backdrop',
  'Family portrait session at a scenic park',
  'Creative couple portrait with urban backdrop',
];

const investmentDescriptions = [
  'Luxury wedding ceremony detail shot',
  'Cinematic wedding reception decor',
  'Elegant bridal portrait session',
  'Wedding detail flat lay photography',
  'Romantic couple portrait on wedding day',
];

const aboutDescriptions = [
  'Professional photography studio workspace',
  'Photographer in action at a wedding shoot',
  'Behind-the-scenes editing workflow',
  'Photography equipment and gear setup',
  'Client consultation and planning session',
];

// Well-known, highly reliable Unsplash photo IDs
const galleries = [
  {
    title: 'Portrait Collection',
    serviceType: 'portraits',
    slug: 'portrait-collection',
    imageUrls: [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800',
      'https://images.unsplash.com/photo-1686191128892-3b142acfde4e?w=800',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    ],
    descriptions: portraitDescriptions,
  },
  {
    title: 'Investment Portfolio',
    serviceType: 'investment',
    slug: 'investment-portfolio',
    imageUrls: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800',
    ],
    descriptions: investmentDescriptions,
  },
  {
    title: 'About Our Studio',
    serviceType: 'about',
    slug: 'about-our-studio',
    imageUrls: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
      'https://images.unsplash.com/photo-1525702753283-5fa7c15bc2d2?w=800',
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800',
    ],
    descriptions: aboutDescriptions,
  },
];

async function seed() {
  console.log('🌱 Seeding gallery collections for Portraits, Investment, and About...\n');

  // Delete existing galleries for these service types to avoid duplicates
  const serviceTypes = ['portraits', 'investment', 'about'];
  const existing = await client.fetch(
    `*[_type == "gallery" && serviceType in $serviceTypes] { _id, title, serviceType }`,
    { serviceTypes }
  );

  if (existing.length > 0) {
    console.log(`   Found ${existing.length} existing galleries to replace:`);
    for (const doc of existing) {
      console.log(`      - ${doc.title} (${doc.serviceType})`);
    }
    const tx = client.transaction();
    for (const doc of existing) {
      tx.delete(doc._id);
    }
    await tx.commit();
    console.log('   ✅ Existing galleries deleted.\n');
  }

  for (const gallery of galleries) {
    console.log(`   Processing "${gallery.title}"...`);

    // Upload cover image
    console.log(`      ⬇️  Downloading cover image...`);
    const coverResult = await downloadImage(gallery.imageUrls[0]);
    if (!coverResult) {
      console.error(`      ❌ Failed to download cover image, skipping gallery.`);
      continue;
    }
    const coverAssetId = await uploadImage(
      coverResult.buffer,
      `${gallery.slug}-cover.jpg`,
      coverResult.contentType
    );
    if (!coverAssetId) {
      console.error(`      ❌ Failed to upload cover image, skipping gallery.`);
      continue;
    }
    console.log(`      ✅ Cover image uploaded (${coverAssetId})`);

    // Upload gallery images
    const imageAssetIds: string[] = [];
    for (let i = 1; i < gallery.imageUrls.length; i++) {
      console.log(`      ⬇️  Downloading image ${i}/${gallery.imageUrls.length - 1}...`);
      const result = await downloadImage(gallery.imageUrls[i]);
      if (!result) {
        console.warn(`      ⚠️  Skipping image ${i} (download failed)`);
        continue;
      }
      const assetId = await uploadImage(
        result.buffer,
        `${gallery.slug}-img${i}.jpg`,
        result.contentType
      );
      if (!assetId) {
        console.warn(`      ⚠️  Skipping image ${i} (upload failed)`);
        continue;
      }
      imageAssetIds.push(assetId);
      console.log(`      ✅ Image ${i} uploaded (${assetId})`);
    }

    if (imageAssetIds.length === 0) {
      console.error(`      ❌ No images uploaded, skipping gallery creation.`);
      continue;
    }

    // Create the gallery document
    const doc = buildGallery(
      gallery.title,
      gallery.serviceType,
      gallery.slug,
      coverAssetId,
      imageAssetIds,
      gallery.descriptions
    );

    const result = await client.create(doc);
    console.log(`   ✅ Gallery created: "${gallery.title}" with ${imageAssetIds.length} images (ID: ${result._id})\n`);
  }

  console.log('🎉 Done! Galleries created in Sanity.');
  console.log('\n📸 The images will appear on the pages after Next.js revalidates.');
  console.log('   Visit /portraits, /investment, or /about to see them.');
  console.log('   If they don\'t show up, restart the dev server.');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
