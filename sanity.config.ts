import { defineConfig } from 'sanity';
import {
  structureTool,
  type ListItemBuilder,
  type StructureBuilder,
  type StructureResolverContext,
} from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9vm83yjc';
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// One document each; its ID is the type name (settings uses "siteSettings").
const singletonTypes = new Set([
  'homePage', 'aboutPage', 'engagementsPage', 'portraitsPage', 'videographyPage',
  'portfolioPage', 'investmentPage', 'reviewsPage', 'faqPage', 'settings',
]);

// Edited only through the per-page sidebar items below: kept out of the generic lists, the global "+" menu
// and "Duplicate", so a stray copy can never be picked up by the website instead of the real one.
const pageTypes = new Set([...singletonTypes, 'page']);

const pageTemplateId = 'page-by-slug';
const galleryTemplateId = 'gallery-by-service-type';

function structure(S: StructureBuilder, context: StructureResolverContext) {
  const folder = (id: string, title: string, items: ListItemBuilder[]) =>
    S.listItem().id(id).title(title).child(S.list().id(id).title(title).items(items));

  const doc = (title: string, type: string, id = type) =>
    S.listItem().title(title).schemaType(type).child(S.document().schemaType(type).documentId(id));

  // Opens the document matching `filter` directly. If there isn't one yet, opens a new one with a fixed ID,
  // pre-filled by the template so the website picks it up as soon as it's published.
  const findOrCreate = (
    title: string,
    type: string,
    filter: string,
    params: Record<string, string>,
    template: { id: string; newDocumentId: string; params: Record<string, string> }
  ) =>
    S.listItem()
      .title(title)
      .schemaType(type)
      .child(async () => {
        const [match] = await context
          .getClient({ apiVersion: '2024-01-01' })
          .fetch<string[]>(`*[_type == $type && ${filter}]._id`, { type, ...params });
        return S.document()
          .schemaType(type)
          .documentId(match?.replace(/^(drafts|versions\.[^.]+)\./, '') ?? template.newDocumentId)
          .initialValueTemplate(template.id, template.params);
      });

  // Pages whose hero (and other sections) live in a generic "Page" document, matched by slug.
  const pageBySlug = (title: string, slug: string, pageTitle: string) =>
    findOrCreate(title, 'page', 'slug.current == $slug', { slug }, {
      id: pageTemplateId,
      newDocumentId: `page-${slug}`,
      params: { slug, title: pageTitle },
    });

  // The gallery a page shows, matched by service type.
  const galleryFor = (serviceType: string, galleryTitle: string) =>
    findOrCreate('Gallery', 'gallery', 'serviceType == $serviceType', { serviceType }, {
      id: galleryTemplateId,
      newDocumentId: `gallery-${serviceType}`,
      params: { serviceType, title: galleryTitle },
    });

  return S.list()
    .title('Content')
    .items([
      folder('homePage', 'Home Page', [
        pageBySlug('Hero Section', 'home', 'Home'),
        S.documentTypeListItem('heroSlide').title('Hero Slideshow'),
        doc('Page Sections', 'homePage'),
      ]),
      folder('weddingsPage', 'Weddings Page', [
        pageBySlug('Page Content', 'weddings', 'Weddings'),
        galleryFor('weddings', 'Wedding Collection'),
      ]),
      folder('quinceanerasPage', 'Quinceañeras Page', [
        pageBySlug('Page Content', 'quinceaneras', 'Quinceañeras'),
        galleryFor('quinceaneras', 'Quinceañera Collection'),
      ]),
      folder('engagementsPage', 'Engagements Page', [
        doc('Page Content', 'engagementsPage'),
        galleryFor('engagements', 'Engagement Collection'),
      ]),
      folder('portraitsPage', 'Portraits Page', [
        doc('Page Content', 'portraitsPage'),
        galleryFor('portraits', 'Portrait Collection'),
      ]),
      folder('videographyPage', 'Videography Page', [
        doc('Page Content', 'videographyPage'),
        galleryFor('videography', 'Videography Collection'),
      ]),
      folder('portfolioPage', 'Portfolio Page', [
        doc('Page Content', 'portfolioPage'),
        S.documentTypeListItem('gallery').title('Gallery Collections'),
      ]),
      folder('investmentPage', 'Investment Page', [
        doc('Page Content', 'investmentPage'),
        galleryFor('investment', 'Investment Portfolio'),
      ]),
      doc('About Page', 'aboutPage').id('aboutPage'),
      folder('reviewsPage', 'Reviews Page', [
        doc('Page Content', 'reviewsPage'),
        S.documentTypeListItem('testimonial').title('Reviews / Testimonials'),
      ]),
      doc('FAQ Page', 'faqPage').id('faqPage'),
      folder('blogPage', 'Blog Page', [
        pageBySlug('Page Hero', 'blog', 'Blog'),
        S.documentTypeListItem('blog').title('Blog Posts'),
      ]),
      pageBySlug('Contact Page', 'contact', 'Contact').id('contactPage'),
      folder('cityPages', 'City Pages', [
        pageBySlug('Omaha', 'omaha-wedding-photographer', 'Omaha Wedding Photographer'),
        pageBySlug('Lincoln', 'lincoln-wedding-photographer', 'Lincoln Wedding Photographer'),
        pageBySlug('Council Bluffs', 'council-bluffs-wedding-photographer', 'Council Bluffs Wedding Photographer'),
        pageBySlug('Des Moines', 'des-moines-wedding-photographer', 'Des Moines Wedding Photographer'),
      ]),
      S.divider(),
      doc('Site Settings', 'settings', 'siteSettings').id('siteSettings'),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !pageTypes.has(item.getId()!)),
    ]);
}

export default defineConfig({
  name: 'gerald-photo-video',
  title: 'Gerald Photo Video',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: pageTemplateId,
        title: 'Page',
        schemaType: 'page',
        parameters: [
          { name: 'slug', type: 'string' },
          { name: 'title', type: 'string' },
        ],
        value: ({ slug, title }: { slug: string; title: string }) => ({
          title,
          slug: { _type: 'slug', current: slug },
          sections: [{ _type: 'hero', _key: 'hero' }],
        }),
      },
      {
        id: galleryTemplateId,
        title: 'Gallery Collection',
        schemaType: 'gallery',
        parameters: [
          { name: 'serviceType', type: 'string' },
          { name: 'title', type: 'string' },
        ],
        value: ({ serviceType, title }: { serviceType: string; title: string }) => ({ title, serviceType }),
      },
    ],
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter(
            ({ templateId }) =>
              !pageTypes.has(templateId) && templateId !== pageTemplateId && templateId !== galleryTemplateId
          )
        : prev,
    actions: (prev, { schemaType }) =>
      pageTypes.has(schemaType) ? prev.filter(({ action }) => action !== 'duplicate') : prev,
  },
});
