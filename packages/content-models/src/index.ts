import { z } from "zod";

import * as concept from "./concept";
export * from "./concept";

import * as post from "./post";
export * from "./post";

import * as project from "./project";
export * from "./project";

import * as resource from "./resource";
export * from "./resource";

import * as resourceContent from "./resourceContent";
export * from "./resourceContent";

import * as tag from "./tag";
export * from "./tag";

import * as partial from "./partial";
export * from "./partial";

import * as blockContent from "./blockContent";
export * from "./blockContent";

// All custom marks, blocks, and types for Block Content
export * from "./blockContent/callout";
export * from "./blockContent/image";
export * from "./blockContent/figure";
export * from "./blockContent/internalLink";
export * from "./blockContent/codeBlock";
export * from "./blockContent/embed";
export * from "./blockContent/partialInclude";

// Sanity Schema Definitions are fed into Sanity's Studio config
export const sanitySchemaTypes = [
  concept.conceptSanityDefinition,
  post.postSanityDefinition,
  project.projectSanityDefinition,
  resource.resourceSanityDefinition,
  resourceContent.resourceContentSanityDefinition,
  tag.tagSanityDefinition,
  blockContent.blockContentSanityDefinition,
  partial.partialSanityDefinition,
];

// Translated Sanity Schema types will have separate documents for each language
// See sanity.config.ts to setup your language
export const translatedSanitySchemaTypes = [
  concept.conceptSanityDefinition.name,
  post.postSanityDefinition.name,
];

/**
 * Build Zod schema for backlinks, based on Sanity documents
 * For example, we have Sanity documents post, concept, and resource
 * We will need a matching Zod schema:
 * z.union([z.literal('post'), z.literal('concept'), z.literal('resource')])
 */
export const SanityBacklinkType = z.union([
  z.literal("concept"),
  z.literal("post"),
  z.literal("project"),
  z.literal("resource"),
  z.literal("tag"),
]);

export type SanityBacklinkType = z.infer<typeof SanityBacklinkType>;

/**
 * Build Zod schema for Sanity document types
 * that are mapped to pages in the Astro site
 * For example:
 * Sanity post => blog/index.astro and blog/[slug].astro
 * Sanity concept => concepts/index.astro and concepts/[slug].astro
 *
 * This type is used in site-astro/lib/url.ts
 * Once you update this union, you need to setup a URL string
 */

export const SanityLinkableType = z.union([
  z.literal("concept"),
  z.literal("post"),
  z.literal("project"),
  z.literal("resource"),
  z.literal("tag"),
]);

export type SanityLinkableType = z.infer<typeof SanityLinkableType>;

/**
 * Build Display values for Sanity Schema Types
 * For example:
 * {
 *  post: ["Article", "Articles"],
 *  concept: ["Concept", "Concepts"]
 * }
 * You can override the Sanity name in this loop
 * with a case: statement
 */
export const SanityTypeDisplayNames = {} as {
  [key in (typeof sanitySchemaTypes)[number]["name"]]: [string, string];
};
sanitySchemaTypes
  .filter((schemaType) => schemaType.type === "document")
  .forEach((sanitySchema) => {
    switch (sanitySchema.name) {
      case "post":
        SanityTypeDisplayNames[sanitySchema.name] = ["Article", "Articles"];
        break;
      case "resourceContent":
        SanityTypeDisplayNames[sanitySchema.name] = [
          "Resource Content",
          "Resource Content",
        ];
      default:
        // Basic pluralization is to add "s" to the title
        SanityTypeDisplayNames[sanitySchema.name] = [
          sanitySchema.title ?? "No title",
          `${sanitySchema.title ?? "No title"}s`,
        ];
        break;
    }
  });
