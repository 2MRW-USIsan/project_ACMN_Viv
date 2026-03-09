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
  onReselectSave: () => void;
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

  const isLoaded = savedPanels.loadedState !== null;

  const loadedSaveName = useMemo(
    () =>
      savedPanels.saveList.find((s) => s.id === savedPanels.selectedSaveId)
        ?.name ?? "",
    [savedPanels.saveList, savedPanels.selectedSaveId],
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
    isLoaded,
    loadedSaveName,
    onSelectSave: savedPanels.actions.selectSave,
    onLoadSave: savedPanels.actions.loadSave,
    onReselectSave: savedPanels.actions.reselectSave,
    yamlOpen,
    yaml,
    hasDiff,
    onOpenYaml: () => setYamlOpen(true),
    onCloseYaml: () => setYamlOpen(false),
    onRegister,
  };
}
