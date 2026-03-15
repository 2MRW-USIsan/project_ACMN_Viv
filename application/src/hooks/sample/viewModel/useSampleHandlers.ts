"use client";

import { SampleItem } from "@/types/sampleItem";
import { SampleContexts } from "@/hooks/sample/state/useSampleStateReducer";

export interface SampleHandlers {
  onSelectItem: (item: SampleItem) => void;
  onClearSelection: () => void;
  onEditorTitleChange: (title: string) => void;
  onEditorDescriptionChange: (description: string) => void;
  onCreateItem: () => Promise<void>;
  onUpdateItem: () => Promise<void>;
  onDeleteItem: (id: string) => Promise<void>;
}

export function useSampleHandlers(contexts: SampleContexts) {
  const { action } = contexts.reducer;
  const { request } = contexts.service;
  const { state } = contexts.reducer;

  const handleOnCreateItem = async (): Promise<void> => {
    if (!state.editorTitle.trim()) return;
    action.setIsLoading(true);
    await request.createItem(state.editorTitle, state.editorDescription);
    action.setIsLoading(false);
    action.setEditorTitle("");
    action.setEditorDescription("");
  };

  const handleOnUpdateItem = async (): Promise<void> => {
    if (!state.selectedItem || !state.editorTitle.trim()) return;
    action.setIsLoading(true);
    await request.updateItem(
      state.selectedItem.id,
      state.editorTitle,
      state.editorDescription,
    );
    action.setIsLoading(false);
  };

  const handleOnDeleteItem = async (id: string): Promise<void> => {
    action.setIsLoading(true);
    await request.deleteItem(id);
    action.setIsLoading(false);
  };

  const handlers: SampleHandlers = {
    onSelectItem: action.selectItem,
    onClearSelection: () => action.selectItem(null),
    onEditorTitleChange: action.setEditorTitle,
    onEditorDescriptionChange: action.setEditorDescription,
    onCreateItem: handleOnCreateItem,
    onUpdateItem: handleOnUpdateItem,
    onDeleteItem: handleOnDeleteItem,
  };

  return { handlers };
}
