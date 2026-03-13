"use client";

import type { PanelDataStateType } from "@/types/editor/panel";
import type { PanelSaveDetail, PanelSaveItem } from "@/types/editor/panelSave";
import { useMemo } from "react";

export type EditorFetchItem = {
  fetchSaveList: () => Promise<PanelSaveItem[]>;
  fetchSaveDetail: (id: string) => Promise<PanelSaveDetail>;
};

export type EditorRequest = {
  registerSave: (name: string, data: PanelDataStateType) => Promise<void>;
};

export type EditorServiceReturn = {
  fetchItem: EditorFetchItem;
  request: EditorRequest;
};

export function useEditorService(): EditorServiceReturn {
  const fetchItem = useMemo(
    (): EditorFetchItem => ({
      fetchSaveList: async () => {
        const res = await fetch("/api/panelSaves");
        if (!res.ok) throw new Error(`Failed to fetch save list: ${res.status}`);
        return (await res.json()) as PanelSaveItem[];
      },
      fetchSaveDetail: async (id) => {
        const res = await fetch(`/api/panelSaves/${id}`);
        if (!res.ok) throw new Error(`Failed to load save: ${res.status}`);
        return (await res.json()) as PanelSaveDetail;
      },
    }),
    [],
  );

  const request = useMemo(
    (): EditorRequest => ({
      registerSave: async (name, data) => {
        const res = await fetch("/api/panelSaves", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, data }),
        });
        if (!res.ok) throw new Error(`Failed to register save: ${res.status}`);
      },
    }),
    [],
  );

  return { fetchItem, request };
}
