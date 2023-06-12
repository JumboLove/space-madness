import {
  conceptSanityDefinition,
  postSanityDefinition,
  tagSanityDefinition,
  blockContentSanityDefinition,
  resourceSanityDefinition,
  resourceContentSanityDefinition,
} from 'content-models'

export const schemaTypes = [
  conceptSanityDefinition,
  postSanityDefinition,
  resourceSanityDefinition,
  resourceContentSanityDefinition,
  tagSanityDefinition,
  blockContentSanityDefinition,
]
export const translatedTypes = [conceptSanityDefinition.name, postSanityDefinition.name]
