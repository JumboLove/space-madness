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

export const TagsResult = z.array(PartialTag).nullable();

export type TagsResult = z.infer<typeof TagsResult>;
