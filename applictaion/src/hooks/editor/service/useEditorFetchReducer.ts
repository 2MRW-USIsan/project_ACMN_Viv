"use client";

import type { PanelSaveDetail, PanelSaveItem } from "@/types/editor/panelSave";
import {
  incrementSaveListVersion,
  requestSaveDetail,
} from "@/utils/reducers/editor/editorFetchReducerUtils";
import { useEffect, useReducer } from "react";

export type EditorFetchItem = {
  saveList: PanelSaveItem[] | null;
  saveDetail: PanelSaveDetail | null;
};

export type EditorFetchReducerState = {
  saveList: PanelSaveItem[] | null;
  saveDetail: PanelSaveDetail | null;
  saveListVersion: number;
  saveDetailRequest: { id: string; ver: number } | null;
};

export type EditorFetchReducerAction = {
  setSaveList: (list: PanelSaveItem[]) => void;
  setSaveDetail: (detail: PanelSaveDetail | null) => void;
  incrementSaveListVersion: () => void;
  requestSaveDetail: (id: string) => void;
};

export interface EditorFetchReducerReturn {
  state: EditorFetchReducerState;
  action: EditorFetchReducerAction;
}

export function useEditorFetchReducer(): EditorFetchReducerReturn {
  type STATE = EditorFetchReducerState | undefined;

  type SET_SAVE_LIST = PanelSaveItem[];
  type SET_SAVE_DETAIL = PanelSaveDetail | null;
  type REQUEST_SAVE_DETAIL = { id: string };

  type ACTION =
    | { type: "SET_SAVE_LIST"; payload: SET_SAVE_LIST }
    | { type: "SET_SAVE_DETAIL"; payload: SET_SAVE_DETAIL }
    | { type: "INCREMENT_SAVE_LIST_VERSION" }
    | { type: "REQUEST_SAVE_DETAIL"; payload: REQUEST_SAVE_DETAIL }
    | { type: "INITIALIZE" };

  const initItem: EditorFetchReducerState = {
    saveList: null,
    saveDetail: null,
    saveListVersion: 0,
    saveDetailRequest: null,
  };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "SET_SAVE_LIST":
        return state && { ...state, saveList: action.payload };
      case "SET_SAVE_DETAIL":
        return state && { ...state, saveDetail: action.payload };
      case "INCREMENT_SAVE_LIST_VERSION":
        return state && incrementSaveListVersion(state);
      case "REQUEST_SAVE_DETAIL":
        return state && requestSaveDetail(state, action.payload);
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

  const handleSetSaveList = (list: PanelSaveItem[]) =>
    dispatch({ type: "SET_SAVE_LIST", payload: list });
  const handleSetSaveDetail = (detail: PanelSaveDetail | null) =>
    dispatch({ type: "SET_SAVE_DETAIL", payload: detail });
  const handleIncrementSaveListVersion = () =>
    dispatch({ type: "INCREMENT_SAVE_LIST_VERSION" });
  const handleRequestSaveDetail = (id: string) =>
    dispatch({ type: "REQUEST_SAVE_DETAIL", payload: { id } });

  return {
    state: state ?? initItem,
    action: {
      setSaveList: handleSetSaveList,
      setSaveDetail: handleSetSaveDetail,
      incrementSaveListVersion: handleIncrementSaveListVersion,
      requestSaveDetail: handleRequestSaveDetail,
    },
  };
}
