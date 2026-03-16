"use client";

import { useEffect } from "react";
import { SampleContexts } from "@/hooks/sample/state/useSampleContext";

export function useSampleInitialize(contexts: SampleContexts): void {
  const { fetchItem } = contexts.service;
  const { action } = contexts.reducer;

  // [初期化] itemList の取得完了時に Reducer の itemList 状態へ反映する
  useEffect(() => {
    if (fetchItem.itemList === null) return;
    action.setItemList(fetchItem.itemList);
  }, [fetchItem.itemList, action]);
}
