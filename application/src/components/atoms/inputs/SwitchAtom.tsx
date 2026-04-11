"use client";

import { Switch } from "@mui/material";
import { SwitchAtomType } from "@/types/ui";

export interface SwitchAtomProps {
  props: SwitchAtomType;
}

export function SwitchAtom({ props }: SwitchAtomProps) {
  return (
    <Switch
      checked={props.checked}
      onChange={(_, checked) => props.onChange(checked)}
      size="small"
    />
  );
}
