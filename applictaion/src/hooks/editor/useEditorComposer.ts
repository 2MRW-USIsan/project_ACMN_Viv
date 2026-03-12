"use client";

import type { BlocViewItem } from "@/types/editor/bloc";
import type { PanelSaveItem } from "@/types/editor/panelSave";
import { usePanelData } from "@/hooks/editor/usePanelData";
import { generateYaml } from "@/utils/generateYaml";
import { useMemo } from "react";
import type { EditorContexts } from "@/hooks/editor/useEditorReducer";

export type EditorViewModel = {
  // Panel list
  panelData: BlocViewItem[];
  onAddPanel: () => void;
  // Save/Load toolbar
  saveList: PanelSaveItem[];
  selectedSaveId: string;
  isSaveLoading: boolean;
  isLoaded: boolean;
  loadedSaveName: string;
  onSelectSave: (id: string) => void;
  onLoadSave: () => void;
  onReselectSave: () => void;
  // YAML preview dialog
  yamlOpen: boolean;
  yaml: string;
  hasDiff: boolean;
  onOpenYaml: () => void;
  onCloseYaml: () => void;
  onRegister: () => Promise<void>;
};

type Returns = {
  viewModels: EditorViewModel;
};

export function useEditorComposer(contexts: EditorContexts): Returns {
  const { state, action } = contexts.reducer;
  const { fetchItem, request } = contexts.service;

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

  const onRegister = async () => {
    const name = `保存 ${new Date().toLocaleString("ja-JP")}`;
    await request.registerSave(name, state.panel);
    const list = await fetchItem.fetchSaveList();
    action.setSaveList(list);
  };

  const onOpenYaml = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("acmn_yaml_content", yaml);
    }
    action.setYamlOpen(true);
  };

  const onLoadSave = async () => {
    if (!state.selectedSaveId) return;
    action.setIsSaveLoading(true);
    try {
      const detail = await fetchItem.fetchSaveDetail(state.selectedSaveId);
      action.panel.loadState(detail.data);
      action.setLoadedState(detail.data);
    } finally {
      action.setIsSaveLoading(false);
    }
  };

  const viewModels: EditorViewModel = {
    panelData,
    onAddPanel: action.panel.addPanel,
    saveList: state.saveList,
    selectedSaveId: state.selectedSaveId,
    isSaveLoading: state.isSaveLoading,
    isLoaded,
    loadedSaveName,
    onSelectSave: action.setSelectedSaveId,
    onLoadSave,
    onReselectSave: () => {
      action.setSelectedSaveId("");
      action.setLoadedState(null);
    },
    yamlOpen: state.yamlOpen,
    yaml,
    hasDiff,
    onOpenYaml,
    onCloseYaml: () => action.setYamlOpen(false),
    onRegister,
  };

  return { viewModels };
}
