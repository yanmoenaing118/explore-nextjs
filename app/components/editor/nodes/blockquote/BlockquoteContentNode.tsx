import { EditorConfig, ElementNode, LexicalEditor, LexicalNode } from "lexical";

export class BlockquoteContentNode extends ElementNode {
  static getType(): string {
    return "blockquote-content";
  }

  static clone(_node: BlockquoteContentNode): BlockquoteContentNode {
    return new BlockquoteContentNode(_node.__key);
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const el = document.createElement("p");
    el.className = "blockquote-content";
    return el;
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }
}

export function $createBlockquoteContentNode() {
  return new BlockquoteContentNode();
}
