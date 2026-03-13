"use client";

import type { PanelDataActionsType, PanelDataStateType } from "@/types/editor/panel";
import type { PanelSaveItem } from "@/types/editor/panelSave";
import { usePanelReducer } from "@/hooks/editor/reducer/usePanelReducer";
import { useState } from "react";
import type { EditorServiceReturn } from "@/hooks/editor/service/useEditorService";

export type EditorReducerState = {
  panel: PanelDataStateType;
  saveList: PanelSaveItem[];
  selectedSaveId: string;
  loadedState: PanelDataStateType | null;
  isSaveLoading: boolean;
  yamlOpen: boolean;
};

export type EditorReducerAction = {
  panel: PanelDataActionsType;
  setSaveList: (list: PanelSaveItem[]) => void;
  setSelectedSaveId: (id: string) => void;
  setLoadedState: (state: PanelDataStateType | null) => void;
  setIsSaveLoading: (loading: boolean) => void;
  setYamlOpen: (open: boolean) => void;
};

export type EditorReducerReturn = {
  state: EditorReducerState;
  action: EditorReducerAction;
};

export type EditorContexts = {
  service: EditorServiceReturn;
  reducer: EditorReducerReturn;
};

export function useEditorReducer(): EditorReducerReturn {
  const panelReducer = usePanelReducer();
  const [saveList, setSaveList] = useState<PanelSaveItem[]>([]);
  const [selectedSaveId, setSelectedSaveId] = useState("");
  const [loadedState, setLoadedState] = useState<PanelDataStateType | null>(null);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [yamlOpen, setYamlOpen] = useState(false);

  const state: EditorReducerState = {
    panel: panelReducer.state,
    saveList,
    selectedSaveId,
    loadedState,
    isSaveLoading,
    yamlOpen,
  };

  const action: EditorReducerAction = {
    panel: panelReducer.action,
    setSaveList,
    setSelectedSaveId,
    setLoadedState,
    setIsSaveLoading,
    setYamlOpen,
  };

  return { state, action };
}
