"use client";

import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { useState } from "react";
import { SelectItem, SubPanelItem, SubPanelType } from "@/types/subPanel";

const ROUTE_LIST = [
  { label: "Configurations", href: "/configurations" },
  { label: "Posting Clerk", href: "/posting-clerk" },
  { label: "Preset Builder", href: "/preset-builder" },
  { label: "Prompt Forger", href: "/prompt-forger" },
  { label: "Sample", href: "/sample" },
];

interface PanelItem {
  id: string;
  panelKey: string;
  panelLabel: string;
  expanded: boolean;
  subPanels: Partial<Record<SubPanelType, SubPanelItem[]>>;
}

function createId(prefix: string) {
  const randomId = Math.random().toString(36).substring(2, 11);
  return `${prefix}-${randomId}`;
}

function createSelectItem(): SelectItem {
  const id = createId("select-item");
  return {
    id,
    panelKey: id,
    panelLabel: "Select Item",
    expanded: true,
    label: "",
    prompt: "",
  };
}

function createSubPanelItem(type: SubPanelType): SubPanelItem {
  const id = createId(`${type}-group`);
  return {
    id,
    panelKey: id,
    panelLabel: `${type} group`,
    expanded: true,
    ordersText: "",
    switchText: "",
    selectItems: type === "select" ? [createSelectItem()] : [],
  };
}

function createPanelItem(): PanelItem {
  const id = createId("panel");
  return {
    id,
    panelKey: id,
    panelLabel: "YAML Panel",
    expanded: true,
    subPanels: {},
  };
}

export function useConfigurationsMock() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [panels, setPanels] = useState<PanelItem[]>(() => [createPanelItem()]);
  const [shuffleStates, setShuffleStates] = useState<Record<string, boolean>>(
    {},
  );
  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const updatePanel = (
    panelId: string,
    updater: (panel: PanelItem) => PanelItem,
  ) => {
    setPanels((prev) =>
      prev.map((panel) => (panel.id === panelId ? updater(panel) : panel)),
    );
  };

  const updateSubPanel = (
    panelId: string,
    subType: SubPanelType,
    subPanelId: string,
    updater: (subPanel: SubPanelItem) => SubPanelItem,
  ) => {
    updatePanel(panelId, (panel) => ({
      ...panel,
      subPanels: {
        ...panel.subPanels,
        [subType]: (panel.subPanels[subType] ?? []).map((subPanel) =>
          subPanel.id === subPanelId ? updater(subPanel) : subPanel,
        ),
      },
    }));
  };

  const updateSelectItem = (
    panelId: string,
    subPanelId: string,
    itemId: string,
    updater: (item: SelectItem) => SelectItem,
  ) => {
    updateSubPanel(panelId, "select", subPanelId, (subPanel) => ({
      ...subPanel,
      selectItems: subPanel.selectItems.map((item) =>
        item.id === itemId ? updater(item) : item,
      ),
    }));
  };

  const handlePanelAdd = () => {
    setPanels((prev) => [...prev, createPanelItem()]);
  };

  const handlePanelToggle = (panelId: string) => {
    updatePanel(panelId, (panel) => ({ ...panel, expanded: !panel.expanded }));
  };

  const handlePanelKeyChange = (panelId: string, value: string) => {
    updatePanel(panelId, (panel) => ({ ...panel, panelKey: value }));
  };

  const handlePanelLabelChange = (panelId: string, value: string) => {
    updatePanel(panelId, (panel) => ({ ...panel, panelLabel: value }));
  };

  const handlePanelDelete = (panelId: string) => {
    setPanels((prev) => prev.filter((panel) => panel.id !== panelId));
  };

  const handleSubPanelToggleEnabled = (
    panelId: string,
    subType: SubPanelType,
  ) => {
    updatePanel(panelId, (panel) => {
      const nextSubPanels = { ...panel.subPanels };
      if (nextSubPanels[subType]) {
        delete nextSubPanels[subType];
      } else {
        nextSubPanels[subType] = [createSubPanelItem(subType)];
      }
      return { ...panel, subPanels: nextSubPanels };
    });
  };

  const handleSubPanelToggleExpanded = (
    panelId: string,
    subType: SubPanelType,
    subPanelId: string,
  ) => {
    updateSubPanel(panelId, subType, subPanelId, (subPanel) => ({
      ...subPanel,
      expanded: !subPanel.expanded,
    }));
  };

  const handleSubPanelKeyChange = (
    panelId: string,
    subType: SubPanelType,
    subPanelId: string,
    value: string,
  ) => {
    updateSubPanel(panelId, subType, subPanelId, (subPanel) => ({
      ...subPanel,
      panelKey: value,
    }));
  };

  const handleSubPanelLabelChange = (
    panelId: string,
    subType: SubPanelType,
    subPanelId: string,
    value: string,
  ) => {
    updateSubPanel(panelId, subType, subPanelId, (subPanel) => ({
      ...subPanel,
      panelLabel: value,
    }));
  };

  const handleSubPanelContentChange = (
    panelId: string,
    subType: SubPanelType,
    subPanelId: string,
    value: string,
  ) => {
    updateSubPanel(panelId, subType, subPanelId, (subPanel) => ({
      ...subPanel,
      ...(subType === "orders" ? { ordersText: value } : {}),
      ...(subType === "switch" ? { switchText: value } : {}),
    }));
  };

  const handleSubPanelDelete = (
    panelId: string,
    subType: SubPanelType,
    subPanelId: string,
  ) => {
    updatePanel(panelId, (panel) => ({
      ...panel,
      subPanels: {
        ...panel.subPanels,
        [subType]: (panel.subPanels[subType] ?? []).filter(
          (subPanel) => subPanel.id !== subPanelId,
        ),
      },
    }));
  };

  const handleSubPanelAdd = (panelId: string, subType: SubPanelType) => {
    updatePanel(panelId, (panel) => ({
      ...panel,
      subPanels: {
        ...panel.subPanels,
        [subType]: [
          ...(panel.subPanels[subType] ?? []),
          createSubPanelItem(subType),
        ],
      },
    }));
  };

  const handleSelectItemAdd = (panelId: string, subPanelId: string) => {
    updateSubPanel(panelId, "select", subPanelId, (subPanel) => ({
      ...subPanel,
      selectItems: [...subPanel.selectItems, createSelectItem()],
    }));
  };

  const handleSelectItemDelete = (
    panelId: string,
    subPanelId: string,
    itemId: string,
  ) => {
    updateSubPanel(panelId, "select", subPanelId, (subPanel) => ({
      ...subPanel,
      selectItems: subPanel.selectItems.filter((item) => item.id !== itemId),
    }));
  };

  const handleSelectItemToggle = (
    panelId: string,
    subPanelId: string,
    itemId: string,
  ) => {
    updateSelectItem(panelId, subPanelId, itemId, (item) => ({
      ...item,
      expanded: !item.expanded,
    }));
  };

  const handleSelectItemKeyChange = (
    panelId: string,
    subPanelId: string,
    itemId: string,
    value: string,
  ) => {
    updateSelectItem(panelId, subPanelId, itemId, (item) => ({
      ...item,
      panelKey: value,
    }));
  };

  const handleSelectItemPanelLabelChange = (
    panelId: string,
    subPanelId: string,
    itemId: string,
    value: string,
  ) => {
    updateSelectItem(panelId, subPanelId, itemId, (item) => ({
      ...item,
      panelLabel: value,
    }));
  };

  const handleSelectItemLabelChange = (
    panelId: string,
    subPanelId: string,
    itemId: string,
    value: string,
  ) => {
    updateSelectItem(panelId, subPanelId, itemId, (item) => ({
      ...item,
      label: value,
    }));
  };

  const handleSelectItemPromptChange = (
    panelId: string,
    subPanelId: string,
    itemId: string,
    value: string,
  ) => {
    updateSelectItem(panelId, subPanelId, itemId, (item) => ({
      ...item,
      prompt: value,
    }));
  };

  const viewModel: ConfigurationsViewModel = {
    appPage: {
      todoTitle: "Configurations",
      todoDrawerOpen: drawerOpen,
      todoDrawerOnToggle: handleDrawerToggle,
      todoRouteList: ROUTE_LIST,
    },
    yamlPanelList: {
      panelListProps: {
        headingText: "YAML Panels:",
        todoOnPanelAdd: handlePanelAdd,
        hasItems: panels.length > 0,
      },
      todoPanelList: panels.map((panel) => {
        const ordersSubPanels = panel.subPanels.orders ?? [];
        const switchSubPanels = panel.subPanels.switch ?? [];
        const selectSubPanels = panel.subPanels.select ?? [];

        return {
          id: panel.id,
          panelItemProps: {
            id: panel.id,
            itemLabel: "Panel:",
            panelKey: panel.panelKey,
            panelLabel: panel.panelLabel,
            expanded: panel.expanded,
            onToggle: handlePanelToggle,
            onKeyChange: handlePanelKeyChange,
            onLabelChange: handlePanelLabelChange,
            onDelete: handlePanelDelete,
          },
          itemProps: {
            chipProps: {
              orders: {
                label: "orders",
                selected: panel.subPanels.orders !== undefined,
                onClick: () => handleSubPanelToggleEnabled(panel.id, "orders"),
              },
              switch: {
                label: "switch",
                selected: panel.subPanels.switch !== undefined,
                onClick: () => handleSubPanelToggleEnabled(panel.id, "switch"),
              },
              select: {
                label: "select",
                selected: panel.subPanels.select !== undefined,
                onClick: () => handleSubPanelToggleEnabled(panel.id, "select"),
              },
            },
            ordersProps: {
              panelId: panel.id,
              subPanelList: ordersSubPanels,
              onToggleExpanded: (panelId: string, subPanelId: string) =>
                handleSubPanelToggleExpanded(panelId, "orders", subPanelId),
              onKeyChange: (
                panelId: string,
                subPanelId: string,
                value: string,
              ) =>
                handleSubPanelKeyChange(panelId, "orders", subPanelId, value),
              onLabelChange: (
                panelId: string,
                subPanelId: string,
                value: string,
              ) =>
                handleSubPanelLabelChange(panelId, "orders", subPanelId, value),
              onContentChange: (
                panelId: string,
                subPanelId: string,
                value: string,
              ) =>
                handleSubPanelContentChange(
                  panelId,
                  "orders",
                  subPanelId,
                  value,
                ),
              onDelete: (panelId: string, subPanelId: string) =>
                handleSubPanelDelete(panelId, "orders", subPanelId),
              onAdd: (panelId: string) => handleSubPanelAdd(panelId, "orders"),
            },
            switchProps: {
              panelId: panel.id,
              subPanelList: switchSubPanels,
              onToggleExpanded: (panelId: string, subPanelId: string) =>
                handleSubPanelToggleExpanded(panelId, "switch", subPanelId),
              onKeyChange: (
                panelId: string,
                subPanelId: string,
                value: string,
              ) =>
                handleSubPanelKeyChange(panelId, "switch", subPanelId, value),
              onLabelChange: (
                panelId: string,
                subPanelId: string,
                value: string,
              ) =>
                handleSubPanelLabelChange(panelId, "switch", subPanelId, value),
              onContentChange: (
                panelId: string,
                subPanelId: string,
                value: string,
              ) =>
                handleSubPanelContentChange(
                  panelId,
                  "switch",
                  subPanelId,
                  value,
                ),
              onDelete: (panelId: string, subPanelId: string) =>
                handleSubPanelDelete(panelId, "switch", subPanelId),
              onAdd: (panelId: string) => handleSubPanelAdd(panelId, "switch"),
            },
            selectProps: {
              panelListProps: {
                headingText: "Select Groups:",
                todoOnPanelAdd: () => handleSubPanelAdd(panel.id, "select"),
                hasItems: selectSubPanels.length > 0,
              },
              subPanelList: selectSubPanels.map((subPanel) => ({
                id: subPanel.id,
                panelItemProps: {
                  id: subPanel.id,
                  itemLabel: "Group:",
                  panelKey: subPanel.panelKey,
                  panelLabel: subPanel.panelLabel,
                  expanded: subPanel.expanded,
                  onToggle: (id: string) =>
                    handleSubPanelToggleExpanded(
                      panel.id,
                      "select",
                      id,
                    ),
                  onKeyChange: (id: string, value: string) =>
                    handleSubPanelKeyChange(
                      panel.id,
                      "select",
                      id,
                      value,
                    ),
                  onLabelChange: (id: string, value: string) =>
                    handleSubPanelLabelChange(
                      panel.id,
                      "select",
                      id,
                      value,
                    ),
                  onDelete: (id: string) =>
                    handleSubPanelDelete(panel.id, "select", id),
                },
                itemProps: {
                  selectItems: subPanel.selectItems,
                  shuffle: {
                    label: "Shuffle:",
                    checked: shuffleStates[subPanel.id] ?? false,
                    onChange: (checked: boolean) =>
                      setShuffleStates((prev) => ({
                        ...prev,
                        [subPanel.id]: checked,
                      })),
                  },
                  selectorListProps: {
                    selectorList: subPanel.selectItems.map((item) => ({
                      id: item.id,
                      panelItemProps: {
                        id: item.id,
                        itemLabel: "Item:",
                        panelKey: item.panelKey,
                        panelLabel: item.panelLabel,
                        expanded: item.expanded,
                        onToggle: (id: string) =>
                          handleSelectItemToggle(
                            panel.id,
                            subPanel.id,
                            id,
                          ),
                        onKeyChange: (id: string, value: string) =>
                          handleSelectItemKeyChange(
                            panel.id,
                            subPanel.id,
                            id,
                            value,
                          ),
                        onLabelChange: (id: string, value: string) =>
                          handleSelectItemPanelLabelChange(
                            panel.id,
                            subPanel.id,
                            id,
                            value,
                          ),
                        onDelete: (id: string) =>
                          handleSelectItemDelete(
                            panel.id,
                            subPanel.id,
                            id,
                          ),
                      },
                      itemProps: {
                        panelListProps: {
                          headingText: "Item Values:",
                          todoOnPanelAdd: () =>
                            handleSelectItemAdd(panel.id, subPanel.id),
                          hasItems: true,
                        },
                        listItems: [
                          {
                            id: item.id,
                            labelProps: { text: "Item:" },
                            labelFieldProps: {
                              label: "Label",
                              defaultValue: item.label,
                              onBlur: (value: string) =>
                                handleSelectItemLabelChange(
                                  panel.id,
                                  subPanel.id,
                                  item.id,
                                  value,
                                ),
                            },
                            promptFieldProps: {
                              label: "Prompt",
                              defaultValue: item.prompt,
                              onBlur: (value: string) =>
                                handleSelectItemPromptChange(
                                  panel.id,
                                  subPanel.id,
                                  item.id,
                                  value,
                                ),
                            },
                          },
                        ],
                      },
                    })),
                    panelListProps: {
                      headingText: "Selectors:",
                      todoOnPanelAdd: () =>
                        handleSubPanelAdd(panel.id, "select"),
                      hasItems: subPanel.selectItems.length > 0,
                    },
                  },
                  onDeleteItem: (itemId: string) =>
                    handleSelectItemDelete(panel.id, subPanel.id, itemId),
                  onToggle: (itemId: string) =>
                    handleSelectItemToggle(panel.id, subPanel.id, itemId),
                  onKeyChange: (itemId: string, value: string) =>
                    handleSelectItemKeyChange(
                      panel.id,
                      subPanel.id,
                      itemId,
                      value,
                    ),
                  onItemLabelChange: (itemId: string, value: string) =>
                    handleSelectItemPanelLabelChange(
                      panel.id,
                      subPanel.id,
                      itemId,
                      value,
                    ),
                  onLabelChange: (itemId: string, value: string) =>
                    handleSelectItemLabelChange(
                      panel.id,
                      subPanel.id,
                      itemId,
                      value,
                    ),
                  onPromptChange: (itemId: string, value: string) =>
                    handleSelectItemPromptChange(
                      panel.id,
                      subPanel.id,
                      itemId,
                      value,
                    ),
                },
              })),
            },
          },
        };
      }),
    },
  };

  return { viewModel };
}
