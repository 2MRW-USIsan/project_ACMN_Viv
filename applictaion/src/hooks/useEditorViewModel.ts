"use client";

import type { BlocViewItem } from "@/types/bloc";
import type { PanelSaveItem } from "@/types/panelSave";
import { usePanelData } from "@/hooks/usePanelData";
import { usePanelReducer } from "@/hooks/usePanelReducer";
import { useSavedPanels } from "@/hooks/useSavedPanels";
import { generateYaml } from "@/utils/generateYaml";
import { useMemo, useState } from "react";

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
  onResetLoad: () => void;
  // YAML preview dialog
  yamlOpen: boolean;
  yaml: string;
  hasDiff: boolean;
  onOpenYaml: () => void;
  onCloseYaml: () => void;
  onRegister: () => Promise<void>;
};

export function useEditorViewModel(): EditorViewModel {
  const reducer = usePanelReducer();
  const panelData = usePanelData(reducer);
  const [yamlOpen, setYamlOpen] = useState(false);

  const savedPanels = useSavedPanels(reducer.actions.loadState);

  const hasDiff = useMemo(
    () =>
      savedPanels.loadedState !== null &&
      JSON.stringify(reducer.state) !== JSON.stringify(savedPanels.loadedState),
    [reducer.state, savedPanels.loadedState],
  );

  const yaml = useMemo(() => generateYaml(reducer.state), [reducer.state]);

  const onRegister = async () => {
    const name = `保存 ${new Date().toLocaleString("ja-JP")}`;
    await savedPanels.actions.registerSave(name, reducer.state);
  };

  return {
    panelData,
    onAddPanel: reducer.actions.addPanel,
    saveList: savedPanels.saveList,
    selectedSaveId: savedPanels.selectedSaveId,
    isSaveLoading: savedPanels.isLoading,
    isLoaded: savedPanels.loadedState !== null,
    loadedSaveName: savedPanels.loadedSaveName,
    onSelectSave: savedPanels.actions.selectSave,
    onLoadSave: savedPanels.actions.loadSave,
    onResetLoad: savedPanels.actions.resetLoad,
    yamlOpen,
    yaml,
    hasDiff,
    onOpenYaml: () => setYamlOpen(true),
    onCloseYaml: () => setYamlOpen(false),
    onRegister,
  };
}
