import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'reviewsPage',
  title: 'Reviews Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Client Reviews',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
      initialValue: 'Hear from the couples and families who trusted us with their most precious moments.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Reviews Page' };
    },
  },
});
