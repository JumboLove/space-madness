import { LaunchIcon, CodeIcon } from "@sanity/icons";
import type { PortableTextBlock, BlockDecoratorDefinition } from "sanity";
import { defineArrayMember, defineType, defineField } from "sanity";
import { CalloutBlock, calloutSanityDefinition } from "./blockContent/callout";
import { FigureBlock, figureSanityDefinition } from "./blockContent/figure";
import { ImageBlock, imageSanityDefinition } from "./blockContent/image";
import { CodeBlock, codeBlockSanityDefinition } from "./blockContent/codeBlock";
import { EmbedBlock, embedSanityDefinition } from "./blockContent/embed";
import {
  PartialInclude,
  partialIncludeSanityDefinition,
} from "./blockContent/partialInclude";

import {
  InternalLinkAnnotation,
  internalLinkSanityDefinition,
} from "./blockContent/internalLink";
import ExternalLinkRenderer from "./components/ExternalLinkRenderer";
import InlineCodeRenderer from "./components/InlineCodeRenderer";

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
          {
            title: "Inline Code",
            value: "code",
            icon: CodeIcon,
            component: InlineCodeRenderer,
          },
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
            icon: LaunchIcon,
            components: {
              annotation: ExternalLinkRenderer,
            },
          },
          internalLinkSanityDefinition,
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    imageSanityDefinition,
    figureSanityDefinition,
    calloutSanityDefinition,
    codeBlockSanityDefinition,
    embedSanityDefinition,
    partialIncludeSanityDefinition,
  ],
});

// @TODO Zod type, probably a lot of work here
// Zod doesn't handle recursive types very well, so
// we may need to accept this limitation

export type BlockContent =
  | PortableTextBlock
  | ImageBlock
  | FigureBlock
  | CalloutBlock
  | CodeBlock
  | EmbedBlock
  | PartialInclude;

export type Annotations = Array<InternalLinkAnnotation>;
