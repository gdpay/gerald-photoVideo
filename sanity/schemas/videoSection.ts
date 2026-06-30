import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'videoSection',
  title: 'Video Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Internal label shown in Sanity Studio (not displayed on the page).',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Paste a Vimeo or YouTube URL.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'poster',
      title: 'Thumbnail / Poster Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown before the video plays.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'videoUrl', media: 'poster' },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Video Section',
        subtitle: subtitle || 'No URL set',
        media,
      };
    },
  },
});
