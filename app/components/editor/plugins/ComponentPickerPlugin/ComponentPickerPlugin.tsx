import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useMemo, useState } from "react";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  TextNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { createPortal } from "react-dom";
class ComponentPickerOption extends MenuOption {
  // What shows up in the editor
  title: string;
  // Icon for display
  icon?: JSX.Element;
  // For extra searching.
  keywords: Array<string>;
  // TBD
  keyboardShortcut?: string;
  // What happens when you select this option?
  onSelect: (queryString: string) => void;

  constructor(
    title: string,
    options: {
      icon?: JSX.Element;
      keywords?: Array<string>;
      keyboardShortcut?: string;
      onSelect: (queryString: string) => void;
    }
  ) {
    super(title);
    this.title = title;
    this.keywords = options.keywords || [];
    this.icon = options.icon;
    this.keyboardShortcut = options.keyboardShortcut;
    this.onSelect = options.onSelect.bind(this);
  }
}

function ComponentPickerMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: ComponentPickerOption;
}) {
  let className = "item";
  if (isSelected) {
    className += " selected";
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={"typeahead-item-" + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {option.icon}
      <span className="text">{option.title}</span>
    </li>
  );
}

function getDynamicOptions(editor: LexicalEditor, queryString: string) {
  const options: Array<ComponentPickerOption> = [];

  if (queryString == null) {
    return options;
  }

  // const tableMatch = queryString.match(/^([1-9]\d?)(?:x([1-9]\d?)?)?$/);

  // if (tableMatch !== null) {
  //   const rows = tableMatch[1];
  //   const colOptions = tableMatch[2]
  //     ? [tableMatch[2]]
  //     : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(String);

  //   options.push(
  //     ...colOptions.map(
  //       (columns) =>
  //         new ComponentPickerOption(`${rows}x${columns} Table`, {
  //           icon: <i className="icon table" />,
  //           keywords: ['table'],
  //           onSelect: () =>
  //             editor.dispatchCommand(INSERT_TABLE_COMMAND, {columns, rows}),
  //         }),
  //     ),
  //   );
  // }

  return options;
}

function getBaseOptions(editor: LexicalEditor, showModal: any) {
  return [
    new ComponentPickerOption("Paragraph", {
      icon: <div>Hello fuck</div>,
      keywords: ["normal", "paragraph", "p", "text"],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createParagraphNode());
          }
        }),
    }),
  ];
}

export default function ComponentPickerPlugin() {
  const [editor] = useLexicalComposerContext();

  const [queryString, setQueryString] = useState<string | null>(null);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  });

  const options = useMemo(() => {
    const baseOptions = getBaseOptions(editor, true);

    if (!queryString) {
      return baseOptions;
    }

    const regex = new RegExp(queryString, "i");

    return [
      ...getDynamicOptions(editor, queryString),
      ...baseOptions.filter(
        (option) =>
          regex.test(option.title) ||
          option.keywords.some((keyword) => regex.test(keyword))
      ),
    ];
  }, [editor, queryString]);

  const onSelectOption = useCallback(
    (
      selectedOption: ComponentPickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string
    ) => {
      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor]
  );

  return (
    <LexicalTypeaheadMenuPlugin<ComponentPickerOption>
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
      ) =>
        anchorElementRef.current && options.length
          ? createPortal(
              <div className="typeahead-popover component-picker-menu">
                <ul>
                  {options.map((option, i: number) => (
                    <ComponentPickerMenuItem
                      index={i}
                      isSelected={selectedIndex === i}
                      onClick={() => {
                        setHighlightedIndex(i);
                        selectOptionAndCleanUp(option);
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(i);
                      }}
                      key={option.key}
                      option={option}
                    />
                  ))}
                </ul>
              </div>,
              anchorElementRef.current
            )
          : null
      }
    />
  );
}
