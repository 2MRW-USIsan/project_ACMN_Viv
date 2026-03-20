"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";

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
    }[];
    todoOnPanelToggle: (id: string) => void;
    todoOnPanelKeyChange: (id: string, value: string) => void;
    todoOnPanelLabelChange: (id: string, value: string) => void;
    todoOnPanelDelete: (id: string) => void;
    todoOnPanelAdd: () => void;
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
    },
  };

  return { viewModel };
}
