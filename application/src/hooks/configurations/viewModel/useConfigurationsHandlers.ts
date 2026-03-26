"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsHandlers {
  onSelectConfigSet: (value: string) => void;
  onLoad: () => void;
  onConfigNameChange: (value: string) => void;
  onChangeName: () => void;
  onSave: () => void;
  onAddPanel: () => void;
  onRemovePanel: (id: string) => void;
  onTogglePanel: (id: string) => void;
  onUpdatePanelKey: (id: string, key: string) => void;
  onUpdatePanelLabel: (id: string, label: string) => void;
}

export function useConfigurationsHandlers(contexts: ConfigurationsContexts) {
  const { action } = contexts.reducer;

  const handlers: ConfigurationsHandlers = {
    onSelectConfigSet: action.setSelectedConfigSet,
    onLoad: () => {
      // Backend integration is planned for a future phase
    },
    onConfigNameChange: action.setConfigName,
    onChangeName: () => {
      // Backend integration is planned for a future phase
    },
    onSave: () => {
      action.setHasChanges(false);
    },
    onAddPanel: action.addPanel,
    onRemovePanel: action.removePanel,
    onTogglePanel: action.togglePanel,
    onUpdatePanelKey: action.updatePanelKey,
    onUpdatePanelLabel: action.updatePanelLabel,
  };

  return { handlers };
}
