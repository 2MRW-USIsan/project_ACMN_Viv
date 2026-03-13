"use client";

import { useEffect } from "react";
import type { EditorContexts } from "@/hooks/editor/reducer/useEditorReducer";

export function useEditorInitialize(contexts: EditorContexts): void {
  const { fetchItem } = contexts.service;
  const { action } = contexts.reducer;

  useEffect(() => {
    if (fetchItem.saveList === null) return;
    action.setSaveList(fetchItem.saveList);
  }, [fetchItem.saveList, action]);
}
