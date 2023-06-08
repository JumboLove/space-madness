import React, { ReactNode } from "react";

interface InlineCodeRendererProps {
  children: ReactNode;
}

const InlineCodeRenderer = (props: InlineCodeRendererProps) => (
  <span
    style={{
      fontFamily:
        "ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace",
      borderRadius: "1px",
      backgroundColor: "var(--card-code-bg-color)",
      color: "var(--card-code-fg-color)",
      padding: "2px 3px",
    }}
  >
    {props.children}
  </span>
);

export default InlineCodeRenderer;
