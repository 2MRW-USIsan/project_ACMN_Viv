"use client";

import { usePresetBuilderFetchReducer } from "@/hooks/preset-builder/state/usePresetBuilderFetchReducer";

export interface PresetBuilderFetchItem {}

export interface PresetBuilderRequest {}

export interface PresetBuilderServiceReturns {
  fetchItem: PresetBuilderFetchItem;
  request: PresetBuilderRequest;
}

export function usePresetBuilderService(): PresetBuilderServiceReturns {
  usePresetBuilderFetchReducer();

  return {
    fetchItem: {},
    request: {},
  };
}
