"use client";

import {
  Divider,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from "@mui/material";
import AddButtonPanel from "../../atoms/AddButtonPanel";
interface PanelListProps {
  props: { label: string; onAddPanel?: () => void };
  children: React.ReactNode;
}
export default function PanelList({
  props: { label, onAddPanel },
  children,
}: PanelListProps) {
  return (
    <List>
      <ListSubheader>
        <Typography variant="body2">{label}</Typography>
      </ListSubheader>
      <ListItem>
        <Divider sx={{ width: "100%" }} flexItem />
      </ListItem>
      {children}
      {onAddPanel && <AddButtonPanel onAddPanel={onAddPanel} />}
    </List>
  );
}
