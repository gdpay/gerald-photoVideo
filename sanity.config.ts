import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9vm83yjc';
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const singletonTypes = new Set(['homePage', 'settings']);

export default defineConfig({
  name: 'gerald-photo-video',
  title: 'Gerald Photo Video',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() && !singletonTypes.has(item.getId()!)
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
