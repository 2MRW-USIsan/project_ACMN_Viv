"use client";

import { BlocPanelListItem } from "@/components/BlocPanelListItem";
import PanelList from "@/components/PanelList";
import usePanelData from "@/hooks/usePanelData";
import usePanelReducer from "@/hooks/usePanelReducer";

export default function Home() {
  const reducer = usePanelReducer();
  const panelData = usePanelData(reducer);

  return (
    <PanelList
      props={{ label: "#BlocList ====", onAddPanel: reducer.actions.addPanel }}
    >
      {panelData.map((item) => (
        <BlocPanelListItem key={item.id} props={item} />
      ))}
    </PanelList>
  );
}
