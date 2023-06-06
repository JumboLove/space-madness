import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";

export const imageSanityDefinition = defineArrayMember({
  type: "image",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      validation: (Rule) => Rule.required().error("Alt text is required"),
    },
  ],
});

export interface ImageBlock extends PortableTextObject {
  _type: "image";
  alt: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
}
