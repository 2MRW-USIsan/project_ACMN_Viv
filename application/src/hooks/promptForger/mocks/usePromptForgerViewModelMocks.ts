"use client";

import { NavItem } from "@/components/atoms/surface/Drawer";
import { PromptForgerViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { AppBarType, DrawerType, LabelAtomType } from "@/types/ui";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS: NavItem[] = [
  { href: "/configurations", label: "Configurations" },
  { href: "/preset-builder", label: "Preset-Builder" },
  { href: "/prompt-forger", label: "Prompt-Forger" },
  { href: "/posting-clerk", label: "Posting-Clerk" },
];

const MOCK_GROUP_OPTIONS = ["Value", "Group A", "Group B", "Group C"];

const MOCK_FORGER_ITEMS = [
  { id: "forger-01", label: "# Item 01" },
  { id: "forger-02", label: "# Item 02" },
  { id: "forger-03", label: "# Item 03" },
  { id: "forger-04", label: "# Item 04" },
  { id: "forger-05", label: "# Item 05" },
  { id: "forger-06", label: "# Item 06" },
  { id: "forger-07", label: "# Item 07" },
  { id: "forger-08", label: "# Item 08" },
];

const MOCK_SELECT_OPTIONS = ["Value", "Option A", "Option B", "Option C"];

interface PromptForgerViewModelMocksReturns {
  viewModel: PromptForgerViewModel;
}

export function usePromptForgerViewModelMocks(): PromptForgerViewModelMocksReturns {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(MOCK_GROUP_OPTIONS[0]);
  const [nameEditValue, setNameEditValue] = useState("");
  const [selectedForgerId, setSelectedForgerId] = useState<string>(
    MOCK_FORGER_ITEMS[0].id,
  );
  const [titleValue, setTitleValue] = useState("");

  // Bloc panels expanded state
  const [bloc1Expanded, setBloc1Expanded] = useState(false);
  const [bloc2Expanded, setBloc2Expanded] = useState(false);
  const [bloc3Expanded, setBloc3Expanded] = useState(false);

  // Sub-section expanded state (bloc1)
  const [bloc1OrdersExpanded, setBloc1OrdersExpanded] = useState(false);
  const [bloc1SwitchExpanded, setBloc1SwitchExpanded] = useState(false);
  const [bloc1SelectExpanded, setBloc1SelectExpanded] = useState(false);

  // Sub-section expanded state (bloc2)
  const [bloc2OrdersExpanded, setBloc2OrdersExpanded] = useState(false);
  const [bloc2SwitchExpanded, setBloc2SwitchExpanded] = useState(false);
  const [bloc2SelectExpanded, setBloc2SelectExpanded] = useState(false);

  // Summary Bloc expanded state
  const [summaryBlocExpanded, setSummaryBlocExpanded] = useState(false);
  const [tuneupExpanded, setTuneupExpanded] = useState(false);
  const [promptIdeaExpanded, setPromptIdeaExpanded] = useState(false);

  // Tune-up radio states
  const [selectedAngle, setSelectedAngle] = useState<
    "above" | "horizontal" | "below"
  >("horizontal");
  const [selectedDirection, setSelectedDirection] = useState<
    "front" | "side" | "back"
  >("side");

  // Switch states for bloc1 grp1
  const [bloc1Grp1Switches, setBloc1Grp1Switches] = useState<boolean[]>([
    true,
    false,
    true,
    false,
    true,
  ]);
  const [bloc1Grp2Switches, setBloc1Grp2Switches] = useState<boolean[]>([
    false,
    true,
    false,
    true,
    true,
  ]);

  // Switch states for bloc2 grp1
  const [bloc2Grp1Switches, setBloc2Grp1Switches] = useState<boolean[]>([
    true,
    true,
    false,
    true,
    false,
  ]);
  const [bloc2Grp2Switches, setBloc2Grp2Switches] = useState<boolean[]>([
    false,
    false,
    true,
    true,
    false,
  ]);

  // Select values
  const [bloc1Grp1SelectValues, setBloc1Grp1SelectValues] = useState<string[]>(
    Array(4).fill(MOCK_SELECT_OPTIONS[0]),
  );
  const [bloc1Grp2SelectValues, setBloc1Grp2SelectValues] = useState<string[]>(
    Array(4).fill(MOCK_SELECT_OPTIONS[0]),
  );
  const [bloc2Grp1SelectValues, setBloc2Grp1SelectValues] = useState<string[]>(
    Array(4).fill(MOCK_SELECT_OPTIONS[0]),
  );

  // Orders prompt values
  const [bloc1Grp1OrdersPrompt, setBloc1Grp1OrdersPrompt] = useState("");
  const [bloc1Grp2OrdersPrompt, setBloc1Grp2OrdersPrompt] = useState("");
  const [bloc2Grp1OrdersPrompt, setBloc2Grp1OrdersPrompt] = useState("");
  const [bloc2Grp2OrdersPrompt, setBloc2Grp2OrdersPrompt] = useState("");

  // Summary prompt
  const [summaryPromptValue, setSummaryPromptValue] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleNavigate = (href: string) => {
    router.push(href);
    setDrawerOpen(false);
  };
  const handleGroupSelect = (value: string) => setSelectedGroup(value);
  const handleNameEditBlur = (value: string) => setNameEditValue(value);
  const handleSelectForger = (id: string) => setSelectedForgerId(id);
  const handleTitleBlur = (value: string) => setTitleValue(value);
  const handleSummaryPromptBlur = (value: string) =>
    setSummaryPromptValue(value);
  const handleToggleSummaryBloc = () => setSummaryBlocExpanded((prev) => !prev);
  const handleToggleTuneup = () => setTuneupExpanded((prev) => !prev);
  const handleTogglePromptIdea = () => setPromptIdeaExpanded((prev) => !prev);
  const handleToggleBloc1 = () => setBloc1Expanded((prev) => !prev);
  const handleToggleBloc2 = () => setBloc2Expanded((prev) => !prev);
  const handleToggleBloc1Orders = () => setBloc1OrdersExpanded((prev) => !prev);
  const handleToggleBloc1Switch = () => setBloc1SwitchExpanded((prev) => !prev);
  const handleToggleBloc1Select = () => setBloc1SelectExpanded((prev) => !prev);

  const handleBloc1Grp1OrdersChange = (value: string) =>
    setBloc1Grp1OrdersPrompt(value);
  const handleBloc1Grp2OrdersChange = (value: string) =>
    setBloc1Grp2OrdersPrompt(value);

  const handleBloc1Grp1SwitchChange = (index: number, checked: boolean) => {
    setBloc1Grp1Switches((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? checked : item)),
    );
  };

  const handleBloc1Grp2SwitchChange = (index: number, checked: boolean) => {
    setBloc1Grp2Switches((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? checked : item)),
    );
  };

  const handleBloc1Grp1SelectChange = (index: number, value: string) => {
    setBloc1Grp1SelectValues((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  };

  const handleBloc1Grp2SelectChange = (index: number, value: string) => {
    setBloc1Grp2SelectValues((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  };

  const handleBloc1ShuffleAllGrp1 = () =>
    setBloc1Grp1SelectValues((prev) => [...prev].reverse());
  const handleBloc1ShuffleAllGrp2 = () =>
    setBloc1Grp2SelectValues((prev) => [...prev].reverse());

  const handleBloc1ReloadGrp1Select = (index: number) => {
    setBloc1Grp1SelectValues((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? MOCK_SELECT_OPTIONS[0] : item,
      ),
    );
  };

  const handleBloc1ReloadGrp2Select = (index: number) => {
    setBloc1Grp2SelectValues((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? MOCK_SELECT_OPTIONS[0] : item,
      ),
    );
  };

  const handleShuffleSummaryPrompt = () =>
    setSummaryPromptValue((prev) =>
      prev ? `${prev} [shuffled]` : "Generated summary prompt...",
    );
  const handleCopySummaryPrompt = () => {
    if (typeof navigator === "undefined" || !summaryPromptValue) return;
    void navigator.clipboard.writeText(summaryPromptValue);
  };

  const linksAbove = NAV_ITEMS.filter(
    (item) => item.href !== pathname && item.href === "/configurations",
  ).map((item) => ({
    label: item.label,
    onClick: () => handleNavigate(item.href),
  }));

  const linksBelow = NAV_ITEMS.filter(
    (item) => item.href !== pathname && item.href !== "/configurations",
  ).map((item) => ({
    label: item.label,
    onClick: () => handleNavigate(item.href),
  }));

  const activeItemLabel = (() => {
    const activeItem = NAV_ITEMS.find((item) => item.href === pathname);
    if (!activeItem) return undefined;
    return {
      text: `✁E${activeItem.label}`,
      variant: "subtitle1" as const,
      color: "success.main",
      fontWeight: "bold" as const,
    };
  })();

  const bloc1SwitchItemLabels = [
    "[Item Label]",
    "[Item Label]",
    "[Item Label]",
    "[Item Label]",
    "[Item Label]",
  ];
  const bloc2SwitchItemLabels = [
    "[Item Label]",
    "[Item Label]",
    "[Item Label]",
    "[Item Label]",
    "[Item Label]",
  ];
  const selectRowLabels = ["Label", "Label", "Label", "Label"];

  const angleOptions = [
    { key: "angle-above", value: "above" as const, label: "Above" },
    {
      key: "angle-horizontal",
      value: "horizontal" as const,
      label: "Horizontal",
    },
    { key: "angle-below", value: "below" as const, label: "Below" },
  ];

  const directionOptions = [
    { key: "direction-front", value: "front" as const, label: "Front" },
    { key: "direction-side", value: "side" as const, label: "Side" },
    { key: "direction-back", value: "back" as const, label: "Back" },
  ];

  const appBar: AppBarType = {
    onMenuOpen: handleMenuOpen,
  };

  const drawer: DrawerType = {
    open: drawerOpen,
    onClose: handleDrawerClose,
  };

  const title: LabelAtomType = {
    text: "ACMN",
  };

  return {
    viewModel: {
      navigationLayout: {
        appBar,
        drawer,
        title,
        navigation: {
          linksAbove,
          label: activeItemLabel,
          links: linksBelow,
          presets: {
            groupLabel: { text: "Group:", variant: "body2" },
            groupSelect: {
              value: selectedGroup,
              options: MOCK_GROUP_OPTIONS,
              onChange: handleGroupSelect,
            },
            loadButton: { label: "Load", onClick: () => {}, size: "small" },
            newButton: { label: "New", onClick: () => {}, size: "small" },
            nameLabel: { text: "Name:", variant: "body2" },
            nameField: {
              placeholder: "text field...",
              value: nameEditValue,
              onChange: handleNameEditBlur,
              size: "small",
            },
            saveButton: { label: "Save", onClick: () => {}, size: "small" },
            changeButton: { label: "change", onClick: () => {}, size: "small" },
            deleteButton: {
              label: "- Delete ? -",
              onClick: () => {},
              size: "small",
              variant: "text",
              color: "error",
            },
            presetItemPanels: MOCK_FORGER_ITEMS.map((item) => ({
              key: item.id,
              radio: {
                label: item.label,
                checked: selectedForgerId === item.id,
                onChange: () => handleSelectForger(item.id),
              },
              label: { text: item.label },
            })),
          },
        },
      },
      promptForgerBody: {
        infoSection: {
          infoSectionLabel: {
            text: "Information Field:",
            variant: "subtitle1",
          },
          idLabel: { text: "ID:", variant: "body2" },
          idValueLabel: { text: "#01 - [uuid]", variant: "body2" },
          titleLabel: { text: "Title:", variant: "body2" },
          titleField: {
            placeholder: "text field...",
            value: titleValue,
            onChange: handleTitleBlur,
            size: "small",
            fullWidth: true,
          },
          statusLabel: { text: "Status:", variant: "body2" },
          statusValueLabel: {
            text: "- there are some changes... -",
            variant: "body2",
          },
          saveButton: { label: "Save", onClick: () => {}, size: "small" },
        },
        forgersSection: {
          forgersSectionLabel: {
            text: "Forgers Field:",
            variant: "subtitle1",
          },
          blocPanels: [
            {
              key: "bloc-01",
              panelInfo: {
                label: {
                  text: "# Item 01",
                  variant: "subtitle1",
                },
                isExpanded: bloc1Expanded,
                toggle: {
                  icon: bloc1Expanded ? "expandLess" : "expandMore",
                  onClick: handleToggleBloc1,
                },
              },
              blocInfo: {
                ordersSection: {
                  key: "bloc-01-orders",
                  panelInfo: {
                    label: {
                      text: "Orders:",
                      variant: "body2",
                    },
                    isExpanded: bloc1OrdersExpanded,
                    toggle: {
                      icon: bloc1OrdersExpanded ? "expandLess" : "expandMore",
                      onClick: handleToggleBloc1Orders,
                    },
                  },
                  listInfo: {
                    grpPanels: [
                      {
                        key: "bloc-01-orders-grp-01",
                        grpLabel: { text: "Group 1:", variant: "body2" },
                        displayLines: [
                          { text: "Line 01", variant: "body2" },
                          { text: "Line 02", variant: "body2" },
                        ],
                        scriptsLabel: { text: "Scripts:", variant: "body2" },
                        promptLabel: { text: "Prompt:", variant: "body2" },
                        promptField: {
                          placeholder: "text field...",
                          value: bloc1Grp1OrdersPrompt,
                          onChange: handleBloc1Grp1OrdersChange,
                          size: "small",
                          fullWidth: true,
                        },
                        resetButton: {
                          label: "Reset",
                          onClick: () => setBloc1Grp1OrdersPrompt(""),
                          size: "small",
                        },
                        clearButton: {
                          label: "Clear",
                          onClick: () => setBloc1Grp1OrdersPrompt(""),
                          size: "small",
                        },
                      },
                      {
                        key: "bloc-01-orders-grp-02",
                        grpLabel: { text: "Group 2:", variant: "body2" },
                        displayLines: [
                          { text: "Line 01", variant: "body2" },
                          { text: "Line 02", variant: "body2" },
                        ],
                        scriptsLabel: { text: "Scripts:", variant: "body2" },
                        promptLabel: { text: "Prompt:", variant: "body2" },
                        promptField: {
                          placeholder: "text field...",
                          value: bloc1Grp2OrdersPrompt,
                          onChange: handleBloc1Grp2OrdersChange,
                          size: "small",
                          fullWidth: true,
                        },
                        resetButton: {
                          label: "Reset",
                          onClick: () => setBloc1Grp2OrdersPrompt(""),
                          size: "small",
                        },
                        clearButton: {
                          label: "Clear",
                          onClick: () => setBloc1Grp2OrdersPrompt(""),
                          size: "small",
                        },
                      },
                    ],
                  },
                },
                switchSection: {
                  key: "bloc-01-switch",
                  panelInfo: {
                    label: {
                      text: "Switch:",
                      variant: "body2",
                    },
                    isExpanded: bloc1SwitchExpanded,
                    toggle: {
                      icon: bloc1SwitchExpanded ? "expandLess" : "expandMore",
                      onClick: handleToggleBloc1Switch,
                    },
                  },
                  listInfo: {
                    grpPanels: [
                      {
                        key: "bloc-01-switch-grp-01",
                        grpLabel: { text: "Group 1:", variant: "body2" },
                        switchItems: bloc1SwitchItemLabels
                          .slice(0, 2)
                          .map((label, index) => ({
                            key: `bloc-01-switch-grp-01-item-${index + 1}`,
                            itemLabel: { text: label, variant: "body2" },
                            switchControl: {
                              checked: bloc1Grp1Switches[index],
                              onChange: (checked: boolean) =>
                                handleBloc1Grp1SwitchChange(index, checked),
                            },
                          })),
                      },
                      {
                        key: "bloc-01-switch-grp-02",
                        grpLabel: { text: "Group 2:", variant: "body2" },
                        switchItems: bloc2SwitchItemLabels
                          .slice(0, 2)
                          .map((label, index) => ({
                            key: `bloc-01-switch-grp-02-item-${index + 1}`,
                            itemLabel: { text: label, variant: "body2" },
                            switchControl: {
                              checked: bloc1Grp2Switches[index],
                              onChange: (checked: boolean) =>
                                handleBloc1Grp2SwitchChange(index, checked),
                            },
                          })),
                      },
                    ],
                  },
                },
                selectSection: {
                  key: "bloc-01-select",
                  panelInfo: {
                    label: {
                      text: "Select:",
                      variant: "body2",
                    },
                    isExpanded: bloc1SelectExpanded,
                    toggle: {
                      icon: bloc1SelectExpanded ? "expandLess" : "expandMore",
                      onClick: handleToggleBloc1Select,
                    },
                  },
                  listInfo: {
                    grpPanels: [
                      {
                        key: "bloc-01-select-grp-01",
                        grpLabel: { text: "Group 1:", variant: "body2" },
                        shuffleAllLabel: {
                          text: "Shuffle All:",
                          variant: "body2",
                        },
                        shuffleButton: {
                          label: "Shuffle",
                          onClick: handleBloc1ShuffleAllGrp1,
                          size: "small",
                        },
                        selectRows: selectRowLabels
                          .slice(0, 2)
                          .map((label, index) => ({
                            key: `bloc-01-select-grp-01-row-${index + 1}`,
                            label: { text: label, variant: "body2" },
                            select: {
                              value: bloc1Grp1SelectValues[index],
                              options: MOCK_SELECT_OPTIONS,
                              onChange: (value: string) =>
                                handleBloc1Grp1SelectChange(index, value),
                            },
                            reloadButton: {
                              label: "Reload",
                              onClick: () => handleBloc1ReloadGrp1Select(index),
                              size: "small",
                            },
                          })),
                      },
                      {
                        key: "bloc-01-select-grp-02",
                        grpLabel: { text: "Group 2:", variant: "body2" },
                        shuffleAllLabel: {
                          text: "Shuffle All:",
                          variant: "body2",
                        },
                        shuffleButton: {
                          label: "Shuffle",
                          onClick: handleBloc1ShuffleAllGrp2,
                          size: "small",
                        },
                        selectRows: selectRowLabels
                          .slice(0, 2)
                          .map((label, index) => ({
                            key: `bloc-01-select-grp-02-row-${index + 1}`,
                            label: { text: label, variant: "body2" },
                            select: {
                              value: bloc1Grp2SelectValues[index],
                              options: MOCK_SELECT_OPTIONS,
                              onChange: (value: string) =>
                                handleBloc1Grp2SelectChange(index, value),
                            },
                            reloadButton: {
                              label: "Reload",
                              onClick: () => handleBloc1ReloadGrp2Select(index),
                              size: "small",
                            },
                          })),
                      },
                    ],
                  },
                },
              },
            },
            {
              key: "bloc-02",
              panelInfo: {
                label: {
                  text: "# Item 02",
                  variant: "subtitle1",
                },
                isExpanded: bloc2Expanded,
                toggle: {
                  icon: bloc2Expanded ? "expandLess" : "expandMore",
                  onClick: handleToggleBloc2,
                },
              },
              blocInfo: {
                ordersSection: null,
                switchSection: null,
                selectSection: null,
              },
            },
          ],
          summaryBloc: {
            panelInfo: {
              label: {
                text: "Summary Bloc:",
                variant: "h6",
              },
              isExpanded: summaryBlocExpanded,
              toggle: {
                icon: summaryBlocExpanded ? "expandLess" : "expandMore",
                onClick: handleToggleSummaryBloc,
              },
            },
            summaryInfo: {
              tuneupComposition: {
                panelInfo: {
                  label: {
                    text: "Tune-up Composition:",
                    variant: "subtitle1",
                  },
                  isExpanded: tuneupExpanded,
                  toggle: {
                    icon: tuneupExpanded ? "expandLess" : "expandMore",
                    onClick: handleToggleTuneup,
                  },
                },
                tunesInfo: {
                  anglesLabel: {
                    text: "Angles:",
                    variant: "body2",
                  },
                  anglesOptions: angleOptions.map((option) => ({
                    key: option.key,
                    radio: {
                      checked: selectedAngle === option.value,
                      onChange: () => setSelectedAngle(option.value),
                    },
                    label: { text: option.label, variant: "body2" },
                  })),
                  directionsLabel: {
                    text: "Directions:",
                    variant: "body2",
                  },
                  directionsOptions: directionOptions.map((option) => ({
                    key: option.key,
                    radio: {
                      checked: selectedDirection === option.value,
                      onChange: () => setSelectedDirection(option.value),
                    },
                    label: { text: option.label, variant: "body2" },
                  })),
                },
              },
              promptIdea: {
                panelInfo: {
                  label: {
                    text: "Prompt Idea:",
                    variant: "subtitle1",
                  },
                  isExpanded: promptIdeaExpanded,
                  toggle: {
                    icon: promptIdeaExpanded ? "expandLess" : "expandMore",
                    onClick: handleTogglePromptIdea,
                  },
                },
                promptInfo: {
                  shuffleButton: {
                    label: "Shuffle",
                    onClick: handleShuffleSummaryPrompt,
                    size: "small",
                  },
                  copyButton: {
                    label: "Copy",
                    onClick: handleCopySummaryPrompt,
                    size: "small",
                    disabled: !summaryPromptValue,
                  },
                  summaryPromptLabel: {
                    text: "Summary Prompt:",
                    variant: "body2",
                  },
                  summaryPromptField: {
                    placeholder: "Text area Field...",
                    value: summaryPromptValue,
                    onChange: handleSummaryPromptBlur,
                    onBlur: handleSummaryPromptBlur,
                    rows: 14,
                    multiline: true,
                    fullWidth: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}
