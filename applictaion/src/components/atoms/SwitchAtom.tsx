"use client";

import { Switch } from "@mui/material";

interface SwitchAtomProps {
  props: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  };
}

export function SwitchAtom({ props }: SwitchAtomProps) {
  return (
    <Switch
      checked={props.checked}
      onChange={(e) => props.onChange(e.target.checked)}
    />
  );
}
