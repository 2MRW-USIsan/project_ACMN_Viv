"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { BlocPanelState } from "@/hooks/configurations/state/useConfigurationsStateReducer";

const CONFIG_SET_OPTIONS = ["Config Set A", "Config Set B", "Config Set C"];

export interface ConfigurationsProperties {
  configSetOptions: string[];
  selectedConfigSet: string;
  configName: string;
  hasChanges: boolean;
  panels: BlocPanelState[];
}

export function useConfigurationsProperties(contexts: ConfigurationsContexts) {
  const { state } = contexts.reducer;

  const properties: ConfigurationsProperties = {
    configSetOptions: CONFIG_SET_OPTIONS,
    selectedConfigSet: state.selectedConfigSet,
    configName: state.configName,
    hasChanges: state.hasChanges,
    panels: state.panels,
  };

  return { properties };
}
