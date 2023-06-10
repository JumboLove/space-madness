import {
  conceptSanityDefinition,
  postSanityDefinition,
  tagSanityDefinition,
  blockContentSanityDefinition,
} from 'content-models'

export const schemaTypes = [
  conceptSanityDefinition,
  postSanityDefinition,
  tagSanityDefinition,
  blockContentSanityDefinition,
]
export const translatedTypes = [conceptSanityDefinition.name, postSanityDefinition.name]
