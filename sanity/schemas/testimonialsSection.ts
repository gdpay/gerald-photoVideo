import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonials',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'display',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel', value: 'carousel' },
          { title: 'Grid', value: 'grid' },
          { title: 'Featured Only', value: 'featured' },
        ],
      },
      initialValue: 'carousel',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'display' },
  },
});
