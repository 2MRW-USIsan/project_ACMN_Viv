"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";

export interface BlocPanelViewModel {
  id: string;
  key: string;
  label: string;
  isExpanded: boolean;
  onKeyChange: (value: string) => void;
  onLabelChange: (value: string) => void;
  onRemove: () => void;
  onToggleExpand: () => void;
}

export interface ConfigurationsViewModel {
  configSelector: {
    configSetOptions: string[];
    selectedConfigSet: string;
    onSelectConfigSet: (value: string) => void;
    onLoad: () => void;
  };
  configNameEditor: {
    configName: string;
    onConfigNameChange: (value: string) => void;
    onChangeName: () => void;
    hasChanges: boolean;
    onSave: () => void;
  };
  configPanelList: {
    panels: BlocPanelViewModel[];
    onAddPanel: () => void;
  };
}

export function useConfigurationsComposer(contexts: ConfigurationsContexts) {
  const { properties } = useConfigurationsProperties(contexts);
  const { handlers } = useConfigurationsHandlers(contexts);

  return {
    viewModel: {
      configSelector: {
        configSetOptions: properties.configSetOptions,
        selectedConfigSet: properties.selectedConfigSet,
        onSelectConfigSet: handlers.onSelectConfigSet,
        onLoad: handlers.onLoad,
      },
      configNameEditor: {
        configName: properties.configName,
        onConfigNameChange: handlers.onConfigNameChange,
        onChangeName: handlers.onChangeName,
        hasChanges: properties.hasChanges,
        onSave: handlers.onSave,
      },
      configPanelList: {
        panels: properties.panels.map((panel) => ({
          id: panel.id,
          key: panel.key,
          label: panel.label,
          isExpanded: panel.isExpanded,
          onKeyChange: (value: string) => handlers.onUpdatePanelKey(panel.id, value),
          onLabelChange: (value: string) => handlers.onUpdatePanelLabel(panel.id, value),
          onRemove: () => handlers.onRemovePanel(panel.id),
          onToggleExpand: () => handlers.onTogglePanel(panel.id),
        })),
        onAddPanel: handlers.onAddPanel,
      },
    } satisfies ConfigurationsViewModel,
  };
}
