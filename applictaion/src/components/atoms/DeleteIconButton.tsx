import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";

interface DeleteIconButtonProps {
  props: { onClick: () => void };
}
export function DeleteIconButton({
  props: { onClick },
}: DeleteIconButtonProps) {
  return (
    <IconButton size="small" onClick={onClick}>
      <DeleteOutlineIcon fontSize="small" />
    </IconButton>
  );
}
