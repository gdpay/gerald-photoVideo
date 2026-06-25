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
