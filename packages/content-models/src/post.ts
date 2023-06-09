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
      name: "importance",
      title: "Importance Score",
      type: "number",
      description: "Used to order serach results. Higher is more important",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0).max(100).precision(1),
    }),
    defineField({
      name: "isVisible",
      title: "Is Visible",
      description:
        "Hidden posts will not show on the site unless explicitly queried",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
});

export const Post = S.Document.extend({
  title: S.String,
  slug: S.Slug,
  description: S.String,
  mainImage: S.Image.optional(),
  isVisible: S.Boolean,
  importance: S.Number.min(0).max(100),
  language: S.String,
  body: z.union([z.any(), z.null()]), // Zod will not validate Portable Text
});

export type Post = z.infer<typeof Post>;
