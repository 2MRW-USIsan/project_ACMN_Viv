import CheckIcon from "@mui/icons-material/Check";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Chip } from "@mui/material";
interface CheckChipProps {
  props: {
    label: string;
    onClick: () => void;
    selected: boolean;
  };
}
export function CheckChip({
  props: { label, selected, onClick },
}: CheckChipProps) {
  return (
    <Chip
      label={label}
      onClick={onClick}
      size="small"
      variant={selected ? "filled" : "outlined"}
      icon={
        selected ? (
          <CheckIcon color="success" />
        ) : (
          <CircleOutlinedIcon color="disabled" />
        )
      }
    />
  );
}
