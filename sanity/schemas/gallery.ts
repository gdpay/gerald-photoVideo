import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'gallery',
  title: 'Gallery Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Weddings', value: 'weddings' },
          { title: 'Quinceañeras', value: 'quinceaneras' },
          { title: 'Engagements', value: 'engagements' },
          { title: 'Portraits', value: 'portraits' },
          { title: 'Investment', value: 'investment' },
          { title: 'About', value: 'about' },
          { title: 'Videography', value: 'videography' },
          { title: 'Featured', value: 'featured' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Collection',
      type: 'boolean',
      initialValue: false,
      description: 'Show on homepage gallery preview',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
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
  ],
});
