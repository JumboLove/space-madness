import { defineField, defineType } from "sanity";
import { z } from "zod";
import * as S from "sanity-zod-types";
import { Tag } from "./tag";

export const conceptSanityDefinition = defineType({
  name: "concept",
  title: "Concept",
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
        "Hidden concepts will not show on the site unless explicitly queried",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Tags help make resources easier to find by search",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
});

export const Concept = S.Document.extend({
  title: S.String,
  slug: S.Slug,
  description: S.String,
  mainImage: S.Image.optional(),
  body: z.union([z.any(), z.null()]), // Zod will not validate Portable Text
  importance: S.Number.min(0).max(100),
  isVisible: S.Boolean,
  tags: z.union([z.array(Tag), z.null()]),
  language: S.String,
});

export type Concept = z.infer<typeof Concept>;
