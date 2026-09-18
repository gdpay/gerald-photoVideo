import { defineType, defineField } from 'sanity';
import { buttonFields, heroFields, section, seoField } from './shared';

export default defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  fieldsets: [
    section('hero', 'Hero'),
    section('posts', 'Blog Posts List', 'The posts themselves are in Blog Page › Blog Posts.'),
    section('postCta', 'Call to Action (bottom of every post)'),
    section('seo', 'SEO'),
  ],
  fields: [
    ...heroFields(),
    defineField({ name: 'readMoreLabel', title: '"Read More" Link Text', type: 'string', fieldset: 'posts' }),
    defineField({ name: 'postCtaTitle', title: 'Heading', type: 'string', fieldset: 'postCta' }),
    defineField({ name: 'postCtaSubtitle', title: 'Text', type: 'text', rows: 2, fieldset: 'postCta' }),
    ...buttonFields('postCtaButton', 'postCta'),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: 'Blog Page' };
    },
  },
});
