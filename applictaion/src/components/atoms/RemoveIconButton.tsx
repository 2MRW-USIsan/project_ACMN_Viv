import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";

interface RemoveIconButtonProps {
  props: { onClick: () => void };
}
export function RemoveIconButton({
  props: { onClick },
}: RemoveIconButtonProps) {
  return (
    <IconButton size="small" onClick={onClick}>
      <RemoveCircleOutlineIcon fontSize="small" />
    </IconButton>
  );
}
