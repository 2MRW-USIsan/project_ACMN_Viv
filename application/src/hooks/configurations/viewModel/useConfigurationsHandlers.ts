"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsHandlers {
  todoDrawerOnToggle: () => void;
  todoOnPanelToggle: (id: string) => void;
  todoOnPanelAdd: () => void;
}

export function useConfigurationsHandlers(_contexts: ConfigurationsContexts) {
  const todoDrawerOnToggle = () => {};
  const todoOnPanelToggle = (_id: string) => {};
  const todoOnPanelAdd = () => {};

  const handlers: ConfigurationsHandlers = {
    todoDrawerOnToggle,
    todoOnPanelToggle,
    todoOnPanelAdd,
  };

  return { handlers };
}
