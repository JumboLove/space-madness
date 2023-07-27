import type { SanityLinkableType } from "content-models";

// This funciton should be kept in sync with the
// Astro/pages directory and the "SanityLinkableType" union
// in packages/content-models/src/index.ts

export function getUrlForSanityType(type: SanityLinkableType, slug: string) {
  switch (type) {
    case "post":
      return `/blog/${slug}`;
    case "concept":
      return `/concepts/${slug}`;
    case "tag":
      return `/tags/${slug}`;
    case "resource":
      return `/resources/${slug}`;
    default:
      throw new Error(`URL cannot be created for type: ${type}, slug: ${slug}`);
  }
}
