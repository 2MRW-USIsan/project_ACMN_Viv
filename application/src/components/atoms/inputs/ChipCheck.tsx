import { ChipCheckType } from "@/types/components/ui";
import CheckIcon from "@mui/icons-material/Check";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Chip } from "@mui/material";

export interface ChipCheckProps {
  props: ChipCheckType;
}

export function ChipCheck({ props }: ChipCheckProps) {
  return (
    <Chip
      label={props.label}
      variant="outlined"
      onClick={props.onChange}
      icon={props.checked ? <CheckIcon /> : <CheckBoxOutlineBlankIcon />}
      color={props.checked ? "success" : "default"}
      sx={{ cursor: "pointer" }}
    />
  );
}
