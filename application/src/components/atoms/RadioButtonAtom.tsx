"use client";

import { Radio } from "@mui/material";

export interface RadioButtonAtomProps {
  props: {
    checked: boolean;
    onChange: () => void;
    color?: "primary" | "default";
  };
}

export function RadioButtonAtom({ props }: RadioButtonAtomProps) {
  return (
    <Radio
      checked={props.checked}
      onChange={props.onChange}
      color={props.color ?? "primary"}
      size="small"
    />
  );
}
