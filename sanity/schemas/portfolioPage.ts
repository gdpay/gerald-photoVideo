import { defineType, defineField } from 'sanity';
import { buttonFields, heroFields, section, seoField } from './shared';

export default defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section('gallery', 'Gallery', 'Photos come from the Gallery Collections; films come from Videography Page › Featured Films.'),
    section('cta', 'Call to Action'),
    section('seo', 'SEO'),
  ],
  fields: [
    ...heroFields(),
    defineField({
      name: 'videographyEyebrow',
      title: 'Videography Tab Heading',
      type: 'string',
      description: 'Small heading above the films in the Videography tab.',
      fieldset: 'gallery',
    }),
    // Existing content uses ctaHeading / ctaSubheading, so those names are kept here.
    defineField({ name: 'ctaHeading', title: 'Heading', type: 'string', fieldset: 'cta' }),
    defineField({ name: 'ctaSubheading', title: 'Text', type: 'text', rows: 2, fieldset: 'cta' }),
    ...buttonFields('ctaButton', 'cta'),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'Portfolio Page' };
    },
  },
});
