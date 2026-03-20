"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsHandlers {
  todoDrawerOnToggle: () => void;
  todoOnPanelToggle: (id: string) => void;
  todoOnPanelKeyChange: (id: string, value: string) => void;
  todoOnPanelLabelChange: (id: string, value: string) => void;
  todoOnPanelDelete: (id: string) => void;
  todoOnPanelAdd: () => void;
}

export function useConfigurationsHandlers(_contexts: ConfigurationsContexts) {
  const todoDrawerOnToggle = () => {};
  const todoOnPanelToggle = (_id: string) => {};
  const todoOnPanelKeyChange = (_id: string, _value: string) => {};
  const todoOnPanelLabelChange = (_id: string, _value: string) => {};
  const todoOnPanelDelete = (_id: string) => {};
  const todoOnPanelAdd = () => {};

  const handlers: ConfigurationsHandlers = {
    todoDrawerOnToggle,
    todoOnPanelToggle,
    todoOnPanelKeyChange,
    todoOnPanelLabelChange,
    todoOnPanelDelete,
    todoOnPanelAdd,
  };

  return { handlers };
}
