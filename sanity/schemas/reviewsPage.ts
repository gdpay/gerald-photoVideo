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
    defineField({
      name: 'ratingCountText',
      title: 'Review Count Text',
      type: 'string',
      description: 'The line under the rating. Write {count} for the number of reviews, e.g. "Based on {count}+ reviews".',
      fieldset: 'rating',
    }),
    defineField({
      name: 'serviceLabels',
      title: 'Service Labels',
      type: 'array',
      fieldset: 'rating',
      description: 'The small label under each reviewer\'s name. Match the Service Type set on the review.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              type: 'string',
              title: 'Service Type',
              options: {
                list: [
                  { title: 'Wedding', value: 'wedding' },
                  { title: 'Quinceañera', value: 'quinceanera' },
                  { title: 'Engagement', value: 'engagement' },
                  { title: 'Portrait', value: 'portrait' },
                  { title: 'Videography', value: 'videography' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            { name: 'label', type: 'string', title: 'Shown As' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
    ...ctaFields(),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'Reviews Page' };
    },
  },
});
