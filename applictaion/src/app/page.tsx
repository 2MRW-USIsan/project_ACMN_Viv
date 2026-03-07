"use client";

import { useCallback, useMemo, useState } from "react";
import PanelList from "@/components/PanelList";
import { CheckChip } from "@/components/CheckChip";
import PanelListItem from "@/components/PanelListItem";
import { ListItem, Grid, Typography, TextField, Divider } from "@mui/material";

export default function Home() {
  const [panels, setPanels] = useState<any[]>([]);

  const addPanel = useCallback(() => {
    setPanels((prev) => {

      return [
        ...prev,
        {
          id: Date.now(),
          label: `Panel ${prev.length + 1}`,
          state: false,
          orders: { selected: false },
          select: { selected: false },
          switch: { selected: false },
        }
      ];
    });
  }, [setPanels]);

  const handleChangePanel = (id: number) => {
    setPanels((prev) => prev.map((p) => p.id === id ? { ...p, state: !p.state } : p));
  };

  const handleDeletePanel = (id: number) => {
    setPanels((prev) => prev.filter((p) => p.id !== id));
  };

  const handleChangeChip = (id: number, chipType: "orders" | "select" | "switch") => {
    setPanels((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
            ...p,
            [chipType]: { ...p[chipType], selected: !p[chipType].selected },
          }
          : p
      )
    )
  };
  const panelData = useMemo(() => panels.map((panel) => ({
    id: panel.id,
    label: panel.label,
    state: panel.state,
    onClick: () => handleChangePanel(panel.id),
    onDelete: () => handleDeletePanel(panel.id),
    orders: { onClick: () => handleChangeChip(panel.id, "orders"), selected: panel.orders.selected, },
    select: { onClick: () => handleChangeChip(panel.id, "select"), selected: panel.select.selected, },
    switch: { onClick: () => handleChangeChip(panel.id, "switch"), selected: panel.switch.selected, },
  })), [panels]);

  return (
    <PanelList props={{ onAddPanel: addPanel, }}    >
      {panelData.map((item) => (
        <PanelListItem key={item.id} props={item}>
          <ListItem sx={{ pl: 4, display: "flex", gap: 1, width: "100%" }}>
            <Grid container width={"100%"} alignItems={"center"}>
              <Grid size={1} >
                <Typography variant="body2" >{"key:"}</Typography>
              </Grid>
              <Grid size={5} >
                <TextField fullWidth size="small" />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{ pl: 4, display: "flex", gap: 1, width: "100%" }}>
            <Grid container width={"100%"} alignItems={"center"}>
              <Grid size={1} >
                <Typography variant="body2" >{"value:"}</Typography>
              </Grid>
              <Grid size={5} >
                <TextField fullWidth size="small" />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{ pl: 4, display: "flex", gap: 1 }}>
            <CheckChip label="Orders" selected={item.orders.selected} onClick={item.orders.onClick} />
            <CheckChip label="Select" selected={item.select.selected} onClick={item.select.onClick} />
            <CheckChip label="Switch" selected={item.switch.selected} onClick={item.switch.onClick} />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <Divider sx={{ width: "100%" }} flexItem />
          </ListItem>
          {item.orders.selected && <ListItem sx={{ pl: 4 }}>orders</ListItem>}
          {item.select.selected && <ListItem sx={{ pl: 4 }}>select</ListItem>}
          {item.switch.selected && <ListItem sx={{ pl: 4 }}>switch</ListItem>}
        </PanelListItem>
      ))}
    </PanelList>
  );
}


