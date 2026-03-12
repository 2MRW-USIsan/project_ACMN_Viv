"use client";

import { useEffect } from "react";
import type { ViewerContexts } from "@/hooks/viewer/useViewerReducer";

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

  // Load [オーダー用JSON情報] from DB on mount
  useEffect(() => {
    const fetchFromDb = async () => {
      const record = await fetchItem.fetchOrderJson();
      action.order.loadFromDb(record);
    };
    void fetchFromDb();
  }, [fetchItem, action.order]);
}
