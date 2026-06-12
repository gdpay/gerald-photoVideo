import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'FAQ',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
      initialValue: "Everything you need to know about working with us.",
    }),
    defineField({
      name: 'categories',
      title: 'FAQ Categories',
      type: 'array',
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
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'FAQ Page' };
    },
  },
});
