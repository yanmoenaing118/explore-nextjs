import {
  DecoratorNode,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";

const NODE_TYPE = "custom-decorator-node";

type SerializedCustomDecoratorNode = Spread<
  {
    color: string;
  },
  SerializedLexicalNode
>;

const CustomDecoratorComponentClassName =
  "text-lg font-bold p-2 border rounded shadow-sm";
const CustomDecoratorComponent = ({ bgColor }: { bgColor: string }) => {
  return (
    <div
      className={CustomDecoratorComponentClassName}
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
    return new CustomDecoratorNode(_node.__color,_node.__key);
  }

  constructor(color?: string, key?: NodeKey) {
    super(key);
    this.__color = color || "black";
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const el = document.createElement("section");
    // console.log(this.__color)
    // console.log("createDOM - color ", this.__color, this.__key);
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

    /** html structure of CustomDecoratorComponent */
    const comp = document.createElement("div");
    comp.className = CustomDecoratorComponentClassName;
    comp.style.backgroundColor = this.__color || "what";
    comp.textContent = 'custom decorator node'
    element.appendChild(comp);
    
    return {
      element,
    };
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return <CustomDecoratorComponent key={this.__key} bgColor={this.__color} />;
  }
}

export function $createCustomDecoratorNode(color?: string) {
  return new CustomDecoratorNode(color);
}
