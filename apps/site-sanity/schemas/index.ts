import {
  conceptSanityDefinition,
  postSanityDefinition,
  tagSanityDefinition,
  blockContentSanityDefinition,
  resourceSanityDefinition,
} from 'content-models'

export const schemaTypes = [
  conceptSanityDefinition,
  postSanityDefinition,
  resourceSanityDefinition,
  tagSanityDefinition,
  blockContentSanityDefinition,
]
export const translatedTypes = [conceptSanityDefinition.name, postSanityDefinition.name]
