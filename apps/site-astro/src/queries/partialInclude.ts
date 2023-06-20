import { groq, useSanityClient } from "astro-sanity";
import { Partial } from "content-models";
import { blockContentQuery } from "./partials/blockContent";

export async function getPartial(id: string) {
  if (!id) {
    throw new Error(`Error in getPartial: No id provided`);
  }
  const query = groq`*[_type == "partial" && _id == $id][0] {
    title,
    ${blockContentQuery}
  }`;

  const PartialIncludeResult = Partial.pick({
    title: true,
    body: true,
  });

  const data = await useSanityClient().fetch(query, {
    id,
  });

  try {
    return PartialIncludeResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getPartial: ${id}, \n${error.message}`);
  }
}
