"use client";

import { BlocPanelListItem } from "@/components/organisms/bloc/BlocPanelListItem";
import { YamlPreviewDialog } from "@/components/organisms/YamlPreviewDialog";
import { PanelList } from "@/components/molecules/panel/PanelList";
import { usePanelData } from "@/hooks/usePanelData";
import { usePanelReducer } from "@/hooks/usePanelReducer";
import { generateYaml } from "@/utils/generateYaml";
import { Button } from "@mui/material";
import { useState } from "react";

export default function EditorPage() {
  const reducer = usePanelReducer();
  const panelData = usePanelData(reducer);
  const [yamlOpen, setYamlOpen] = useState(false);

  const handleGenerateYaml = () => {
    setYamlOpen(true);
  };

  return (
    <>
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
      <Button variant="contained" onClick={handleGenerateYaml} sx={{ m: 2 }}>
        Generate YAML
      </Button>
      <YamlPreviewDialog
        open={yamlOpen}
        yaml={generateYaml(reducer.state)}
        onClose={() => setYamlOpen(false)}
      />
    </>
  );
}
