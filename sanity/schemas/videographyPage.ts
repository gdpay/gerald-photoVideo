import { defineType, defineField } from 'sanity';
import {
  buttonFields,
  ctaFields,
  eyebrowField,
  galleryImagesField,
  heroFields,
  iconField,
  iconPreview,
  section,
  seoField,
} from './shared';

export default defineType({
  name: 'videographyPage',
  title: 'Videography Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section('intro', 'Introduction'),
    section('films', 'Featured Films', 'The first three films are shown here. They also appear in the Portfolio › Videography tab.'),
    section('gallery', 'Gallery', 'The photos come from Videography Page › Gallery. The section is hidden until that gallery has photos.'),
    section('features', 'Our Film Offerings'),
    section('combo', 'Photo + Video Combo'),
    section('cta', 'Call to Action'),
    section('seo', 'SEO'),
  ],
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', hidden: true }),
    ...heroFields(),
    defineField({ name: 'introText', title: 'Text', type: 'text', rows: 4, fieldset: 'intro' }),
    eyebrowField('filmsEyebrow', 'films'),
    defineField({ name: 'filmsHeading', title: 'Heading', type: 'string', fieldset: 'films' }),
    defineField({
      name: 'videos',
      title: 'Films',
      type: 'array',
      fieldset: 'films',
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
      name: 'featuredVideo',
      title: 'Main Film (for search engines)',
      type: 'object',
      fieldset: 'films',
      description: 'Describes your main film to Google. It is also shown on the page if the Films list is empty.',
      fields: [
        defineField({ name: 'title', title: 'Video Title', type: 'string', initialValue: 'Featured Film' }),
        defineField({ name: 'url', title: 'Video Link', type: 'url', description: 'Paste a Vimeo or YouTube URL.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({ name: 'poster', title: 'Thumbnail / Poster Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
    galleryImagesField('Videography'),
    ...buttonFields('galleryButton', 'gallery'),
    defineField({ name: 'featuresHeading', title: 'Heading', type: 'string', fieldset: 'features' }),
    defineField({
      name: 'features',
      title: 'Offerings',
      type: 'array',
      fieldset: 'features',
      of: [
        {
          type: 'object',
          fields: [
            iconField(),
            { name: 'label', type: 'string', title: 'Feature Name' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
          preview: {
            select: { title: 'label', subtitle: 'description', icon: 'icon' },
            prepare: ({ title, subtitle, icon }) => ({ title, subtitle, media: iconPreview(icon) }),
          },
        },
      ],
    }),
    defineField({ name: 'comboHeading', title: 'Heading', type: 'string', fieldset: 'combo' }),
    defineField({ name: 'comboText', title: 'Text', type: 'text', rows: 2, fieldset: 'combo' }),
    ...buttonFields('comboButton', 'combo', 'Link'),
    ...ctaFields(),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'Videography Page' };
    },
  },
});
