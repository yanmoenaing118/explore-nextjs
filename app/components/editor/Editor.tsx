"use client";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";

import { useEffect, useRef, useState } from "react";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import CursorFollowPlugin from "./plugins/CursorFollowPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import PageBreakPlugin from "./plugins/PageBreakPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import {
  $createParagraphNode,
  EditorState,
  LexicalEditor,
  TextNode,
} from "lexical";
import CustomH1Plugin from "./plugins/CustomH1Plugin";
import BlockquotePlugin from "./plugins/BlockquotePlugin";
import { CustomDecoratorNode } from "./nodes/CustomDecoratorNode";
import CustomDecoratorPlugin from "./plugins/CustomDecoratorPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin/ComponentPickerPlugin";

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
  const [editor] = useLexicalComposerContext();

  const changedEditor = useRef<LexicalEditor | undefined>(undefined);
  const editorStateRef = useRef<EditorState | undefined>(undefined);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
      // console.log("floadinganchor", _floatingAnchorElem);
      // console.log(
      //   "floadinganchor rect",
      //   _floatingAnchorElem.getBoundingClientRect()
      // );
      // console.log(_floatingAnchorElem)
    }
    // console.log(_floatingAnchorElem);
  };

  // useEffect(() => {
  //   console.log('rerendering....')
  // })

  // useEffect(() => {
  //   console.log('rerendering.... editor chagen')
  // }, [editor])
  let inserted = false;

  useEffect(() => {
    const un = editor.registerUpdateListener(() => {
      editor.update(() => {
        // $insertNodes([new TextNode('hello')])
        // console.log('updated')
        // $insertNodeToNearestRoot($createParagraphNode().append(new TextNode('hello')))

      })
    });
    return un;
  }, [editor]);

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
        <ComponentPickerPlugin />

        {/** Custom Plugins */}
        {/* <CustomH1Plugin /> */}
        {/* <CustomDecoratorPlugin /> */}
        <BlockquotePlugin anchor={floatingAnchorElem} />
        <PageBreakPlugin />
        <OnChangePlugin
          onChange={(editorState: EditorState, editor: LexicalEditor) => {
            editorStateRef.current = editorState;
            changedEditor.current = editor;
          }}
        />
      </div>

      <div className="mt-6">
        {/* <button
          onClick={() => {
            if (editorStateRef.current) {
              // console.log(JSON.stringify(editorStateRef.current));
              console.log(editorStateRef.current.toJSON());
              console.log(editor === changedEditor.current);
            }
          }}
          className="p-3 rounded-lg shadow-lg"
        >
          Save
        </button> */}
      </div>
    </>
  );
}
