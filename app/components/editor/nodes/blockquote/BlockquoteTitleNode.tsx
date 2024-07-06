import {
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  SerializedElementNode,
  SerializedLexicalNode,
} from "lexical";

export class BlockquoteTitleNode extends ElementNode {
  static getType(): string {
    return "blockquote-title";
  }

  static clone(_node: BlockquoteTitleNode): BlockquoteTitleNode {
    return new BlockquoteTitleNode(_node.__key);
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const el = document.createElement("blockquote");
    el.className = "blockquote-title";
    return el;
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }

  static importJSON(_serializedNode: SerializedLexicalNode): BlockquoteTitleNode {
   return $createBlockquoteTitleNode();
  }

  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: "blockquote-title",
      version: 1,
    };
  }
}

export function $createBlockquoteTitleNode() {
  return new BlockquoteTitleNode();
}
