import { defineField, defineType } from "sanity";
import { z } from "zod";
import * as S from "sanity-zod-types";
import { Tag } from "./tag";

export const resourceContentSanityDefinition = defineType({
  name: "resourceContent",
  title: "Resource Content",
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
      name: "resource",
      title: "Resource",
      description: "All Resource Content should belong to a parent resource",
      type: "reference",
      to: { type: "resource" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "affiliateUrl",
      title: "Affiliate URL",
      description: "Only fill this in if a generated URL cannot be created",
      type: "url",
    }),
    defineField({
      name: "importance",
      title: "Importance Score",
      type: "number",
      description: "Used to order search results. Higher is more important",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0).max(100).precision(1),
    }),
    defineField({
      name: "isVisible",
      title: "Is Visible",
      description:
        "Hidden resources will not show on the site unless explicitly queried",
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "resource.title",
    },
  },
});

export const ResourceContent = S.Document.extend({
  title: S.String,
  slug: S.Slug,
  description: S.String,
  mainImage: S.Image.nullable(),
  url: S.Url,
  affiliateUrl: S.Url.nullable(),
  importance: S.Number.min(0).max(100),
  isVisible: S.Boolean,
  tags: z.array(Tag).nullable(),
  language: S.String,
});

export type ResourceContentType = z.infer<typeof ResourceContent>;
