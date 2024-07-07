import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical";
import { useEffect } from "react";
import { $insertNodeToNearestRoot, mergeRegister } from "@lexical/utils";
import { $createCustomDecoratorNode } from "../nodes/CustomDecoratorNode";

export const INSERT_DECORATOR_NODE = createCommand<void>();

export default function CustomDecoratorPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_DECORATOR_NODE,
        () => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return false;
          const focusNode = selection.focus.getNode();
          if (focusNode !== null) {
            const node = $createCustomDecoratorNode("pink");
            const para = $createParagraphNode();
            $insertNodeToNearestRoot(node);
            $insertNodeToNearestRoot(para);
            para.selectEnd();
          }
          console.log('insert custom decorateor node')
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor]);

  return null;
}
