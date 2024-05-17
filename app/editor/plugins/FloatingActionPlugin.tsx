import { getDOMRangeRect } from "@/app/utils/getDOMRange";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function FloatingActionPlugin({
  anchorElem,
}: {
  anchorElem: HTMLDivElement;
}) {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const floatingElem = useRef(null);

  const updateFloatingBar = useCallback(() => {
    const selection = $getSelection();
    const nativeSelection = window.getSelection();
    const rootElement = editor.getRootElement();

    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      console.log("selecting");
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);
      // console.log(rangeRect)
      if (!floatingElem.current || !anchorElem.parentElement) return;
      const popup = floatingElem.current as HTMLElement;
      const floatingElemRect = (
        floatingElem.current as HTMLElement
      ).getBoundingClientRect();
      const anchorElementRect = anchorElem.getBoundingClientRect();
      const editorScrollerRect =
        anchorElem.parentElement.getBoundingClientRect();

      console.log(anchorElem.parentElement);
      let top = rangeRect.top - anchorElementRect.top;
      let left = rangeRect.left - anchorElementRect.left;
      top += rangeRect.height;

      if (rangeRect === null || !anchorElem.parentElement) {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-10000px, -10000px)';
        return;
      }
    
      popup.style.transform = `translate(${left}px, ${top}px)`
    }
  }, [activeEditor]);

  useEffect(() => {
    // updateFloatingBar();

    editor.registerUpdateListener(({ editorState }) => {
      // console.log(' editor state');
      editorState.read(() => {
        updateFloatingBar();
        setActiveEditor(editor)
      });
    });
  }, [editor]);
  
  useEffect(() => {
    updateFloatingBar();
  }, [activeEditor])

  return createPortal(
    <div className="absolute top-0 z-20 left-0 bg-white p-2 border" ref={floatingElem}> FloatingActionPlugin</div>,
    anchorElem
  );
}
