import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";

export const codeBlockSanityDefinition = defineArrayMember({
  type: "code",
  name: "codeBlock",
  title: "Code Block",
  options: {
    language: "javascript",
    withFilename: true,
    languageAlternatives: [
      { title: "Javascript", value: "javascript" },
      { title: "Typescript", value: "typescript" },
      { title: "HTML", value: "html" },
      { title: "CSS", value: "css" },
    ],
  },
  initialValue: {
    language: "javascript",
  },
});

export interface CodeBlock extends PortableTextObject {
  _type: "codeBlock";
  code: string;
  filename?: string;
  language: "javascript" | "typescript" | "html" | "css";
  highlightedLines?: number[];
}
