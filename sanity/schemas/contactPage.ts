import { defineType, defineField } from 'sanity';
import { buttonFields, heroFields, iconField, section, seoField } from './shared';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section(
      'details',
      'Contact Details',
      'The phone number, email, Instagram link and service region themselves come from Site Settings.'
    ),
    section('thankYou', 'Thank-You Page', 'Shown after someone sends the contact form (/contact/thank-you).'),
    section('seo', 'SEO'),
  ],
  fields: [
    ...heroFields(),
    defineField({ name: 'detailsHeading', title: 'Heading', type: 'string', fieldset: 'details' }),
    iconField('phoneIcon', 'Phone Card Icon', 'details'),
    defineField({ name: 'phoneTitle', title: 'Phone Card Title', type: 'string', fieldset: 'details' }),
    defineField({ name: 'phoneNote', title: 'Phone Card Note', type: 'string', fieldset: 'details' }),
    iconField('emailIcon', 'Email Card Icon', 'details'),
    defineField({ name: 'emailTitle', title: 'Email Card Title', type: 'string', fieldset: 'details' }),
    defineField({ name: 'emailNote', title: 'Email Card Note', type: 'string', fieldset: 'details' }),
    iconField('instagramIcon', 'Instagram Card Icon', 'details'),
    defineField({ name: 'instagramTitle', title: 'Instagram Card Title', type: 'string', fieldset: 'details' }),
    defineField({ name: 'instagramHandle', title: 'Instagram Handle', type: 'string', fieldset: 'details' }),
    defineField({ name: 'instagramNote', title: 'Instagram Card Note', type: 'string', fieldset: 'details' }),
    iconField('serviceAreaIcon', 'Service Area Card Icon', 'details'),
    defineField({ name: 'serviceAreaTitle', title: 'Service Area Card Title', type: 'string', fieldset: 'details' }),
    defineField({ name: 'serviceAreaNote', title: 'Service Area Card Note', type: 'string', fieldset: 'details' }),
    defineField({ name: 'bookingNote', title: 'Booking Note', type: 'text', rows: 3, fieldset: 'details' }),
    iconField('thankYouIcon', 'Icon', 'thankYou'),
    defineField({ name: 'thankYouHeading', title: 'Heading', type: 'string', fieldset: 'thankYou' }),
    defineField({ name: 'thankYouText', title: 'Text', type: 'text', rows: 3, fieldset: 'thankYou' }),
    defineField({ name: 'thankYouNote', title: 'Small Note', type: 'string', fieldset: 'thankYou' }),
    ...buttonFields('thankYouButton', 'thankYou'),
    ...buttonFields('thankYouSecondButton', 'thankYou', 'Second Button'),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' };
    },
  },
});
