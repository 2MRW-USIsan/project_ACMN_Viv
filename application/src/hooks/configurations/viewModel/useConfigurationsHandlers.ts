"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { SubPanelType } from "@/components/molecules/SubPanelSelectorMolecule";

export interface ConfigurationsHandlers {
  todoDrawerOnToggle: () => void;
  todoOnPanelToggle: (id: string) => void;
  todoOnPanelKeyChange: (id: string, value: string) => void;
  todoOnPanelLabelChange: (id: string, value: string) => void;
  todoOnPanelDelete: (id: string) => void;
  todoOnPanelAdd: () => void;
  todoOnSubPanelToggleEnabled: (panelId: string, subType: SubPanelType) => void;
  todoOnSubPanelToggleExpanded: (
    panelId: string,
    subType: SubPanelType,
  ) => void;
  todoOnSubPanelKeyChange: (
    panelId: string,
    subType: SubPanelType,
    value: string,
  ) => void;
  todoOnSubPanelLabelChange: (
    panelId: string,
    subType: SubPanelType,
    value: string,
  ) => void;
}

export function useConfigurationsHandlers(_contexts: ConfigurationsContexts) {
  const todoDrawerOnToggle = () => {};
  const todoOnPanelToggle = (_id: string) => {};
  const todoOnPanelKeyChange = (_id: string, _value: string) => {};
  const todoOnPanelLabelChange = (_id: string, _value: string) => {};
  const todoOnPanelDelete = (_id: string) => {};
  const todoOnPanelAdd = () => {};
  const todoOnSubPanelToggleEnabled = (
    _panelId: string,
    _subType: SubPanelType,
  ) => {};
  const todoOnSubPanelToggleExpanded = (
    _panelId: string,
    _subType: SubPanelType,
  ) => {};
  const todoOnSubPanelKeyChange = (
    _panelId: string,
    _subType: SubPanelType,
    _value: string,
  ) => {};
  const todoOnSubPanelLabelChange = (
    _panelId: string,
    _subType: SubPanelType,
    _value: string,
  ) => {};

  const handlers: ConfigurationsHandlers = {
    todoDrawerOnToggle,
    todoOnPanelToggle,
    todoOnPanelKeyChange,
    todoOnPanelLabelChange,
    todoOnPanelDelete,
    todoOnPanelAdd,
    todoOnSubPanelToggleEnabled,
    todoOnSubPanelToggleExpanded,
    todoOnSubPanelKeyChange,
    todoOnSubPanelLabelChange,
  };

  return { handlers };
}
