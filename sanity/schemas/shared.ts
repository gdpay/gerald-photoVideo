import { defineField } from 'sanity';

// Building blocks for the page documents. Each page groups its fields into
// collapsible sections listed in the same order as they appear on the website.

export const section = (name: string, title: string, description?: string) => ({
  name,
  title,
  description,
  options: { collapsible: true, collapsed: true },
});

export const heroTaglineField = (
  fieldset = 'hero',
  description = 'Small text above the heading. Leave empty to hide it.'
) => defineField({ name: 'heroTagline', title: 'Tagline', type: 'string', description, fieldset });

export const heroFields = (fieldset = 'hero', taglineDescription?: string) => [
  heroTaglineField(fieldset, taglineDescription),
  defineField({ name: 'heroHeading', title: 'Heading', type: 'string', fieldset }),
  defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 2, fieldset }),
  defineField({ name: 'heroImage', title: 'Background Image', type: 'image', options: { hotspot: true }, fieldset }),
];

// A "<prefix>Label" + "<prefix>Link" pair for a button or text link.
export const buttonFields = (prefix: string, fieldset: string, title = 'Button') => [
  defineField({ name: `${prefix}Label`, title: `${title} Label`, type: 'string', fieldset }),
  defineField({
    name: `${prefix}Link`,
    title: `${title} Link`,
    type: 'string',
    description: 'A page on this site like /contact, or a full URL.',
    fieldset,
  }),
];

export const eyebrowField = (name: string, fieldset: string) =>
  defineField({ name, title: 'Eyebrow', type: 'string', description: 'Small text above the heading.', fieldset });

export const ctaFields = ({ secondaryButton = false } = {}) => [
  defineField({ name: 'ctaTitle', title: 'Heading', type: 'string', fieldset: 'cta' }),
  defineField({ name: 'ctaSubtitle', title: 'Text', type: 'text', rows: 2, fieldset: 'cta' }),
  ...buttonFields('ctaButton', 'cta'),
  ...(secondaryButton ? buttonFields('ctaSecondaryButton', 'cta', 'Second Button') : []),
];

export const testimonialsFields = () => [
  eyebrowField('testimonialsEyebrow', 'testimonials'),
  defineField({ name: 'testimonialsHeading', title: 'Heading', type: 'string', fieldset: 'testimonials' }),
  ...buttonFields('testimonialsButton', 'testimonials'),
];

// List of { label, description } cards (icons are assigned by position on the website).
export const cardsField = (name: string, fieldset: string, title = 'Cards') =>
  defineField({
    name,
    title,
    type: 'array',
    fieldset,
    of: [
      {
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 2 },
        ],
        preview: { select: { title: 'label', subtitle: 'description' } },
      },
    ],
  });

// Numbered steps; the numbers are added automatically on the website.
export const stepsField = (name: string, fieldset: string) =>
  defineField({
    name,
    title: 'Steps',
    type: 'array',
    fieldset,
    of: [
      {
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Step Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 3 },
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      },
    ],
  });

// The wide three-photo strip with a portfolio button (Engagements and Portraits pages).
export const portfolioFeatureField = (galleryName: string) =>
  defineField({
    name: 'portfolioFeature',
    title: 'Portfolio Preview',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({
        name: 'images',
        title: 'Images',
        type: 'array',
        description: `Up to three photos. If empty, photos from ${galleryName} Page › Gallery are used.`,
        validation: (rule) => rule.max(3),
        of: [
          {
            type: 'image',
            options: { hotspot: true },
            fields: [
              { name: 'alt', type: 'string', title: 'Alt Text' },
              { name: 'caption', type: 'string', title: 'Caption' },
            ],
          },
        ],
      }),
      defineField({ name: 'buttonLabel', title: 'Button Label', type: 'string', initialValue: 'View Full Portfolio' }),
      defineField({ name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/portfolio' }),
    ],
  });

export const seoField = () => defineField({ name: 'seo', title: 'SEO Settings', type: 'seo', fieldset: 'seo' });
