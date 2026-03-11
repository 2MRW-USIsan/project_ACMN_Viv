import AddIcon from "@mui/icons-material/Add";
import { ListItemButton } from "@mui/material";

interface AddButtonPanelProps {
  onAddPanel: () => void;
}
export function AddButtonPanel({ onAddPanel }: AddButtonPanelProps) {
  return (
    <ListItemButton onClick={onAddPanel} sx={{ justifyContent: "center" }}>
      <AddIcon fontSize="small" />
    </ListItemButton>
  );
}
