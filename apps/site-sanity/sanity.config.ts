import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes, translatedTypes} from './schemas'
import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'space-madness',

  projectId: '5k9qefjb',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'es', title: 'Spanish'},
      ],
      schemaTypes: translatedTypes,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
