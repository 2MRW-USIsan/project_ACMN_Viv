"use client";

import { usePresetBuilderContext } from "@/hooks/preset-builder/state/usePresetBuilderContext";
import { usePresetBuilderController } from "@/hooks/preset-builder/controller/usePresetBuilderController";
import { usePresetBuilderComposer, PresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderComposer";

export type { PresetBuilderViewModel };

interface PresetBuilderViewModelReturns {
  viewModel: PresetBuilderViewModel;
}

export function usePresetBuilderViewModel(): PresetBuilderViewModelReturns {
  const { contexts } = usePresetBuilderContext();

  usePresetBuilderController(contexts);
  const { viewModel } = usePresetBuilderComposer(contexts);

  return { viewModel };
}
