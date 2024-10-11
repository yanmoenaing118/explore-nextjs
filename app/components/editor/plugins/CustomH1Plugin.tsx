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


export const INSERT_CUSTOM_H1_COMMAND = createCommand<void>();

export default function CustomH1Plugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_CUSTOM_H1_COMMAND,
        () => {


          return true;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor]);

  return null;
}
