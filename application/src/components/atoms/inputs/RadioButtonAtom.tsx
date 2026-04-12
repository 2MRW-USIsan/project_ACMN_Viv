import CheckIcon from "@mui/icons-material/Check";
import { Chip } from "@mui/material";
import { ChipRadioAtomType } from "@/types/ui";

export interface ChipRadioAtomProps {
  props: ChipRadioAtomType;
}

export function ChipRadioAtom({ props }: ChipRadioAtomProps) {
  return (
    <Chip
      label={props.label}
      variant="outlined"
      onClick={props.onChange}
      icon={props.checked ? <CheckIcon /> : undefined}
      color={props.checked ? "success" : "default"}
      sx={{ cursor: "pointer" }}
    />
  );
}
