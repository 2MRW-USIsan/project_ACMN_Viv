"use client";

import { useEffect } from "react";
import { SampleContexts } from "@/hooks/sample/state/useSampleStateReducer";

export function useSampleInitialize(contexts: SampleContexts): void {
  const { fetchItem } = contexts.service;
  const { action } = contexts.reducer;

  useEffect(() => {
    if (fetchItem.itemList === null) return;
    action.setItemList(fetchItem.itemList);
  }, [fetchItem.itemList, action]);
}
