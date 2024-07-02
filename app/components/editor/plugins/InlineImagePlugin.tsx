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

export function InlineImageUploadForm({ top }: {
    top: number,
    left: number,
    right: number
}) {
    return <div>Form</div>
}

export default function InlineImagePlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const rootEl = activeEditor.getRootElement();
  let l = 0;

  if (rootEl) {
    const { left } = rootEl.getBoundingClientRect();
    l = left - 40;
  }

  const [top, setTop] = useState(0);

  const $updateUploadForm = useCallback(() => {
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

        setTop(top - 3);
      }
    }
  }, [editor, activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, editor) => {
        setActiveEditor(editor);
        $updateUploadForm();
        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor, $updateUploadForm]);

  useEffect(() => {}, [activeEditor]);

  return <div>InlineImagePlugin</div>;
}
