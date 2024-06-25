"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import { $findMatchingParent } from "@lexical/utils";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { CiCirclePlus } from "react-icons/ci";

export default function CursorFollowPlugin() {
  const [hydrated, setHydrated] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [show, setShow] = useState(false);
  const rootEl = activeEditor.getRootElement();
  let l = 0;

  if (rootEl) {
    const { left } = rootEl.getBoundingClientRect();
    l = left - 40;
  }

  const [top, setTop] = useState(0);

  const $updateCursor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();

      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        // just safty check
        element = anchorNode.getTopLevelElementOrThrow();
      }
      const elementDOM = activeEditor.getElementByKey(element.getKey());
      if (elementDOM) {
        const { top } = elementDOM.getBoundingClientRect();
        const context = elementDOM.textContent;
        if (!context) {
          setShow(true);
        } else {
          setShow(false);
        }
        setTop(top - 3);
      }
    }
  }, [editor, activeEditor]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, editor) => {
        setActiveEditor(editor);
        $updateCursor();
        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor, $updateCursor]);
  return (
    hydrated &&
    createPortal(
      <button
        className={classNames(
          "fixed  w-[30px] h-[30px] rounded-full flex items-center transition-transform duration-300 origin-center justify-center hover:rotate-45"
        )}
        style={{
          left: `${l}px`,
          top: `${top}px`,
          display: show ? "block" : "none",
        }}
      >
        <CiCirclePlus size={32} />
      </button>,
      document.body
    )
  );
}
