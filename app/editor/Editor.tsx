"use client";

import { $getRoot, $getSelection, EditorThemeClasses } from "lexical";
import { useEffect, useState } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import { PollNode } from "./nodes/CustomNode";
import PollPlugin from "./plugins/PollPlugint";

const theme: EditorThemeClasses = {
  // Theme styling goes here
  text: {
    italic: "text_italic",
    underline: "text_underline",
    bold: "text_bold",
  },

  link: "link",
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [AutoLinkNode, LinkNode, PollNode],
    editorState: `{"root":{"children":[{"children":[{"type":"poll","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This os value","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"what i","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"aa","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":"noreferrer","target":null,"title":null,"url":"https://www.youtube.com"}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
  };

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
      console.log(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      <div className="relative mt-8">
        <RichTextPlugin
          contentEditable={
            <div className="editor" ref={onRef}>
              <ContentEditable className="relative z-10 outline-none" />
            </div>
          }
          placeholder={
            <div className="absolute top-0 left-0 z-0">Enter some text...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <AutoLinkPlugin />
        <LinkPlugin />
        <PollPlugin />
        {floatingAnchorElem && (
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        )}
      </div>
    </LexicalComposer>
  );
}

export default Editor;
