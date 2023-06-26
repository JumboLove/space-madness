import { defineArrayMember } from "sanity";
import type { PortableTextObject } from "@sanity/types";

/**
 * List of code modes that are built in
 * @see https://github.com/sanity-io/code-input/blob/main/src/codemirror/defaultCodeModes.ts
 */
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
      { title: "Shell", value: "sh" },
      { title: "GROQ", value: "groq" },
      { title: "JSX", value: "jsx" },
      { title: "TSX", value: "tsx" },
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
  language: "javascript" | "typescript" | "html" | "css" | "sh";
  highlightedLines?: number[];
}
