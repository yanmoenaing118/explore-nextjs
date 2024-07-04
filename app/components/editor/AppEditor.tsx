"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

import Editor from "./Editor";

import type { EditorThemeClasses } from "lexical";
import { PageBreakNode } from "./nodes/PageBreakNode";
import { CustomH1Node } from "./nodes/CustomH1";

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
    editorState: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"1","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"2","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"3","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"fa","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}
`,
    namespace: "Playground",
    nodes: [HeadingNode, ListItemNode, ListNode, HorizontalRuleNode, PageBreakNode, CustomH1Node],
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
