"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsProperties {
  configOptions: string[];
  selectedConfig: string;
  configName: string;
  configValue: string;
  isLoading: boolean;
}

export function useConfigurationsProperties(contexts: ConfigurationsContexts) {
  const { state } = contexts.reducer;
  const { fetchItem } = contexts.service;

  const properties: ConfigurationsProperties = {
    configOptions: fetchItem.configOptions ?? [],
    selectedConfig: state.selectedConfig,
    configName: state.configName,
    configValue: state.configValue,
    isLoading: state.isLoading,
  };

  return { properties };
}
