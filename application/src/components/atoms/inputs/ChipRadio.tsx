import { ChipRadioType } from "@/types/components/ui";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Chip } from "@mui/material";

export interface ChipRadioProps {
  props: ChipRadioType;
}

export function ChipRadio({ props }: ChipRadioProps) {
  return (
    <Chip
      label={props.label}
      variant="outlined"
      onClick={props.onChange}
      icon={props.checked ? <TaskAltIcon /> : <RadioButtonUncheckedIcon />}
      color={props.checked ? "success" : "default"}
      sx={{ cursor: "pointer" }}
    />
  );
}
