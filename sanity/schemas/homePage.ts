import { defineType, defineField } from 'sanity';
import { buttonFields, eyebrowField, heroFields, section, seoField, testimonialsFields } from './shared';

const collapsedGroup = { collapsible: true, collapsed: true };

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fieldsets: [
    section(
      'hero',
      'Hero',
      'The rotating background photos are in Home Page › Hero Slideshow. The background image here is only used when there are no slides.'
    ),
    section('trust', 'Stats Bar'),
    section('services', 'Services', 'The cards come from the Service documents, and their photos from each Gallery Collection.'),
    section('testimonials', 'Client Stories', 'Shows the reviews marked "Featured".'),
    section('seo', 'SEO'),
  ],
  fields: [
    ...heroFields('hero', 'Small text above the heading. If empty, the Tagline from Site Settings is shown.'),
    ...buttonFields('heroButton', 'hero'),
    defineField({
      name: 'heroLocationLabel',
      title: 'Location Label',
      type: 'string',
      description: 'Shown under the logo on large screens, e.g. "Omaha, NE".',
      fieldset: 'hero',
    }),
    defineField({
      name: 'trustStats',
      title: 'Stats',
      description: 'The stat strip below the hero (e.g. 20+ Years Experience). Also shown on the city pages.',
      type: 'array',
      fieldset: 'trust',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'string', title: 'Label' },
            {
              name: 'variant',
              type: 'string',
              title: 'Style',
              options: {
                list: [
                  { title: 'Plain', value: 'plain' },
                  { title: 'Laurel', value: 'laurel' },
                  { title: 'Stars', value: 'stars' },
                  { title: 'Script', value: 'script' },
                  { title: 'Heart', value: 'heart' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value', variant: 'variant' },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: `${selection.subtitle}${selection.variant ? ` (${selection.variant})` : ''}`,
              };
            },
          },
        },
      ],
    }),
    eyebrowField('servicesEyebrow', 'services'),
    defineField({ name: 'servicesHeading', title: 'Heading', type: 'string', fieldset: 'services' }),
    defineField({ name: 'servicesLinkLabel', title: '"View Gallery" Link Text', type: 'string', fieldset: 'services' }),
    defineField({
      name: 'featuredFilm',
      title: 'Featured Film',
      type: 'object',
      options: collapsedGroup,
      description: 'The section is only shown when a Video URL is set.',
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow', initialValue: 'Featured Wedding Film' },
        { name: 'heading', type: 'string', title: 'Heading', initialValue: 'A Day to Remember Forever' },
        { name: 'text', type: 'text', title: 'Text', rows: 2, initialValue: 'Cinematic storytelling that lets you relive every emotion, every time.' },
        { name: 'buttonLabel', type: 'string', title: 'Button Label', initialValue: 'Watch Film' },
        { name: 'buttonLink', type: 'string', title: 'Button Link', initialValue: '/videography' },
        { name: 'videoTitle', type: 'string', title: 'Video Title', initialValue: 'Featured Film' },
        { name: 'videoUrl', type: 'url', title: 'Video URL', description: 'Vimeo or YouTube link.' },
        { name: 'videoPoster', type: 'image', title: 'Video Thumbnail', options: { hotspot: true }, description: 'Poster image shown before the video plays.' },
      ],
    }),
    defineField({
      name: 'meetGerald',
      title: 'Meet Gerald',
      type: 'object',
      options: collapsedGroup,
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow', initialValue: 'Meet Gerald' },
        { name: 'heading', type: 'string', title: 'Heading', initialValue: 'More Than Photos. We Preserve Legacy.' },
        { name: 'image', type: 'image', title: 'Photo', options: { hotspot: true } },
        { name: 'text1', type: 'text', title: 'Text 1', rows: 3 },
        { name: 'text2', type: 'text', title: 'Text 2', rows: 2 },
        { name: 'name', type: 'string', title: 'Name', initialValue: 'Gerald' },
        { name: 'buttonLabel', type: 'string', title: 'Button Label', initialValue: 'Read Our Story' },
        { name: 'buttonLink', type: 'string', title: 'Button Link', initialValue: '/about' },
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Why Couples Choose Us',
      type: 'object',
      options: collapsedGroup,
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow', initialValue: 'Why Couples Choose Us' },
        { name: 'heading', type: 'string', title: 'Heading', initialValue: 'The Gerald Photo Video Experience' },
        {
          name: 'features',
          type: 'array',
          title: 'Features',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Label' },
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icon',
                  options: {
                    list: [
                      { title: 'Camera', value: 'Camera' },
                      { title: 'Sparkles', value: 'Sparkles' },
                      { title: 'HeartHandshake', value: 'HeartHandshake' },
                      { title: 'Users', value: 'Users' },
                      { title: 'Images', value: 'Images' },
                      { title: 'Album', value: 'Album' },
                      { title: 'Clock', value: 'Clock' },
                      { title: 'MapPin', value: 'MapPin' },
                    ],
                  },
                },
              ],
              preview: {
                select: { title: 'label', subtitle: 'icon' },
              },
            },
          ],
        },
        { name: 'buttonLabel', type: 'string', title: 'Button Label', initialValue: 'Learn More About Our Process' },
        { name: 'buttonLink', type: 'string', title: 'Button Link', initialValue: '/about' },
      ],
    }),
    ...testimonialsFields(),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
});
