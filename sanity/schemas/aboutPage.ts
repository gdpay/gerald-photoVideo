import { defineType, defineField } from 'sanity';
import {
  buttonFields,
  ctaImageField,
  eyebrowField,
  heroFields,
  iconField,
  iconPreview,
  section,
  seoField,
} from './shared';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section('story', 'Our Story'),
    section('values', 'Values'),
    section('community', 'Community'),
    section('cta', 'Call to Action'),
    section('seo', 'SEO'),
  ],
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', hidden: true }),
    ...heroFields(),
    eyebrowField('storyEyebrow', 'story'),
    defineField({ name: 'storyHeading', title: 'Heading', type: 'string', fieldset: 'story' }),
    defineField({
      name: 'storyParagraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item becomes a paragraph.',
      fieldset: 'story',
    }),
    defineField({
      name: 'storyImage',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Portrait or brand photo shown beside the story.',
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
      fieldset: 'story',
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      fieldset: 'values',
      of: [
        {
          type: 'object',
          fields: [
            iconField(),
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', icon: 'icon' },
            prepare: ({ title, subtitle, icon }) => ({ title, subtitle, media: iconPreview(icon) }),
          },
        },
      ],
    }),
    defineField({ name: 'communityHeading', title: 'Heading', type: 'string', fieldset: 'community' }),
    defineField({ name: 'communityText', title: 'Text', type: 'text', rows: 3, fieldset: 'community' }),
    // Existing content uses ctaHeading / ctaSubheading, so those names are kept here.
    defineField({ name: 'ctaHeading', title: 'Heading', type: 'string', fieldset: 'cta' }),
    defineField({ name: 'ctaSubheading', title: 'Text', type: 'text', rows: 2, fieldset: 'cta' }),
    ...buttonFields('ctaButton', 'cta'),
    ctaImageField(),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' };
    },
  },
});
