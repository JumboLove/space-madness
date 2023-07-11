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
    language: "typescript",
    withFilename: true,
    languageAlternatives: [
      { title: "Typescript", value: "typescript" },
      { title: "Javascript", value: "javascript" },
      { title: "TSX", value: "tsx" },
      { title: "JSX", value: "jsx" },
      { title: "Astro", value: "astro", mode: "tsx" },
      { title: "HTML", value: "html" },
      { title: "CSS", value: "css" },
      { title: "Shell", value: "sh" },
      { title: "GROQ", value: "groq" },
    ],
  },
  initialValue: {
    language: "typescript",
  },
});

export interface CodeBlock extends PortableTextObject {
  _type: "codeBlock";
  code: string;
  filename?: string;
  language:
    | "typescript"
    | "javascript"
    | "tsx"
    | "jsx"
    | "astro"
    | "html"
    | "css"
    | "sh"
    | "groq";
  highlightedLines?: number[];
}
