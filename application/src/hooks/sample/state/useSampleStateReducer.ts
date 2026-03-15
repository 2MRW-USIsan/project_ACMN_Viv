"use client";

import { useReducer, useEffect } from "react";
import { SampleItem } from "@/types/sampleItem";
import { SampleFetchItem, SampleRequest } from "@/hooks/sample/state/useSampleService";
import {
  selectItem,
  setEditorTitle,
  setEditorDescription,
  setIsLoading,
} from "@/utils/reducers/sample/sampleReducerUtils";

export interface SampleReducerState {
  selectedItem: SampleItem | null;
  editorTitle: string;
  editorDescription: string;
  isLoading: boolean;
}

export interface SampleReducerAction {
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

  type SELECT_ITEM = { item: SampleItem | null };
  type SET_EDITOR_TITLE = { title: string };
  type SET_EDITOR_DESCRIPTION = { description: string };
  type SET_IS_LOADING = { isLoading: boolean };

  type ACTION =
    | { type: "SELECT_ITEM"; payload: SELECT_ITEM }
    | { type: "SET_EDITOR_TITLE"; payload: SET_EDITOR_TITLE }
    | { type: "SET_EDITOR_DESCRIPTION"; payload: SET_EDITOR_DESCRIPTION }
    | { type: "SET_IS_LOADING"; payload: SET_IS_LOADING }
    | { type: "INITIALIZE" };

  const initItem: SampleReducerState = {
    selectedItem: null,
    editorTitle: "",
    editorDescription: "",
    isLoading: false,
  };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
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
      selectItem: handleSelectItem,
      setEditorTitle: handleSetEditorTitle,
      setEditorDescription: handleSetEditorDescription,
      setIsLoading: handleSetIsLoading,
    },
  };
}
