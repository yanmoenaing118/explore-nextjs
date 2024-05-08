/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import * as React from "react";
import { Suspense } from "react";

export type Options = ReadonlyArray<Option>;

export type Option = Readonly<{
  text: string;
  uid: string;
  votes: Array<number>;
}>;

export type SerializedPollNode = SerializedLexicalNode;

const PollComponent = () => (
  <div className="px-5 text-lg bg-gray-500 text-white rounded-md">
    Pool Component
  </div>
);

export class PollNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "poll";
  }

  static clone(node: PollNode): PollNode {
    return new PollNode(node.__key);
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  static importJSON(): PollNode {
    const node = $createPollNode();
    return node;
  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: "poll",
      version: 1,
    };
  }

  createDOM(): HTMLElement {
    const el = document.createElement("div");
    el.className = "ti";
    return el;
  }

  // updateDOM(): false {
  //   return false;
  // }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <PollComponent />
      </Suspense>
    );
  }
}

export function $createPollNode(): PollNode {
  return new PollNode();
}

export function $isPollNode(
  node: LexicalNode | null | undefined
): node is PollNode {
  return node instanceof PollNode;
}
