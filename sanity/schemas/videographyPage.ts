import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'videographyPage',
  title: 'Videography Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Videography',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Cinematic Videography',
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
      name: 'featuredVideo',
      title: 'Featured Video',
      type: 'object',
      description: 'Main video displayed on the videography page. Add a Vimeo or YouTube link.',
      fields: [
        defineField({
          name: 'title',
          title: 'Video Title',
          type: 'string',
          initialValue: 'Featured Film',
        }),
        defineField({
          name: 'url',
          title: 'Video Link',
          type: 'url',
          description: 'Paste a Vimeo or YouTube URL.',
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
        }),
      ],
    }),
    defineField({
      name: 'featuresHeading',
      title: 'Features Heading',
      type: 'string',
      initialValue: 'Our Film Offerings',
    }),
    defineField({
      name: 'features',
      title: 'Film Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Feature Name' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'icon', type: 'string', title: 'Icon Name', description: 'Lucide icon: Film, Camera, Drone, Music, Heart, Clock' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'description' },
          },
        },
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Showcase Videos',
      type: 'array',
      description: 'Vimeo or YouTube video URLs displayed on the videography page.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Video Title' },
            { name: 'url', type: 'url', title: 'Video URL', description: 'Vimeo or YouTube URL.' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'poster', type: 'image', title: 'Thumbnail / Poster Image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'title', subtitle: 'url', media: 'poster' },
          },
        },
      ],
    }),
    defineField({
      name: 'comboHeading',
      title: 'Combo Section Heading',
      type: 'string',
      initialValue: 'Photo + Video Combo',
    }),
    defineField({
      name: 'comboText',
      title: 'Combo Section Text',
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
      return { title: 'Videography Page' };
    },
  },
});
