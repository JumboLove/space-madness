import { defineType, defineArrayMember } from "sanity";
import type { BlockSchemaType } from "@sanity/types";
/**
 * This is the schema definition for the rich text fields used for
 * for all document 'body' content. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'body',
 *    title: 'Body',
 *    type: 'blockContent'
 *  }
 */

export const blockContentSanityDefinition = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
          // PopupContentType type should be kept in sync with this config
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [
                  { type: "post" }, // TODO can I set this up to automatically register types?
                ],
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
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
    }),
    defineArrayMember({
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
              validation: (Rule) =>
                Rule.required().error("Alt text is required"),
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
    }),
    defineArrayMember({
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
    }),
  ],
});

// @TODO Zod type, probably a lot of work here
// Zodify block content?
