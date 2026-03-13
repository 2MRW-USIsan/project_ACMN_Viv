"use client";

import type { BlocViewItem } from "@/types/editor/bloc";
import type { PanelSaveItem } from "@/types/editor/panelSave";
import type { EditorContexts } from "@/hooks/editor/reducer/useEditorReducer";
import { usePanelData } from "@/hooks/editor/reducer/usePanelData";
import { generateYaml } from "@/utils/generateYaml";
import { useMemo } from "react";

export type EditorProperties = {
  panelData: BlocViewItem[];
  saveList: PanelSaveItem[];
  selectedSaveId: string;
  isSaveLoading: boolean;
  isLoaded: boolean;
  loadedSaveName: string;
  yamlOpen: boolean;
  yaml: string;
  hasDiff: boolean;
};

export function useEditorProperties(contexts: EditorContexts): EditorProperties {
  const { state, action } = contexts.reducer;

  const panelData = usePanelData({ state: state.panel, actions: action.panel });

  const hasDiff = useMemo(
    () =>
      state.loadedState !== null &&
      JSON.stringify(state.panel) !== JSON.stringify(state.loadedState),
    [state.panel, state.loadedState],
  );

  const isLoaded = state.loadedState !== null;

  const loadedSaveName = useMemo(
    () =>
      state.saveList.find((s) => s.id === state.selectedSaveId)?.name ?? "",
    [state.saveList, state.selectedSaveId],
  );

  const yaml = useMemo(() => generateYaml(state.panel), [state.panel]);

  return {
    panelData,
    saveList: state.saveList,
    selectedSaveId: state.selectedSaveId,
    isSaveLoading: state.isSaveLoading,
    isLoaded,
    loadedSaveName,
    yamlOpen: state.yamlOpen,
    yaml,
    hasDiff,
  };
}
