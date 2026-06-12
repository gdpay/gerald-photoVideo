import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Weddings', value: 'WEDDINGS' },
          { title: 'Quinceañeras', value: 'QUINCEAÑERAS' },
          { title: 'Engagements', value: 'ENGAGEMENTS' },
          { title: 'Videography', value: 'VIDEOGRAPHY' },
          { title: 'Portfolio', value: 'PORTFOLIO' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Accessibility description for the image',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'category', subtitle: 'alt', media: 'image' },
  },
});
