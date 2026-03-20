"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigurationsViewModel {
  // ViewModel の詳細は工程2〜3で追加する
}

export function useConfigurationsComposer(contexts: ConfigurationsContexts) {
  const { properties: _properties } = useConfigurationsProperties(contexts);
  const { handlers: _handlers } = useConfigurationsHandlers(contexts);

  return {
    viewModel: {} satisfies ConfigurationsViewModel,
  };
}
