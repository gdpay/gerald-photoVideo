import { defineType, defineField } from 'sanity';
import { buttonFields, ctaFields, heroFields, iconField, section, seoField } from './shared';

export default defineType({
  name: 'investmentPage',
  title: 'Investment Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section('intro', 'Introduction'),
    section('gallery', 'Gallery', 'The photos come from Investment Page › Gallery.'),
    section('collections', 'Collections'),
    section('addOns', 'A La Carte Add-Ons'),
    section('payment', 'Payment Plans'),
    section('cta', 'Call to Action'),
    section('seo', 'SEO'),
  ],
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', hidden: true }),
    ...heroFields(),
    defineField({ name: 'philosophyText', title: 'Text', type: 'text', rows: 4, fieldset: 'intro' }),
    defineField({ name: 'philosophyNote', title: 'Small Note', type: 'string', fieldset: 'intro' }),
    ...buttonFields('galleryButton', 'gallery'),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      fieldset: 'collections',
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
    iconField('featureIcon', 'Icon Before Each Feature', 'collections'),
    defineField({ name: 'popularBadgeLabel', title: '"Most Popular" Badge Text', type: 'string', fieldset: 'collections' }),
    defineField({ name: 'priceIntroLabel', title: 'Text Above the Price', type: 'string', description: 'e.g. "Starting At".', fieldset: 'collections' }),
    ...buttonFields('collectionButton', 'collections', 'Card Button'),
    defineField({ name: 'addOnsHeading', title: 'Heading', type: 'string', fieldset: 'addOns' }),
    defineField({ name: 'addOns', title: 'Add-Ons', type: 'array', of: [{ type: 'string' }], fieldset: 'addOns' }),
    iconField('paymentIcon', 'Icon', 'payment'),
    defineField({ name: 'paymentHeading', title: 'Heading', type: 'string', fieldset: 'payment' }),
    defineField({ name: 'paymentText', title: 'Text', type: 'text', rows: 3, fieldset: 'payment' }),
    ...buttonFields('paymentButton', 'payment', 'Link'),
    ...ctaFields(),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'Investment Page' };
    },
  },
});
