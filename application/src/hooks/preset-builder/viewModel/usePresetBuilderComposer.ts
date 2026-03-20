"use client";

import { PresetBuilderContexts } from "@/hooks/preset-builder/state/usePresetBuilderContext";
import { usePresetBuilderProperties } from "@/hooks/preset-builder/viewModel/usePresetBuilderProperties";
import { usePresetBuilderHandlers } from "@/hooks/preset-builder/viewModel/usePresetBuilderHandlers";

export interface PresetBuilderViewModel {}

export function usePresetBuilderComposer(contexts: PresetBuilderContexts) {
  const { properties: _properties } = usePresetBuilderProperties(contexts);
  const { handlers: _handlers } = usePresetBuilderHandlers(contexts);

  return {
    viewModel: {} satisfies PresetBuilderViewModel,
  };
}
