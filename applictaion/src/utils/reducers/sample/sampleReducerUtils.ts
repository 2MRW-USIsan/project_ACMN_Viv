import { SampleItem } from "@/types/sampleItem";
import { SampleReducerState } from "@/hooks/sample/state/useSampleStateReducer";

export const setItemList = (
  state: SampleReducerState,
  payload: { items: SampleItem[] },
): SampleReducerState => ({
  ...state,
  itemList: payload.items,
});

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

export const addItem = (
  state: SampleReducerState,
  payload: { item: SampleItem },
): SampleReducerState => ({
  ...state,
  itemList: [...state.itemList, payload.item],
});

export const updateItem = (
  state: SampleReducerState,
  payload: { item: SampleItem },
): SampleReducerState => ({
  ...state,
  itemList: state.itemList.map((i) =>
    i.id === payload.item.id ? payload.item : i,
  ),
  selectedItem: null,
  editorTitle: "",
  editorDescription: "",
});

export const removeItem = (
  state: SampleReducerState,
  payload: { id: string },
): SampleReducerState => ({
  ...state,
  itemList: state.itemList.filter((i) => i.id !== payload.id),
  selectedItem:
    state.selectedItem?.id === payload.id ? null : state.selectedItem,
  editorTitle:
    state.selectedItem?.id === payload.id ? "" : state.editorTitle,
  editorDescription:
    state.selectedItem?.id === payload.id ? "" : state.editorDescription,
});
