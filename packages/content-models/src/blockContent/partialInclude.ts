import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";
import { BlockContentIcon } from "@sanity/icons";
import { type Rule } from "sanity";
import { Reference } from "sanity-zod-types";

export const partialIncludeSanityDefinition = defineArrayMember({
  title: "Content Partial",
  name: "partialInclude",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    {
      name: "content",
      type: "reference",
      title: "Reference",
      to: [{ type: "partial" }],
      validation: (Rule: Rule) => Rule.required().error("Content is required"),
    },
  ],
  preview: {
    select: {
      title: "content.title",
    },
  },
});

export interface PartialInclude extends PortableTextObject {
  _type: "partialInclude";
  content: Reference;
}
