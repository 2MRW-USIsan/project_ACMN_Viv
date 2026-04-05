"use client";

import { Switch } from "@mui/material";

export interface SwitchAtomProps {
  props: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: "small" | "medium";
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | "default";
  };
}

export function SwitchAtom({ props }: SwitchAtomProps) {
  return (
    <Switch
      checked={props.checked}
      onChange={(_, checked) => props.onChange(checked)}
      size={props.size ?? "medium"}
      color={props.color ?? "success"}
    />
  );
}
