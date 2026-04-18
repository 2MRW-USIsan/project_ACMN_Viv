import { IconButtonType } from "@/types/components/ui";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";

interface DeletionMarkProps {
  props: IconButtonType;
}
export function DeletionMark({ props }: DeletionMarkProps) {
  return (
    <IconButton onClick={props.onClick} sx={{ padding: "0.1rem" }}>
      <RemoveCircleOutlineIcon
        sx={{ padding: "0" }}
        fontSize={"medium"}
        color={"info"}
      />
    </IconButton>
  );
}
