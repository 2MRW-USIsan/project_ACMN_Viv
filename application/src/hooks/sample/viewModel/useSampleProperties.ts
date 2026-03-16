"use client";

import { SampleItem } from "@/types/sampleItem";
import { SampleContexts } from "@/hooks/sample/state/useSampleContext";

export interface SampleProperties {
  itemList: SampleItem[];
  selectedItem: SampleItem | null;
  editorTitle: string;
  editorDescription: string;
  isLoading: boolean;
  isEditing: boolean;
}

export function useSampleProperties(contexts: SampleContexts) {
  const { state } = contexts.reducer;

  const properties: SampleProperties = {
    itemList: state.itemList,
    selectedItem: state.selectedItem,
    editorTitle: state.editorTitle,
    editorDescription: state.editorDescription,
    isLoading: state.isLoading,
    isEditing: state.selectedItem !== null,
  };

  return { properties };
}
