"use client";

import { BlocPanelListItem } from "@/components/BlocPanelListItem";
import PanelList from "@/components/PanelList";
import { useMemo, useState } from "react";

export default function Home() {
  const [panels, setPanels] = useState<any[]>([]);

  const handleAddBlocPanel = () => {
    setPanels((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          label: `Panel ${prev.length + 1}`,
          value: { key: `key-${Date.now()}`, label: `label-${Date.now()}` },
          state: false,
          orders: { selected: false, data: [] },
          select: { selected: false, data: [] },
          switch: { selected: false, data: [] },
        },
      ];
    });
  };

  const handleChangeBlocPanel = (id: number) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, state: !p.state } : p)),
    );
  };

  const handleDeleteBlocPanel = (id: number) => {
    setPanels((prev) => prev.filter((p) => p.id !== id));
  };

  const handleChangeChip = (
    id: number,
    chipType: "orders" | "select" | "switch",
  ) => {
    setPanels((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              [chipType]: { ...p[chipType], selected: !p[chipType].selected },
            }
          : p,
      ),
    );
  };

  const handleChangeBlocForm = (id: number, label: string, value: string) => {
    setPanels((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, value: { ...p.value, [label]: value } } : p,
      ),
    );
  };
  const handleAddItemPanel = (
    id: number,
    key: "orders" | "select" | "switch",
  ) => {
    setPanels((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              [key]: {
                ...p[key],
                data: [
                  ...p[key].data,
                  {
                    id: Date.now(),
                    label: "",
                    state: false,
                  },
                ],
              },
            }
          : p,
      ),
    );
  };
  const panelData = useMemo(
    () =>
      panels.map((panel) => ({
        id: panel.id,
        label: panel.label,
        state: panel.state,
        value: panel.value,
        onChange: (Key: string, Label: string) => {
          handleChangeBlocForm(panel.id, Key, Label);
        },
        onClick: () => {
          handleChangeBlocPanel(panel.id);
        },
        onDelete: () => {
          handleDeleteBlocPanel(panel.id);
        },
        orders: {
          data: panel.orders.data,
          selected: panel.orders.selected,
          onClick: () => handleChangeChip(panel.id, "orders"),
          onAdd: () => handleAddItemPanel(panel.id, "orders"),
        },
        select: {
          data: panel.select.data,
          selected: panel.select.selected,
          onClick: () => handleChangeChip(panel.id, "select"),
          onAdd: () => handleAddItemPanel(panel.id, "select"),
        },
        switch: {
          data: panel.switch.data,
          selected: panel.switch.selected,
          onClick: () => handleChangeChip(panel.id, "switch"),
          onAdd: () => handleAddItemPanel(panel.id, "switch"),
        },
      })),
    [panels],
  );

  return (
    <PanelList
      props={{ label: "#BlocList ====", onAddPanel: handleAddBlocPanel }}
    >
      {panelData.map((item) => (
        <BlocPanelListItem key={item.id} props={item} />
      ))}
    </PanelList>
  );
}
