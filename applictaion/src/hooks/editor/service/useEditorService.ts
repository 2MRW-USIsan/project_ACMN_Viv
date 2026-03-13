"use client";

import type { PanelDataStateType } from "@/types/editor/panel";
import {
  registerSave,
} from "@/services/editorApiService";
import type { EditorFetchItem } from "./useEditorFetchReducer";
import { useEditorFetchReducer } from "./useEditorFetchReducer";
import { useMemo } from "react";

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
  const { fetchItem, incrementSaveListVersion, requestSaveDetail } =
    useEditorFetchReducer();

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
