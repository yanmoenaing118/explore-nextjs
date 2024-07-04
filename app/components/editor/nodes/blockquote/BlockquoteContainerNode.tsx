import { EditorConfig, ElementNode, LexicalEditor, LexicalNode } from "lexical";

type Position = "left" | "right" | "center";

export type UpdateBlockquoteContainerPayload = {
  position: Position;
};

export class BlockquoteContainerNode extends ElementNode {
  __position: Position = "center";

  static getType(): string {
    return "blockquote-container";
  }

  static clone(_data: BlockquoteContainerNode): BlockquoteContainerNode {
    return new BlockquoteContainerNode(_data.__key);
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const div = document.createElement("div");
    div.className = `blockquote-container blockquote-container_${this.__position}`;
    return div;
  }

  updateDOM(
    _prevNode: BlockquoteContainerNode,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    const position = this.__position;
    // if (position !== _prevNode.__position) {
    // }
    _dom.className = `blockquote-container blockquote-container_${position}`;

    return false;
  }

  update(payload: UpdateBlockquoteContainerPayload): void {
    const writable = this.getWritable();
    const { position } = payload;
    writable.__position = position;
  }
}

export function $createBlockquoteContainerNode() {
  return new BlockquoteContainerNode();
}

export function $isBlockquoteContainerNode(
  node: LexicalNode | null | undefined
): node is BlockquoteContainerNode {
  return node instanceof BlockquoteContainerNode;
}
