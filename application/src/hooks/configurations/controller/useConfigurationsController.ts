"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsInitialize } from "@/hooks/configurations/controller/useConfigurationsInitialize";
import { useConfigurationsEffects } from "@/hooks/configurations/controller/useConfigurationsEffects";

export function useConfigurationsController(
  contexts: ConfigurationsContexts,
): void {
  useConfigurationsInitialize(contexts);
  useConfigurationsEffects(contexts);
}
