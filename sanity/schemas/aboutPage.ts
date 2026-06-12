import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Our Story',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
      initialValue: "We're not just photographers — we're storytellers, memory-keepers, and your biggest fans.",
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item becomes a paragraph in the story section.',
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'icon', type: 'string', title: 'Icon Name', description: 'Lucide icon: Heart, Camera, Star, etc.' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    }),
    defineField({
      name: 'communityHeading',
      title: 'Community Section Heading',
      type: 'string',
      initialValue: 'Proudly Serving Nebraska & Iowa',
    }),
    defineField({
      name: 'communityText',
      title: 'Community Section Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      initialValue: "We'd Love to Hear Your Story",
    }),
    defineField({
      name: 'ctaSubheading',
      title: 'CTA Subheading',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' };
    },
  },
});
