"use client";

import { useEffect } from "react";
import type { EditorContexts } from "@/hooks/editor/reducer/useEditorReducer";

export function useEditorInitialize(contexts: EditorContexts): void {
  const { fetchItem } = contexts.service;
  const { action } = contexts.reducer;

  useEffect(() => {
    void fetchItem.fetchSaveList().then((list) => {
      action.setSaveList(list);
    });
  }, [fetchItem, action]);
}
