"use client";

import type { PanelDataStateType } from "@/types/editor/panel";
import {
  fetchSaveDetail,
  fetchSaveList,
  registerSave,
} from "@/services/editorApiService";
import type { EditorFetchItem } from "./useEditorFetchReducer";
import { useEditorFetchReducer } from "./useEditorFetchReducer";
import { useEffect, useMemo } from "react";

export type { EditorFetchItem };

export type EditorRequest = {
  registerSave: (name: string, data: PanelDataStateType) => Promise<void>;
  loadSaveDetail: (id: string) => void;
};

export type EditorServiceReturn = {
  fetchItem: EditorFetchItem;
  request: EditorRequest;
};

export function useEditorService(): EditorServiceReturn {
  const {
    state,
    action: { setSaveList, setSaveDetail, incrementSaveListVersion, requestSaveDetail },
  } = useEditorFetchReducer();

  useEffect(() => {
    void fetchSaveList().then((list) => setSaveList(list));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.saveListVersion]);

  useEffect(() => {
    if (!state.saveDetailRequest) return;
    void fetchSaveDetail(state.saveDetailRequest.id).then((detail) =>
      setSaveDetail(detail),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.saveDetailRequest]);

  const fetchItem: EditorFetchItem = {
    saveList: state.saveList,
    saveDetail: state.saveDetail,
  };

  const request = useMemo(
    (): EditorRequest => ({
      registerSave: async (name, data) => {
        await registerSave(name, data);
        incrementSaveListVersion();
      },
      loadSaveDetail: (id) => {
        requestSaveDetail(id);
      },
    }),
    [incrementSaveListVersion, requestSaveDetail],
  );

  return { fetchItem, request };
}
