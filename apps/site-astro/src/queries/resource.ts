import { groq, useSanityClient } from "astro-sanity";
import { Resource } from "content-models";
import { z } from "zod";
import {
  AllParentResourcesResult,
  allParentResourcesQuery,
} from "./partials/allParentResources";
import { BacklinkResult, backlinksQuery } from "./partials/backlink";
import { TagsResult, tagsQuery } from "./partials/tag";

// Resources are sorted by importance by default
// To use creation date as the sorter:
// swap out `order(importance desc)` with `order(_createdAt desc)`
export async function getAllResourcesList(
  select = groq`*[_type == "resource" && isVisible == true]`,
) {
  const query = groq`${select} | order(importance desc) {
    title,
    slug,
    description,
    ${tagsQuery}
  }`;

  const MergedResource = Resource.extend({
    tags: TagsResult,
  });

  const ResourcesResult = z.array(
    MergedResource.pick({
      title: true,
      slug: true,
      description: true,
      tags: true,
    }),
  );

  const data = await useSanityClient().fetch(query, {});

  try {
    return ResourcesResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllResourcesList, \n${error.message}`);
  }
}

export async function getAllResourcesFull() {
  const query = groq`*[_type == "resource" && isVisible == true] | order(importance asc) {
    _type,
    title,
    slug,
    description,
    url,
    affiliateUrl,
    ${allParentResourcesQuery},
    ${tagsQuery},
    ${backlinksQuery},
  }`;

  const MergedResource = Resource.extend({
    tags: TagsResult,
    backlinks: BacklinkResult,
    parentResource: AllParentResourcesResult,
  });

  const ResourcesResult = z.array(
    MergedResource.pick({
      _type: true,
      title: true,
      slug: true,
      description: true,
      url: true,
      affiliateUrl: true,
      tags: true,
      backlinks: true,
      parentResource: true,
    }),
  );

  const data = await useSanityClient().fetch(query, {});

  try {
    return ResourcesResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllResourcesFull, \n${error.message}`);
  }
}

export async function getResource(slug: string) {
  if (!slug) {
    throw new Error(`Error in getResource: No slug provided`);
  }
  const query = groq`*[_type == "resource" && slug.current == $slug][0] {
    title,
    slug,
    description,
    mainImage,
    url,
    affiliateUrl,
    creator,
    ${tagsQuery},
    ${backlinksQuery},
  }`;

  const MergedResource = Resource.extend({
    tags: TagsResult,
    backlinks: BacklinkResult,
  });

  const ResourceResult = MergedResource.pick({
    title: true,
    slug: true,
    description: true,
    mainImage: true,
    url: true,
    affiliateUrl: true,
    creator: true,
    tags: true,
    backlinks: true,
  });

  const data = await useSanityClient().fetch(query, {
    slug: slug,
  });

  try {
    return ResourceResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getResource: ${slug}, \n${error.message}`);
  }
}
