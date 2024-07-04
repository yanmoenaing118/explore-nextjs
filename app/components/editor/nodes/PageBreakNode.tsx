import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  EditorConfig,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
} from "lexical";
import { useCallback, useEffect } from "react";

function PageBreakComponent({ nodeKey }: { nodeKey: NodeKey }) {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  const $onDelete = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      if (isSelected && $isNodeSelection($getSelection())) {
        const node = $getNodeByKey(nodeKey);
        if ($isPageBreakNode(node)) {
          node.remove();
          return true;
        }
      }
      return false;
    },
    [isSelected, nodeKey]
  );

  // const $onDelete = useCallback(
  //   (payload: KeyboardEvent) => {
  //     if (isSelected && $isNodeSelection($getSelection())) {
  //       const event: KeyboardEvent = payload;
  //       event.preventDefault();
  //       const node = $getNodeByKey(nodeKey);
  //       if ($isInlineImageNode(node)) {
  //         node.remove();
  //         return true;
  //       }
  //     }
  //     return false;
  //   },
  //   [isSelected, nodeKey],
  // );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (event: MouseEvent) => {
          const pbElem = editor.getElementByKey(nodeKey);

          if (event.target === pbElem) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        $onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        $onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
  }, [clearSelection, editor, isSelected, nodeKey, $onDelete, setSelected]);

  useEffect(() => {
    const pbElem = editor.getElementByKey(nodeKey);
    if (pbElem !== null) {
      isSelected
        ? pbElem.classList.add("selected")
        : pbElem.classList.remove("selected");
    }
  }, [editor, isSelected, nodeKey]);
  return null;
}

export class PageBreakNode extends DecoratorNode<JSX.Element> {
  static clone(node: PageBreakNode): PageBreakNode {
    return new PageBreakNode(node.__key);
  }

  static getType(): string {
    return "page-break";
  }

  /** START: JSON
   *
   * without this method we cannot serialize this node to a JSON format to be saved in a permanent storage such db or localstorage
   *
   */
  exportJSON(): SerializedLexicalNode {
    return {
      type: this.getType(),
      version: 1,
    };
  }

  /**
   * without this method we cannot initialize editorState with json exported from exportJSON()
   */
  static importJSON(_serializedNode: SerializedLexicalNode): PageBreakNode {
    return $createPageBreakNode();
  }

  /** END: JSON  */

  /** START: DOM */
  // static importDOM(): DOMConversionMap | null {
  //   return {
  //     figure: (node: HTMLElement) => {
  //       const type = node.getAttribute("type");
  //       if (type !== this.getType()) {
  //         return null;
  //       }

  //       return {
  //         conversion: $convertPageBreakElement,
  //         priority: COMMAND_PRIORITY_HIGH,
  //       };
  //     },
  //   };
  // }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const el = document.createElement("figure");
    el.style.pageBreakAfter = "always";
    el.className = "h-[4px] border  border-gray-200";
    el.setAttribute("type", this.getType());
    return el;
  }

  getTextContent(): string {
    return "\n";
  }

  isInline(): false {
    return false;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): JSX.Element {
    return <PageBreakComponent nodeKey={this.__key} />;
  }
}

function $convertPageBreakElement(): DOMConversionOutput {
  return {
    node: $createPageBreakNode(),
  };
}

export function $createPageBreakNode() {
  return new PageBreakNode();
}

export function $isPageBreakNode(
  node: LexicalNode | null | undefined
): node is PageBreakNode {
  return node instanceof PageBreakNode;
}
