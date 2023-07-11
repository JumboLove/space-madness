import { BlockContentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import * as S from "sanity-zod-types";
import { z } from "zod";

export const partialSanityDefinition = defineType({
  name: "partial",
  title: "Content Parital",
  description:
    "Content that can be included in another resource's block content",
  type: "document",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});

export const Partial = S.Document.extend({
  title: S.String,
  body: z.any().nullable(), // Zod will not validate Portable Text
});

export type Partial = z.infer<typeof Partial>;
