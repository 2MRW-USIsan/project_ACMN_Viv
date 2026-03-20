"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsProperties {
  todoTitle: string;
  todoDrawerOpen: boolean;
  todoRouteList: { label: string; href: string }[];
  todoPanelList: {
    id: string;
    panelKey: string;
    panelLabel: string;
    expanded: boolean;
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
