"use client";

import { NavItem } from "@/components/atoms/surface/DrawerAtom";
import { ConfigPanelFormType } from "@/components/molecules/ConfigPanelForm";
import {
  BlocItem,
  ConfigurationsViewModel,
  OrdersGrpItem,
  OrdersTypeOption,
} from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { SectionType as SelectSectionType } from "@/types/configurations/select";
import { SectionType as SwitchSectionType } from "@/types/configurations/switch";
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

const SELECT_SECTION_ITEMS = [
  {
    key: "select-mode-manual",
    props: {
      label: "Manual",
      checked: true,
      onChange: () => {},
    },
  },
  {
    key: "select-mode-auto",
    props: {
      label: "Auto",
      checked: false,
      onChange: () => {},
    },
  },
];

const createSelectDetailPanel = (id: string) => ({
  id,
  keyValue: "default-selector-key",
  labelValue: "Default Selector",
});

const createSelectListItem = (id: string) => ({
  id,
  valueValue: "default-list-item-value",
  promptValue: "default list item prompt",
  weightValue: "1",
});

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

const INITIAL_SELECTED_BLOC_TYPES: Record<
  string,
  Set<string>
> = INITIAL_BLOCS.reduce<Record<string, Set<string>>>((acc, bloc) => {
  acc[bloc.id] = new Set(["Orders"]);
  return acc;
}, {});

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
  >(INITIAL_SELECTED_BLOC_TYPES);
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
  const [selectDetailPanels, setSelectDetailPanels] = useState<
    Record<string, Array<{ id: string; keyValue: string; labelValue: string }>>
  >({});
  const [selectDetailExpandedIds, setSelectDetailExpandedIds] = useState<
    Record<string, Set<string>>
  >({});
  const [selectListItems, setSelectListItems] = useState<
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
  const [selectListItemExpandedIds, setSelectListItemExpandedIds] = useState<
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
    setSelectedBlocTypes((prev) => ({
      ...prev,
      [newId]: new Set(["Orders"]),
    }));
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
    const detailId = `${newId}-selector-1`;
    const listItemId = `${detailId}-list-item-1`;

    setSelectGrpItems((prev) => ({
      ...prev,
      [sectionKey]: [
        ...(prev[sectionKey] ?? []),
        { id: newId, keyValue: "", labelValue: "" },
      ],
    }));
    setSelectDetailPanels((prev) => ({
      ...prev,
      [newId]: [createSelectDetailPanel(detailId)],
    }));
    setSelectListItems((prev) => ({
      ...prev,
      [detailId]: [createSelectListItem(listItemId)],
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
  const handleAddSelectDetailPanel = (grpId: string) => {
    const newId = `selector-${Date.now()}`;

    setSelectDetailPanels((prev) => ({
      ...prev,
      [grpId]: [
        ...(prev[grpId] ?? []),
        { id: newId, keyValue: "", labelValue: "" },
      ],
    }));
    setSelectListItems((prev) => ({
      ...prev,
      [newId]: [createSelectListItem(`${newId}-list-item-1`)],
    }));
  };
  const handleRemoveSelectDetailPanel = (grpId: string, panelId: string) => {
    setSelectDetailPanels((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).filter((p) => p.id !== panelId),
    }));
    setSelectListItems((prev) => ({
      ...prev,
      [panelId]: [],
    }));
  };
  const handleToggleSelectDetailExpanded = (grpId: string, panelId: string) => {
    setSelectDetailExpandedIds((prev) => {
      const current = new Set(prev[grpId] ?? []);
      if (current.has(panelId)) {
        current.delete(panelId);
      } else {
        current.add(panelId);
      }
      return { ...prev, [grpId]: current };
    });
  };
  const handleSelectDetailKeyChange = (
    grpId: string,
    panelId: string,
    value: string,
  ) => {
    setSelectDetailPanels((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((p) =>
        p.id === panelId ? { ...p, keyValue: value } : p,
      ),
    }));
  };
  const handleSelectDetailLabelChange = (
    grpId: string,
    panelId: string,
    value: string,
  ) => {
    setSelectDetailPanels((prev) => ({
      ...prev,
      [grpId]: (prev[grpId] ?? []).map((p) =>
        p.id === panelId ? { ...p, labelValue: value } : p,
      ),
    }));
  };
  const handleAddSelectListItem = (detailId: string) => {
    const newId = `list-item-${Date.now()}`;

    setSelectListItems((prev) => ({
      ...prev,
      [detailId]: [
        ...(prev[detailId] ?? []),
        { id: newId, valueValue: "", promptValue: "", weightValue: "" },
      ],
    }));
  };
  const handleRemoveSelectListItem = (detailId: string, itemId: string) => {
    setSelectListItems((prev) => ({
      ...prev,
      [detailId]: (prev[detailId] ?? []).filter((item) => item.id !== itemId),
    }));
  };
  const handleToggleSelectListItemExpanded = (
    detailId: string,
    itemId: string,
  ) => {
    setSelectListItemExpandedIds((prev) => {
      const current = new Set(prev[detailId] ?? []);
      if (current.has(itemId)) {
        current.delete(itemId);
      } else {
        current.add(itemId);
      }
      return { ...prev, [detailId]: current };
    });
  };
  const handleSelectListItemValueChange = (
    detailId: string,
    itemId: string,
    value: string,
  ) => {
    setSelectListItems((prev) => ({
      ...prev,
      [detailId]: (prev[detailId] ?? []).map((item) =>
        item.id === itemId ? { ...item, valueValue: value } : item,
      ),
    }));
  };
  const handleSelectListItemPromptChange = (
    detailId: string,
    itemId: string,
    value: string,
  ) => {
    setSelectListItems((prev) => ({
      ...prev,
      [detailId]: (prev[detailId] ?? []).map((item) =>
        item.id === itemId ? { ...item, promptValue: value } : item,
      ),
    }));
  };
  const handleSelectListItemWeightChange = (
    detailId: string,
    itemId: string,
    value: string,
  ) => {
    setSelectListItems((prev) => ({
      ...prev,
      [detailId]: (prev[detailId] ?? []).map((item) =>
        item.id === itemId ? { ...item, weightValue: value } : item,
      ),
    }));
  };

  const buildSectionSelector = (
    blocId: string,
    typeNames: string[],
    selectedTypeName?: string,
    onSelectType?: (typeName: string) => void,
  ) => ({
    label: {
      sectionSelect: { text: "Section:" },
    },
    shuffle: { checked: false, onChange: () => {} },
    sectionSelect: typeNames.map((typeName) => ({
      key: `${blocId}-${typeName}`,
      props: {
        label: typeName,
        checked: selectedTypeName
          ? selectedTypeName === typeName
          : (selectedBlocTypes[blocId] ?? new Set<string>()).has(typeName),
        onChange: () => {
          if (onSelectType) {
            onSelectType(typeName);
            return;
          }
          handleToggleBlocType(blocId, typeName);
        },
      },
    })),
  });

  const buildPanelForm = (
    panelLabel: string,
    keyValue: string,
    labelValue: string,
    isExpanded: boolean,
    onToggle: () => void,
    onKeyChange: (value: string) => void,
    onLabelChange: (value: string) => void,
    onRemove: () => void,
  ): ConfigPanelFormType => ({
    onToggle: { onClick: onToggle },
    label: {
      value: { text: "Label:" },
      key: { text: "Key:" },
      panel: { text: panelLabel },
    },
    field: {
      value: {
        value: labelValue,
        placeholder: "text field...",
        onChange: onLabelChange,
        size: "small" as const,
      },
      key: {
        value: keyValue,
        placeholder: "text field...",
        onChange: onKeyChange,
        size: "small" as const,
      },
    },
    remove: { onClick: onRemove },
    isExpanded,
  });

  const buildOrdersSection = (blocId: string) => {
    if (!(selectedBlocTypes[blocId] ?? new Set<string>()).has("Orders")) {
      return undefined;
    }

    return {
      message: { text: "" },
      label: { text: "Orders Groups:" },
      add: {
        label: { text: "Add Orders Group:" },
        onClick: () => handleAddOrdersGrp(blocId),
      },
      panels: (ordersGrpItems[blocId] ?? []).map((grp) => ({
        key: grp.id,
        props: {
          panel: buildPanelForm(
            `Group ${grp.id}:`,
            grp.keyValue,
            grp.labelValue,
            (ordersGrpExpandedIds[blocId] ?? new Set<string>()).has(grp.id),
            () => handleToggleOrdersGrpExpanded(blocId, grp.id),
            (value) => handleOrdersGrpKeyChange(blocId, grp.id, value),
            (value) => handleOrdersGrpLabelChange(blocId, grp.id, value),
            () => handleRemoveOrdersGrp(blocId, grp.id),
          ),
          itemSection: {
            label: { text: "Order Items:" },
            add: {
              label: { text: "Add Orders Item:" },
              onClick: () => handleAddOrdersItem(grp.id),
            },
            panels: (ordersItemItems[grp.id] ?? []).map((item) => {
              const selectedType =
                selectedOrdersItemTypes[item.id] ?? ORDERS_TYPE_OPTIONS[0];
              const randomSection = {
                label: { text: "Random:" },
                panels: (randomItems[item.id] ?? []).map((row) => ({
                  key: row.id,
                  props: {
                    label: {
                      item: { text: `Row ${row.id}:` },
                      value: { text: "Value:" },
                      prompt: { text: "Prompt:" },
                      weight: { text: "Weight:" },
                    },
                    field: {
                      value: {
                        value: row.valueValue,
                        placeholder: "value...",
                        onChange: (v: string) =>
                          handleRandomValueChange(item.id, row.id, v),
                        size: "small" as const,
                      },
                      prompt: {
                        value: row.promptValue,
                        placeholder: "prompt...",
                        onChange: (v: string) =>
                          handleRandomPromptChange(item.id, row.id, v),
                        size: "small" as const,
                      },
                      weight: {
                        value: row.weightValue,
                        placeholder: "weight...",
                        onChange: (v: string) =>
                          handleRandomWeightChange(item.id, row.id, v),
                        size: "small" as const,
                      },
                    },
                    remove: {
                      onClick: () => handleRemoveRandomRow(item.id, row.id),
                    },
                  },
                })),
                add: {
                  label: { text: "Add Random:" },
                  onClick: () => handleAddRandomRow(item.id),
                },
              };
              const complexSection = {
                label: { text: "Complex:" },
                panels: (complexCategoryItems[item.id] ?? []).map((cat) => ({
                  key: cat.id,
                  props: {
                    panel: buildPanelForm(
                      `Category ${cat.id}:`,
                      cat.value,
                      cat.prompt,
                      (
                        complexCategoryExpandedIds[item.id] ?? new Set<string>()
                      ).has(cat.id),
                      () =>
                        handleToggleComplexCategoryExpanded(item.id, cat.id),
                      (v) =>
                        handleComplexCategoryValueChange(item.id, cat.id, v),
                      (v) =>
                        handleComplexCategoryPromptChange(item.id, cat.id, v),
                      () => handleRemoveComplexCategory(item.id, cat.id),
                    ),
                    itemSection: undefined,
                    section: {
                      label: { text: "Random Items:" },
                      panels: (complexRandomItems[cat.id] ?? []).map((r) => ({
                        key: r.id,
                        props: {
                          label: {
                            item: { text: `Row ${r.id}:` },
                            value: { text: "Value:" },
                            prompt: { text: "Prompt:" },
                            weight: { text: "Weight:" },
                          },
                          field: {
                            value: {
                              value: r.value,
                              placeholder: "value...",
                              onChange: (v: string) =>
                                handleRandomItemValueChange(cat.id, r.id, v),
                              size: "small" as const,
                            },
                            prompt: {
                              value: r.prompt,
                              placeholder: "prompt...",
                              onChange: (v: string) =>
                                handleRandomItemPromptChange(cat.id, r.id, v),
                              size: "small" as const,
                            },
                            weight: {
                              value: r.weight,
                              placeholder: "weight...",
                              onChange: (v: string) =>
                                handleRandomItemWeightChange(cat.id, r.id, v),
                              size: "small" as const,
                            },
                          },
                          remove: {
                            onClick: () => handleRemoveRandomItem(cat.id, r.id),
                          },
                        },
                      })),
                      add: {
                        label: { text: "Add Random Item:" },
                        onClick: () => handleAddRandomItem(cat.id),
                      },
                    },
                  },
                })),
                add: {
                  label: { text: "Add Complex:" },
                  onClick: () => handleAddComplexCategory(item.id),
                },
              };
              const colorsSection = {
                label: { text: "Colors:" },
                message: { text: "" },
              };
              const scriptsSection = {
                label: { text: "Scripts:" },
                message: { text: "" },
              };

              return {
                key: item.id,
                props: {
                  panel: buildPanelForm(
                    `Item ${item.id}:`,
                    item.keyValue,
                    item.labelValue,
                    (ordersItemExpandedIds[grp.id] ?? new Set<string>()).has(
                      item.id,
                    ),
                    () => handleToggleOrdersItemExpanded(grp.id, item.id),
                    (value) =>
                      handleOrdersItemKeyChange(grp.id, item.id, value),
                    (value) =>
                      handleOrdersItemLabelChange(grp.id, item.id, value),
                    () => handleRemoveOrdersItem(grp.id, item.id),
                  ),
                  itemSection: {
                    sectionSelector: buildSectionSelector(
                      item.id,
                      ORDERS_TYPE_OPTIONS,
                      selectedType,
                      (typeName) =>
                        handleSelectOrdersItemType(
                          item.id,
                          typeName as OrdersTypeOption,
                        ),
                    ),
                    randomSection:
                      selectedType === "random" ? randomSection : undefined,
                    complexSection:
                      selectedType === "complex" ? complexSection : undefined,
                    colorsSection:
                      selectedType === "colors" ? colorsSection : undefined,
                    scriptsSection:
                      selectedType === "scripts" ? scriptsSection : undefined,
                    label: { text: "" },
                    add: {
                      label: { text: "" },
                      onClick: () => {},
                    },
                    panels: [],
                  },
                },
              };
            }),
            sectionSelector: buildSectionSelector(grp.id, ORDERS_TYPE_OPTIONS),
            randomSection: undefined,
            complexSection: undefined,
            colorsSection: undefined,
            scriptsSection: undefined,
          },
        },
      })),
    };
  };

  const buildSwitchSection = (
    blocId: string,
  ): SwitchSectionType | undefined => {
    if (!(selectedBlocTypes[blocId] ?? new Set<string>()).has("Switch")) {
      return undefined;
    }

    return {
      titleLabel: { text: "Switch Groups:" },
      switchGrpPanels: (switchGrpItems[blocId] ?? []).map((grp) => ({
        key: grp.id,
        panelLabel: { text: `Group ${grp.id}:` },
        keyLabel: { text: "Key:" },
        keyField: {
          value: grp.keyValue,
          placeholder: "text field...",
          onChange: (value: string) =>
            handleSwitchGrpKeyChange(blocId, grp.id, value),
          size: "small" as const,
        },
        labelLabel: { text: "Label:" },
        labelField: {
          value: grp.labelValue,
          placeholder: "text field...",
          onChange: (value: string) =>
            handleSwitchGrpLabelChange(blocId, grp.id, value),
          size: "small" as const,
        },
        removeButton: {
          icon: "removeCircle",
          onClick: () => handleRemoveSwitchGrp(blocId, grp.id),
        },
        toggleButton: {
          icon: "expandMore",
          onClick: () => handleToggleSwitchGrpExpanded(blocId, grp.id),
        },
        isExpanded: (switchGrpExpandedIds[blocId] ?? new Set<string>()).has(
          grp.id,
        ),
        switchItemsLabel: {
          text: "Switch Items:",
        },
        switchItemSection: {
          randomizeLabel: { text: "Randomize:" },
          randomizeSwitch: {
            checked: switchRandomize[grp.id] ?? false,
            onChange: (checked: boolean) =>
              handleToggleSwitchRandomize(grp.id, checked),
          },
          switchItemPanels: (switchItems[grp.id] ?? []).map((item) => ({
            key: item.id,
            labelLabel: { text: "Label:" },
            labelField: {
              value: item.labelValue,
              placeholder: "text field...",
              onChange: (value: string) =>
                handleSwitchItemLabelChange(grp.id, item.id, value),
              size: "small" as const,
            },
            valueLabel: { text: "Value:" },
            valueField: {
              value: item.valueValue,
              placeholder: "text field...",
              onChange: (value: string) =>
                handleSwitchItemValueChange(grp.id, item.id, value),
              size: "small" as const,
            },
            altLabel: { text: "Alt:" },
            altField: {
              value: item.altValue,
              placeholder: "text field...",
              onChange: (value: string) =>
                handleSwitchItemAltChange(grp.id, item.id, value),
              size: "small" as const,
            },
            removeButton: {
              icon: "removeCircle",
              onClick: () => handleRemoveSwitchItem(grp.id, item.id),
            },
          })),
          addSwitchRowLabel: {
            text: "Add Switch Item:",
          },
          addSwitchButton: {
            icon: "add",
            onClick: () => handleAddSwitchItem(grp.id),
          },
        },
      })),
      addSwitchGrpRowLabel: {
        text: "Add Switch Group:",
      },
      addSwitchGrpButton: {
        icon: "add",
        onClick: () => handleAddSwitchGrp(blocId),
      },
    };
  };

  const buildSelectSection = (
    blocId: string,
  ): SelectSectionType | undefined => {
    if (!(selectedBlocTypes[blocId] ?? new Set<string>()).has("Select")) {
      return undefined;
    }

    return {
      label: { text: "Select Groups:" },
      panels: (selectGrpItems[blocId] ?? []).map((grp) => ({
        key: grp.id,
        props: {
          panel: buildPanelForm(
            `Group ${grp.id}:`,
            grp.keyValue,
            grp.labelValue,
            (selectGrpExpandedIds[blocId] ?? new Set<string>()).has(grp.id),
            () => handleToggleSelectGrpExpanded(blocId, grp.id),
            (value) => handleSelectGrpKeyChange(blocId, grp.id, value),
            (value) => handleSelectGrpLabelChange(blocId, grp.id, value),
            () => handleRemoveSelectGrp(blocId, grp.id),
          ),
          itemSection: {
            selector: {
              label: { sectionSelect: { text: "Shuffle:" } },
              sectionSelect: SELECT_SECTION_ITEMS,
              shuffle: {
                checked: selectShuffle[grp.id] ?? false,
                onChange: (checked: boolean) =>
                  handleToggleSelectShuffle(grp.id, checked),
              },
            } as any,
            label: { text: "Selectors:" },
            panels: (
              selectDetailPanels[grp.id] ?? [
                createSelectDetailPanel(`${grp.id}-selector-default`),
              ]
            ).map((detailPanel) => ({
              key: detailPanel.id,
              props: {
                panel: buildPanelForm(
                  `Selector ${detailPanel.id}:`,
                  detailPanel.keyValue,
                  detailPanel.labelValue,
                  (selectDetailExpandedIds[grp.id] ?? new Set<string>()).has(
                    detailPanel.id,
                  ),
                  () =>
                    handleToggleSelectDetailExpanded(grp.id, detailPanel.id),
                  (value) =>
                    handleSelectDetailKeyChange(grp.id, detailPanel.id, value),
                  (value) =>
                    handleSelectDetailLabelChange(
                      grp.id,
                      detailPanel.id,
                      value,
                    ),
                  () => handleRemoveSelectDetailPanel(grp.id, detailPanel.id),
                ),
                itemSection: {
                  selector: {
                    label: { sectionSelect: { text: "Shuffle:" } },
                    sectionSelect: SELECT_SECTION_ITEMS,
                    shuffle: {
                      checked: selectShuffle[grp.id] ?? false,
                      onChange: (checked: boolean) =>
                        handleToggleSelectShuffle(grp.id, checked),
                    },
                  } as any,
                  label: { text: "ListItems:" },
                  panels: (
                    selectListItems[detailPanel.id] ?? [
                      createSelectListItem(
                        `${detailPanel.id}-list-item-default`,
                      ),
                    ]
                  ).map((listItem) => ({
                    key: listItem.id,
                    props: {
                      label: {
                        item: { text: `Item ${listItem.id}:` },
                        value: { text: "Value:" },
                        prompt: { text: "Prompt:" },
                        weight: { text: "Weight:" },
                      },
                      field: {
                        value: {
                          value: listItem.valueValue,
                          placeholder: "value...",
                          onChange: (value: string) =>
                            handleSelectListItemValueChange(
                              detailPanel.id,
                              listItem.id,
                              value,
                            ),
                          size: "small" as const,
                        },
                        prompt: {
                          value: listItem.promptValue,
                          placeholder: "prompt...",
                          onChange: (value: string) =>
                            handleSelectListItemPromptChange(
                              detailPanel.id,
                              listItem.id,
                              value,
                            ),
                          size: "small" as const,
                        },
                        weight: {
                          value: listItem.weightValue,
                          placeholder: "weight...",
                          onChange: (value: string) =>
                            handleSelectListItemWeightChange(
                              detailPanel.id,
                              listItem.id,
                              value,
                            ),
                          size: "small" as const,
                        },
                      },
                      remove: {
                        onClick: () =>
                          handleRemoveSelectListItem(
                            detailPanel.id,
                            listItem.id,
                          ),
                      },
                    },
                  })),
                  add: {
                    label: { text: "Add ListItem:" },
                    onClick: () => handleAddSelectListItem(detailPanel.id),
                  },
                },
              },
            })),
            add: {
              label: { text: "Add Selector:" },
              onClick: () => handleAddSelectDetailPanel(grp.id),
            },
          },
        },
      })),
      add: {
        label: { text: "Add Select Group:" },
        onClick: () => handleAddSelectGrp(blocId),
      },
    };
  };

  const blocPanels = blocs.map((bloc) => {
    const isExpanded = expandedIds.has(bloc.id);

    return {
      key: bloc.id,
      panel: buildPanelForm(
        `Bloc ${bloc.id}:`,
        bloc.keyValue,
        bloc.labelValue,
        isExpanded,
        () => handleToggleExpanded(bloc.id),
        (value) => handleKeyChange(bloc.id, value),
        (value) => handleLabelChange(bloc.id, value),
        () => handleRemoveBloc(bloc.id),
      ),
      bloc: {
        panel: buildPanelForm(
          `Bloc ${bloc.id}:`,
          bloc.keyValue,
          bloc.labelValue,
          isExpanded,
          () => handleToggleExpanded(bloc.id),
          (value) => handleKeyChange(bloc.id, value),
          (value) => handleLabelChange(bloc.id, value),
          () => handleRemoveBloc(bloc.id),
        ),
        sectionSelector: buildSectionSelector(bloc.id, bloc.availableBlocTypes),
        ordersSection: buildOrdersSection(bloc.id),
        switchSection: buildSwitchSection(bloc.id),
        selectSection: buildSelectSection(bloc.id),
      },
    };
  });

  return {
    viewModel: {
      navigationLayout: {
        appBar: { onMenuOpen: handleMenuOpen },
        drawer: { open: drawerOpen, onClose: handleDrawerClose },
        title: { text: "ACMN-Configurations" },
        navigation: {
          linksAbove: NAV_ITEMS.filter(
            (item) => item.href !== pathname && item.href === "/configurations",
          ).map((item) => ({
            label: item.label,
            onClick: () => handleNavigate(item.href),
          })),
          label: (() => {
            const activeItem = NAV_ITEMS.find((item) => item.href === pathname);
            if (!activeItem) return undefined;
            return {
              text: `${activeItem.label}`,
              color: "success.main",
              fontWeight: "bold" as const,
            };
          })(),
          links: NAV_ITEMS.filter(
            (item) => item.href !== pathname && item.href !== "/configurations",
          ).map((item) => ({
            label: item.label,
            onClick: () => handleNavigate(item.href),
          })),
          configurations: {
            setLabel: { text: "Sets:" },
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
            nameLabel: { text: "Name:" },
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
          },
          onClick: handleAddBloc,
        },
        headerLabel: {
          text: "Configurations Form:",
        },
        addRowLabel: {
          text: "Add Bloc:",
        },
        addButton: {
          icon: "add",
          onClick: handleAddBloc,
        },
        panels: blocPanels,
      },
    },
  };
}
