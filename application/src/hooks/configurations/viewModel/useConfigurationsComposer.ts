"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";
import { AppPageOrganism } from "@/components/organisms/AppPageOrganism";
import { YamlPanelListOrganism } from "@/components/organisms/YamlPanelListOrganism";
import type { ComponentProps } from "react";

type AppPageProps = ComponentProps<typeof AppPageOrganism>["props"];
type YamlPanelListProps = ComponentProps<typeof YamlPanelListOrganism>["props"];

export interface ConfigurationsViewModel {
  appPage: AppPageProps;
  yamlPanelList: YamlPanelListProps;
}

export function useConfigurationsComposer(contexts: ConfigurationsContexts) {
  const { properties } = useConfigurationsProperties(contexts);
  const { handlers: _handlers } = useConfigurationsHandlers(contexts);

  const viewModel: ConfigurationsViewModel = {
    appPage: {
      todoTitle: properties.todoTitle,
      todoDrawerOpen: properties.todoDrawerOpen,
      todoDrawerOnToggle: () => undefined,
      todoRouteList: properties.todoRouteList,
    },
    yamlPanelList: {
      panelListProps: {
        headingText: "YAML Panels:",
        todoOnPanelAdd: () => undefined,
        hasItems: false,
      },
      todoPanelList: [],
    },
  };

  return { viewModel };
}
