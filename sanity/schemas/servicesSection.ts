import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'services',
  title: 'Services Section',
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
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Featured Only', value: 'featured' },
        ],
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'display' },
  },
});
