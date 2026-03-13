"use client";

import type { EditorContexts } from "@/hooks/editor/reducer/useEditorReducer";
import { generateYaml } from "@/utils/generateYaml";

export type EditorHandlers = {
  onAddPanel: () => void;
  onSelectSave: (id: string) => void;
  onLoadSave: () => void;
  onReselectSave: () => void;
  onOpenYaml: () => void;
  onCloseYaml: () => void;
  onRegister: () => Promise<void>;
};

export function useEditorHandlers(contexts: EditorContexts): EditorHandlers {
  const { state, action } = contexts.reducer;
  const { request } = contexts.service;

  const onRegister = async () => {
    const name = `保存 ${new Date().toLocaleString("ja-JP")}`;
    await request.registerSave(name, state.panel);
  };

  const onOpenYaml = () => {
    const yaml = generateYaml(state.panel);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("acmn_yaml_content", yaml);
    }
    action.setYamlOpen(true);
  };

  const onLoadSave = () => {
    if (!state.selectedSaveId) return;
    action.setIsSaveLoading(true);
    request.loadSaveDetail(state.selectedSaveId);
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
