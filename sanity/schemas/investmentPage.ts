import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'investmentPage',
  title: 'Investment Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Investment',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Investment',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
    }),
    defineField({
      name: 'philosophyText',
      title: 'Philosophy Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'philosophyNote',
      title: 'Philosophy Note',
      type: 'string',
      initialValue: 'All collections are customizable. Contact us for a personalized quote.',
    }),
    defineField({
      name: 'collections',
      title: 'Pricing Collections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Collection Name' },
            { name: 'subtitle', type: 'string', title: 'Subtitle' },
            { name: 'priceLabel', type: 'string', title: 'Price Label', initialValue: 'Upon Request', description: 'e.g. "Upon Request" or "$2,500"' },
            { name: 'priceNote', type: 'string', title: 'Price Note', initialValue: 'Custom quote for your event' },
            { name: 'features', type: 'array', title: 'Features', of: [{ type: 'string' }] },
            { name: 'popular', type: 'boolean', title: 'Most Popular', initialValue: false },
          ],
          preview: {
            select: { title: 'name', subtitle: 'subtitle', popular: 'popular' },
            prepare(selection) {
              return {
                title: selection.title + (selection.popular ? ' ★' : ''),
                subtitle: selection.subtitle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'addOnsHeading',
      title: 'Add-Ons Heading',
      type: 'string',
      initialValue: 'A La Carte Add-Ons',
    }),
    defineField({
      name: 'addOns',
      title: 'Add-Ons',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'paymentHeading',
      title: 'Payment Section Heading',
      type: 'string',
      initialValue: 'Flexible Payment Plans',
    }),
    defineField({
      name: 'paymentText',
      title: 'Payment Section Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Investment Page' };
    },
  },
});
