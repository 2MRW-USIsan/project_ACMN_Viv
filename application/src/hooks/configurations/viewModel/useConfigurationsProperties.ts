"use client";

import { NavItem } from "@/types/navigation";
import { BlocItem } from "@/types/configurationsItem";
import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsProperties {
  isDrawerOpen: boolean;
  navTitle: string;
  navItems: NavItem[];
  sets: {
    options: string[];
    selectedSet: string;
  };
  name: {
    nameValue: string;
    hasChanges: boolean;
  };
  blocItems: BlocItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Configurations Page", href: "/configurations", isActive: true },
  { label: "Prompt-Forger Page", href: "/prompt-forger", isActive: false },
  { label: "Preset-Builder Page", href: "/preset-builder", isActive: false },
  { label: "Posting-Clerk Page", href: "/posting-clerk", isActive: false },
];

export function useConfigurationsProperties(contexts: ConfigurationsContexts) {
  const { state } = contexts.reducer;

  const properties: ConfigurationsProperties = {
    isDrawerOpen: state.isDrawerOpen,
    navTitle: "Configuration Page",
    navItems: NAV_ITEMS,
    // 工程3で状態管理と連携予定
    sets: { options: [], selectedSet: "" },
    name: { nameValue: "", hasChanges: false },
    blocItems: [],
  };

  return { properties };
}
