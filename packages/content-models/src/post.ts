import { defineField, defineType } from "sanity";
import { z } from "zod";

export const postSanityDefinition = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
  ],
});

export const Post = z.object({
  title: z.string(),
  slug: z.object({
    _type: z.literal("slug"), // TODO Sanity type
    current: z.string(),
  }),
  description: z.string(),
  mainImage: z.any(), // TODO define image structure
  publishedAt: z.string().datetime(),
  body: z.array(z.any()), // TODO
});

export type PostType = z.infer<typeof Post>;
