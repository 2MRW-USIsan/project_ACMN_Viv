"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsProperties {
  todoTitle: string;
  todoDrawerOpen: boolean;
  todoRouteList: { label: string; href: string }[];
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
  };

  return { properties };
}
