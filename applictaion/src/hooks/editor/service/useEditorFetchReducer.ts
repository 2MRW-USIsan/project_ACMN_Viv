"use client";

import type { PanelSaveDetail, PanelSaveItem } from "@/types/editor/panelSave";
import { fetchSaveDetail, fetchSaveList } from "@/services/editorApiService";
import { useEffect, useReducer } from "react";

export type EditorFetchItem = {
  saveList: PanelSaveItem[] | null;
  saveDetail: PanelSaveDetail | null;
};

type EditorFetchState = {
  saveList: PanelSaveItem[] | null;
  saveDetail: PanelSaveDetail | null;
  saveListVersion: number;
  saveDetailRequest: { id: string; ver: number } | null;
};

type EditorFetchAction =
  | { type: "SET_SAVE_LIST"; payload: PanelSaveItem[] }
  | { type: "SET_SAVE_DETAIL"; payload: PanelSaveDetail | null }
  | { type: "INCREMENT_SAVE_LIST_VERSION" }
  | { type: "REQUEST_SAVE_DETAIL"; payload: string };

const initialState: EditorFetchState = {
  saveList: null,
  saveDetail: null,
  saveListVersion: 0,
  saveDetailRequest: null,
};

const editorFetchReducer = (
  state: EditorFetchState,
  action: EditorFetchAction,
): EditorFetchState => {
  const handlers: Record<EditorFetchAction["type"], () => EditorFetchState> = {
    SET_SAVE_LIST: () => ({
      ...state,
      saveList: (action as { type: "SET_SAVE_LIST"; payload: PanelSaveItem[] })
        .payload,
    }),
    SET_SAVE_DETAIL: () => ({
      ...state,
      saveDetail: (
        action as { type: "SET_SAVE_DETAIL"; payload: PanelSaveDetail | null }
      ).payload,
    }),
    INCREMENT_SAVE_LIST_VERSION: () => ({
      ...state,
      saveListVersion: state.saveListVersion + 1,
    }),
    REQUEST_SAVE_DETAIL: () => ({
      ...state,
      saveDetail: null,
      saveDetailRequest: {
        id: (action as { type: "REQUEST_SAVE_DETAIL"; payload: string }).payload,
        ver: (state.saveDetailRequest?.ver ?? 0) + 1,
      },
    }),
  };
  return handlers[action.type]?.() ?? state;
};

export type EditorFetchReducerReturn = {
  fetchItem: EditorFetchItem;
  incrementSaveListVersion: () => void;
  requestSaveDetail: (id: string) => void;
};

export function useEditorFetchReducer(): EditorFetchReducerReturn {
  const [state, dispatch] = useReducer(editorFetchReducer, initialState);

  useEffect(() => {
    void fetchSaveList().then((list) =>
      dispatch({ type: "SET_SAVE_LIST", payload: list }),
    );
  }, [state.saveListVersion]);

  useEffect(() => {
    if (!state.saveDetailRequest) return;
    void fetchSaveDetail(state.saveDetailRequest.id).then((detail) =>
      dispatch({ type: "SET_SAVE_DETAIL", payload: detail }),
    );
  }, [state.saveDetailRequest]);

  return {
    fetchItem: { saveList: state.saveList, saveDetail: state.saveDetail },
    incrementSaveListVersion: () =>
      dispatch({ type: "INCREMENT_SAVE_LIST_VERSION" }),
    requestSaveDetail: (id) =>
      dispatch({ type: "REQUEST_SAVE_DETAIL", payload: id }),
  };
}
