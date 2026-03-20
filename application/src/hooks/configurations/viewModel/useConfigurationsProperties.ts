"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { SubPanelType, SubPanelItem } from "@/components/molecules/SubPanelSelectorMolecule";

export interface ConfigurationsProperties {
  todoTitle: string;
  todoDrawerOpen: boolean;
  todoRouteList: { label: string; href: string }[];
  todoPanelList: {
    id: string;
    panelKey: string;
    panelLabel: string;
    expanded: boolean;
    subPanels: Partial<Record<SubPanelType, SubPanelItem>>;
  }[];
}

export function useConfigurationsProperties(_contexts: ConfigurationsContexts) {
  const properties: ConfigurationsProperties = {
    todoTitle: "Configurations",
    todoDrawerOpen: false,
    todoRouteList: [
      { label: "Configurations", href: "/configurations" },
      { label: "Posting Clerk", href: "/posting-clerk" },
      { label: "Preset Builder", href: "/preset-builder" },
      { label: "Prompt Forger", href: "/prompt-forger" },
      { label: "Sample", href: "/sample" },
    ],
    todoPanelList: [],
  };

  return { properties };
}
