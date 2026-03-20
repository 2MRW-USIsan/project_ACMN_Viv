"use client";

import { useConfigurationsService } from "@/hooks/configurations/state/useConfigurationsService";
import { useConfigurationsStateReducer, ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsStateReducer";

export type { ConfigurationsContexts };

export interface ConfigurationsContextReturns {
  contexts: ConfigurationsContexts;
}

export function useConfigurationsContext(): ConfigurationsContextReturns {
  const { fetchItem, request } = useConfigurationsService();
  const { state, action } = useConfigurationsStateReducer();

  const contexts: ConfigurationsContexts = {
    service: { fetchItem, request },
    reducer: { state, action },
  };

  return { contexts };
}
