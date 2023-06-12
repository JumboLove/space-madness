import { groq, useSanityClient } from "astro-sanity";
import { Tag } from "content-models";
import { z } from "zod";

export async function getAllTagsList() {
  const query = groq`*[_type == "tag" && isVisible == true] | order(importance desc) {
    title,
    slug,
    description,
  }`;

  const TagsResult = z.array(
    Tag.pick({
      title: true,
      slug: true,
      description: true,
    })
  );

  const data = await useSanityClient().fetch(query, {});

  try {
    return TagsResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllTagsList, \n${error.message}`);
  }
}
