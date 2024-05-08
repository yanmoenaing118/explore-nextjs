import { getSelectedNode } from "@/app/utils/getSelectedNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { mergeRegister } from "@lexical/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function FloatingActionPlugin({
  anchorElem,
}: {
  anchorElem: HTMLDivElement;
}) {
  const floatingRef = useRef<HTMLDivElement>(null);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const $updateFloatingBar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const focusNode = getSelectedNode(selection);
      //   console.log(focusNode);
      const nativeSelection = window.getSelection();

      const rootElement = editor.getRootElement();

      if (
        selection !== null &&
        rootElement !== null &&
        nativeSelection !== null &&
        rootElement.contains(nativeSelection.anchorNode)
      ) {
        console.dir(nativeSelection.focusNode);
        const domRect: DOMRect | undefined =
          nativeSelection.focusNode?.parentElement?.getBoundingClientRect();
        console.log(domRect);
        if (floatingRef.current && domRect) {
          const anchorRect = anchorElem.getBoundingClientRect();
          let top = domRect.top - anchorRect.top;
          let left = domRect.left - anchorRect.left;

          console.log("anchorref", anchorRect);

          floatingRef.current.style.left = `${left}px`;
          floatingRef.current.style.top = `${top}px`;
        }
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateFloatingBar();
        });
      })
    );
  }, [editor]);

  return createPortal(
    <div ref={floatingRef} className="absolute top-0 left-0">
      <h1 className="text-lg bg-red-50">Hello</h1>
    </div>,
    anchorElem
  );
}
