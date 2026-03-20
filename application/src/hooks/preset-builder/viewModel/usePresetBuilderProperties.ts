"use client";

import { PresetBuilderContexts } from "@/hooks/preset-builder/state/usePresetBuilderContext";

export interface PresetBuilderProperties {}

export function usePresetBuilderProperties(_contexts: PresetBuilderContexts) {
  const properties: PresetBuilderProperties = {};

  return { properties };
}
