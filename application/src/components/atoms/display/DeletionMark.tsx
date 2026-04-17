import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
export type IconButtonType = {
  onClick: () => void;
};
interface DeletionMarkProps {
  props: IconButtonType;
}
export function DeletionMark({ props }: DeletionMarkProps) {
  return (
    <IconButton onClick={props.onClick}>
      <RemoveCircleOutlineIcon fontSize={"medium"} color={"info"} />
    </IconButton>
  );
}
