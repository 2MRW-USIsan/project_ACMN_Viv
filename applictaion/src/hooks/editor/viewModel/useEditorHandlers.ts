"use client";

import type { EditorContexts } from "@/hooks/editor/reducer/useEditorReducer";
import { generateYaml } from "@/utils/generateYaml";

export type EditorHandlers = {
  onAddPanel: () => void;
  onSelectSave: (id: string) => void;
  onLoadSave: () => Promise<void>;
  onReselectSave: () => void;
  onOpenYaml: () => void;
  onCloseYaml: () => void;
  onRegister: () => Promise<void>;
};

export function useEditorHandlers(contexts: EditorContexts): EditorHandlers {
  const { state, action } = contexts.reducer;
  const { fetchItem, request } = contexts.service;

  const onRegister = async () => {
    const name = `保存 ${new Date().toLocaleString("ja-JP")}`;
    await request.registerSave(name, state.panel);
    const list = await fetchItem.fetchSaveList();
    action.setSaveList(list);
  };

  const onOpenYaml = () => {
    const yaml = generateYaml(state.panel);
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

  const onReselectSave = () => {
    action.setSelectedSaveId("");
    action.setLoadedState(null);
  };

  return {
    onAddPanel: action.panel.addPanel,
    onSelectSave: action.setSelectedSaveId,
    onLoadSave,
    onReselectSave,
    onOpenYaml,
    onCloseYaml: () => action.setYamlOpen(false),
    onRegister,
  };
}
