import { defineField, defineType } from "sanity";
import { z } from "zod";
import * as S from "sanity-zod-types";

export const postSanityDefinition = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
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
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "isVisible",
      title: "Is Visible",
      description:
        "Hidden posts will not show on the site unless explicitly queried",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

export const Post = S.Document.extend({
  title: S.String,
  slug: S.Slug,
  description: S.String,
  mainImage: S.Image.optional(),
  language: S.String,
  isVisible: S.Boolean,
  body: z.union([z.any(), z.null()]), // Zod will not validate Portable Text
});

export type Post = z.infer<typeof Post>;
