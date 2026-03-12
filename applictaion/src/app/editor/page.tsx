"use client";

import { BlocPanelListItem } from "@/components/organisms/bloc/BlocPanelListItem";
import { YamlPreviewDialog } from "@/components/organisms/YamlPreviewDialog";
import { SaveLoadToolbar } from "@/components/organisms/SaveLoadToolbar";
import { PanelList } from "@/components/molecules/panel/PanelList";
import { useEditorViewModel } from "@/hooks/useEditorViewModel";
import { Box, Button } from "@mui/material";

export default function EditorPage() {
  const vm = useEditorViewModel();

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
      >
        <Button variant="contained" onClick={vm.onOpenYaml} sx={{ m: 2 }}>
          Generate YAML
        </Button>
        <SaveLoadToolbar
          props={{
            saveList: vm.saveList,
            selectedSaveId: vm.selectedSaveId,
            isLoading: vm.isSaveLoading,
            isLoaded: vm.isLoaded,
            loadedSaveName: vm.loadedSaveName,
            onSelect: vm.onSelectSave,
            onLoad: vm.onLoadSave,
            onReselect: vm.onReselectSave,
          }}
        />
      </Box>
      <PanelList
        props={{
          label: "#BlocList ====",
          onAddPanel: vm.onAddPanel,
        }}
      >
        {vm.panelData.map((item) => (
          <BlocPanelListItem key={item.id} props={item} />
        ))}
      </PanelList>
      <YamlPreviewDialog
        props={{
          open: vm.yamlOpen,
          yaml: vm.yaml,
          hasDiff: vm.hasDiff,
          onClose: vm.onCloseYaml,
          onRegister: vm.onRegister,
        }}
      />
    </>
  );
}


