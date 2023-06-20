import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";
import { PresentationIcon } from "@sanity/icons";

export const embedSanityDefinition = defineArrayMember({
  name: "embed",
  type: "object",
  title: "Embed",
  icon: PresentationIcon,
  fields: [
    {
      name: "url",
      type: "string",
      title: "Embed URL",
      description: "Twitter, YouTube, and Vimeo are supported",
      validation: (Rule) => Rule.required().error("URL is required"),
    },
  ],
});

export interface EmbedBlock extends PortableTextObject {
  _type: "embed";
  url: string;
}
