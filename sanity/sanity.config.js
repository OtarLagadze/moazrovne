import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {kaGELocale} from '@sanity/locale-ka-ge'

export default defineConfig({
  name: 'default',
  title: 'moazrovne',

  projectId: '8390afyw',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), kaGELocale()],

  schema: {
    types: schemaTypes,
  },

  // Disables creating new document in "about" schema type
  document: {
    newDocumentOptions: (prev, {currentUser, creationContext}) => {
      const {type, schemaType} = creationContext
      if (type === 'structure' && schemaType == 'about') {
        return []
      }
      return prev
    },
  },
})
