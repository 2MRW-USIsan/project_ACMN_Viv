"use client";

import { SampleItem } from "@/types/sampleItem";
import { SampleContexts } from "@/hooks/sample/state/useSampleContext";

export interface SampleHandlers {
  onSelectItem: (item: SampleItem) => void;
  onClearSelection: () => void;
  onEditorTitleChange: (title: string) => void;
  onEditorDescriptionChange: (description: string) => void;
  onSave: () => Promise<void>;
  onDeleteItem: (id: string) => Promise<void>;
}

export function useSampleHandlers(contexts: SampleContexts) {
  const { action, state } = contexts.reducer;
  const { request } = contexts.service;

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
    action.selectItem(null);
    action.setIsLoading(false);
  };

  const handleOnSave = async (): Promise<void> => {
    if (state.selectedItem !== null) {
      await handleOnUpdateItem();
    } else {
      await handleOnCreateItem();
    }
  };

  const handleOnDeleteItem = async (id: string): Promise<void> => {
    action.setIsLoading(true);
    await request.deleteItem(id);
    if (state.selectedItem?.id === id) {
      action.selectItem(null);
    }
    action.setIsLoading(false);
  };

  const handlers: SampleHandlers = {
    onSelectItem: action.selectItem,
    onClearSelection: () => action.selectItem(null),
    onEditorTitleChange: action.setEditorTitle,
    onEditorDescriptionChange: action.setEditorDescription,
    onSave: handleOnSave,
    onDeleteItem: handleOnDeleteItem,
  };

  return { handlers };
}
