// This funciton should be kept in sync with the
// Astro/pages directory

export function getUrlForSanityType(type: string, slug: string) {
  switch (type) {
    case "post":
      return `/blog/${slug}`;
    default:
      throw new Error(`URL cannot be created for type: ${type}`);
  }
}
