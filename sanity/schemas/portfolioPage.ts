import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Our Portfolio',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
      initialValue: 'A curated collection of our favorite moments.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'videographyEyebrow',
      title: 'Videography Section Eyebrow',
      type: 'string',
      initialValue: 'Cinematic Films',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      initialValue: 'Ready to Create Your Own Gallery?',
    }),
    defineField({
      name: 'ctaSubheading',
      title: 'CTA Subheading',
      type: 'string',
      initialValue: "Let's work together to create images you'll love.",
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA Button Label',
      type: 'string',
      initialValue: 'Get Started',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Portfolio Page' };
    },
  },
});
