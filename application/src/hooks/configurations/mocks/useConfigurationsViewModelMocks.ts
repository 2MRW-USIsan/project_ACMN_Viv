"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavItem } from "@/components/atoms/DrawerAtom";
import {
  BlocItem,
  ConfigBodySectionType,
  ConfigurationsViewModel,
  OrdersGrpItem,
} from "@/hooks/configurations/viewModel/useConfigurationsComposer";

const NAV_ITEMS: NavItem[] = [
  { href: "/configurations", label: "Configurations" },
  { href: "/posting-clerk", label: "Posting Clerk" },
  { href: "/preset-builder", label: "Preset Builder" },
  { href: "/prompt-forger", label: "Prompt Forger" },
];

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
