import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedEditor,
  SerializedLexicalNode,
  Spread,
} from "lexical";

import { $applyNodeReplacement, createEditor, DecoratorNode } from "lexical";
import { Suspense } from "react";
import InlineImageComponent from "./InlineImageComponent";

export type Position = "left" | "right" | "full" | undefined;

export interface InlineImagePayload {
  altText: string;
  caption?: LexicalEditor;
  height?: number;
  key?: NodeKey;
  showCaption?: boolean;
  src: string;
  width?: number;
  position?: Position;
}

export class InlineImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: "inherit" | number;
  __height: "inherit" | number;
  __position: Position;

  static getType(): string {
    return "inline-image";
  }

  static clone(node: InlineImageNode): InlineImageNode {
    return new InlineImageNode(
      node.__src,
      node.__altText,
      node.__position,
      node.__width,
      node.__height,
      node.__key
    );
  }

  constructor(
    src: string,
    altText: string,
    position: Position,
    width?: "inherit" | number,
    height?: "inherit" | number,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__position = position;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
  }

  // view
  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const span = document.createElement("span");
    const className = `${_config.theme.inlineImage} position-${this.__position}`;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(
    _prevNode: InlineImageNode,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    const position = this.__position;
    if (position !== _prevNode.__position) {
      const className = `${_config.theme.inlineImage} position-${position}`;
      if (className !== undefined) {
        _dom.className = className;
      }
    }
    return false;
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return (
      <Suspense fallback={null}>
        <InlineImageComponent
          src={this.__src}
          altText={this.__altText}
          position={this.__position}
          width={this.__width}
          height={this.__height}
        />
      </Suspense>
    );
  }
}
