import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  COMMAND_PRIORITY_LOW,
  createCommand,
} from "lexical";
import React, { useEffect } from "react";
import {
  $findMatchingParent,
  $insertNodeToNearestRoot,
  mergeRegister,
} from "@lexical/utils";
import { $createCustomH1Node } from "../nodes/CustomH1";

export const INSERT_CUSTOM_H1_COMMAND = createCommand<void>();

export default function CustomH1Plugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_CUSTOM_H1_COMMAND,
        () => {
          const h1 = $createCustomH1Node();
          // const para = $createParagraphNode();
          $insertNodeToNearestRoot(h1);
          h1.selectEnd()
          return true;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor]);

  return null;
}
