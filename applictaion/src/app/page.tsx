"use client";

import { BlocPanelListItem } from "@/components/BlocPanelListItem";
import PanelList from "@/components/PanelList";
import usePanelReducer from "@/hooks/usePanelReducer";
import { useMemo } from "react";

export default function Home() {
  const { state, actions } = usePanelReducer();

  const panelData = useMemo(
    () =>
      state.panels.map((panel) => ({
        id: panel.id,
        label: panel.label,
        state: panel.state,
        value: panel.value,
        onChange: (Key: string, Label: string) => {
          actions.changeForm(panel.id, Key, Label);
        },
        onClick: () => {
          actions.changePanel(panel.id);
        },
        onDelete: () => {
          actions.deletePanel(panel.id);
        },
        orders: {
          data: panel.orders.data,
          selected: panel.orders.selected,
          onClick: () => actions.changeChip(panel.id, "orders"),
          onAdd: () => actions.addItemPanel(panel.id, "orders"),
        },
        select: {
          data: panel.select.data,
          selected: panel.select.selected,
          onClick: () => actions.changeChip(panel.id, "select"),
          onAdd: () => actions.addItemPanel(panel.id, "select"),
        },
        switch: {
          data: panel.switch.data.map((item) => ({
            ...item,
            onClick: () => {},
            onDelete: () => actions.deleteItemPanel(panel.id, "switch", item.id),
          })),
          selected: panel.switch.selected,
          onClick: () => actions.changeChip(panel.id, "switch"),
          onAdd: () => actions.addItemPanel(panel.id, "switch"),
        },
      })),
    [state.panels, actions],
  );

  return (
    <PanelList
      props={{ label: "#BlocList ====", onAddPanel: actions.addPanel }}
    >
      {panelData.map((item) => (
        <BlocPanelListItem key={item.id} props={item} />
      ))}
    </PanelList>
  );
}
