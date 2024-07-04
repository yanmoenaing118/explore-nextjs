import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  mergeRegister,
  $insertNodeToNearestRoot,
  $findMatchingParent,
} from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_LOW,
  createCommand,
  SELECTION_CHANGE_COMMAND,
  $isRootOrShadowRoot,
  KEY_ARROW_DOWN_COMMAND,
  ElementNode,
  LexicalNode,
  $createParagraphNode,
} from "lexical";
import { $createBlockquoteTitleNode } from "../nodes/blockquote/BlockquoteTitleNode";
import { $createBlockquoteContentNode } from "../nodes/blockquote/BlockquoteContentNode";
import {
  $createBlockquoteContainerNode,
  $isBlockquoteContainerNode,
} from "../nodes/blockquote/BlockquoteContainerNode";
import { createPortal } from "react-dom";
import { ToolbarItems } from "./ToolbarPlugin";
import {
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdAlignHorizontalCenter,
} from "react-icons/md";

export const INSERT_BLOCKQUOTE = createCommand<void>();

export default function BlockquotePlugin({
  anchor,
}: {
  anchor: HTMLDivElement | null;
}) {
  console.log("anchor element", anchor);
  const [editor] = useLexicalComposerContext();

  const [isBlockquote, setIsBlockquote] = useState(false);
  const [top, setTop] = useState(0);

  const $updateBlockquoteToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element = $findMatchingParent(anchorNode, (e) => {
        const parent = e.getParent();
        return parent !== null && $isRootOrShadowRoot(parent);
      });

      if (!element) return;

      if ($isBlockquoteContainerNode(element)) {
        setIsBlockquote(true);
        const containerEl = editor.getElementByKey(
          element.getKey()
        ) as HTMLElement;
        const rect = containerEl.getBoundingClientRect();
        const anchorRect = anchor?.getBoundingClientRect() as DOMRect;

        setTop(rect.top - anchorRect.top);
      } else {
        setIsBlockquote(false);
      }
    }
  }, [editor, anchor]);

  useEffect(() => {
    const $onEscapeDown = () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) && selection.isCollapsed()) {
        const container = $findMatchingParent(
          selection.anchor.getNode(),
          $isBlockquoteContainerNode
        );

        if ($isBlockquoteContainerNode(container)) {
          const parent = container.getParent<ElementNode>();
          if (
            parent !== null &&
            parent.getLastChild<LexicalNode>() === container
          ) {
            const titleParagraph = container.getFirstDescendant<LexicalNode>();
            const contentParagraph = container.getLastDescendant<LexicalNode>();

            if (
              (contentParagraph !== null &&
                selection.anchor.key === contentParagraph.getKey() &&
                selection.anchor.offset ===
                  contentParagraph.getTextContentSize()) ||
              (titleParagraph !== null &&
                selection.anchor.key === titleParagraph.getKey() &&
                selection.anchor.offset === titleParagraph.getTextContentSize())
            ) {
              container.insertAfter($createParagraphNode());
            }
          }
        }
      }

      return false;
    };

    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload) => {
          $updateBlockquoteToolbar();
          return true;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        KEY_ARROW_DOWN_COMMAND,
        $onEscapeDown,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        INSERT_BLOCKQUOTE,
        () => {
          console.log("insert blockquote");
          const title = $createBlockquoteTitleNode();
          const content = $createBlockquoteContentNode();

          $insertNodeToNearestRoot(
            $createBlockquoteContainerNode().append(title, content)
          );

          title.selectEnd();

          return true;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, anchor]);

  if (!isBlockquote) return null;

  return createPortal(
    <div
      className="bg-white shadow-lg rounded p-2 absolute top-0 right-0"
      style={{
        top: `${top}px`,
      }}
    >
      <ToolbarItems>
        <button className="p-2 hover:bg-gray-300 rounded transition-all duration-75">
          <MdAlignHorizontalLeft />
        </button>
        <button className="p-2 hover:bg-gray-300 rounded transition-all duration-75">
          <MdAlignHorizontalCenter />
        </button>
        <button className="p-2 hover:bg-gray-300 rounded transition-all duration-75">
          <MdAlignHorizontalRight />
        </button>
      </ToolbarItems>
    </div>,
    anchor as HTMLElement
  );
}
