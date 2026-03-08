import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText
} from "@mui/material";

interface PanelListItemProps {
  props: {
    id: number;
    label: string;
    onClick: () => void;
    onDelete: () => void;
    state: boolean;
  };
  children: React.ReactNode;
}
export default function PanelListItem({
  props: { id, label, onClick, onDelete, state },
  children,
}: PanelListItemProps) {
  return (
    <List key={id} component="div" disablePadding sx={{ pl: 4 }}>
      <ListItemButton onClick={onClick} sx={{ justifyContent: "center" }}>
        <ListItemText primary={label} />
        <IconButton onClick={onDelete}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
        {state ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={state} orientation="vertical" timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </List>
  );
}
