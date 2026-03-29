"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsHandlers {
  onConfigSelect: (config: string) => void;
  onConfigNameChange: (name: string) => void;
  onConfigValueChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function useConfigurationsHandlers(contexts: ConfigurationsContexts) {
  const { action } = contexts.reducer;

  const handlers: ConfigurationsHandlers = {
    onConfigSelect: action.setSelectedConfig,
    onConfigNameChange: action.setConfigName,
    onConfigValueChange: action.setConfigValue,
    onSave: () => {
      // 保存処理は工程3で追加する
    },
    onCancel: action.resetForm,
  };

  return { handlers };
}
