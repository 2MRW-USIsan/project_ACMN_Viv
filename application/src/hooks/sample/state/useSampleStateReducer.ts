"use client";

import { useReducer, useEffect } from "react";
import { SampleItem } from "@/types/sampleItem";
import {
  SampleFetchItem,
  SampleRequest,
} from "@/hooks/sample/state/useSampleService";
import {
  setItemList,
  addItem,
  updateItem,
  removeItem,
  selectItem,
  setEditorTitle,
  setEditorDescription,
  setIsLoading,
} from "@/utils/reducers/sample/sampleReducerUtils";

export interface SampleReducerState {
  itemList: SampleItem[];
  selectedItem: SampleItem | null;
  editorTitle: string;
  editorDescription: string;
  isLoading: boolean;
}

export interface SampleReducerAction {
  setItemList: (items: SampleItem[]) => void;
  addItem: (item: SampleItem) => void;
  updateItem: (item: SampleItem) => void;
  removeItem: (id: string) => void;
  selectItem: (item: SampleItem | null) => void;
  setEditorTitle: (title: string) => void;
  setEditorDescription: (description: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export interface SampleReducerReturn {
  state: SampleReducerState;
  action: SampleReducerAction;
}

export interface SampleContexts {
  service: {
    fetchItem: SampleFetchItem;
    request: SampleRequest;
  };
  reducer: {
    state: SampleReducerState;
    action: SampleReducerAction;
  };
}

export function useSampleStateReducer(): SampleReducerReturn {
  type STATE = SampleReducerState | undefined;

  type SET_ITEM_LIST = { items: SampleItem[] };
  type ADD_ITEM = { item: SampleItem };
  type UPDATE_ITEM = { item: SampleItem };
  type REMOVE_ITEM = { id: string };
  type SELECT_ITEM = { item: SampleItem | null };
  type SET_EDITOR_TITLE = { title: string };
  type SET_EDITOR_DESCRIPTION = { description: string };
  type SET_IS_LOADING = { isLoading: boolean };

  type ACTION =
    | { type: "SET_ITEM_LIST"; payload: SET_ITEM_LIST }
    | { type: "ADD_ITEM"; payload: ADD_ITEM }
    | { type: "UPDATE_ITEM"; payload: UPDATE_ITEM }
    | { type: "REMOVE_ITEM"; payload: REMOVE_ITEM }
    | { type: "SELECT_ITEM"; payload: SELECT_ITEM }
    | { type: "SET_EDITOR_TITLE"; payload: SET_EDITOR_TITLE }
    | { type: "SET_EDITOR_DESCRIPTION"; payload: SET_EDITOR_DESCRIPTION }
    | { type: "SET_IS_LOADING"; payload: SET_IS_LOADING }
    | { type: "INITIALIZE" };

  const initItem: SampleReducerState = {
    itemList: [],
    selectedItem: null,
    editorTitle: "",
    editorDescription: "",
    isLoading: false,
  };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "SET_ITEM_LIST":
        return state && setItemList(state, action.payload);
      case "ADD_ITEM":
        return state && addItem(state, action.payload);
      case "UPDATE_ITEM":
        return state && updateItem(state, action.payload);
      case "REMOVE_ITEM":
        return state && removeItem(state, action.payload);
      case "SELECT_ITEM":
        return state && selectItem(state, action.payload);
      case "SET_EDITOR_TITLE":
        return state && setEditorTitle(state, action.payload);
      case "SET_EDITOR_DESCRIPTION":
        return state && setEditorDescription(state, action.payload);
      case "SET_IS_LOADING":
        return state && setIsLoading(state, action.payload);
      case "INITIALIZE":
        return initItem;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  const handleSetItemList = (items: SampleItem[]) => {
    dispatch({ type: "SET_ITEM_LIST", payload: { items } });
  };

  const handleAddItem = (item: SampleItem) => {
    dispatch({ type: "ADD_ITEM", payload: { item } });
  };

  const handleUpdateItem = (item: SampleItem) => {
    dispatch({ type: "UPDATE_ITEM", payload: { item } });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const handleSelectItem = (item: SampleItem | null) => {
    dispatch({ type: "SELECT_ITEM", payload: { item } });
  };

  const handleSetEditorTitle = (title: string) => {
    dispatch({ type: "SET_EDITOR_TITLE", payload: { title } });
  };

  const handleSetEditorDescription = (description: string) => {
    dispatch({ type: "SET_EDITOR_DESCRIPTION", payload: { description } });
  };

  const handleSetIsLoading = (isLoading: boolean) => {
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading } });
  };

  return {
    state: state ?? initItem,
    action: {
      setItemList: handleSetItemList,
      addItem: handleAddItem,
      updateItem: handleUpdateItem,
      removeItem: handleRemoveItem,
      selectItem: handleSelectItem,
      setEditorTitle: handleSetEditorTitle,
      setEditorDescription: handleSetEditorDescription,
      setIsLoading: handleSetIsLoading,
    },
  };
}
