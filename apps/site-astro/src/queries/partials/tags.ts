import groq from "groq";
import { Tag } from "content-models";
import { z } from "zod";

export const tagsQuery = groq`
  "tags": tags[]-> {
    title,
    slug,
    description
  }
`;

const PartialTag = Tag.pick({
  title: true,
  slug: true,
  description: true,
});

export const TagsResult = z.union([z.array(PartialTag), z.null()]);
