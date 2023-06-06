import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";

export const figureSanityDefinition = defineArrayMember({
  title: "Figure",
  name: "figure",
  type: "object",
  fields: [
    {
      title: "Image",
      name: "image",
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
    },
    {
      title: "Caption",
      name: "caption",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
  },
});

// TODO caption is a blockText, need to figure out
export interface FigureBlock extends PortableTextObject {
  _type: "image";
  alt: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
}
