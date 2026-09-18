import { defineType, defineField } from 'sanity';
import {
  buttonFields,
  cardsField,
  ctaFields,
  heroFields,
  portfolioFeatureField,
  section,
  seoField,
  stepsField,
} from './shared';

export default defineType({
  name: 'engagementsPage',
  title: 'Engagements Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section('intro', 'Introduction'),
    section('highlights', 'Engagement Sessions'),
    section('locations', 'Popular Locations'),
    section('steps', 'The Engagement Experience'),
    section('bundle', 'Engagement + Wedding Bundle'),
    section('cta', 'Call to Action'),
    section('seo', 'SEO'),
  ],
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', hidden: true }),
    ...heroFields(),
    defineField({ name: 'introText', title: 'Text', type: 'text', rows: 4, fieldset: 'intro' }),
    portfolioFeatureField('Engagements'),
    defineField({ name: 'highlightsHeading', title: 'Heading', type: 'string', fieldset: 'highlights' }),
    cardsField('highlights', 'highlights'),
    defineField({ name: 'locationsHeading', title: 'Heading', type: 'string', fieldset: 'locations' }),
    defineField({ name: 'locationsSubheading', title: 'Text', type: 'string', fieldset: 'locations' }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      fieldset: 'locations',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Location Name' },
            { name: 'area', type: 'string', title: 'Area', description: 'e.g. "Omaha, NE"' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
          preview: { select: { title: 'name', subtitle: 'area' } },
        },
      ],
    }),
    defineField({ name: 'stepsHeading', title: 'Heading', type: 'string', fieldset: 'steps' }),
    stepsField('steps', 'steps'),
    defineField({ name: 'bundleHeading', title: 'Heading', type: 'string', fieldset: 'bundle' }),
    defineField({ name: 'bundleText', title: 'Text', type: 'text', rows: 2, fieldset: 'bundle' }),
    ...buttonFields('bundleButton', 'bundle', 'Link'),
    ...ctaFields(),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'Engagements Page' };
    },
  },
});
