import { groq, useSanityClient } from "astro-sanity";
import { Post } from "content-models";
import { z } from "zod";

export async function getAllPostsList() {
  const query = groq`*[_type == "post" && language == $lang] | order(_createdAt asc) {
    title,
    slug,
    description,
  }`;

  const PostsResult = z.array(
    Post.pick({
      title: true,
      slug: true,
      description: true,
    })
  );

  const data = await useSanityClient().fetch(query, {
    lang: "en",
  });

  try {
    return PostsResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllPostsList, \n${error.message}`);
  }
}
