import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'engagementsPage',
  title: 'Engagements Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Engagements',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Engagement Portraits',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image used behind the page hero.',
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'locationsHeading',
      title: 'Locations Heading',
      type: 'string',
      initialValue: 'Popular Locations',
    }),
    defineField({
      name: 'locationsSubheading',
      title: 'Locations Subheading',
      type: 'string',
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Location Name' },
            { name: 'area', type: 'string', title: 'Area', description: 'e.g. "Omaha, NE"' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
          preview: {
            select: { title: 'name', subtitle: 'area' },
          },
        },
      ],
    }),
    defineField({
      name: 'bundleHeading',
      title: 'Bundle Section Heading',
      type: 'string',
      initialValue: 'Book Your Engagement + Wedding Together',
    }),
    defineField({
      name: 'bundleText',
      title: 'Bundle Section Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Engagements Page' };
    },
  },
});
