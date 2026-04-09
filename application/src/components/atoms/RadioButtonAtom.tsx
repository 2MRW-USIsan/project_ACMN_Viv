"use client";

import { Radio } from "@mui/material";

export interface RadioButtonAtomProps {
  props: {
    checked: boolean;
    onChange: () => void;
  };
}

export function RadioButtonAtom({ props }: RadioButtonAtomProps) {
  return (
    <Radio checked={props.checked} onChange={props.onChange} size="small" />
  );
}
