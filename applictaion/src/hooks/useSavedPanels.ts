"use client";

import type { PanelDataStateType } from "@/types/panel";
import type { PanelSaveDetail, PanelSaveItem } from "@/types/panelSave";
import { useCallback, useEffect, useMemo, useState } from "react";

export type SavedPanelsActions = {
  selectSave: (id: string) => void;
  loadSave: () => Promise<void>;
  registerSave: (name: string, data: PanelDataStateType) => Promise<void>;
  refreshList: () => Promise<void>;
  reselectSave: () => void;
};

type Returns = {
  saveList: PanelSaveItem[];
  selectedSaveId: string;
  loadedState: PanelDataStateType | null;
  isLoading: boolean;
  actions: SavedPanelsActions;
};

export function useSavedPanels(
  loadStateFn: (state: PanelDataStateType) => void,
): Returns {
  const [saveList, setSaveList] = useState<PanelSaveItem[]>([]);
  const [selectedSaveId, setSelectedSaveId] = useState("");
  const [loadedState, setLoadedState] = useState<PanelDataStateType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const refreshList = useCallback(async () => {
    const res = await fetch("/api/panelSaves");
    if (!res.ok) {
      throw new Error(`Failed to fetch save list: ${res.status}`);
    }
    const data = (await res.json()) as PanelSaveItem[];
    setSaveList(data);
  }, []);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const actions = useMemo(
    (): SavedPanelsActions => ({
      selectSave: (id) => setSelectedSaveId(id),
      loadSave: async () => {
        if (!selectedSaveId) return;
        setIsLoading(true);
        try {
          const res = await fetch(`/api/panelSaves/${selectedSaveId}`);
          if (!res.ok) {
            throw new Error(`Failed to load save: ${res.status}`);
          }
          const detail = (await res.json()) as PanelSaveDetail;
          loadStateFn(detail.data);
          setLoadedState(detail.data);
        } finally {
          setIsLoading(false);
        }
      },
      reselectSave: () => {
        setSelectedSaveId("");
        setLoadedState(null);
      },
      registerSave: async (name, data) => {
        const res = await fetch("/api/panelSaves", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, data }),
        });
        if (!res.ok) {
          throw new Error(`Failed to register save: ${res.status}`);
        }
        await refreshList();
      },
      refreshList,
    }),
    [selectedSaveId, loadStateFn, refreshList],
  );

  return { saveList, selectedSaveId, loadedState, isLoading, actions };
}
