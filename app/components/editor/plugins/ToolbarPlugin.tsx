import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";

import {
  HeadingTagType,
  $createHeadingNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import { $setBlocksType, $patchStyleText } from "@lexical/selection";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";

import { useCallback, useEffect, useState } from "react";
import {
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai";
import { IoColorPaletteOutline, IoImage } from "react-icons/io5";
import classNames from "classnames";
import { VscHorizontalRule } from "react-icons/vsc";
import { INSERT_PAEG_BREAK } from "./PageBreakPlugin";
import { InlineImageUploadForm } from "./InlineImagePlugin";
import { INSERT_CUSTOM_H1_COMMAND } from "./CustomH1Plugin";
import { INSERT_BLOCKQUOTE } from "./BlockquotePlugin";
import { TbPageBreak } from "react-icons/tb";
import { IconsManifest } from "react-icons";
import { MdBook } from "react-icons/md";
import { INSERT_DECORATOR_NODE } from "./CustomDecoratorPlugin";

const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

const blockTypeHeading = { h1: "Heading 1", h2: "Heading 2", h3: "Heading 3" };
const activeClassName = "bg-gray-400 text-white";
const btnClassName = "p-1 rounded-sm cursor-pointer";
function Divider() {
  return <div className="h-[15px] w-[1px] bg-gray-400 mx-2"></div>;
}
export function ToolbarItems({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3">{children}</div>;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const [activeEditor, setActiveEditor] = useState(editor);

  const [showInlineImageUploadForm, setShowInlineImageUploadForm] = useState();

  const rootEl = activeEditor.getRootElement();
  let l = 0;
  let t = 0;

  if (rootEl) {
    const { left, top } = rootEl.getBoundingClientRect();
    l = left - 40;
    t = top;
  }

  const [blockType, setBlockType] = useState<
    keyof typeof blockTypeToBlockName | undefined
  >();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        // just safty check
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(
        elementKey
      ) as HTMLElement; // this is HTML DOM element under active cursor
      //   elementDOM.style.background = "red"

      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      if (elementDOM != null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type as keyof typeof blockTypeToBlockName);
        }
      }
    }
  }, [editor, activeEditor]);
  const applyStyleText = useCallback(
    (styles: Record<string, string>, skipHistoryStack?: boolean) => {
      activeEditor.update(
        () => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        skipHistoryStack ? { tag: "historic" } : {}
      );
    },
    [activeEditor]
  );

  const onFontColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ color: value }, skipHistoryStack);
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ "background-color": value }, skipHistoryStack);
    },
    [applyStyleText]
  );

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if (blockType && blockType in blockTypeHeading) {
        if (headingSize === blockType) {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      } else {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      activeEditor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      activeEditor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);

  return (
    <>
      <div className="relative shadow-md rounded-md px-2 flex items-center py-4 gap-4 mb-4">
        <ToolbarItems>
          <button
            className={classNames(
              blockType === "h1" && activeClassName,
              btnClassName
            )}
            onClick={() => formatHeading("h1")}
          >
            H1
          </button>
          {/* <button
            className={classNames(
              blockType === "h2" && activeClassName,
              btnClassName
            )}
            onClick={() => formatHeading("h2")}
          >
            H2
          </button>
          <button
            className={classNames(
              blockType === "h3" && activeClassName,
              btnClassName
            )}
            onClick={() => formatHeading("h3")}
          >
            H3
          </button> */}
        </ToolbarItems>
        <Divider />
        <ToolbarItems>
          <button
            className={classNames(btnClassName, isBold ? activeClassName : "")}
            onClick={() =>
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
            }
          >
            <AiOutlineBold />
          </button>
          <button
            className={classNames(
              btnClassName,
              isItalic ? activeClassName : ""
            )}
            onClick={() =>
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }
          >
            <AiOutlineItalic />
          </button>
          <button
            className={classNames(
              btnClassName,
              isUnderline ? activeClassName : ""
            )}
            onClick={() =>
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }
          >
            <AiOutlineUnderline />
          </button>
        </ToolbarItems>
        <Divider />
        {/* <ToolbarItems>
          <button
            className={classNames(
              btnClassName,
              blockType === "number" ? activeClassName : ""
            )}
            onClick={formatNumberedList}
          >
            <AiOutlineOrderedList />
          </button>
          <button
            className={classNames(
              btnClassName,
              blockType === "bullet" ? activeClassName : ""
            )}
            onClick={formatBulletList}
          >
            <AiOutlineUnorderedList />
          </button>
        </ToolbarItems> */}
        <Divider />

        <ToolbarItems>
          <button>
            <label htmlFor="color">A</label>
            <input
              hidden
              type="color"
              name="color"
              id="color"
              onChange={(e) => onFontColorSelect(e.target.value, false)}
            />
          </button>
        </ToolbarItems>
        <ToolbarItems>
          <button>
            <label htmlFor="bg-color">
              <IoColorPaletteOutline />
            </label>
            <input
              type="color"
              hidden
              name="bg-color"
              id="bg-color"
              onChange={(e) => onBgColorSelect(e.target.value, false)}
            />
          </button>
        </ToolbarItems>
        <Divider />
        <ToolbarItems>
          <button
            onClick={() =>
              // activeEditor.dispatchCommand(
              //   INSERT_HORIZONTAL_RULE_COMMAND,
              //   undefined
              // )
              activeEditor.dispatchCommand(INSERT_PAEG_BREAK, undefined)
            }
          >
            <VscHorizontalRule />
          </button>
        </ToolbarItems>
        <ToolbarItems>
          <button
            onClick={() =>
              activeEditor.dispatchCommand(INSERT_BLOCKQUOTE, undefined)
            }
          >
            <IoImage />
          </button>
          <button
            onClick={() => {
              activeEditor.dispatchCommand(
                INSERT_HORIZONTAL_RULE_COMMAND,
                undefined
              );
            }}
          >
            <TbPageBreak />
          </button>
          <button
            onClick={() => {
              activeEditor.dispatchCommand(INSERT_DECORATOR_NODE, undefined);
            }}
          >
            <MdBook />
          </button>
        </ToolbarItems>
      </div>
      {/* {showInlineImageUploadForm && <InlineImageUploadForm
      
      />} */}
    </>
  );
}
