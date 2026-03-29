"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";

export interface ConfigurationsViewModel {
  navigation: {
    configurations: {
      configOptions: string[];
      selectedConfig: string;
      onConfigSelect: (config: string) => void;
      form: {
        name: string;
        value: string;
        onNameChange: (name: string) => void;
        onValueChange: (value: string) => void;
        onSave: () => void;
        onCancel: () => void;
        isLoading: boolean;
      };
    };
  };
}

export function useConfigurationsComposer(contexts: ConfigurationsContexts) {
  const { properties } = useConfigurationsProperties(contexts);
  const { handlers } = useConfigurationsHandlers(contexts);

  return {
    viewModel: {
      navigation: {
        configurations: {
          configOptions: properties.configOptions,
          selectedConfig: properties.selectedConfig,
          onConfigSelect: handlers.onConfigSelect,
          form: {
            name: properties.configName,
            value: properties.configValue,
            onNameChange: handlers.onConfigNameChange,
            onValueChange: handlers.onConfigValueChange,
            onSave: handlers.onSave,
            onCancel: handlers.onCancel,
            isLoading: properties.isLoading,
          },
        },
      },
    } satisfies ConfigurationsViewModel,
  };
}
