import { SampleItem } from "@/types/sampleItem";
import { SampleReducerState } from "@/hooks/sample/state/useSampleStateReducer";

export const selectItem = (
  state: SampleReducerState,
  payload: { item: SampleItem | null },
): SampleReducerState => ({
  ...state,
  selectedItem: payload.item,
  editorTitle: payload.item?.title ?? "",
  editorDescription: payload.item?.description ?? "",
});

export const setEditorTitle = (
  state: SampleReducerState,
  payload: { title: string },
): SampleReducerState => ({
  ...state,
  editorTitle: payload.title,
});

export const setEditorDescription = (
  state: SampleReducerState,
  payload: { description: string },
): SampleReducerState => ({
  ...state,
  editorDescription: payload.description,
});

export const setIsLoading = (
  state: SampleReducerState,
  payload: { isLoading: boolean },
): SampleReducerState => ({
  ...state,
  isLoading: payload.isLoading,
});


