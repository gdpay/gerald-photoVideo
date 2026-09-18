import { defineType, defineField } from 'sanity';
import {
  cardsField,
  ctaFields,
  heroFields,
  portfolioFeatureField,
  section,
  seoField,
  stepsField,
} from './shared';

export default defineType({
  name: 'portraitsPage',
  title: 'Portraits Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section('intro', 'Introduction'),
    section('highlights', 'Portrait Sessions'),
    section('steps', 'The Portrait Experience'),
    section('cta', 'Call to Action'),
    section('seo', 'SEO'),
  ],
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', hidden: true }),
    ...heroFields(),
    defineField({ name: 'introText', title: 'Text', type: 'text', rows: 4, fieldset: 'intro' }),
    portfolioFeatureField('Portraits'),
    defineField({ name: 'highlightsHeading', title: 'Heading', type: 'string', fieldset: 'highlights' }),
    cardsField('highlights', 'highlights'),
    defineField({ name: 'stepsHeading', title: 'Heading', type: 'string', fieldset: 'steps' }),
    stepsField('steps', 'steps'),
    ...ctaFields(),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'Portraits Page' };
    },
  },
});
