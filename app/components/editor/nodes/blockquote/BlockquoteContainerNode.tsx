import { EditorConfig, ElementNode, LexicalEditor, LexicalNode } from "lexical";

export class BlockquoteContainerNode extends ElementNode {
  static getType(): string {
    return "blockquote-container";
  }

  static clone(_data: BlockquoteContainerNode): BlockquoteContainerNode {
    return new BlockquoteContainerNode(_data.__key);
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const div = document.createElement("div");
    div.className = "blockquote-container";
    return div;
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
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
