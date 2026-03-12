"use client";

import { Divider, List, ListItem, ListSubheader, Paper } from "@mui/material";
import { AddButtonPanel } from "../../atoms/AddButtonPanel";
import { TypographyText } from "../../atoms/TypographyText";
interface PanelListProps {
  props: { label: string; onAddPanel?: () => void };
  children: React.ReactNode;
}
export function PanelList({
  props: { label, onAddPanel },
  children,
}: PanelListProps) {
  return (
    <Paper
      variant="outlined"
      sx={{ my: 0.5, width: "100%", overflow: "hidden" }}
    >
      <List>
        <ListSubheader sx={{ bgcolor: "background.paper" }}>
          <TypographyText props={{ variant: "body2" }}>{label}</TypographyText>
        </ListSubheader>
        <ListItem>
          <Divider sx={{ width: "100%" }} flexItem />
        </ListItem>
        {children}
        {onAddPanel && <AddButtonPanel onAddPanel={onAddPanel} />}
      </List>
    </Paper>
  );
}
