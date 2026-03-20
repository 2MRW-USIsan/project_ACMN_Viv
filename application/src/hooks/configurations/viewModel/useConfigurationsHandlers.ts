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
    subPanelId: string,
  ) => void;
  todoOnSubPanelKeyChange: (
    panelId: string,
    subType: SubPanelType,
    subPanelId: string,
    value: string,
  ) => void;
  todoOnSubPanelLabelChange: (
    panelId: string,
    subType: SubPanelType,
    subPanelId: string,
    value: string,
  ) => void;
  todoOnSubPanelContentChange: (
    panelId: string,
    subType: SubPanelType,
    subPanelId: string,
    value: string,
  ) => void;
  todoOnSubPanelDelete: (
    panelId: string,
    subType: SubPanelType,
    subPanelId: string,
  ) => void;
  todoOnSubPanelAdd: (panelId: string, subType: SubPanelType) => void;
  todoOnSelectItemToggleExpanded: (
    panelId: string,
    subPanelId: string,
    itemId: string,
  ) => void;
  todoOnSelectItemKeyChange: (
    panelId: string,
    subPanelId: string,
    itemId: string,
    value: string,
  ) => void;
  todoOnSelectItemLabelChange: (
    panelId: string,
    subPanelId: string,
    itemId: string,
    value: string,
  ) => void;
  todoOnSelectItemLabelTextChange: (
    panelId: string,
    subPanelId: string,
    itemId: string,
    value: string,
  ) => void;
  todoOnSelectItemPromptChange: (
    panelId: string,
    subPanelId: string,
    itemId: string,
    value: string,
  ) => void;
  todoOnSelectItemDelete: (
    panelId: string,
    subPanelId: string,
    itemId: string,
  ) => void;
  todoOnSelectItemAdd: (panelId: string, subPanelId: string) => void;
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
    _subPanelId: string,
  ) => {};
  const todoOnSubPanelKeyChange = (
    _panelId: string,
    _subType: SubPanelType,
    _subPanelId: string,
    _value: string,
  ) => {};
  const todoOnSubPanelLabelChange = (
    _panelId: string,
    _subType: SubPanelType,
    _subPanelId: string,
    _value: string,
  ) => {};
  const todoOnSubPanelContentChange = (
    _panelId: string,
    _subType: SubPanelType,
    _subPanelId: string,
    _value: string,
  ) => {};
  const todoOnSubPanelDelete = (
    _panelId: string,
    _subType: SubPanelType,
    _subPanelId: string,
  ) => {};
  const todoOnSubPanelAdd = (_panelId: string, _subType: SubPanelType) => {};
  const todoOnSelectItemToggleExpanded = (
    _panelId: string,
    _subPanelId: string,
    _itemId: string,
  ) => {};
  const todoOnSelectItemKeyChange = (
    _panelId: string,
    _subPanelId: string,
    _itemId: string,
    _value: string,
  ) => {};
  const todoOnSelectItemLabelChange = (
    _panelId: string,
    _subPanelId: string,
    _itemId: string,
    _value: string,
  ) => {};
  const todoOnSelectItemLabelTextChange = (
    _panelId: string,
    _subPanelId: string,
    _itemId: string,
    _value: string,
  ) => {};
  const todoOnSelectItemPromptChange = (
    _panelId: string,
    _subPanelId: string,
    _itemId: string,
    _value: string,
  ) => {};
  const todoOnSelectItemDelete = (
    _panelId: string,
    _subPanelId: string,
    _itemId: string,
  ) => {};
  const todoOnSelectItemAdd = (_panelId: string, _subPanelId: string) => {};

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
    todoOnSubPanelContentChange,
    todoOnSubPanelDelete,
    todoOnSubPanelAdd,
    todoOnSelectItemToggleExpanded,
    todoOnSelectItemKeyChange,
    todoOnSelectItemLabelChange,
    todoOnSelectItemLabelTextChange,
    todoOnSelectItemPromptChange,
    todoOnSelectItemDelete,
    todoOnSelectItemAdd,
  };

  return { handlers };
}
