"use client";

import { Checkbox, FormControlLabel } from "@mui/material";

interface CheckboxAtomProps {
  props: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  };
}

export function CheckboxAtom({ props }: CheckboxAtomProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked}
          onChange={(e) => props.onChange(e.target.checked)}
          size="small"
        />
      }
      label={props.label}
    />
  );
}
