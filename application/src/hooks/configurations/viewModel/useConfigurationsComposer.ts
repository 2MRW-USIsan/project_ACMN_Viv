"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";
import {
  SubPanelType,
  SubPanelItem,
} from "@/components/molecules/SubPanelSelectorMolecule";

export type { SubPanelType, SubPanelItem };

export interface ConfigurationsViewModel {
  appPage: {
    todoTitle: string;
    todoDrawerOpen: boolean;
    todoDrawerOnToggle: () => void;
    todoRouteList: { label: string; href: string }[];
  };
  yamlPanelList: {
    todoPanelList: {
      id: string;
      panelKey: string;
      panelLabel: string;
      expanded: boolean;
      subPanels: Partial<Record<SubPanelType, SubPanelItem>>;
    }[];
    todoOnPanelToggle: (id: string) => void;
    todoOnPanelKeyChange: (id: string, value: string) => void;
    todoOnPanelLabelChange: (id: string, value: string) => void;
    todoOnPanelDelete: (id: string) => void;
    todoOnPanelAdd: () => void;
    todoOnSubPanelToggleEnabled: (
      panelId: string,
      subType: SubPanelType,
    ) => void;
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
  };
}

export function useConfigurationsComposer(contexts: ConfigurationsContexts) {
  const { properties } = useConfigurationsProperties(contexts);
  const { handlers } = useConfigurationsHandlers(contexts);

  const viewModel: ConfigurationsViewModel = {
    appPage: {
      todoTitle: properties.todoTitle,
      todoDrawerOpen: properties.todoDrawerOpen,
      todoDrawerOnToggle: handlers.todoDrawerOnToggle,
      todoRouteList: properties.todoRouteList,
    },
    yamlPanelList: {
      todoPanelList: properties.todoPanelList,
      todoOnPanelToggle: handlers.todoOnPanelToggle,
      todoOnPanelKeyChange: handlers.todoOnPanelKeyChange,
      todoOnPanelLabelChange: handlers.todoOnPanelLabelChange,
      todoOnPanelDelete: handlers.todoOnPanelDelete,
      todoOnPanelAdd: handlers.todoOnPanelAdd,
      todoOnSubPanelToggleEnabled: handlers.todoOnSubPanelToggleEnabled,
      todoOnSubPanelToggleExpanded: handlers.todoOnSubPanelToggleExpanded,
      todoOnSubPanelKeyChange: handlers.todoOnSubPanelKeyChange,
      todoOnSubPanelLabelChange: handlers.todoOnSubPanelLabelChange,
    },
  };

  return { viewModel };
}
