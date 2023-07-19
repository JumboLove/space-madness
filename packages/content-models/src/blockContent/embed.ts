import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";
import { PresentationIcon } from "@sanity/icons";
import { parseEmbedUrl } from "../../../sanity-astro-embeds/src/parseEmbedUrl";

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
      validation: (Rule) =>
        Rule.required().custom((url: string) => {
          const providerData = parseEmbedUrl(url);
          return providerData ? true : "Embed URL not supported";
        }),
    },
  ],
});

export interface EmbedBlock extends PortableTextObject {
  _type: "embed";
  url: string;
}
