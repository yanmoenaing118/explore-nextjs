"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

import Editor from "./Editor";

import type { EditorThemeClasses } from "lexical";
import { PageBreakNode } from "./nodes/PageBreakNode";
import { BlockquoteContentNode } from "./nodes/blockquote/BlockquoteContentNode";
import { BlockquoteTitleNode } from "./nodes/blockquote/BlockquoteTitleNode";
import { BlockquoteContainerNode } from "./nodes/blockquote/BlockquoteContainerNode";
import { editorState } from "./editorState";
import { CustomDecoratorNode } from "./nodes/CustomDecoratorNode";
import { useEffect } from "react";

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
    editorState,
    namespace: "Playground",
    nodes: [
      // HeadingNode,
      // ListItemNode,
      // ListNode,
      // HorizontalRuleNode,
      // PageBreakNode,
      // BlockquoteContentNode,
      // BlockquoteTitleNode,
      // BlockquoteContainerNode,
      // CustomDecoratorNode
    ],
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
