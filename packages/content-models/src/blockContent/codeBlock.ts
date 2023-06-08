import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";

export const codeBlockSanityDefinition = defineArrayMember({
  type: "code",
  name: "codeBlock",
  title: "Code Block",
  options: {
    withFilename: true,
  },
});

export interface CodeBlock extends PortableTextObject {
  _type: "codeBlock";
  code: string;
  filename: string;
  language: string; // TODO should this be a union?
  highlightedLines: number[];
}
