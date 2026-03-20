"use client";

import { PresetBuilderContexts } from "@/hooks/preset-builder/state/usePresetBuilderContext";
import { usePresetBuilderInitialize } from "@/hooks/preset-builder/controller/usePresetBuilderInitialize";
import { usePresetBuilderEffects } from "@/hooks/preset-builder/controller/usePresetBuilderEffects";

export function usePresetBuilderController(contexts: PresetBuilderContexts): void {
  usePresetBuilderInitialize(contexts);
  usePresetBuilderEffects(contexts);
}
