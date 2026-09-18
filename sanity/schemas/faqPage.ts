import { defineType, defineField } from 'sanity';
import { ctaFields, heroFields, section, seoField } from './shared';

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section('questions', 'Questions & Answers'),
    section('cta', 'Call to Action'),
    section('seo', 'SEO'),
  ],
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', hidden: true }),
    ...heroFields(),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      fieldset: 'questions',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', type: 'string', title: 'Category Name' },
            {
              name: 'questions',
              type: 'array',
              title: 'Questions',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'question', type: 'string', title: 'Question' },
                    { name: 'answer', type: 'text', title: 'Answer', rows: 3 },
                  ],
                  preview: {
                    select: { title: 'question', subtitle: 'answer' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'category' },
          },
        },
      ],
    }),
    ...ctaFields(),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'FAQ Page' };
    },
  },
});
