"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

import Editor from "./Editor";

import type { EditorThemeClasses } from "lexical";

const theme: EditorThemeClasses = {
  heading: {
    h1: "text-3xl font-black",
    h2: "text-2xl font-black",
    h3: "text-lg font-black",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
  list: {
    ul: "list-disc pl-[16px]",
    ol: "list-decimal pl-[16px]",
  },
};

export default function AppEditor() {
  const initialConfig = {
    editorState: null,
    namespace: "Playground",
    nodes: [HeadingNode, ListItemNode, ListNode, HorizontalRuleNode],
    onError: (error: Error) => {
      throw error;
    },
    theme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Editor />
    </LexicalComposer>
  );
}
