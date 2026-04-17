"use client";

import { NavItem } from "@/components/atoms/surface/DrawerAtom";
import { AppBarType, DrawerType, LabelAtomType } from "@/types/ui";
import {
  BlocItem,
  ComplexSection,
  ConfigBodySectionType,
  ConfigurationsViewModel,
  OrdersGrpItem,
  OrdersTypeOption,
  SelectGrpPanel,
  SelectorPanel,
  SwitchGrpPanel,
} from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS: NavItem[] = [
  { href: "/configurations", label: "Configurations" },
  { href: "/posting-clerk", label: "Posting Clerk" },
  { href: "/preset-builder", label: "Preset Builder" },
  { href: "/prompt-forger", label: "Prompt Forger" },
];

const ORDERS_TYPE_OPTIONS: OrdersTypeOption[] = [
  "random",
  "complex",
  "scripts",
  "colors",
];

const MOCK_CONFIG_ITEMS = [
  "config-default",
  "config-production",
  "config-staging",
];

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
    Record<
      string,
      Array<{
        id: string;
        valueValue: string;
        promptValue: string;
        weightValue: string;
      }>
    >
  >({});
  const [complexCategoryItems, setComplexCategoryItems] = useState<
    Record<
      string,
      Array<{ id: string; value: string; prompt: string; weight: string }>
    >
  >({});
  const [complexCategoryExpandedIds, setComplexCategoryExpandedIds] = useState<
    Record<string, Set<string>>
  >({});
  const [complexRandomItems, setComplexRandomItems] = useState<
    Record<
      string,
      Array<{ id: string; value: string; prompt: string; weight: string }>
    >
  >({});
  const [switchGrpItems, setSwitchGrpItems] = useState<
    Record<string, Array<{ id: string; keyValue: string; labelValue: string }>>
  >({});
  const [switchGrpExpandedIds, setSwitchGrpExpandedIds] = useState<
    Record<string, Set<string>>
  >({});
  const [switchItems, setSwitchItems] = useState<
    Record<
      string,
      Array<{
        id: string;
        labelValue: string;
        valueValue: string;
        altValue: string;
      }>
    >
  >({});
  const [switchRandomize, setSwitchRandomize] = useState<
    Record<string, boolean>
  >({});
  const [selectGrpItems, setSelectGrpItems] = useState<
    Record<string, Array<{ id: string; keyValue: string; labelValue: string }>>
  >({});
  const [selectGrpExpandedIds, setSelectGrpExpandedIds] = useState<
    Record<string, Set<string>>
  >({});
  const [selectShuffle, setSelectShuffle] = useState<Record<string, boolean>>(
    {},
  );
  const [selectorItems, setSelectorItems] = useState<
    Record<string, Array<{ id: string; keyValue: string; labelValue: string }>>
  >({});
  const [selectorExpandedIds, setSelectorExpandedIds] = useState<
    Record<string, Set<string>>
  >({});
  const [listItems, setListItems] = useState<
    Record<
      string,
      Array<{ id: string; valueValue: string; promptValue: string }>
    >
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
      prev.map((b) => (b.id === id ? { ...b, keyValue: value } : b)),
    );
  };
  const handleLabelChange = (id: string, value: string) => {
    setBlocs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, labelValue: value } : b)),
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
    value: string,
  ) => {
    setOrdersGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).map((g) =>
        g.id === grpId ? { ...g, keyValue: value } : g,
      ),
    }));
  };
  const handleOrdersGrpLabelChange = (
    sectionKey: string,
    grpId: string,
    value: string,
  ) => {
    setOrdersGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).map((g) =>
        g.id === grpId ? { ...g, labelValue: value } : g,
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
  const handleOrdersItemKeyChange = (
    grpId: string,
    itemId: string,
    value: string,
  ) => {
    setOrdersItemItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((i) =>
        i.id === itemId ? { ...i, keyValue: value } : i,
      ),
    }));
  };
  const handleOrdersItemLabelChange = (
    grpId: string,
    itemId: string,
    value: string,
  ) => {
    setOrdersItemItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((i) =>
        i.id === itemId ? { ...i, labelValue: value } : i,
      ),
    }));
  };
  const handleSelectOrdersItemType = (
    itemId: string,
    type: OrdersTypeOption,
  ) => {
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
  const handleRandomValueChange = (
    itemId: string,
    rowId: string,
    value: string,
  ) => {
    setRandomItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).map((r) =>
        r.id === rowId ? { ...r, valueValue: value } : r,
      ),
    }));
  };
  const handleRandomPromptChange = (
    itemId: string,
    rowId: string,
    value: string,
  ) => {
    setRandomItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).map((r) =>
        r.id === rowId ? { ...r, promptValue: value } : r,
      ),
    }));
  };
  const handleRandomWeightChange = (
    itemId: string,
    rowId: string,
    value: string,
  ) => {
    setRandomItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).map((r) =>
        r.id === rowId ? { ...r, weightValue: value } : r,
      ),
    }));
  };

  const handleAddComplexCategory = (itemId: string) => {
    const newId = `complex-cat-${Date.now()}`;
    setComplexCategoryItems((prev) => ({
      ...prev,
      [itemId]: [
        ...(prev[itemId] ?? []),
        { id: newId, value: "", prompt: "", weight: "" },
      ],
    }));
  };
  const handleRemoveComplexCategory = (itemId: string, categoryId: string) => {
    setComplexCategoryItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).filter((c) => c.id !== categoryId),
    }));
  };
  const handleToggleComplexCategoryExpanded = (
    itemId: string,
    categoryId: string,
  ) => {
    setComplexCategoryExpandedIds((prev) => {
      const current = new Set(prev[itemId] ?? []);
      if (current.has(categoryId)) {
        current.delete(categoryId);
      } else {
        current.add(categoryId);
      }
      return { ...prev, [itemId]: current };
    });
  };
  const handleComplexCategoryValueChange = (
    itemId: string,
    categoryId: string,
    value: string,
  ) => {
    setComplexCategoryItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).map((c) =>
        c.id === categoryId ? { ...c, value } : c,
      ),
    }));
  };
  const handleComplexCategoryPromptChange = (
    itemId: string,
    categoryId: string,
    value: string,
  ) => {
    setComplexCategoryItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).map((c) =>
        c.id === categoryId ? { ...c, prompt: value } : c,
      ),
    }));
  };
  const handleComplexCategoryWeightChange = (
    itemId: string,
    categoryId: string,
    value: string,
  ) => {
    setComplexCategoryItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).map((c) =>
        c.id === categoryId ? { ...c, weight: value } : c,
      ),
    }));
  };

  const handleAddRandomItem = (categoryId: string) => {
    const newId = `random-item-${Date.now()}`;
    setComplexRandomItems((prev) => ({
      ...prev,
      [categoryId]: [
        ...(prev[categoryId] ?? []),
        { id: newId, value: "", prompt: "", weight: "" },
      ],
    }));
  };
  const handleRemoveRandomItem = (categoryId: string, randomItemId: string) => {
    setComplexRandomItems((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] ?? []).filter(
        (r) => r.id !== randomItemId,
      ),
    }));
  };
  const handleRandomItemValueChange = (
    categoryId: string,
    randomItemId: string,
    value: string,
  ) => {
    setComplexRandomItems((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] ?? []).map((r) =>
        r.id === randomItemId ? { ...r, value } : r,
      ),
    }));
  };
  const handleRandomItemPromptChange = (
    categoryId: string,
    randomItemId: string,
    value: string,
  ) => {
    setComplexRandomItems((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] ?? []).map((r) =>
        r.id === randomItemId ? { ...r, prompt: value } : r,
      ),
    }));
  };
  const handleRandomItemWeightChange = (
    categoryId: string,
    randomItemId: string,
    value: string,
  ) => {
    setComplexRandomItems((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] ?? []).map((r) =>
        r.id === randomItemId ? { ...r, weight: value } : r,
      ),
    }));
  };

  const handleAddSwitchGrp = (sectionKey: string) => {
    const newId = `switch-grp-${Date.now()}`;
    setSwitchGrpItems((prev) => ({
      ...prev,
      [sectionKey]: [
        ...(prev[sectionKey] ?? []),
        { id: newId, keyValue: "", labelValue: "" },
      ],
    }));
  };
  const handleRemoveSwitchGrp = (sectionKey: string, grpId: string) => {
    setSwitchGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).filter((g) => g.id !== grpId),
    }));
  };
  const handleToggleSwitchGrpExpanded = (sectionKey: string, grpId: string) => {
    setSwitchGrpExpandedIds((prev) => {
      const current = new Set(prev[sectionKey] ?? []);
      if (current.has(grpId)) {
        current.delete(grpId);
      } else {
        current.add(grpId);
      }
      return { ...prev, [sectionKey]: current };
    });
  };
  const handleSwitchGrpKeyChange = (
    sectionKey: string,
    grpId: string,
    value: string,
  ) => {
    setSwitchGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).map((g) =>
        g.id === grpId ? { ...g, keyValue: value } : g,
      ),
    }));
  };
  const handleSwitchGrpLabelChange = (
    sectionKey: string,
    grpId: string,
    value: string,
  ) => {
    setSwitchGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).map((g) =>
        g.id === grpId ? { ...g, labelValue: value } : g,
      ),
    }));
  };
  const handleToggleSwitchRandomize = (grpId: string, checked: boolean) => {
    setSwitchRandomize((prev) => ({ ...prev, [grpId]: checked }));
  };
  const handleAddSwitchItem = (grpId: string) => {
    const newId = `switch-item-${Date.now()}`;
    setSwitchItems((prev) => ({
      ...prev,
      [grpId]: [
        ...(prev[grpId] ?? []),
        { id: newId, labelValue: "", valueValue: "", altValue: "" },
      ],
    }));
  };
  const handleRemoveSwitchItem = (grpId: string, itemId: string) => {
    setSwitchItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).filter((i) => i.id !== itemId),
    }));
  };
  const handleSwitchItemLabelChange = (
    grpId: string,
    itemId: string,
    value: string,
  ) => {
    setSwitchItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((i) =>
        i.id === itemId ? { ...i, labelValue: value } : i,
      ),
    }));
  };
  const handleSwitchItemValueChange = (
    grpId: string,
    itemId: string,
    value: string,
  ) => {
    setSwitchItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((i) =>
        i.id === itemId ? { ...i, valueValue: value } : i,
      ),
    }));
  };
  const handleSwitchItemAltChange = (
    grpId: string,
    itemId: string,
    value: string,
  ) => {
    setSwitchItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((i) =>
        i.id === itemId ? { ...i, altValue: value } : i,
      ),
    }));
  };

  const handleAddSelectGrp = (sectionKey: string) => {
    const newId = `select-grp-${Date.now()}`;
    setSelectGrpItems((prev) => ({
      ...prev,
      [sectionKey]: [
        ...(prev[sectionKey] ?? []),
        { id: newId, keyValue: "", labelValue: "" },
      ],
    }));
  };
  const handleRemoveSelectGrp = (sectionKey: string, grpId: string) => {
    setSelectGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).filter((g) => g.id !== grpId),
    }));
  };
  const handleToggleSelectGrpExpanded = (sectionKey: string, grpId: string) => {
    setSelectGrpExpandedIds((prev) => {
      const current = new Set(prev[sectionKey] ?? []);
      if (current.has(grpId)) {
        current.delete(grpId);
      } else {
        current.add(grpId);
      }
      return { ...prev, [sectionKey]: current };
    });
  };
  const handleSelectGrpKeyChange = (
    sectionKey: string,
    grpId: string,
    value: string,
  ) => {
    setSelectGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).map((g) =>
        g.id === grpId ? { ...g, keyValue: value } : g,
      ),
    }));
  };
  const handleSelectGrpLabelChange = (
    sectionKey: string,
    grpId: string,
    value: string,
  ) => {
    setSelectGrpItems((prev) => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] ?? []).map((g) =>
        g.id === grpId ? { ...g, labelValue: value } : g,
      ),
    }));
  };
  const handleToggleSelectShuffle = (grpId: string, checked: boolean) => {
    setSelectShuffle((prev) => ({ ...prev, [grpId]: checked }));
  };
  const handleAddSelector = (grpId: string) => {
    const newId = `selector-${Date.now()}`;
    setSelectorItems((prev) => ({
      ...prev,
      [grpId]: [
        ...(prev[grpId] ?? []),
        { id: newId, keyValue: "", labelValue: "" },
      ],
    }));
  };
  const handleRemoveSelector = (grpId: string, selectorId: string) => {
    setSelectorItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).filter((s) => s.id !== selectorId),
    }));
  };
  const handleToggleSelectorExpanded = (grpId: string, selectorId: string) => {
    setSelectorExpandedIds((prev) => {
      const current = new Set(prev[grpId] ?? []);
      if (current.has(selectorId)) {
        current.delete(selectorId);
      } else {
        current.add(selectorId);
      }
      return { ...prev, [grpId]: current };
    });
  };
  const handleSelectorKeyChange = (
    grpId: string,
    selectorId: string,
    value: string,
  ) => {
    setSelectorItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((s) =>
        s.id === selectorId ? { ...s, keyValue: value } : s,
      ),
    }));
  };
  const handleSelectorLabelChange = (
    grpId: string,
    selectorId: string,
    value: string,
  ) => {
    setSelectorItems((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((s) =>
        s.id === selectorId ? { ...s, labelValue: value } : s,
      ),
    }));
  };
  const handleAddListItem = (selectorId: string) => {
    const newId = `list-item-${Date.now()}`;
    setListItems((prev) => ({
      ...prev,
      [selectorId]: [
        ...(prev[selectorId] ?? []),
        { id: newId, valueValue: "", promptValue: "" },
      ],
    }));
  };
  const handleRemoveListItem = (selectorId: string, itemId: string) => {
    setListItems((prev) => ({
      ...prev,
      [selectorId]: (prev[selectorId] ?? []).filter((i) => i.id !== itemId),
    }));
  };
  const handleListItemValueChange = (
    selectorId: string,
    itemId: string,
    value: string,
  ) => {
    setListItems((prev) => ({
      ...prev,
      [selectorId]: (prev[selectorId] ?? []).map((i) =>
        i.id === itemId ? { ...i, valueValue: value } : i,
      ),
    }));
  };
  const handleListItemPromptChange = (
    selectorId: string,
    itemId: string,
    value: string,
  ) => {
    setListItems((prev) => ({
      ...prev,
      [selectorId]: (prev[selectorId] ?? []).map((i) =>
        i.id === itemId ? { ...i, promptValue: value } : i,
      ),
    }));
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
      text: `${activeItem.label}`,
      variant: "subtitle1" as const,
      color: "success.main",
      fontWeight: "bold" as const,
    };
  })();

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
          activeItemLabel,
          links: linksBelow,
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
              value: configEditValue,
              onChange: handleConfigEditBlur,
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
        add: {
          label: {
            text: "Add Bloc:",
            variant: "body2",
          },
          onClick: handleAddBloc,
        },
        headerLabel: {
          text: "Configurations Form:",
          variant: "subtitle1",
        },
        addRowLabel: {
          text: "Add Bloc:",
          variant: "body2",
        },
        addButton: {
          icon: "add",
          onClick: handleAddBloc,
        },
        blocPanels: []
      },
    },
  };
}
