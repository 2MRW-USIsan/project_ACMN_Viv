"use client";

import { Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface ChipCheckboxAtomProps {
  props: {
    label: string;
    checked: boolean;
    onChange: () => void;
  };
}

export function ChipCheckboxAtom({ props }: ChipCheckboxAtomProps) {
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
