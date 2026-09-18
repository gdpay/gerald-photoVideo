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
  'homePage', 'weddingsPage', 'quinceanerasPage', 'engagementsPage', 'portraitsPage', 'videographyPage',
  'portfolioPage', 'investmentPage', 'aboutPage', 'reviewsPage', 'faqPage', 'blogPage', 'contactPage', 'settings',
]);

// Edited only through the per-page sidebar items below: kept out of the generic lists, the global "+" menu
// and "Duplicate", so a stray copy can never be picked up by the website instead of the real one.
// City pages have one document each, with the ID "cityPage-<slug>" (e.g. cityPage-omaha).
const pageTypes = new Set([...singletonTypes, 'cityPage']);

const galleryTemplateId = 'gallery-by-service-type';
const cityTemplateId = 'city-page';

function structure(S: StructureBuilder, context: StructureResolverContext) {
  const folder = (id: string, title: string, items: ListItemBuilder[]) =>
    S.listItem().id(id).title(title).child(S.list().id(id).title(title).items(items));

  const doc = (title: string, type: string, id = type) =>
    S.listItem().title(title).schemaType(type).child(S.document().schemaType(type).documentId(id));

  const city = (title: string, slug: string, state: string) =>
    S.listItem()
      .title(title)
      .schemaType('cityPage')
      .child(
        S.document()
          .schemaType('cityPage')
          .documentId(`cityPage-${slug}`)
          .initialValueTemplate(cityTemplateId, { city: title, state })
      );

  // Opens the gallery a page shows (matched by service type). If there isn't one yet, opens a new one with a
  // fixed ID, pre-filled so the website picks it up as soon as it's published.
  const galleryFor = (serviceType: string, galleryTitle: string) =>
    S.listItem()
      .title('Gallery')
      .schemaType('gallery')
      .child(async () => {
        const [match] = await context
          .getClient({ apiVersion: '2024-01-01' })
          .fetch<string[]>('*[_type == "gallery" && serviceType == $serviceType]._id', { serviceType });
        return S.document()
          .schemaType('gallery')
          .documentId(match?.replace(/^(drafts|versions\.[^.]+)\./, '') ?? `gallery-${serviceType}`)
          .initialValueTemplate(galleryTemplateId, { serviceType, title: galleryTitle });
      });

  return S.list()
    .title('Content')
    .items([
      folder('homePage', 'Home Page', [
        doc('Page Content', 'homePage'),
        S.documentTypeListItem('heroSlide').title('Hero Slideshow'),
      ]),
      folder('weddingsPage', 'Weddings Page', [
        doc('Page Content', 'weddingsPage'),
        galleryFor('weddings', 'Wedding Collection'),
      ]),
      folder('quinceanerasPage', 'Quinceañeras Page', [
        doc('Page Content', 'quinceanerasPage'),
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
        doc('Page Content', 'blogPage'),
        S.documentTypeListItem('blog').title('Blog Posts'),
      ]),
      doc('Contact Page', 'contactPage').id('contactPage'),
      folder('cityPages', 'City Pages', [
        city('Omaha', 'omaha', 'NE'),
        city('Lincoln', 'lincoln', 'NE'),
        city('Council Bluffs', 'council-bluffs', 'IA'),
        city('Des Moines', 'des-moines', 'IA'),
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
        id: galleryTemplateId,
        title: 'Gallery Collection',
        schemaType: 'gallery',
        parameters: [
          { name: 'serviceType', type: 'string' },
          { name: 'title', type: 'string' },
        ],
        value: ({ serviceType, title }: { serviceType: string; title: string }) => ({ title, serviceType }),
      },
      {
        id: cityTemplateId,
        title: 'City Page',
        schemaType: 'cityPage',
        parameters: [
          { name: 'city', type: 'string' },
          { name: 'state', type: 'string' },
        ],
        value: ({ city, state }: { city: string; state: string }) => ({ city, state }),
      },
    ],
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter(
            ({ templateId }) =>
              !pageTypes.has(templateId) && templateId !== galleryTemplateId && templateId !== cityTemplateId
          )
        : prev,
    actions: (prev, { schemaType }) =>
      pageTypes.has(schemaType) ? prev.filter(({ action }) => action !== 'duplicate') : prev,
  },
});
