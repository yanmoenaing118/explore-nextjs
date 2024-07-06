import {
  DOMConversionMap,
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  SerializedLexicalNode,
  Spread,
} from "lexical";

type Position = "left" | "right" | "center";

export type UpdateBlockquoteContainerPayload = {
  position: Position;
};

type SerializedBlockquoteContainerNode = Spread<
  {
    position: Position;
  },
  SerializedElementNode
>;

export class BlockquoteContainerNode extends ElementNode {
  __position: Position = "center";

  static getType(): string {
    return "blockquote-container";
  }

  static clone(_data: BlockquoteContainerNode): BlockquoteContainerNode {
    return new BlockquoteContainerNode(_data.__position, _data.__key);
  }

  constructor(position: Position | undefined, key?: NodeKey) {
    super(key);
    this.__position = position || "center";
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const div = document.createElement("div");
    div.className = `blockquote-container blockquote-container_${this.__position}`;
    div.setAttribute("position", this.__position);
    return div;
  }

  updateDOM(
    _prevNode: BlockquoteContainerNode,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    const position = this.__position;
    _dom.className = `blockquote-container blockquote-container_${position}`;
    return false;
  }

  update(payload: UpdateBlockquoteContainerPayload): void {
    const writable = this.getWritable();
    const { position } = payload;
    writable.__position = position;
  }

  // static importDOM(): DOMConversionMap<HTMLDivElement> | null {
  //   return {
  //     div: (node: HTMLDivElement) => {
  //       return {
  //         conversion: $blockquoteContainerNodeConversion,
  //         priority: 1,
  //       };
  //     },
  //   };
  // }

  static importJSON(
    serializedNode: SerializedBlockquoteContainerNode
  ): BlockquoteContainerNode {
    const node = $createBlockquoteContainerNode(serializedNode.position);
    return node;
  }

  exportJSON(): SerializedBlockquoteContainerNode {
    return {
      ...super.exportJSON(),
      position: this.__position,
      type: "blockquote-container",
      version: 1,
    };
  }

  
}

function $blockquoteContainerNodeConversion(domNode: HTMLDivElement) {
  const pos = domNode.getAttribute("position") as Position;
  const node = $createBlockquoteContainerNode(pos);
  return {
    node,
  };
}

export function $createBlockquoteContainerNode(position: Position | undefined) {
  return new BlockquoteContainerNode(position);
}

export function $isBlockquoteContainerNode(
  node: LexicalNode | null | undefined
): node is BlockquoteContainerNode {
  return node instanceof BlockquoteContainerNode;
}
