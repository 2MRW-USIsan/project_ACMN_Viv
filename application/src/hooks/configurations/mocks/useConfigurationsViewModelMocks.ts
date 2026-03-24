"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { BlocItem, BlocItemData } from "@/types/configurationsItem";

// 暫定モックフック。ViewModel実装後に削除予定。実装ルール適用外。
export function useConfigurationsViewModelMocks() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const configOptions = ["Loadable Config...", "Config A", "Config B"];
  const [selectedSet, setSelectedSet] = useState("Loadable Config...");
  const [nameValue, setNameValue] = useState("Loadable Config...");
  const [blocItems, setBlocItems] = useState<BlocItemData[]>([
    { id: "1", shortLabel: "Label", longLabel: "Label", isExpanded: false },
    { id: "2", shortLabel: "Label", longLabel: "Label", isExpanded: false },
    { id: "3", shortLabel: "Label", longLabel: "Label", isExpanded: true },
    { id: "4", shortLabel: "Label", longLabel: "Label", isExpanded: false },
  ]);

  const handleRemoveItem = (id: string) => {
    setBlocItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleExpand = (id: string) => {
    setBlocItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  const handleAddBloc = () => {
    const newId = String(Date.now());
    setBlocItems((prev) => [
      ...prev,
      { id: newId, shortLabel: "", longLabel: "", isExpanded: false },
    ]);
  };

  const handleItemShortLabelChange = (id: string, value: string) => {
    setBlocItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, shortLabel: value } : item
      )
    );
  };

  const handleItemLongLabelChange = (id: string, value: string) => {
    setBlocItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, longLabel: value } : item
      )
    );
  };

  const blocItemViewModels: BlocItem[] = blocItems.map((item) => ({
    id: item.id,
    blocItem: {
      blocItem: item,
      handlers: {
        onRemoveItem: handleRemoveItem,
        onToggleExpand: handleToggleExpand,
        onItemShortLabelChange: handleItemShortLabelChange,
        onItemLongLabelChange: handleItemLongLabelChange,
      },
    },
  }));

  const viewModel: ConfigurationsViewModel = {
    navigation: {
      appBarTitle: "Configuration Page",
      isDrawerOpen,
      navItems: [
        {
          label: "Configurations Page",
          href: "/configurations",
          isActive: true,
        },
        {
          label: "Prompt-Forger Page",
          href: "/prompt-forger",
          isActive: false,
        },
        {
          label: "Preset-Builder Page",
          href: "/preset-builder",
          isActive: false,
        },
        {
          label: "Posting-Clerk Page",
          href: "/posting-clerk",
          isActive: false,
        },
      ],
      onMenuClick: () => setIsDrawerOpen((prev) => !prev),
      onNavItemClick: (href: string) => router.push(href),
    },
    configurations: {
      header: {
        isLoaded,
        sets: {
          options: configOptions,
          selectedSet,
          onSetChange: setSelectedSet,
          onLoad: () => setIsLoaded(true),
        },
        name: {
          nameValue,
          hasChanges: true,
          onNameBlur: setNameValue,
          onSave: () => {},
        },
      },
      blocPanelInfo: {
        frame: {
          label: { text: "Bloc Info Panels:", variant: "body2" },
        },
        blocs: {
          items: blocItemViewModels,
        },
        addPanel: {
          onAddBloc: handleAddBloc,
        },
      },
    },
  };

  return { viewModel };
}

