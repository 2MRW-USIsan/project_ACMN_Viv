"use client";

import { useEffect } from "react";
import type { ViewerContexts } from "@/hooks/viewer/reducer/useViewerReducer";

const YAML_STORAGE_KEY = "acmn_yaml_content";

const loadYamlFromStorage = (): string => {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(YAML_STORAGE_KEY) ?? "";
};

export function useViewerInitialize(contexts: ViewerContexts): void {
  const { fetchItem } = contexts.service;
  const { action } = contexts.reducer;

  // Load YAML from localStorage and generate initial request JSON
  useEffect(() => {
    const yaml = loadYamlFromStorage();
    action.request.loadYaml(yaml);
  }, [action.request]);

  // React to fetched [オーダー用JSON情報] state from service
  useEffect(() => {
    action.order.loadFromDb(fetchItem.orderJson);
  }, [fetchItem.orderJson, action.order]);
}
