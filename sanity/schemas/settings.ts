import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Gerald Photo Video',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' },
        { name: 'tiktok', type: 'url', title: 'TikTok URL' },
        { name: 'youtube', type: 'url', title: 'YouTube URL' },
      ],
    }),
    defineField({
      name: 'addressRegion',
      title: 'Service Area / Region',
      type: 'string',
      initialValue: 'Nebraska & Iowa',
      description: 'Displayed in the footer and contact page.',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      initialValue: 'Timeless photography and cinematic films for life\'s most beautiful moments.',
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer Note',
      type: 'string',
      initialValue: 'and surrounding areas.',
      description: 'Short text shown after the city links in the footer.',
    }),
    defineField({
      name: 'availabilityButtonLabel',
      title: 'Footer Button Label',
      type: 'string',
      initialValue: 'Check Availability',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
  ],
});
