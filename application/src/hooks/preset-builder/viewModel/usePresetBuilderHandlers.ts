"use client";

import { PresetBuilderContexts } from "@/hooks/preset-builder/state/usePresetBuilderContext";

export interface PresetBuilderHandlers {}

export function usePresetBuilderHandlers(_contexts: PresetBuilderContexts) {
  const handlers: PresetBuilderHandlers = {};

  return { handlers };
}
