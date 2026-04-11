

import { NavItem } from "@/components/atoms/surface/DrawerAtom";
import { PromptForgerViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
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
      text: `✓ ${activeItem.label}`,
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

  return {
    viewModel: {
      navigationLayout: {
        appBar: {
          title: "ACMN",
          onMenuOpen: handleMenuOpen,
        },
        drawer: {
          open: drawerOpen,
          onClose: handleDrawerClose,
        },
        navigation: {
          linksAbove,
          activeItemLabel,
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
                checked: selectedForgerId === item.id,
                onChange: () => handleSelectForger(item.id),
              },
              label: { text: item.label, variant: "body2" as const },
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
          forgersSectionLabel: { text: "Forgers Field:", variant: "subtitle1" },
          blocPanels: [
            {
              key: "bloc-01",
              panelInfo: {
                titleLabel: { text: "Bloc Label:", variant: "h6" },
                isExpanded: bloc1Expanded,
                toggleButton: {
                  icon: bloc1Expanded ? "expandLess" : "expandMore",
                  onClick: () => setBloc1Expanded((v) => !v),
                },
              },
              blocInfo: {
                ordersSection: {
                  key: "bloc-01-orders",
                  panelInfo: {
                    titleLabel: { text: "Orders:", variant: "subtitle1" },
                    isExpanded: bloc1OrdersExpanded,
                    toggleButton: {
                      icon: bloc1OrdersExpanded ? "expandLess" : "expandMore",
                      onClick: () => setBloc1OrdersExpanded((v) => !v),
                    },
                  },
                  listInfo: {
                    grpPanels: [
                      {
                        key: "bloc-01-orders-grp-01",
                        grpLabel: { text: "[Grp Label]:", variant: "body2" },
                        displayLines: [
                          {
                            text: "• [Item Label]: [Random Value] [Random Prompt] [Random Prompt]  • [Item Label]: [Complex Value] [Complex Prompt]",
                            variant: "body2",
                          },
                          {
                            text: "• [Item Label]: [Color Value]",
                            variant: "body2",
                          },
                          { text: "• [Item Label]:", variant: "body2" },
                        ],
                        scriptsLabel: {
                          text: "[-----Scripts Text---------------------------------------------]",
                          variant: "body2",
                        },
                        promptLabel: { text: "Prompt:", variant: "body2" },
                        promptField: {
                          placeholder: "text field...",
                          value: bloc1Grp1OrdersPrompt,
                          onChange: setBloc1Grp1OrdersPrompt,
                          size: "small",
                          fullWidth: true,
                        },
                        resetButton: {
                          label: "Reset",
                          onClick: () => {},
                          size: "small",
                        },
                        clearButton: {
                          label: "Clear",
                          onClick: () => {},
                          size: "small",
                        },
                      },
                      {
                        key: "bloc-01-orders-grp-02",
                        grpLabel: { text: "[Grp Label]:", variant: "body2" },
                        displayLines: [
                          {
                            text: "• [Item Label]: [Random Value] [Random Prompt] [Random Prompt]  • [Item Label]: [Complex Value] [Complex Prompt]",
                            variant: "body2",
                          },
                          {
                            text: "• [Item Label]: [Color Value]",
                            variant: "body2",
                          },
                          { text: "• [Item Label]:", variant: "body2" },
                        ],
                        scriptsLabel: {
                          text: "[-----Scripts Text---------------------------------------------]",
                          variant: "body2",
                        },
                        promptLabel: { text: "Prompt:", variant: "body2" },
                        promptField: {
                          placeholder: "text field...",
                          value: bloc1Grp2OrdersPrompt,
                          onChange: setBloc1Grp2OrdersPrompt,
                          size: "small",
                          fullWidth: true,
                        },
                        resetButton: {
                          label: "Reset",
                          onClick: () => {},
                          size: "small",
                        },
                        clearButton: {
                          label: "Clear",
                          onClick: () => {},
                          size: "small",
                        },
                      },
                    ],
                  },
                },
                switchSection: {
                  key: "bloc-01-switch",
                  panelInfo: {
                    titleLabel: { text: "Switch:", variant: "subtitle1" },
                    isExpanded: bloc1SwitchExpanded,
                    toggleButton: {
                      icon: bloc1SwitchExpanded ? "expandLess" : "expandMore",
                      onClick: () => setBloc1SwitchExpanded((v) => !v),
                    },
                  },
                  listInfo: {
                    grpPanels: [
                      {
                        key: "bloc-01-switch-grp-01",
                        grpLabel: { text: "[Grp Label]:", variant: "body2" },
                        switchItems: bloc1SwitchItemLabels.map((label, i) => ({
                          key: `bloc-01-switch-grp-01-item-${i}`,
                          itemLabel: { text: `• ${label}:`, variant: "body2" },
                          switchControl: {
                            checked: bloc1Grp1Switches[i] ?? false,
                            onChange: (checked: boolean) =>
                              setBloc1Grp1Switches((prev) =>
                                prev.map((v, idx) => (idx === i ? checked : v)),
                              ),
                          },
                        })),
                      },
                      {
                        key: "bloc-01-switch-grp-02",
                        grpLabel: { text: "[Grp Label]:", variant: "body2" },
                        switchItems: bloc1SwitchItemLabels.map((label, i) => ({
                          key: `bloc-01-switch-grp-02-item-${i}`,
                          itemLabel: { text: `• ${label}:`, variant: "body2" },
                          switchControl: {
                            checked: bloc1Grp2Switches[i] ?? false,
                            onChange: (checked: boolean) =>
                              setBloc1Grp2Switches((prev) =>
                                prev.map((v, idx) => (idx === i ? checked : v)),
                              ),
                          },
                        })),
                      },
                    ],
                  },
                },
                selectSection: {
                  key: "bloc-01-select",
                  panelInfo: {
                    titleLabel: { text: "Select:", variant: "subtitle1" },
                    isExpanded: bloc1SelectExpanded,
                    toggleButton: {
                      icon: bloc1SelectExpanded ? "expandLess" : "expandMore",
                      onClick: () => setBloc1SelectExpanded((v) => !v),
                    },
                  },
                  listInfo: {
                    grpPanels: [
                      {
                        key: "bloc-01-select-grp-01",
                        grpLabel: { text: "[Grp Label]:", variant: "body2" },
                        shuffleAllLabel: {
                          text: "Shuffle All:",
                          variant: "body2",
                        },
                        shuffleButton: {
                          label: "Shuffle",
                          onClick: () => {},
                          size: "small",
                        },
                        selectRows: selectRowLabels.map((label, i) => ({
                          key: `bloc-01-select-grp-01-row-${i}`,
                          label: { text: `${label}:`, variant: "body2" },
                          select: {
                            value:
                              bloc1Grp1SelectValues[i] ??
                              MOCK_SELECT_OPTIONS[0],
                            options: MOCK_SELECT_OPTIONS,
                            onChange: (value: string) =>
                              setBloc1Grp1SelectValues((prev) =>
                                prev.map((v, idx) => (idx === i ? value : v)),
                              ),
                            fullWidth: true,
                          },
                          reloadButton: {
                            label: "Reload",
                            onClick: () => {},
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
                titleLabel: { text: "Bloc Label:", variant: "h6" },
                isExpanded: bloc2Expanded,
                toggleButton: {
                  icon: bloc2Expanded ? "expandLess" : "expandMore",
                  onClick: () => setBloc2Expanded((v) => !v),
                },
              },
              blocInfo: {
                ordersSection: {
                  key: "bloc-02-orders",
                  panelInfo: {
                    titleLabel: { text: "Orders:", variant: "subtitle1" },
                    isExpanded: bloc2OrdersExpanded,
                    toggleButton: {
                      icon: bloc2OrdersExpanded ? "expandLess" : "expandMore",
                      onClick: () => setBloc2OrdersExpanded((v) => !v),
                    },
                  },
                  listInfo: {
                    grpPanels: [
                      {
                        key: "bloc-02-orders-grp-01",
                        grpLabel: { text: "[Grp Label]:", variant: "body2" },
                        displayLines: [
                          {
                            text: "• [Item Label]: [Random Value] [Random Prompt] [Random Prompt]  • [Item Label]: [Complex Value] [Complex Prompt]",
                            variant: "body2",
                          },
                          {
                            text: "• [Item Label]: [Color Value]",
                            variant: "body2",
                          },
                          { text: "• [Item Label]:", variant: "body2" },
                        ],
                        scriptsLabel: {
                          text: "[-----Scripts Text---------------------------------------------]",
                          variant: "body2",
                        },
                        promptLabel: { text: "Prompt:", variant: "body2" },
                        promptField: {
                          placeholder: "text field...",
                          value: bloc2Grp1OrdersPrompt,
                          onChange: setBloc2Grp1OrdersPrompt,
                          size: "small",
                          fullWidth: true,
                        },
                        resetButton: {
                          label: "Reset",
                          onClick: () => {},
                          size: "small",
                        },
                        clearButton: {
                          label: "Clear",
                          onClick: () => {},
                          size: "small",
                        },
                      },
                      {
                        key: "bloc-02-orders-grp-02",
                        grpLabel: { text: "[Grp Label]:", variant: "body2" },
                        displayLines: [
                          {
                            text: "• [Item Label]: [Random Value] [Random Prompt] [Random Prompt]  • [Item Label]: [Complex Value] [Complex Prompt]",
                            variant: "body2",
                          },
                          {
                            text: "• [Item Label]: [Color Value]",
                            variant: "body2",
                          },
                          { text: "• [Item Label]:", variant: "body2" },
                        ],
                        scriptsLabel: {
                          text: "[-----Scripts Text---------------------------------------------]",
                          variant: "body2",
                        },
                        promptLabel: { text: "Prompt:", variant: "body2" },
                        promptField: {
                          placeholder: "text field...",
                          value: bloc2Grp2OrdersPrompt,
                          onChange: setBloc2Grp2OrdersPrompt,
                          size: "small",
                          fullWidth: true,
                        },
                        resetButton: {
                          label: "Reset",
                          onClick: () => {},
                          size: "small",
                        },
                        clearButton: {
                          label: "Clear",
                          onClick: () => {},
                          size: "small",
                        },
                      },
                    ],
                  },
                },
                switchSection: {
                  key: "bloc-02-switch",
                  panelInfo: {
                    titleLabel: { text: "Switch:", variant: "subtitle1" },
                    isExpanded: bloc2SwitchExpanded,
                    toggleButton: {
                      icon: bloc2SwitchExpanded ? "expandLess" : "expandMore",
                      onClick: () => setBloc2SwitchExpanded((v) => !v),
                    },
                  },
                  listInfo: {
                    grpPanels: [
                      {
                        key: "bloc-02-switch-grp-01",
                        grpLabel: { text: "[Grp Label]:", variant: "body2" },
                        switchItems: bloc2SwitchItemLabels.map((label, i) => ({
                          key: `bloc-02-switch-grp-01-item-${i}`,
                          itemLabel: { text: `• ${label}:`, variant: "body2" },
                          switchControl: {
                            checked: bloc2Grp1Switches[i] ?? false,
                            onChange: (checked: boolean) =>
                              setBloc2Grp1Switches((prev) =>
                                prev.map((v, idx) => (idx === i ? checked : v)),
                              ),
                          },
                        })),
                      },
                      {
                        key: "bloc-02-switch-grp-02",
                        grpLabel: { text: "[Grp Label]:", variant: "body2" },
                        switchItems: bloc2SwitchItemLabels.map((label, i) => ({
                          key: `bloc-02-switch-grp-02-item-${i}`,
                          itemLabel: { text: `• ${label}:`, variant: "body2" },
                          switchControl: {
                            checked: bloc2Grp2Switches[i] ?? false,
                            onChange: (checked: boolean) =>
                              setBloc2Grp2Switches((prev) =>
                                prev.map((v, idx) => (idx === i ? checked : v)),
                              ),
                          },
                        })),
                      },
                    ],
                  },
                },
                selectSection: {
                  key: "bloc-02-select",
                  panelInfo: {
                    titleLabel: { text: "Select:", variant: "subtitle1" },
                    isExpanded: bloc2SelectExpanded,
                    toggleButton: {
                      icon: bloc2SelectExpanded ? "expandLess" : "expandMore",
                      onClick: () => setBloc2SelectExpanded((v) => !v),
                    },
                  },
                  listInfo: {
                    grpPanels: [
                      {
                        key: "bloc-02-select-grp-01",
                        grpLabel: { text: "[Grp Label]:", variant: "body2" },
                        shuffleAllLabel: {
                          text: "Shuffle All:",
                          variant: "body2",
                        },
                        shuffleButton: {
                          label: "Shuffle",
                          onClick: () => {},
                          size: "small",
                        },
                        selectRows: selectRowLabels.map((label, i) => ({
                          key: `bloc-02-select-grp-01-row-${i}`,
                          label: { text: `${label}:`, variant: "body2" },
                          select: {
                            value:
                              bloc2Grp1SelectValues[i] ??
                              MOCK_SELECT_OPTIONS[0],
                            options: MOCK_SELECT_OPTIONS,
                            onChange: (value: string) =>
                              setBloc2Grp1SelectValues((prev) =>
                                prev.map((v, idx) => (idx === i ? value : v)),
                              ),
                            fullWidth: true,
                          },
                          reloadButton: {
                            label: "Reload",
                            onClick: () => {},
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
              key: "bloc-03",
              panelInfo: {
                titleLabel: { text: "Bloc Label:", variant: "h6" },
                isExpanded: bloc3Expanded,
                toggleButton: {
                  icon: bloc3Expanded ? "expandLess" : "expandMore",
                  onClick: () => setBloc3Expanded((v) => !v),
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
              titleLabel: { text: "Summary Bloc:", variant: "h6" },
              isExpanded: summaryBlocExpanded,
              toggleButton: {
                icon: summaryBlocExpanded ? "expandLess" : "expandMore",
                onClick: () => setSummaryBlocExpanded((v) => !v),
              },
            },
            summaryInfo: {
              tuneupComposition: {
                panelInfo: {
                  titleLabel: {
                    text: "Tune-up Composition:",
                    variant: "subtitle1",
                  },
                  isExpanded: tuneupExpanded,
                  toggleButton: {
                    icon: tuneupExpanded ? "expandLess" : "expandMore",
                    onClick: () => setTuneupExpanded((v) => !v),
                  },
                },
                tunesInfo: {
                  anglesLabel: { text: "Angles:", variant: "body2" },
                  anglesOptions: [
                    {
                      key: "angle-above",
                      radio: {
                        checked: selectedAngle === "above",
                        onChange: () => setSelectedAngle("above"),
                      },
                      label: {
                        text: "Above",
                        variant: "body2",
                        color:
                          selectedAngle === "above"
                            ? "success.main"
                            : undefined,
                      },
                    },
                    {
                      key: "angle-horizontal",
                      radio: {
                        checked: selectedAngle === "horizontal",
                        onChange: () => setSelectedAngle("horizontal"),
                      },
                      label: {
                        text: "Horizontal",
                        variant: "body2",
                        color:
                          selectedAngle === "horizontal"
                            ? "success.main"
                            : undefined,
                      },
                    },
                    {
                      key: "angle-below",
                      radio: {
                        checked: selectedAngle === "below",
                        onChange: () => setSelectedAngle("below"),
                      },
                      label: {
                        text: "Below",
                        variant: "body2",
                        color:
                          selectedAngle === "below"
                            ? "success.main"
                            : undefined,
                      },
                    },
                  ],
                  directionsLabel: { text: "Directions:", variant: "body2" },
                  directionsOptions: [
                    {
                      key: "direction-front",
                      radio: {
                        checked: selectedDirection === "front",
                        onChange: () => setSelectedDirection("front"),
                      },
                      label: {
                        text: "Front",
                        variant: "body2",
                        color:
                          selectedDirection === "front"
                            ? "success.main"
                            : undefined,
                      },
                    },
                    {
                      key: "direction-side",
                      radio: {
                        checked: selectedDirection === "side",
                        onChange: () => setSelectedDirection("side"),
                      },
                      label: {
                        text: "Side",
                        variant: "body2",
                        color:
                          selectedDirection === "side"
                            ? "success.main"
                            : undefined,
                      },
                    },
                    {
                      key: "direction-back",
                      radio: {
                        checked: selectedDirection === "back",
                        onChange: () => setSelectedDirection("back"),
                      },
                      label: {
                        text: "Back",
                        variant: "body2",
                        color:
                          selectedDirection === "back"
                            ? "success.main"
                            : undefined,
                      },
                    },
                  ],
                },
              },
              promptIdea: {
                panelInfo: {
                  titleLabel: { text: "Prompt Idea:", variant: "subtitle1" },
                  isExpanded: promptIdeaExpanded,
                  toggleButton: {
                    icon: promptIdeaExpanded ? "expandLess" : "expandMore",
                    onClick: () => setPromptIdeaExpanded((v) => !v),
                  },
                },
                promptInfo: {
                  shuffleButton: {
                    label: "Shuffle",
                    onClick: () => {},
                    size: "small",
                  },
                  copyButton: {
                    label: "Copy",
                    onClick: () => {},
                    size: "small",
                  },
                  summaryPromptLabel: {
                    text: "Summary Prompt:",
                    variant: "body2",
                  },
                  summaryPromptField: {
                    placeholder: "Text area Field...",
                    value: summaryPromptValue,
                    onChange: handleSummaryPromptBlur,
                    multiline: true,
                    rows: 14,
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
