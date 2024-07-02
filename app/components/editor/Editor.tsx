"use client";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";

import { useState } from "react";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import CursorFollowPlugin from "./plugins/CursorFollowPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import PageBreakPlugin from "./plugins/PageBreakPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import { EditorState, LexicalEditor } from "lexical";

function Placeholder() {
  return (
    <div className="editor-placeholder absolute top-0 left-0 text-gray-500 ">
      Enter some plain text...
    </div>
  );
}

export default function Editor() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
      //   console.log(_floatingAnchorElem)
    }
  };

  return (
    <>
      <ToolbarPlugin />
      <div className="editor-container relative">
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller relative z-10">
              <div className="editor" ref={onRef}>
                <ContentEditable className="outline-none" />
              </div>
            </div>
          }
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <HorizontalRulePlugin />
        <CursorFollowPlugin />
        <AutoFocusPlugin />

        {/** Custom Plugins */}
        <PageBreakPlugin />
        <OnChangePlugin
          onChange={(editorState: EditorState, editor: LexicalEditor) => {
            editor.update(() => {
              const raw = $generateHtmlFromNodes(editor, null);
              // console.log(raw)
            });
          }}
        />
      </div>
    </>
  );
}
