"use client";

import { Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface SelectableChipAtomProps {
  props: {
    label: string;
    selected: boolean;
    onClick: () => void;
  };
}

export function SelectableChipAtom({ props }: SelectableChipAtomProps) {
  return (
    <Chip
      label={props.label}
      onClick={props.onClick}
      icon={props.selected ? <CheckIcon /> : undefined}
      variant={props.selected ? "filled" : "outlined"}
      color={props.selected ? "primary" : "default"}
      size="small"
    />
  );
}
