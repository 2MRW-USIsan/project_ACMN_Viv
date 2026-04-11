"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavItem } from "@/components/atoms/surface/DrawerAtom";
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
          links: NAV_ITEMS.filter((item) => item.href !== pathname).map(
            (item) => ({
              label: item.label,
              onClick: () => handleNavigate(item.href),
            }),
          ),
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
                        const expandedItemIds =
                          ordersItemExpandedIds[grp.id] ?? new Set<string>();
                        return {
                          ordersItemPanels: items.map((item) => {
                            const selectedType =
                              selectedOrdersItemTypes[item.id] ?? null;
                            return {
                              key: item.id,
                              panelLabel: {
                                text: "Item:",
                                variant: "body2" as const,
                              },
                              keyLabel: {
                                text: "Key:",
                                variant: "body2" as const,
                              },
                              keyField: {
                                placeholder: "text field...",
                                defaultValue: item.keyValue,
                                onBlur: (value: string) =>
                                  handleOrdersItemKeyChange(
                                    grp.id,
                                    item.id,
                                    value,
                                  ),
                                size: "small" as const,
                                fullWidth: true,
                              },
                              labelLabel: {
                                text: "Label:",
                                variant: "body2" as const,
                              },
                              labelField: {
                                placeholder: "text field...",
                                defaultValue: item.labelValue,
                                onBlur: (value: string) =>
                                  handleOrdersItemLabelChange(
                                    grp.id,
                                    item.id,
                                    value,
                                  ),
                                size: "small" as const,
                                fullWidth: true,
                              },
                              removeButton: {
                                icon: "removeCircle" as const,
                                onClick: () =>
                                  handleRemoveOrdersItem(grp.id, item.id),
                                color: "default" as const,
                              },
                              toggleButton: {
                                icon: expandedItemIds.has(item.id)
                                  ? ("expandLess" as const)
                                  : ("expandMore" as const),
                                onClick: () =>
                                  handleToggleOrdersItemExpanded(
                                    grp.id,
                                    item.id,
                                  ),
                              },
                              isExpanded: expandedItemIds.has(item.id),
                              ordersTypeLabel: {
                                text: "Orders Type:",
                                variant: "body2" as const,
                              },
                              ordersTypeChips: ORDERS_TYPE_OPTIONS.map(
                                (type) => ({
                                  key: type,
                                  label: type,
                                  checked: selectedType === type,
                                  onChange: () =>
                                    handleSelectOrdersItemType(item.id, type),
                                }),
                              ),
                              selectedTypeLabel: selectedType
                                ? {
                                    text: `${selectedType.charAt(0).toUpperCase()}${selectedType.slice(1)}:`,
                                    variant: "body2" as const,
                                  }
                                : null,
                              randomSection:
                                selectedType === "random"
                                  ? {
                                      headerLabel: {
                                        text: "Random:",
                                        variant: "body2" as const,
                                      },
                                      randomRows: (
                                        randomItems[item.id] ?? []
                                      ).map((row) => ({
                                        key: row.id,
                                        valueLabel: {
                                          text: "Value:",
                                          variant: "body2" as const,
                                        },
                                        valueField: {
                                          placeholder: "text field...",
                                          defaultValue: row.valueValue,
                                          onBlur: (value: string) =>
                                            handleRandomValueChange(
                                              item.id,
                                              row.id,
                                              value,
                                            ),
                                          size: "small" as const,
                                        },
                                        promptLabel: {
                                          text: "Prompt:",
                                          variant: "body2" as const,
                                        },
                                        promptField: {
                                          placeholder: "text field...",
                                          defaultValue: row.promptValue,
                                          onBlur: (value: string) =>
                                            handleRandomPromptChange(
                                              item.id,
                                              row.id,
                                              value,
                                            ),
                                          size: "small" as const,
                                        },
                                        weightLabel: {
                                          text: "Weight:",
                                          variant: "body2" as const,
                                        },
                                        weightField: {
                                          placeholder: "counter",
                                          defaultValue: row.weightValue,
                                          onBlur: (value: string) =>
                                            handleRandomWeightChange(
                                              item.id,
                                              row.id,
                                              value,
                                            ),
                                          size: "small" as const,
                                        },
                                        removeButton: {
                                          icon: "removeCircle" as const,
                                          onClick: () =>
                                            handleRemoveRandomRow(
                                              item.id,
                                              row.id,
                                            ),
                                          color: "default" as const,
                                        },
                                      })),
                                      addRowLabel: {
                                        text: "Add Random Item:",
                                        variant: "body2" as const,
                                      },
                                      addRowButton: {
                                        icon: "add" as const,
                                        onClick: () =>
                                          handleAddRandomRow(item.id),
                                      },
                                    }
                                  : null,
                              complexSection:
                                selectedType === "complex"
                                  ? ((): ComplexSection => {
                                      const categories =
                                        complexCategoryItems[item.id] ?? [];
                                      const expandedCatIds =
                                        complexCategoryExpandedIds[item.id] ??
                                        new Set<string>();
                                      return {
                                        categoryPanels: categories.map(
                                          (cat) => ({
                                            key: cat.id,
                                            categoryLabel: {
                                              text: "Category:",
                                              variant: "body2" as const,
                                            },
                                            valueLabel: {
                                              text: "Value:",
                                              variant: "body2" as const,
                                            },
                                            valueField: {
                                              placeholder: "text field...",
                                              defaultValue: cat.value,
                                              onBlur: (value: string) =>
                                                handleComplexCategoryValueChange(
                                                  item.id,
                                                  cat.id,
                                                  value,
                                                ),
                                              size: "small" as const,
                                              fullWidth: true,
                                            },
                                            promptLabel: {
                                              text: "Prompt:",
                                              variant: "body2" as const,
                                            },
                                            promptField: {
                                              placeholder: "text field...",
                                              defaultValue: cat.prompt,
                                              onBlur: (value: string) =>
                                                handleComplexCategoryPromptChange(
                                                  item.id,
                                                  cat.id,
                                                  value,
                                                ),
                                              size: "small" as const,
                                              fullWidth: true,
                                            },
                                            weightLabel: {
                                              text: "Weight:",
                                              variant: "body2" as const,
                                            },
                                            weightField: {
                                              placeholder: "counter",
                                              defaultValue: cat.weight,
                                              onBlur: (value: string) =>
                                                handleComplexCategoryWeightChange(
                                                  item.id,
                                                  cat.id,
                                                  value,
                                                ),
                                              size: "small" as const,
                                              fullWidth: true,
                                            },
                                            removeButton: {
                                              icon: "removeCircle" as const,
                                              onClick: () =>
                                                handleRemoveComplexCategory(
                                                  item.id,
                                                  cat.id,
                                                ),
                                              color: "default" as const,
                                            },
                                            toggleButton: {
                                              icon: expandedCatIds.has(cat.id)
                                                ? ("expandLess" as const)
                                                : ("expandMore" as const),
                                              onClick: () =>
                                                handleToggleComplexCategoryExpanded(
                                                  item.id,
                                                  cat.id,
                                                ),
                                            },
                                            isExpanded: expandedCatIds.has(
                                              cat.id,
                                            ),
                                            randomSectionLabel: {
                                              text: "Random:",
                                              variant: "body2" as const,
                                            },
                                            randomItemPanels: (
                                              complexRandomItems[cat.id] ?? []
                                            ).map((rand) => ({
                                              key: rand.id,
                                              valueLabel: {
                                                text: "Value:",
                                                variant: "body2" as const,
                                              },
                                              valueField: {
                                                placeholder: "text field...",
                                                defaultValue: rand.value,
                                                onBlur: (value: string) =>
                                                  handleRandomItemValueChange(
                                                    cat.id,
                                                    rand.id,
                                                    value,
                                                  ),
                                                size: "small" as const,
                                                fullWidth: true,
                                              },
                                              promptLabel: {
                                                text: "Prompt:",
                                                variant: "body2" as const,
                                              },
                                              promptField: {
                                                placeholder: "text field...",
                                                defaultValue: rand.prompt,
                                                onBlur: (value: string) =>
                                                  handleRandomItemPromptChange(
                                                    cat.id,
                                                    rand.id,
                                                    value,
                                                  ),
                                                size: "small" as const,
                                                fullWidth: true,
                                              },
                                              weightLabel: {
                                                text: "Weight:",
                                                variant: "body2" as const,
                                              },
                                              weightField: {
                                                placeholder: "counter",
                                                defaultValue: rand.weight,
                                                onBlur: (value: string) =>
                                                  handleRandomItemWeightChange(
                                                    cat.id,
                                                    rand.id,
                                                    value,
                                                  ),
                                                size: "small" as const,
                                                fullWidth: true,
                                              },
                                              removeButton: {
                                                icon: "removeCircle" as const,
                                                onClick: () =>
                                                  handleRemoveRandomItem(
                                                    cat.id,
                                                    rand.id,
                                                  ),
                                                color: "default" as const,
                                              },
                                            })),
                                            addRandomItemRowLabel: {
                                              text: "Add Random Item:",
                                              variant: "body2" as const,
                                            },
                                            addRandomItemButton: {
                                              icon: "add" as const,
                                              onClick: () =>
                                                handleAddRandomItem(cat.id),
                                            },
                                          }),
                                        ),
                                        addCategoryRowLabel: {
                                          text: "Add Complex Category:",
                                          variant: "body2" as const,
                                        },
                                        addCategoryButton: {
                                          icon: "add" as const,
                                          onClick: () =>
                                            handleAddComplexCategory(item.id),
                                        },
                                      };
                                    })()
                                  : null,
                              scriptsSection:
                                selectedType === "scripts"
                                  ? {
                                      scriptLabel: {
                                        text: "Scripts:",
                                        variant: "body2" as const,
                                        fontWeight: "bold" as const,
                                      },
                                      scriptInfoLabel: {
                                        text: "--- Here is the Scripts Information. ---",
                                        variant: "body2" as const,
                                        color: "text.secondary",
                                      },
                                    }
                                  : null,
                              colorsSection:
                                selectedType === "colors"
                                  ? {
                                      colorLabel: {
                                        text: "Colors:",
                                        variant: "body2" as const,
                                        fontWeight: "bold" as const,
                                      },
                                      colorInfoLabel: {
                                        text: "--- Here is the Colors Information(#RRGGBB). ---",
                                        variant: "body2" as const,
                                        color: "text.secondary",
                                      },
                                    }
                                  : null,
                            };
                          }),
                          addItemRowLabel: {
                            text: "Add Orders Item:",
                            variant: "body2" as const,
                          },
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
                if (typeName === "Switch") {
                  const grps = switchGrpItems[sectionKey] ?? [];
                  const expandedGrpIds =
                    switchGrpExpandedIds[sectionKey] ?? new Set<string>();
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
                    switchGrpPanels: grps.map((grp): SwitchGrpPanel => {
                      const items = switchItems[grp.id] ?? [];
                      const isRandomized = switchRandomize[grp.id] ?? false;
                      return {
                        key: grp.id,
                        panelLabel: {
                          text: "Switch Grp:",
                          variant: "body2" as const,
                        },
                        keyLabel: { text: "Key:", variant: "body2" as const },
                        keyField: {
                          placeholder: "text field...",
                          value: grp.keyValue,
                          onChange: (value: string) =>
                            handleSwitchGrpKeyChange(sectionKey, grp.id, value),
                          size: "small" as const,
                          fullWidth: true,
                        },
                        labelLabel: {
                          text: "Label:",
                          variant: "body2" as const,
                        },
                        labelField: {
                          placeholder: "text field...",
                          value: grp.labelValue,
                          onChange: (value: string) =>
                            handleSwitchGrpLabelChange(
                              sectionKey,
                              grp.id,
                              value,
                            ),
                          size: "small" as const,
                          fullWidth: true,
                        },
                        removeButton: {
                          icon: "removeCircle" as const,
                          onClick: () =>
                            handleRemoveSwitchGrp(sectionKey, grp.id),
                          color: "default" as const,
                        },
                        toggleButton: {
                          icon: expandedGrpIds.has(grp.id)
                            ? ("expandLess" as const)
                            : ("expandMore" as const),
                          onClick: () =>
                            handleToggleSwitchGrpExpanded(sectionKey, grp.id),
                        },
                        isExpanded: expandedGrpIds.has(grp.id),
                        switchItemsLabel: {
                          text: "Switch Items:",
                          variant: "body2" as const,
                        },
                        switchItemSection: {
                          randomizeLabel: {
                            text: "Randomize:",
                            variant: "body2" as const,
                          },
                          randomizeSwitch: {
                            checked: isRandomized,
                            onChange: (checked: boolean) =>
                              handleToggleSwitchRandomize(grp.id, checked),
                          },
                          switchItemPanels: items.map((item) => ({
                            key: item.id,
                            labelLabel: {
                              text: "Label:",
                              variant: "body2" as const,
                            },
                            labelField: {
                              placeholder: "text field...",
                              defaultValue: item.labelValue,
                              onBlur: (value: string) =>
                                handleSwitchItemLabelChange(
                                  grp.id,
                                  item.id,
                                  value,
                                ),
                              size: "small" as const,
                              fullWidth: true,
                            },
                            valueLabel: {
                              text: "Value:",
                              variant: "body2" as const,
                            },
                            valueField: {
                              placeholder: "text field...",
                              defaultValue: item.valueValue,
                              onBlur: (value: string) =>
                                handleSwitchItemValueChange(
                                  grp.id,
                                  item.id,
                                  value,
                                ),
                              size: "small" as const,
                              fullWidth: true,
                            },
                            altLabel: {
                              text: "Alt:",
                              variant: "body2" as const,
                            },
                            altField: {
                              placeholder: "text field...",
                              defaultValue: item.altValue,
                              onBlur: (value: string) =>
                                handleSwitchItemAltChange(
                                  grp.id,
                                  item.id,
                                  value,
                                ),
                              size: "small" as const,
                              fullWidth: true,
                            },
                            removeButton: {
                              icon: "removeCircle" as const,
                              onClick: () =>
                                handleRemoveSwitchItem(grp.id, item.id),
                              color: "default" as const,
                            },
                          })),
                          addSwitchRowLabel: {
                            text: "Add Switch:",
                            variant: "body2" as const,
                          },
                          addSwitchButton: {
                            icon: "add" as const,
                            onClick: () => handleAddSwitchItem(grp.id),
                          },
                        },
                      };
                    }),
                    addSwitchGrpRowLabel: {
                      text: "Add Switch Grp:",
                      variant: "body2",
                    },
                    addSwitchGrpButton: {
                      icon: "add" as const,
                      onClick: () => handleAddSwitchGrp(sectionKey),
                    },
                  };
                }
                if (typeName === "Select") {
                  const grps = selectGrpItems[sectionKey] ?? [];
                  const expandedGrpIds =
                    selectGrpExpandedIds[sectionKey] ?? new Set<string>();
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
                    selectGrpPanels: grps.map((grp): SelectGrpPanel => {
                      const selectors = selectorItems[grp.id] ?? [];
                      const expandedSelectorIds =
                        selectorExpandedIds[grp.id] ?? new Set<string>();
                      const isShuffled = selectShuffle[grp.id] ?? false;
                      return {
                        key: grp.id,
                        panelLabel: {
                          text: "Select Grp:",
                          variant: "body2" as const,
                        },
                        keyLabel: { text: "Key:", variant: "body2" as const },
                        keyField: {
                          placeholder: "text field...",
                          value: grp.keyValue,
                          onChange: (value: string) =>
                            handleSelectGrpKeyChange(sectionKey, grp.id, value),
                          size: "small" as const,
                          fullWidth: true,
                        },
                        labelLabel: {
                          text: "Label:",
                          variant: "body2" as const,
                        },
                        labelField: {
                          placeholder: "text field...",
                          value: grp.labelValue,
                          onChange: (value: string) =>
                            handleSelectGrpLabelChange(
                              sectionKey,
                              grp.id,
                              value,
                            ),
                          size: "small" as const,
                          fullWidth: true,
                        },
                        removeButton: {
                          icon: "removeCircle" as const,
                          onClick: () =>
                            handleRemoveSelectGrp(sectionKey, grp.id),
                          color: "default" as const,
                        },
                        toggleButton: {
                          icon: expandedGrpIds.has(grp.id)
                            ? ("expandLess" as const)
                            : ("expandMore" as const),
                          onClick: () =>
                            handleToggleSelectGrpExpanded(sectionKey, grp.id),
                        },
                        isExpanded: expandedGrpIds.has(grp.id),
                        selectItemsLabel: {
                          text: "Select Items:",
                          variant: "body2" as const,
                        },
                        selectItemSection: {
                          shuffleLabel: {
                            text: "Shuffle:",
                            variant: "body2" as const,
                          },
                          shuffleSwitch: {
                            checked: isShuffled,
                            onChange: (checked: boolean) =>
                              handleToggleSelectShuffle(grp.id, checked),
                          },
                          selectorsLabel: {
                            text: "Selectors:",
                            variant: "body2" as const,
                          },
                          selectorPanels: selectors.map(
                            (selector): SelectorPanel => {
                              const items = listItems[selector.id] ?? [];
                              return {
                                key: selector.id,
                                panelLabel: {
                                  text: "Selector:",
                                  variant: "body2" as const,
                                },
                                keyLabel: {
                                  text: "Key:",
                                  variant: "body2" as const,
                                },
                                keyField: {
                                  placeholder: "text field...",
                                  value: selector.keyValue,
                                  onChange: (value: string) =>
                                    handleSelectorKeyChange(
                                      grp.id,
                                      selector.id,
                                      value,
                                    ),
                                  size: "small" as const,
                                  fullWidth: true,
                                },
                                labelLabel: {
                                  text: "Label:",
                                  variant: "body2" as const,
                                },
                                labelField: {
                                  placeholder: "text field...",
                                  value: selector.labelValue,
                                  onChange: (value: string) =>
                                    handleSelectorLabelChange(
                                      grp.id,
                                      selector.id,
                                      value,
                                    ),
                                  size: "small" as const,
                                  fullWidth: true,
                                },
                                removeButton: {
                                  icon: "removeCircle" as const,
                                  onClick: () =>
                                    handleRemoveSelector(grp.id, selector.id),
                                  color: "default" as const,
                                },
                                toggleButton: {
                                  icon: expandedSelectorIds.has(selector.id)
                                    ? ("expandLess" as const)
                                    : ("expandMore" as const),
                                  onClick: () =>
                                    handleToggleSelectorExpanded(
                                      grp.id,
                                      selector.id,
                                    ),
                                },
                                isExpanded: expandedSelectorIds.has(
                                  selector.id,
                                ),
                                listItemsLabel: {
                                  text: "List Items:",
                                  variant: "body2" as const,
                                },
                                listItemPanels: items.map((item) => ({
                                  key: item.id,
                                  valueLabel: {
                                    text: "Value:",
                                    variant: "body2" as const,
                                  },
                                  valueField: {
                                    placeholder: "text field...",
                                    defaultValue: item.valueValue,
                                    onBlur: (value: string) =>
                                      handleListItemValueChange(
                                        selector.id,
                                        item.id,
                                        value,
                                      ),
                                    size: "small" as const,
                                    fullWidth: true,
                                  },
                                  promptLabel: {
                                    text: "Prompt:",
                                    variant: "body2" as const,
                                  },
                                  promptField: {
                                    placeholder: "text field...",
                                    defaultValue: item.promptValue,
                                    onBlur: (value: string) =>
                                      handleListItemPromptChange(
                                        selector.id,
                                        item.id,
                                        value,
                                      ),
                                    size: "small" as const,
                                    fullWidth: true,
                                  },
                                  removeButton: {
                                    icon: "removeCircle" as const,
                                    onClick: () =>
                                      handleRemoveListItem(
                                        selector.id,
                                        item.id,
                                      ),
                                    color: "default" as const,
                                  },
                                })),
                                addListItemRowLabel: {
                                  text: "Add Switch:",
                                  variant: "body2" as const,
                                },
                                addListItemButton: {
                                  icon: "add" as const,
                                  onClick: () => handleAddListItem(selector.id),
                                },
                              };
                            },
                          ),
                          addSelectorRowLabel: {
                            text: "Add Selector:",
                            variant: "body2" as const,
                          },
                          addSelectorButton: {
                            icon: "add" as const,
                            onClick: () => handleAddSelector(grp.id),
                          },
                        },
                      };
                    }),
                    addSelectGrpRowLabel: {
                      text: "Add Select Grp:",
                      variant: "body2",
                    },
                    addSelectGrpButton: {
                      icon: "add" as const,
                      onClick: () => handleAddSelectGrp(sectionKey),
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
