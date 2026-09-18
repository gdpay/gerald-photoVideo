import { defineType, defineField } from 'sanity';
import { ctaFields, heroFields, section, seoField } from './shared';

export default defineType({
  name: 'reviewsPage',
  title: 'Reviews Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section('rating', 'Average Rating', 'The reviews themselves are in Reviews Page › Reviews / Testimonials.'),
    section('cta', 'Call to Action'),
    section('seo', 'SEO'),
  ],
  fields: [
    ...heroFields(),
    defineField({
      name: 'ratingValue',
      title: 'Average Rating',
      type: 'number',
      description: 'Out of 5, e.g. 4.5. Also shown to Google in search results.',
      validation: (rule) => rule.min(0).max(5),
      fieldset: 'rating',
    }),
    defineField({
      name: 'ratingCount',
      title: 'Number of Reviews',
      type: 'number',
      description: 'Shown as "Based on 46+ reviews". Also shown to Google in search results.',
      validation: (rule) => rule.min(0).integer(),
      fieldset: 'rating',
    }),
    defineField({ name: 'ratingLabel', title: 'Label', type: 'string', description: 'e.g. "Average Rating".', fieldset: 'rating' }),
    ...ctaFields(),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'Reviews Page' };
    },
  },
});
