/**
 * Seed script: Populates Sanity with sample blog posts.
 *
 * Usage:
 *    npx tsx scripts/seed-blog.ts
 *
 * Requires SANITY_API_TOKEN in .env.local with write access.
 */

import { createClient } from '@sanity/client';

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

const samplePosts = [
  {
    _type: 'blog',
    title: 'Sarah & Michael\'s Romantic Omaha Wedding at The Durham Museum',
    slug: { _type: 'slug', current: 'sarah-michael-omaha-wedding-durham-museum' },
    author: 'Gerald Photo Video',
    publishedAt: '2025-06-15T10:00:00Z',
    category: 'Real Weddings',
    excerpt: 'A stunning June wedding at Omaha\'s iconic Durham Museum — featuring elegant decor, emotional first looks, and a celebration that filled the historic hall with love and laughter.',
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Sarah and Michael\'s wedding at The Durham Museum was nothing short of magical. The historic architecture, with its towering ceilings and art deco details, provided the most breathtaking backdrop for their special day.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The day began with Sarah getting ready at the hotel, surrounded by her bridesmaids and family. The anticipation in the room was palpable. Meanwhile, Michael was across town with his groomsmen, a mix of excitement and nerves.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'One of our favorite moments was the first look. We staged it in the museum\'s stunning lobby — the natural light streaming through the windows, Sarah walking toward Michael, the tears in his eyes as he turned around. It was pure emotion.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The ceremony took place in the museum\'s main hall, with family and friends seated beneath the ornate ceiling. The couple wrote their own vows, and there wasn\'t a dry eye in the room.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The reception was a lively celebration with incredible food, heartfelt toasts, and a dance floor that stayed packed all night. The golden hour light streaming through the museum\'s windows created the most romantic atmosphere for evening portraits.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Sarah and Michael, thank you for letting us be part of your beautiful day. Your love is truly something special.' }] },
    ],
    seo: {
      metaTitle: "Sarah & Michael's Omaha Wedding at The Durham Museum",
      metaDescription: 'A stunning June wedding at Omaha\'s iconic Durham Museum captured by Gerald Photo Video.',
    },
  },
  {
    _type: 'blog',
    title: '5 Essential Tips for Planning Your Quinceañera Photography',
    slug: { _type: 'slug', current: 'quinceanera-photography-planning-tips' },
    author: 'Gerald Photo Video',
    publishedAt: '2025-05-20T10:00:00Z',
    category: 'Planning Tips',
    excerpt: 'Planning a quinceañera? Here are our top tips to ensure your photography captures every magical moment — from the dress to the waltz.',
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'A quinceañera is one of the most important milestones in a young woman\'s life. As photographers who have documented countless quinceañeras across Nebraska and Iowa, we\'ve gathered our best tips to help you plan the perfect photography experience.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '1. Schedule a Pre-Event Portrait Session' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'We always recommend a dedicated portrait session before the event. This gives us time to capture stunning individual and family portraits in full regalia — the dress, the crown, the court — without the time pressure of the celebration day. Plus, it\'s a great warm-up for everyone!' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '2. Plan Your Timeline Carefully' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'A typical quinceañera includes the religious ceremony, formal portraits, the reception entrance, the waltz, the changing of shoes, and the cake cutting. Work with your photographer to create a timeline that allows enough time for each moment without feeling rushed.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '3. Consider the Lighting' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Churches and reception halls have very different lighting conditions. We bring professional lighting equipment to ensure beautiful results in any setting. If you have a choice, venues with large windows or outdoor spaces provide gorgeous natural light.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '4. Think About Your Photo + Video Combo' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Many families choose to book both photography and videography for quinceañeras. The combination of stunning stills with a cinematic highlight film creates a complete memory package. Plus, booking together often saves you money!' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '5. Communicate Your Must-Have Shots' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Every family has different traditions and priorities. Whether it\'s a special dance with your father, a particular family grouping, or a specific cultural tradition, let us know in advance. We\'ll make sure nothing is missed.' }] },
    ],
    seo: {
      metaTitle: '5 Essential Tips for Planning Your Quinceañera Photography',
      metaDescription: 'Top tips from professional quinceañera photographers to ensure your photography captures every magical moment.',
    },
  },
  {
    _type: 'blog',
    title: 'Top 10 Wedding Venues in Omaha, Nebraska',
    slug: { _type: 'slug', current: 'top-omaha-wedding-venues' },
    author: 'Gerald Photo Video',
    publishedAt: '2025-04-10T10:00:00Z',
    category: 'Venue Guides',
    excerpt: 'From historic landmarks to modern industrial spaces, discover the best wedding venues Omaha has to offer — with photography tips for each location.',
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Omaha is home to some of the most beautiful wedding venues in the Midwest. As photographers who have worked at venues across the city, here are our top 10 favorites.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '1. The Durham Museum — A stunning art deco former train station with soaring ceilings and beautiful natural light. Perfect for couples who love historic architecture.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '2. The Joslyn Castle — A magnificent Scottish baronial castle set on lush grounds. Incredible for both indoor and outdoor ceremonies.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '3. Lauritzen Gardens — A beautiful botanical garden with indoor and outdoor spaces. The blooming flowers provide a naturally romantic backdrop.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '4. The Mastercraft — A renovated industrial warehouse downtown. Exposed brick, modern finishes, and an urban vibe.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '5. Hotel Deco — A boutique hotel with art deco glamour. Intimate and elegant.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '6. The Living Room — A modern, minimalist venue in the Blackstone District. Clean lines and natural light.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '7. Happy Hollow Club — A classic country club with beautiful grounds and a timeless ballroom.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '8. The G6 — An industrial chic venue in the Old Market area. Great for couples who want something edgy and unique.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '9. Elmwood Park — A beautiful outdoor park with a historic pavilion. Perfect for nature-loving couples.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '10. The Riverfront — The new riverfront development offers stunning views of the Missouri River and a modern event space.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Each venue offers unique photography opportunities. We\'re always happy to scout venues with you to find the perfect locations for your portraits.' }] },
    ],
    seo: {
      metaTitle: 'Top 10 Wedding Venues in Omaha, Nebraska',
      metaDescription: 'Discover the best wedding venues in Omaha, NE — from historic landmarks to modern industrial spaces.',
    },
  },
  {
    _type: 'blog',
    title: 'Behind the Lens: A Day in the Life of a Wedding Photographer',
    slug: { _type: 'slug', current: 'day-in-life-wedding-photographer' },
    author: 'Gerald',
    publishedAt: '2025-03-05T10:00:00Z',
    category: 'Behind the Scenes',
    excerpt: 'Ever wonder what goes into capturing a wedding day? Join us for a behind-the-scenes look at a typical wedding day with Gerald Photo Video.',
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Have you ever wondered what it\'s like to be a wedding photographer? Let me take you behind the lens for a typical wedding day.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '6:00 AM — Equipment Check' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The day starts early. I check all my camera bodies, lenses, batteries, memory cards, and lighting equipment. Everything gets cleaned and packed. For a wedding, I typically bring two camera bodies, 4-5 lenses, flashes, and backup equipment for everything.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '7:30 AM — Arrival at Getting Ready Location' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'I arrive at the bride\'s getting ready location. The energy is always a mix of excitement and nerves. I start capturing the details — the dress, the shoes, the jewelry, the invitation suite. These details tell the story of the day.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '9:00 AM — First Look & Couple Portraits' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'One of my favorite parts of the day. The first look is always emotional — seeing the couple\'s genuine reaction when they see each other for the first time. We then capture couple portraits before the ceremony when everyone looks their best.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '11:00 AM — Ceremony' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'During the ceremony, I\'m in the background, capturing the moments as they unfold naturally. The exchange of vows, the ring, the first kiss — these moments are precious and can\'t be recreated.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '1:00 PM — Reception & Celebration' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The reception is a celebration. I capture the toasts, the first dance, the parent dances, and the party. This is where I need to be quick and creative — capturing the energy of the celebration.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '10:00 PM — Wrap Up' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'After 12-14 hours of shooting, I pack up and head home. But the work isn\'t done yet — the next few weeks are spent carefully selecting and editing each image.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Being a wedding photographer is more than a job — it\'s a privilege to be trusted with someone\'s most important memories. Every wedding is unique, and I approach each one with the same passion and dedication as the first.' }] },
    ],
    seo: {
      metaTitle: 'Behind the Lens: A Day in the Life of a Wedding Photographer',
      metaDescription: 'Go behind the scenes with Gerald Photo Video for an inside look at what it takes to capture a wedding day.',
    },
  },
];

async function seed() {
  console.log('🌱 Seeding blog posts...\n');

  // First, delete any existing blog posts to avoid duplicates
  const existing = await client.fetch(`*[_type == "blog"] { _id }`);
  if (existing.length > 0) {
    console.log(`   Found ${existing.length} existing posts. Deleting...`);
    const tx = client.transaction();
    existing.forEach((doc: { _id: string }) => tx.delete(doc._id));
    await tx.commit();
    console.log('   ✅ Existing posts deleted.\n');
  }

  // Create the sample posts
  for (const post of samplePosts) {
    const result = await client.create(post);
    console.log(`   ✅ Created: "${post.title}"`);
    console.log(`      ID: ${result._id}`);
    console.log(`      Slug: /blog/${post.slug.current}\n`);
  }

  console.log('🎉 Done! 4 sample blog posts created.');
  console.log('   Visit http://localhost:3000/blog to see them.');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
