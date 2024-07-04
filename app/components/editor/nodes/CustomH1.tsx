import {
  DecoratorNode,
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
} from "lexical";

export class CustomH1Node extends ElementNode {
  static getType(): string {
    return "custom-h1";
  }

  static clone(_data: CustomH1Node): CustomH1Node {
    return new CustomH1Node(_data.__key);
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const dom = document.createElement("blockquote");
    dom.className = "font-bold text-2xl pl-[60px] custom-h1";
    return dom;
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }


}

export function $createCustomH1Node() {
  return new CustomH1Node();
}

export function $isCustomH1Node(
  node: LexicalNode | null | undefined
): node is CustomH1Node {
  return node instanceof CustomH1Node;
}
