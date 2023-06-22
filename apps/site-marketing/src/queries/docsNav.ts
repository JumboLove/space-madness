import { groq, useSanityClient } from "astro-sanity";
import { z } from "zod";
import * as S from "sanity-zod-types";

export async function getDocsNavItems() {
  const query = groq`{
    "posts": *[_type == "post" && isVisible == true && language == $lang] | order(importance desc) { title, slug, description },
    "concepts": *[_type == "concept" && isVisible == true] | order(importance desc) {title, slug, description},
    "resources": *[_type == "resource" && isVisible == true] | order(importance desc) {title, slug, description }
  }`;

  const LinkResource = z.object({
    title: S.String,
    slug: S.Slug,
    description: S.String,
  });

  const QueryResult = z.object({
    posts: z.array(LinkResource),
    concepts: z.array(LinkResource),
    resources: z.array(LinkResource),
  });

  const data = await useSanityClient().fetch(query, {
    lang: "en",
  });

  try {
    return QueryResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getDocsNavItems, \n${error.message}`);
  }
}
