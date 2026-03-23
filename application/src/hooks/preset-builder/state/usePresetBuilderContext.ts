"use client";

import { usePresetBuilderService } from "@/hooks/preset-builder/state/usePresetBuilderService";
import {
  usePresetBuilderStateReducer,
  PresetBuilderContexts,
} from "@/hooks/preset-builder/state/usePresetBuilderStateReducer";

export type { PresetBuilderContexts };

export interface PresetBuilderContextReturns {
  contexts: PresetBuilderContexts;
}

export function usePresetBuilderContext(): PresetBuilderContextReturns {
  const { fetchItem, request } = usePresetBuilderService();
  const { state, action } = usePresetBuilderStateReducer();

  const contexts: PresetBuilderContexts = {
    service: { fetchItem, request },
    reducer: { state, action },
  };

  return { contexts };
}
