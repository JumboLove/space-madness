import {
  conceptSanityDefinition,
  postSanityDefinition,
  tagSanityDefinition,
  blockContentSanityDefinition,
  resourceSanityDefinition,
  resourceContentSanityDefinition,
  partialSanityDefinition,
} from 'content-models'

export const schemaTypes = [
  conceptSanityDefinition,
  postSanityDefinition,
  resourceSanityDefinition,
  resourceContentSanityDefinition,
  tagSanityDefinition,
  blockContentSanityDefinition,
  partialSanityDefinition,
]
export const translatedTypes = [conceptSanityDefinition.name, postSanityDefinition.name]
