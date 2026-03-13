"use client";

import { BlocPanelListItem } from "@/components/features/editor/BlocPanelListItem";
import { YamlPreviewDialog } from "@/components/features/editor/YamlPreviewDialog";
import { SaveLoadToolbar } from "@/components/features/editor/SaveLoadToolbar";
import { PanelList } from "@/components/molecules/panel/PanelList";
import { useEditorViewModel } from "@/hooks/editor/viewModel/useEditorViewModel";
import { Box } from "@mui/material";
import { ButtonPanel } from "@/components/atoms/ButtonPanel";

export default function EditorPage() {
  const { viewModels: vm } = useEditorViewModel();

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
      >
        <Box sx={{ m: 2 }}>
          <ButtonPanel props={{ variant: "contained", onClick: vm.onOpenYaml }}>
            Generate YAML
          </ButtonPanel>
        </Box>
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


