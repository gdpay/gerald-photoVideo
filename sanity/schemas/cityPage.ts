import { defineType, defineField } from 'sanity';
import { ctaFields, heroFields, section, seoField, testimonialsFields } from './shared';

// One document per local landing page (e.g. /omaha-wedding-photographer).
export default defineType({
  name: 'cityPage',
  title: 'City Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section('intro', 'Introduction'),
    section('services', 'Services'),
    section('testimonials', 'Client Stories', 'Shows the reviews marked "Featured". The stats bar above it comes from Home Page.'),
    section('cta', 'Call to Action'),
    section('seo', 'SEO'),
  ],
  fields: [
    defineField({ name: 'city', title: 'City', type: 'string', readOnly: true }),
    defineField({ name: 'state', title: 'State', type: 'string', readOnly: true }),
    ...heroFields(),
    defineField({ name: 'introHeading', title: 'Heading', type: 'string', fieldset: 'intro' }),
    defineField({ name: 'introText', title: 'Text', type: 'text', rows: 4, fieldset: 'intro' }),
    defineField({ name: 'servicesHeading', title: 'Heading', type: 'string', fieldset: 'services' }),
    defineField({ name: 'servicesList', title: 'Services', type: 'array', of: [{ type: 'string' }], fieldset: 'services' }),
    ...testimonialsFields(),
    ...ctaFields(),
    seoField(),
  ],
  preview: {
    select: { city: 'city', state: 'state' },
    prepare({ city, state }) {
      return { title: city ? `${city} Page` : 'City Page', subtitle: state };
    },
  },
});
