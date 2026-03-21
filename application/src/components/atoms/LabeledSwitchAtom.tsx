"use client";

import { FormControlLabel, Switch } from "@mui/material";

interface LabeledSwitchAtomProps {
  props: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  };
}

export function LabeledSwitchAtom({ props }: LabeledSwitchAtomProps) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={props.checked}
          onChange={(_event, checked) => props.onChange(checked)}
        />
      }
      label={props.label}
      labelPlacement={"start"}
    />
  );
}
