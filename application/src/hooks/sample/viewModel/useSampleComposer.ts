"use client";

import { SampleItem } from "@/types/sampleItem";
import { SampleContexts } from "@/hooks/sample/state/useSampleContext";
import { useSampleProperties } from "@/hooks/sample/viewModel/useSampleProperties";
import { useSampleHandlers } from "@/hooks/sample/viewModel/useSampleHandlers";

export interface SampleViewModel {
  itemList: {
    items: SampleItem[];
    selectedItem: SampleItem | null;
    isLoading: boolean;
    onSelectItem: (item: SampleItem) => void;
    onDeleteItem: (id: string) => Promise<void>;
  };
  editor: {
    title: string;
    description: string;
    isEditing: boolean;
    isLoading: boolean;
    onTitleChange: (title: string) => void;
    onDescriptionChange: (description: string) => void;
    onSave: () => Promise<void>;
    onCancel: () => void;
  };
}

export function useSampleComposer(contexts: SampleContexts) {
  const { properties } = useSampleProperties(contexts);
  const { handlers } = useSampleHandlers(contexts);

  return {
    viewModel: {
      itemList: {
        items: properties.itemList,
        selectedItem: properties.selectedItem,
        isLoading: properties.isLoading,
        onSelectItem: handlers.onSelectItem,
        onDeleteItem: handlers.onDeleteItem,
      },
      editor: {
        title: properties.editorTitle,
        description: properties.editorDescription,
        isEditing: properties.isEditing,
        isLoading: properties.isLoading,
        onTitleChange: handlers.onEditorTitleChange,
        onDescriptionChange: handlers.onEditorDescriptionChange,
        onSave: handlers.onSave,
        onCancel: handlers.onClearSelection,
      },
    } satisfies SampleViewModel,
  };
}
