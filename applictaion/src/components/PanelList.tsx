"use client";
import AddIcon from "@mui/icons-material/Add";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Typography,
} from "@mui/material";

interface PanelListProps {
  props: { label: string; onAddPanel: () => void };
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
      <ListItemButton onClick={onAddPanel} sx={{ justifyContent: "center" }}>
        <AddIcon fontSize="small" />
      </ListItemButton>
    </List>
  );
}
