"use client";

import { useEffect } from "react";
import type { EditorContexts } from "@/hooks/editor/reducer/useEditorReducer";

export function useEditorEffects(contexts: EditorContexts): void {
  const { fetchItem } = contexts.service;
  const { action } = contexts.reducer;

  // When save detail is fetched, update panel state and clear loading flag
  useEffect(() => {
    if (fetchItem.saveDetail === null) return;
    action.panel.loadState(fetchItem.saveDetail.data);
    action.setLoadedState(fetchItem.saveDetail.data);
    action.setIsSaveLoading(false);
  }, [fetchItem.saveDetail, action]);
}
