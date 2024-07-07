import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  DOMExportOutput,
  EditorConfig,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { useCallback, useEffect } from "react";
import classNames from "classnames";

const NODE_TYPE = "custom-decorator-node";

type SerializedCustomDecoratorNode = Spread<
  {
    color: string;
  },
  SerializedLexicalNode
>;

let CustomDecoratorComponentClassName =
  "text-lg font-bold p-3 border rounded shadow-sm";
const CustomDecoratorComponent = ({
  bgColor,
  nodeKey,
}: {
  bgColor: string;
  nodeKey: NodeKey;
}) => {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  const $onDelete = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      if (isSelected && $isNodeSelection($getSelection())) {
        const node = $getNodeByKey(nodeKey);
        console.log($isCustomDecoratorNode(node));
        if ($isCustomDecoratorNode(node)) {
          node.remove();
          return true;
        }
      }
      return false;
    },
    [isSelected, nodeKey]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (event: MouseEvent) => {
          const el = editor.getElementByKey(nodeKey);

          if (el == event.target) {
            if(!event.shiftKey) {
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
  }, [isSelected, setSelected, clearSelection]);

  useEffect(() => {
    const el = editor.getElementByKey(nodeKey);
    if (el) {
      el.className = isSelected
        ? `${el.className} border border-blue-400`
        : CustomDecoratorComponentClassName;
    }
  }, [isSelected, nodeKey]);

  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
    >
      custom decorator node
    </div>
  );
};

export class CustomDecoratorNode extends DecoratorNode<JSX.Element> {
  __color: string;

  static getType(): string {
    return NODE_TYPE;
  }

  static clone(_node: CustomDecoratorNode): CustomDecoratorNode {
    return new CustomDecoratorNode(_node.__color, _node.__key);
  }

  constructor(color?: string, key?: NodeKey) {
    super(key);
    this.__color = color || "black";
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const el = document.createElement("section");
    el.className = CustomDecoratorComponentClassName;
    el.style.backgroundColor = this.__color || "white";
    return el;
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }

  // export/import for JSON
  /** START: JSON */
  exportJSON(): SerializedCustomDecoratorNode {
    return {
      color: this.__color,
      type: NODE_TYPE,
      version: 1,
    };
  }

  static importJSON(_data: SerializedCustomDecoratorNode): CustomDecoratorNode {
    const color = _data.color;
    return $createCustomDecoratorNode(color);
  }
  /** END: JSON */
  // -----------------------------------

  /** START: DOM */
  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const element = document.createElement("section");
    element.className = CustomDecoratorComponentClassName;
    element.style.backgroundColor = this.__color || "what";

    /** html structure of CustomDecoratorComponent */
    const comp = document.createElement("div");
    comp.textContent = "custom decorator node";
    element.appendChild(comp);

    return {
      element,
    };
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return (
      <CustomDecoratorComponent
        key={this.__key}
        nodeKey={this.__key}
        bgColor={this.__color}
      />
    );
  }
}

export function $createCustomDecoratorNode(color?: string) {
  return new CustomDecoratorNode(color);
}

export function $isCustomDecoratorNode(
  node: LexicalNode | null | undefined
): node is CustomDecoratorNode {
  return node instanceof CustomDecoratorNode;
}
