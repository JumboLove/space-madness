import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";
import type { BlockContent } from "../blockContent";
import type { Image } from "sanity-zod-types";

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

export interface FigureBlock extends PortableTextObject {
  _type: "figure";
  image: Image & { alt: string };
  caption: BlockContent;
}
