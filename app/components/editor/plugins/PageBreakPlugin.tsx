import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $createPageBreakNode, PageBreakNode } from "../nodes/PageBreakNode";

import { $insertNodeToNearestRoot, mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  LexicalCommand,
  createCommand,
} from "lexical";

export const INSERT_PAEG_BREAK: LexicalCommand<undefined> = createCommand();

export default function PageBreakPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNode(PageBreakNode)) {
      throw new Error(
        "PageBreakPlugin: PageBreakNode is not registered on editor"
      );
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_PAEG_BREAK,
        () => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) {
            return false;
          }
          const focusNode = selection.focus.getNode();
          if (focusNode !== null) {
            const pageBreak = $createPageBreakNode();
            $insertNodeToNearestRoot(pageBreak);
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor]);

  return null;
}
