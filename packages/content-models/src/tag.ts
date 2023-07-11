import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import * as S from "sanity-zod-types";
import { z } from "zod";

export const tagSanityDefinition = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: TagIcon,
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
      name: "importance",
      title: "Importance Score",
      type: "number",
      description: "Used to order tags in a list. Higher is more important",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0).max(100).precision(1),
    }),
    defineField({
      name: "isVisible",
      title: "Is Visible",
      description:
        "Hidden tags will not show on the site unless explicitly queried",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

export const Tag = S.Document.extend({
  title: S.String,
  slug: S.Slug,
  description: S.String,
  importance: S.Number.min(0).max(100),
  isVisible: S.Boolean,
});

export type Tag = z.infer<typeof Tag>;
