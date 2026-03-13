"use client";

import type { PanelDataStateType } from "@/types/editor/panel";
import type { PanelSaveDetail, PanelSaveItem } from "@/types/editor/panelSave";
import { useEffect, useMemo, useState } from "react";

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

export function useEditorService(): EditorServiceReturn {
  const [saveList, setSaveList] = useState<PanelSaveItem[] | null>(null);
  const [saveDetail, setSaveDetail] = useState<PanelSaveDetail | null>(null);
  const [saveListVersion, setSaveListVersion] = useState(0);
  const [saveDetailRequest, setSaveDetailRequest] = useState<{
    id: string;
    ver: number;
  } | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/panelSaves");
      if (!res.ok) throw new Error(`Failed to fetch save list: ${res.status}`);
      setSaveList((await res.json()) as PanelSaveItem[]);
    })();
  }, [saveListVersion]);

  useEffect(() => {
    if (!saveDetailRequest) return;
    void (async () => {
      const res = await fetch(`/api/panelSaves/${saveDetailRequest.id}`);
      if (!res.ok) throw new Error(`Failed to load save: ${res.status}`);
      setSaveDetail((await res.json()) as PanelSaveDetail);
    })();
  }, [saveDetailRequest]);

  const request = useMemo(
    (): EditorRequest => ({
      registerSave: async (name, data) => {
        const res = await fetch("/api/panelSaves", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, data }),
        });
        if (!res.ok) throw new Error(`Failed to register save: ${res.status}`);
        setSaveListVersion((v) => v + 1);
      },
      loadSaveDetail: (id) => {
        setSaveDetail(null);
        setSaveDetailRequest((prev) => ({ id, ver: (prev?.ver ?? 0) + 1 }));
      },
    }),
    [],
  );

  const fetchItem: EditorFetchItem = { saveList, saveDetail };
  return { fetchItem, request };
}
