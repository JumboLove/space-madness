import { groq, useSanityClient } from "astro-sanity";
import { Post } from "content-models";
import { z } from "zod";
import { blockContentQuery } from "./partials/blockContent";

export async function getAllPostsList() {
  const query = groq`*[_type == "post" && isVisible == true && language == $lang] | order(_createdAt asc) {
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

export async function getAllPostsFull() {
  const query = groq`*[_type == "post" && isVisible == true && language == $lang] | order(_createdAt asc) {
    title,
    slug,
    description,
    ${blockContentQuery}
  }`;

  const PostsResult = z.array(
    Post.pick({
      title: true,
      slug: true,
      description: true,
      body: true,
    })
  );

  const data = await useSanityClient().fetch(query, {
    lang: "en",
  });

  try {
    return PostsResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllPostsFull, \n${error.message}`);
  }
}

export async function getPost(slug: string) {
  if (!slug) {
    throw new Error(`Error in getPost: No slug provided`);
  }
  const query = groq`*[_type == "post" && slug.current == $slug && language == $lang][0] {
    title,
    slug,
    description,
    ${blockContentQuery}
  }`;

  const PostResult = Post.pick({
    title: true,
    slug: true,
    description: true,
    body: true,
  });

  const data = await useSanityClient().fetch(query, {
    lang: "en",
    slug: slug,
  });

  try {
    return PostResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getPost: ${slug}, \n${error.message}`);
  }
}
