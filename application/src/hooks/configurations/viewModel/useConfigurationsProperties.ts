"use client";

import { NavItem } from "@/types/navigation";
import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsProperties {
  isDrawerOpen: boolean;
  navTitle: string;
  navItems: NavItem[];
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
  };

  return { properties };
}
