"use client";

import type { PanelDataStateType } from "@/types/editor/panel";
import type { PanelSaveDetail, PanelSaveItem } from "@/types/editor/panelSave";
import {
  fetchSaveDetail,
  fetchSaveList,
  registerSave,
} from "@/services/editorApiService";
import { useEffect, useMemo, useReducer } from "react";

export type EditorFetchItem = {
  saveList: PanelSaveItem[] | null;
  saveDetail: PanelSaveDetail | null;
};

export type EditorRequest = {
  registerSave: (name: string, data: PanelDataStateType) => Promise<void>;
  loadSaveDetail: (id: string) => void;
};

export type EditorServiceReturn = {
  fetchItem: EditorFetchItem;
  request: EditorRequest;
};

type ServiceState = {
  saveList: PanelSaveItem[] | null;
  saveDetail: PanelSaveDetail | null;
  saveListVersion: number;
  saveDetailRequest: { id: string; ver: number } | null;
};

type ServiceAction =
  | { type: "SET_SAVE_LIST"; payload: PanelSaveItem[] }
  | { type: "SET_SAVE_DETAIL"; payload: PanelSaveDetail | null }
  | { type: "INCREMENT_SAVE_LIST_VERSION" }
  | { type: "REQUEST_SAVE_DETAIL"; payload: string };

const initialState: ServiceState = {
  saveList: null,
  saveDetail: null,
  saveListVersion: 0,
  saveDetailRequest: null,
};

const serviceReducer = (state: ServiceState, action: ServiceAction): ServiceState => {
  const handlers: Record<ServiceAction["type"], () => ServiceState> = {
    SET_SAVE_LIST: () => ({
      ...state,
      saveList: (action as { type: "SET_SAVE_LIST"; payload: PanelSaveItem[] }).payload,
    }),
    SET_SAVE_DETAIL: () => ({
      ...state,
      saveDetail: (action as { type: "SET_SAVE_DETAIL"; payload: PanelSaveDetail | null }).payload,
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

export function useEditorService(): EditorServiceReturn {
  const [state, dispatch] = useReducer(serviceReducer, initialState);

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

  const request = useMemo(
    (): EditorRequest => ({
      registerSave: async (name, data) => {
        await registerSave(name, data);
        dispatch({ type: "INCREMENT_SAVE_LIST_VERSION" });
      },
      loadSaveDetail: (id) => {
        dispatch({ type: "REQUEST_SAVE_DETAIL", payload: id });
      },
    }),
    [],
  );

  const fetchItem: EditorFetchItem = {
    saveList: state.saveList,
    saveDetail: state.saveDetail,
  };
  return { fetchItem, request };
}
