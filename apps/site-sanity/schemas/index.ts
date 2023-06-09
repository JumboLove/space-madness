import {
  postSanityDefinition,
  tagSanityDefinition,
  blockContentSanityDefinition,
} from 'content-models'

export const schemaTypes = [postSanityDefinition, tagSanityDefinition, blockContentSanityDefinition]
export const translatedTypes = [postSanityDefinition.name]
