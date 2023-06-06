import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";

export const calloutSanityDefinition = defineArrayMember({
  title: "Callout",
  name: "callout",
  type: "object",
  fields: [
    {
      name: "type",
      type: "string",
      title: "Type",
      initialValue: "success",
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
      name: "text",
      title: "Text",
      type: "text", // TODO do I want text here or blockContent, something else?
      validation: (Rule) => Rule.required().error("Text body is required"),
    },
  ],
  preview: {
    select: {
      type: "type",
      text: "text",
    },
    prepare(selection) {
      const { type, text } = selection;

      function capitalizeString(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      const truncatedSubtitle =
        text.length > 80 ? `${text.substr(0, 77)}...` : text;

      return {
        title: `${capitalizeString(type)} callout`,
        subtitle: truncatedSubtitle,
      };
    },
  },
});

export interface CalloutBlock extends PortableTextObject {
  _type: "callout";
  type: "success" | "info" | "warning" | "danger";
  text: string;
}
