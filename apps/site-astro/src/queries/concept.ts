import { groq, useSanityClient } from "astro-sanity";
import { Concept } from "content-models";
import { z } from "zod";
import { blockContentQuery } from "./partials/blockContent";
import { tagsQuery, TagsResult } from "./partials/tags";

// Concepts are sorted by importance by default
// To use importance as the sorter:
// swap out `order(importance desc)` with `order(_createdAt desc)`
export async function getAllConceptsList() {
  const query = groq`*[_type == "concept" && isVisible == true && language == $lang] | order(importance desc) {
    title,
    slug,
    description,
    ${tagsQuery}
  }`;

  const MergedConcept = Concept.extend({
    tags: TagsResult,
  });

  const ConceptsResult = z.array(
    MergedConcept.pick({
      title: true,
      slug: true,
      description: true,
      tags: true,
    })
  );

  const data = await useSanityClient().fetch(query, {
    lang: "en",
  });

  try {
    return ConceptsResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllConceptsList, \n${error.message}`);
  }
}

export async function getAllConceptsFull() {
  const query = groq`*[_type == "concept" && isVisible == true && language == $lang] | order(importance asc) {
    title,
    slug,
    description,
    ${tagsQuery},
    ${blockContentQuery}
  }`;

  const MergedConcept = Concept.extend({
    tags: TagsResult,
  });

  const ConceptsResult = z.array(
    MergedConcept.pick({
      title: true,
      slug: true,
      description: true,
      tags: true,
      body: true,
    })
  );

  const data = await useSanityClient().fetch(query, {
    lang: "en",
  });

  try {
    return ConceptsResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getAllConceptsFull, \n${error.message}`);
  }
}

export async function getConcept(slug: string) {
  if (!slug) {
    throw new Error(`Error in getConcept: No slug provided`);
  }
  const query = groq`*[_type == "concept" && slug.current == $slug && language == $lang][0] {
    title,
    slug,
    description,
    ${tagsQuery},
    ${blockContentQuery}
  }`;

  const MergedConcept = Concept.extend({
    tags: TagsResult,
  });

  const ConceptResult = MergedConcept.pick({
    title: true,
    slug: true,
    description: true,
    tags: true,
    body: true,
  });

  const data = await useSanityClient().fetch(query, {
    lang: "en",
    slug: slug,
  });

  try {
    return ConceptResult.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing getConcept: ${slug}, \n${error.message}`);
  }
}
