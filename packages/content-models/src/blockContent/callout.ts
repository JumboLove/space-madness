import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";
import type { BlockContent } from "../blockContent";

export const calloutSanityDefinition = defineArrayMember({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    {
      name: "type",
      type: "string",
      title: "Type",
      initialValue: "info",
      options: {
        list: [
          { title: "Sucess", value: "success" },
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Danger", value: "danger" },
        ],
        layout: "radio",
      },
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required().error("Body is required"),
    },
  ],
  preview: {
    select: {
      type: "type",
      body: "body",
    },
    prepare(selection) {
      const { type, body } = selection;

      function capitalizeString(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      const block = (body || []).find(
        (block: PortableTextObject) => block._type === "block"
      );
      const subtitle = block
        ? block.children
            .filter((child: PortableTextObject) => child._type === "span")
            .map((span: PortableTextObject) => span.text)
            .join("")
        : "No callout content";

      return {
        title: `${capitalizeString(type)} callout`,
        subtitle: subtitle,
      };
    },
  },
});

export interface CalloutBlock extends PortableTextObject {
  _type: "callout";
  type: "success" | "info" | "warning" | "danger";
  body: BlockContent;
}
