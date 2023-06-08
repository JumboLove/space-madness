import React from "react";
import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import typescript from "refractor/lang/typescript";

Refractor.registerLanguage(js);
Refractor.registerLanguage(typescript);

interface Props {
  language: string;
  code: string;
  highlightedLines: number[];
}

export function Code({ language, code, highlightedLines }: Props) {
  return (
    <Refractor language={language} value={code} markers={highlightedLines} />
  );
}
