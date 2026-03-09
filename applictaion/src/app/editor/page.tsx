"use client";

import { BlocPanelListItem } from "@/components/organisms/bloc/BlocPanelListItem";
import { YamlPreviewDialog } from "@/components/organisms/YamlPreviewDialog";
import { SaveLoadToolbar } from "@/components/organisms/SaveLoadToolbar";
import { PanelList } from "@/components/molecules/panel/PanelList";
import { usePanelData } from "@/hooks/usePanelData";
import { usePanelReducer } from "@/hooks/usePanelReducer";
import { useSavedPanels } from "@/hooks/useSavedPanels";
import { generateYaml } from "@/utils/generateYaml";
import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function EditorPage() {
  const reducer = usePanelReducer();
  const panelData = usePanelData(reducer);
  const [yamlOpen, setYamlOpen] = useState(false);

  const savedPanels = useSavedPanels(reducer.actions.loadState);

  const isDirty =
    savedPanels.loadedState !== null &&
    JSON.stringify(reducer.state) !== JSON.stringify(savedPanels.loadedState);

  const handleGenerateYaml = () => {
    setYamlOpen(true);
  };

  const handleRegister = async () => {
    const name = `保存 ${new Date().toLocaleString("ja-JP")}`;
    await savedPanels.actions.registerSave(name, reducer.state);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
      >
        <Button variant="contained" onClick={handleGenerateYaml} sx={{ m: 2 }}>
          Generate YAML
        </Button>
        <SaveLoadToolbar
          saveList={savedPanels.saveList}
          selectedSaveId={savedPanels.selectedSaveId}
          isLoading={savedPanels.isLoading}
          onSelect={savedPanels.actions.selectSave}
          onLoad={savedPanels.actions.loadSave}
        />
      </Box>
      <PanelList
        props={{
          label: "#BlocList ====",
          onAddPanel: reducer.actions.addPanel,
        }}
      >
        {panelData.map((item) => (
          <BlocPanelListItem key={item.id} props={item} />
        ))}
      </PanelList>
      <YamlPreviewDialog
        open={yamlOpen}
        yaml={generateYaml(reducer.state)}
        hasDiff={isDirty}
        onClose={() => setYamlOpen(false)}
        onRegister={handleRegister}
      />
    </>
  );
}

