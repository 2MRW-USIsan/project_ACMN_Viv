import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { IconButton } from "@mui/material";

interface ExpandIconButtonProps {
  props: { expanded: boolean; onClick: () => void };
}
export function ExpandIconButton({
  props: { expanded, onClick },
}: ExpandIconButtonProps) {
  return (
    <IconButton size="small" onClick={onClick}>
      {expanded ? <ExpandLess /> : <ExpandMore />}
    </IconButton>
  );
}
