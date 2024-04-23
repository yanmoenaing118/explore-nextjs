import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { useCallback, useEffect, useState } from "react";
import { CiUndo, CiRedo } from "react-icons/ci";
import { RiBold, RiItalic, RiUnderline } from "react-icons/ri";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      //   console.log(selection.hasFormat("bold"))
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
        // setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      })
      //   activeEditor.registerCommand<boolean>(
      //     CAN_UNDO_COMMAND,
      //     (payload) => {
      //       setCanUndo(payload);
      //       return false;
      //     },
      //     COMMAND_PRIORITY_CRITICAL,
      //   ),
      //   activeEditor.registerCommand<boolean>(
      //     CAN_REDO_COMMAND,
      //     (payload) => {
      //       setCanRedo(payload);
      //       return false;
      //     },
      //     COMMAND_PRIORITY_CRITICAL,
      //   ),
    );
  }, [$updateToolbar, activeEditor, editor]);

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
      </div>
    </div>
  );
}
