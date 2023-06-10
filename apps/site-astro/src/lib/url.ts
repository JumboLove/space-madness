// This funciton should be kept in sync with the
// Astro/pages directory

type SanityTypes = "post" | "concept" | "tag";

export function getUrlForSanityType(type: SanityTypes, slug: string) {
  switch (type) {
    case "post":
      return `/blog/${slug}`;
    case "concept":
      return `/concepts/${slug}`;
    case "tag":
      return `/tags/${slug}`;
    default:
      throw new Error(`URL cannot be created for type: ${type}`);
  }
}
