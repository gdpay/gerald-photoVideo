import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'portraitsPage',
  title: 'Portraits Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Portraits',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Portrait Photography',
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
      name: 'highlightsHeading',
      title: 'Highlights Heading',
      type: 'string',
      initialValue: 'Portrait Sessions',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
          preview: {
            select: { title: 'label', subtitle: 'description' },
          },
        },
      ],
    }),
    defineField({
      name: 'stepsHeading',
      title: 'Steps Section Heading',
      type: 'string',
      initialValue: 'The Portrait Experience',
    }),
    defineField({
      name: 'steps',
      title: 'Experience Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Step Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      initialValue: 'Book Your Portrait Session',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'portfolioFeature',
      title: 'Portfolio Feature Section',
      type: 'object',
      fields: [
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          description: 'Add up to three images for the wide portfolio preview section.',
          validation: (rule) => rule.max(3),
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', type: 'string', title: 'Alt Text' },
                { name: 'caption', type: 'string', title: 'Caption' },
              ],
            },
          ],
        }),
        defineField({
          name: 'buttonLabel',
          title: 'Button Label',
          type: 'string',
          initialValue: 'View Full Portfolio',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
          initialValue: '/portfolio',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Portraits Page' };
    },
  },
});
