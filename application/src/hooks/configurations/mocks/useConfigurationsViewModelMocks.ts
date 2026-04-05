"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavItem } from "@/components/atoms/DrawerAtom";
import {
  BlocItem,
  ConfigBodySectionType,
  ConfigurationsViewModel,
  OrdersGrpItem,
  OrdersTypeOption,
} from "@/hooks/configurations/viewModel/useConfigurationsComposer";

const NAV_ITEMS: NavItem[] = [
  { href: "/configurations", label: "Configurations" },
  { href: "/posting-clerk", label: "Posting Clerk" },
  { href: "/preset-builder", label: "Preset Builder" },
  { href: "/prompt-forger", label: "Prompt Forger" },
];

const ORDERS_TYPE_OPTIONS: OrdersTypeOption[] = ["random", "complex", "scripts", "colors"];

const MOCK_CONFIG_ITEMS = ["config-default", "config-production", "config-staging"];

const INITIAL_BLOCS: BlocItem[] = [
  {
    id: "bloc-1",
    keyValue: "",
    labelValue: "",
    availableBlocTypes: ["Orders", "Switch", "Select"],
  },
  {
    id: "bloc-2",
    keyValue: "",
    labelValue: "",
    availableBlocTypes: ["Orders", "Switch", "Select"],
  },
  {
    id: "bloc-3",
    keyValue: "",
    labelValue: "",
    availableBlocTypes: ["Orders", "Switch", "Select"],
  },
  {
    id: "bloc-4",
    keyValue: "",
    labelValue: "",
    availableBlocTypes: ["Orders", "Switch", "Select"],
  },
];

interface ConfigurationsViewModelMocksReturns {
  viewModel: ConfigurationsViewModel;
}

export function useConfigurationsViewModelMocks(): ConfigurationsViewModelMocksReturns {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(MOCK_CONFIG_ITEMS[0]);
  const [configEditValue, setConfigEditValue] = useState("");
  const [blocs, setBlocs] = useState<BlocItem[]>(INITIAL_BLOCS);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedBlocTypes, setSelectedBlocTypes] = useState<
    Record<string, Set<string>>
  >({});
  const [ordersGrpItems, setOrdersGrpItems] = useState<
    Record<string, OrdersGrpItem[]>
  >({});
  const [ordersGrpExpandedIds, setOrdersGrpExpandedIds] = useState<
    Record<string, Set<string>>
  >({});
  const [ordersItemItems, setOrdersItemItems] = useState<
    Record<string, Array<{ id: string; keyValue: string; labelValue: string }>>
  >({});
  const [ordersItemExpandedIds, setOrdersItemExpandedIds] = useState<
    Record<string, Set<string>>
  >({});
  const [selectedOrdersItemTypes, setSelectedOrdersItemTypes] = useState<
    Record<string, OrdersTypeOption>
  >({});
  const [randomItems, setRandomItems] = useState<
    Record<string, Array<{ id: string; valueValue: string; promptValue: string; weightValue: string }>>
  >({});
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleNavigate = (href: string) => {
    router.push(href);
    setDrawerOpen(false);
  };
  const handleConfigSelect = (item: string) => setSelectedConfig(item);
  const handleConfigEditBlur = (value: string) => setConfigEditValue(value);
  const handleToggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const handleToggleBlocType = (blocId: string, typeName: string) => {
    setSelectedBlocTypes((prev) => {
      const current = new Set(prev[blocId] ?? []);
      if (current.has(typeName)) {
        current.delete(typeName);
      } else {
        current.add(typeName);
      }
      return { ...prev, [blocId]: current };
    });
  };

  const handleKeyChange = (id: string, value: string) => {
    setBlocs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, keyValue: value } : b))
    );
  };
  const handleLabelChange = (id: string, value: string) => {
    setBlocs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, labelValue: value } : b))
    );
  };
  const handleRemoveBloc = (id: string) => {
    setBlocs((prev) => prev.filter((b) => b.id !== id));
  };
  const handleAddBloc = () => {
    const newId = `bloc-${Date.now()}`;
    setBlocs((prev) => [
      ...prev,
      {
        id: newId,
        keyValue: "",
        labelValue: "",
        availableBlocTypes: ["Orders", "Switch", "Select"],
      },
    ]);
  };

  const handleAddOrdersGrp = (sectionKey: string) => {
    const newId = `orders-grp-${Date.now()}`;
    setOrdersGrpItems((prev) => ({
      ...prev,
      [sectionKey]: [
        ...(prev[sectionKey] ?? []),
        { id: newId, keyValue: "", labelValue: "" },
      ],
    }));
  };
  const handleRemoveOrdersGrp = (sectionKey: string, grpId: string) => {
    setOrdersGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).filter((g) => g.id !== grpId),
    }));
  };
  const handleToggleOrdersGrpExpanded = (sectionKey: string, grpId: string) => {
    setOrdersGrpExpandedIds((prev) => {
      const current = new Set(prev[sectionKey] ?? []);
      if (current.has(grpId)) {
        current.delete(grpId);
      } else {
        current.add(grpId);
      }
      return { ...prev, [sectionKey]: current };
    });
  };
  const handleOrdersGrpKeyChange = (
    sectionKey: string,
    grpId: string,
    value: string
  ) => {
    setOrdersGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).map((g) =>
        g.id === grpId ? { ...g, keyValue: value } : g
      ),
    }));
  };
  const handleOrdersGrpLabelChange = (
    sectionKey: string,
    grpId: string,
    value: string
  ) => {
    setOrdersGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).map((g) =>
        g.id === grpId ? { ...g, labelValue: value } : g
      ),
    }));
  };

  const handleAddOrdersItem = (grpId: string) => {
    const newId = `orders-item-${Date.now()}`;
    setOrdersItemItems((prev) => ({
      ...prev,
      [grpId]: [
        ...(prev[grpId] ?? []),
        { id: newId, keyValue: "", labelValue: "" },
      ],
    }));
  };
  const handleRemoveOrdersItem = (grpId: string, itemId: string) => {
    setOrdersItemItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).filter((i) => i.id !== itemId),
    }));
  };
  const handleToggleOrdersItemExpanded = (grpId: string, itemId: string) => {
    setOrdersItemExpandedIds((prev) => {
      const current = new Set(prev[grpId] ?? []);
      if (current.has(itemId)) {
        current.delete(itemId);
      } else {
        current.add(itemId);
      }
      return { ...prev, [grpId]: current };
    });
  };
  const handleOrdersItemKeyChange = (grpId: string, itemId: string, value: string) => {
    setOrdersItemItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((i) =>
        i.id === itemId ? { ...i, keyValue: value } : i
      ),
    }));
  };
  const handleOrdersItemLabelChange = (grpId: string, itemId: string, value: string) => {
    setOrdersItemItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((i) =>
        i.id === itemId ? { ...i, labelValue: value } : i
      ),
    }));
  };
  const handleSelectOrdersItemType = (itemId: string, type: OrdersTypeOption) => {
    setSelectedOrdersItemTypes((prev) => ({ ...prev, [itemId]: type }));
  };

  const handleAddRandomRow = (itemId: string) => {
    const newId = `random-row-${Date.now()}`;
    setRandomItems((prev) => ({
      ...prev,
      [itemId]: [
        ...(prev[itemId] ?? []),
        { id: newId, valueValue: "", promptValue: "", weightValue: "" },
      ],
    }));
  };
  const handleRemoveRandomRow = (itemId: string, rowId: string) => {
    setRandomItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).filter((r) => r.id !== rowId),
    }));
  };
  const handleRandomValueChange = (itemId: string, rowId: string, value: string) => {
    setRandomItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).map((r) =>
        r.id === rowId ? { ...r, valueValue: value } : r
      ),
    }));
  };
  const handleRandomPromptChange = (itemId: string, rowId: string, value: string) => {
    setRandomItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).map((r) =>
        r.id === rowId ? { ...r, promptValue: value } : r
      ),
    }));
  };
  const handleRandomWeightChange = (itemId: string, rowId: string, value: string) => {
    setRandomItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).map((r) =>
        r.id === rowId ? { ...r, weightValue: value } : r
      ),
    }));
  };

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
          activeItemLabel: (() => {
            const activeItem = NAV_ITEMS.find((item) => item.href === pathname);
            if (!activeItem) return undefined;
            return {
              text: `✓ ${activeItem.label}`,
              variant: "subtitle1",
              color: "success.main",
              fontWeight: "bold",
            };
          })(),
          links: NAV_ITEMS.filter((item) => item.href !== pathname).map((item) => ({
            label: item.label,
            onClick: () => handleNavigate(item.href),
          })),
          configurations: {
            setLabel: { text: "Sets:", variant: "body2" },
            select: {
              value: selectedConfig,
              options: MOCK_CONFIG_ITEMS,
              onChange: handleConfigSelect,
            },
            loadButton: {
              label: "Load",
              onClick: () => {},
              size: "small",
            },
            newButton: {
              label: "New",
              onClick: () => {},
              size: "small",
            },
            nameLabel: { text: "Name:", variant: "body2" },
            editField: {
              placeholder: "text field...",
              defaultValue: configEditValue,
              onBlur: handleConfigEditBlur,
              size: "small",
            },
            saveButton: {
              label: "Save",
              onClick: () => {},
              size: "small",
            },
            changeButton: {
              label: "change",
              onClick: () => {},
              size: "small",
            },
            deleteButton: {
              label: "- Delete ? -",
              onClick: () => {},
              size: "small",
              variant: "text",
              color: "error",
            },
          },
        },
      },
      configBody: {
        headerLabel: {
          text: "Configurations Form:",
          variant: "subtitle1",
        },
        blocPanels: blocs.map((bloc) => {
          const checkedTypes = selectedBlocTypes[bloc.id] ?? new Set<string>();
          const isExpanded = expandedIds.has(bloc.id);

          return {
            key: bloc.id,
            panelLabel: {
              text: "Blocs:",
              variant: "body2",
            },
            keyLabel: {
              text: "Key:",
              variant: "body2",
            },
            keyField: {
              placeholder: "text field...",
              defaultValue: bloc.keyValue,
              onBlur: (value) => handleKeyChange(bloc.id, value),
              size: "small",
              fullWidth: true,
            },
            labelLabel: {
              text: "Label:",
              variant: "body2",
            },
            labelField: {
              placeholder: "text field...",
              defaultValue: bloc.labelValue,
              onBlur: (value) => handleLabelChange(bloc.id, value),
              size: "small",
              fullWidth: true,
            },
            removeButton: {
              icon: "removeCircle",
              onClick: () => handleRemoveBloc(bloc.id),
              color: "default",
            },
            toggleButton: {
              icon: isExpanded ? "expandLess" : "expandMore",
              onClick: () => handleToggleExpanded(bloc.id),
            },
            isExpanded,
            blocSelectLabel: {
              text: "Bloc Select:",
              variant: "body2",
            },
            blocTypeChips: bloc.availableBlocTypes.map((typeName) => ({
              key: typeName,
              label: typeName,
              checked: checkedTypes.has(typeName),
              onChange: () => handleToggleBlocType(bloc.id, typeName),
            })),
            sections: bloc.availableBlocTypes
              .filter((typeName) => checkedTypes.has(typeName))
              .map((typeName) => {
                const sectionKey = `${bloc.id}-${typeName}`;
                if (typeName === "Orders") {
                  const grps = ordersGrpItems[sectionKey] ?? [];
                  const expandedGrpIds =
                    ordersGrpExpandedIds[sectionKey] ?? new Set<string>();
                  return {
                    key: typeName,
                    type: typeName as ConfigBodySectionType,
                    titleLabel: {
                      text: `${typeName}:`,
                      variant: "body2",
                    },
                    placeholderLabel: {
                      text: `${typeName} component placeholder`,
                      variant: "body1",
                      color: "text.secondary",
                    },
                    ordersGrpPanels: grps.map((grp) => ({
                      key: grp.id,
                      panelLabel: { text: "Orders Grp:", variant: "body2" },
                      keyLabel: { text: "Key:", variant: "body2" },
                      keyField: {
                        placeholder: "text field...",
                        defaultValue: grp.keyValue,
                        onBlur: (value: string) =>
                          handleOrdersGrpKeyChange(sectionKey, grp.id, value),
                        size: "small",
                        fullWidth: true,
                      },
                      labelLabel: { text: "Label:", variant: "body2" },
                      labelField: {
                        placeholder: "text field...",
                        defaultValue: grp.labelValue,
                        onBlur: (value: string) =>
                          handleOrdersGrpLabelChange(sectionKey, grp.id, value),
                        size: "small",
                        fullWidth: true,
                      },
                      removeButton: {
                        icon: "removeCircle" as const,
                        onClick: () =>
                          handleRemoveOrdersGrp(sectionKey, grp.id),
                        color: "default" as const,
                      },
                      toggleButton: {
                        icon: expandedGrpIds.has(grp.id)
                          ? ("expandLess" as const)
                          : ("expandMore" as const),
                        onClick: () =>
                          handleToggleOrdersGrpExpanded(sectionKey, grp.id),
                      },
                      isExpanded: expandedGrpIds.has(grp.id),
                      orderItemsLabel: {
                        text: "Order Items:",
                        variant: "body2",
                      },
                      ordersItemSection: (() => {
                        const items = ordersItemItems[grp.id] ?? [];
                        const expandedItemIds = ordersItemExpandedIds[grp.id] ?? new Set<string>();
                        return {
                          ordersItemPanels: items.map((item) => {
                            const selectedType = selectedOrdersItemTypes[item.id] ?? null;
                            return {
                              key: item.id,
                              panelLabel: { text: "Item:", variant: "body2" as const },
                              keyLabel: { text: "Key:", variant: "body2" as const },
                              keyField: {
                                placeholder: "text field...",
                                defaultValue: item.keyValue,
                                onBlur: (value: string) =>
                                  handleOrdersItemKeyChange(grp.id, item.id, value),
                                size: "small" as const,
                                fullWidth: true,
                              },
                              labelLabel: { text: "Label:", variant: "body2" as const },
                              labelField: {
                                placeholder: "text field...",
                                defaultValue: item.labelValue,
                                onBlur: (value: string) =>
                                  handleOrdersItemLabelChange(grp.id, item.id, value),
                                size: "small" as const,
                                fullWidth: true,
                              },
                              removeButton: {
                                icon: "removeCircle" as const,
                                onClick: () => handleRemoveOrdersItem(grp.id, item.id),
                                color: "default" as const,
                              },
                              toggleButton: {
                                icon: expandedItemIds.has(item.id)
                                  ? ("expandLess" as const)
                                  : ("expandMore" as const),
                                onClick: () =>
                                  handleToggleOrdersItemExpanded(grp.id, item.id),
                              },
                              isExpanded: expandedItemIds.has(item.id),
                              ordersTypeLabel: { text: "Orders Type:", variant: "body2" as const },
                              ordersTypeChips: ORDERS_TYPE_OPTIONS.map((type) => ({
                                key: type,
                                label: type,
                                checked: selectedType === type,
                                onChange: () => handleSelectOrdersItemType(item.id, type),
                              })),
                              selectedTypeLabel: selectedType
                                ? { text: `${selectedType.charAt(0).toUpperCase()}${selectedType.slice(1)}:`, variant: "body2" as const }
                                : null,
                              randomSection: selectedType === "random"
                                ? {
                                    headerLabel: { text: "Random:", variant: "body2" as const },
                                    randomRows: (randomItems[item.id] ?? []).map((row) => ({
                                      key: row.id,
                                      valueLabel: { text: "Value:", variant: "body2" as const },
                                      valueField: {
                                        placeholder: "text field...",
                                        defaultValue: row.valueValue,
                                        onBlur: (value: string) =>
                                          handleRandomValueChange(item.id, row.id, value),
                                        size: "small" as const,
                                      },
                                      promptLabel: { text: "Prompt:", variant: "body2" as const },
                                      promptField: {
                                        placeholder: "text field...",
                                        defaultValue: row.promptValue,
                                        onBlur: (value: string) =>
                                          handleRandomPromptChange(item.id, row.id, value),
                                        size: "small" as const,
                                      },
                                      weightLabel: { text: "Weight:", variant: "body2" as const },
                                      weightField: {
                                        placeholder: "counter",
                                        defaultValue: row.weightValue,
                                        onBlur: (value: string) =>
                                          handleRandomWeightChange(item.id, row.id, value),
                                        size: "small" as const,
                                      },
                                      removeButton: {
                                        icon: "removeCircle" as const,
                                        onClick: () =>
                                          handleRemoveRandomRow(item.id, row.id),
                                        color: "default" as const,
                                      },
                                    })),
                                    addRowLabel: { text: "Add Random Item:", variant: "body2" as const },
                                    addRowButton: {
                                      icon: "add" as const,
                                      onClick: () => handleAddRandomRow(item.id),
                                    },
                                  }
                                : null,
                            };
                          }),
                          addItemRowLabel: { text: "Add Orders Item:", variant: "body2" as const },
                          addItemButton: {
                            icon: "add" as const,
                            onClick: () => handleAddOrdersItem(grp.id),
                          },
                        };
                      })(),
                    })),
                    addGrpRowLabel: {
                      text: "Add Orders Grp:",
                      variant: "body2",
                    },
                    addGrpButton: {
                      icon: "add" as const,
                      onClick: () => handleAddOrdersGrp(sectionKey),
                    },
                  };
                }
                return {
                  key: typeName,
                  type: typeName as ConfigBodySectionType,
                  titleLabel: {
                    text: `${typeName}:`,
                    variant: "body2",
                  },
                  placeholderLabel: {
                    text: `${typeName} component placeholder`,
                    variant: "body1",
                    color: "text.secondary",
                  },
                };
              }),
          };
        }),
        addRowLabel: {
          text: "Add Bloc:",
          variant: "body2",
        },
        addButton: {
          icon: "add",
          onClick: handleAddBloc,
        },
      },
    },
  };
}
