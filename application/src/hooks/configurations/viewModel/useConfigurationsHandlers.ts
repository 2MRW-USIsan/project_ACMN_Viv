"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsHandlers {}

export function useConfigurationsHandlers(_contexts: ConfigurationsContexts) {
  const handlers: ConfigurationsHandlers = {};

  return { handlers };
}
