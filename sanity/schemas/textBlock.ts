import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Text Left', value: 'textLeft' },
          { title: 'Text Right', value: 'textRight' },
          { title: 'Text Only', value: 'textOnly' },
        ],
      },
      initialValue: 'textOnly',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'layout' },
  },
});
