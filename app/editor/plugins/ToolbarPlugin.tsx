import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  FORMAT_TEXT_COMMAND,
  KEY_MODIFIER_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";

import { Dispatch, useCallback, useEffect, useState } from "react";
import { CiUndo, CiRedo } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa";
// import { CiUndo, CiRedo } from "react-icons/c";
import { RiBold, RiItalic, RiUnderline, RiLink } from "react-icons/ri";
import { getSelectedNode } from "@/app/utils/getSelectedNode";
import { sanitizeUrl } from "@/app/utils/sanitizeUrl";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { LuPlus } from "react-icons/lu";
import { INSERT_POLL_COMMAND } from "./PollPlugint";

// import { FaArrowDown } from '@heroicons/react/20/solid'

export default function ToolbarPlugin({
  setIsLinkEditMode,
}: {
  setIsLinkEditMode: Dispatch<boolean>;
}) {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const [isLink, setIsLink] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        // setIsEdiTOGGLE_LINK_COMMANDtable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          // console.log(editorState.toJSON())
          $updateToolbar();
        });
      })
    );
  }, [$updateToolbar, activeEditor, editor]);

  const insertLink = useCallback(() => {
    if (!isLink) {
      setIsLinkEditMode(true);
      activeEditor.dispatchCommand(
        TOGGLE_LINK_COMMAND,
        sanitizeUrl("https://")
      );
    } else {
      setIsLinkEditMode(false);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, activeEditor, isLink, setIsLinkEditMode]);

  return (
    <div className="flex gap-3 shadow-md px-2 py-3">
      <div className="flex gap-2 border-r border-r-gray-300 px-4">
        <button
          onClick={() => activeEditor.dispatchCommand(UNDO_COMMAND, undefined)}
        >
          <CiUndo />
        </button>
        <button
          onClick={() => activeEditor.dispatchCommand(REDO_COMMAND, undefined)}
        >
          <CiRedo />
        </button>
      </div>

      <div className="flex gap-4 border-r border-r-gray-300 px-4">
        <button
          className={isBold ? "active" : ""}
          onClick={() =>
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
          }
        >
          <RiBold />
        </button>
        <button
          className={isItalic ? "active" : ""}
          onClick={() =>
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
          }
        >
          <RiItalic />
        </button>
        <button
          className={isUnderline ? "active" : ""}
          onClick={() =>
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          }
        >
          <RiUnderline />
        </button>
        <button className={isLink ? "active" : ""} onClick={insertLink}>
          <RiLink />
        </button>
      </div>

      <div className="flex gap-4 border-r border-r-gray-300 px-4">
        <button
          className="flex gap-2 items-center border p-1 rounded text-sm"
          onClick={() => activeEditor.dispatchCommand(INSERT_POLL_COMMAND, "")}
        >
          <LuPlus />
          Insert Image
        </button>
      </div>
    </div>
  );
}
