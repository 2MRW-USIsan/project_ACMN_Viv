"use client";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface SelectAtomProps {
  props: {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    fullWidth?: boolean;
  };
}

export function SelectAtom({ props }: SelectAtomProps) {
  return (
    <FormControl fullWidth={props.fullWidth}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        label={props.label}
        onChange={(e) => props.onChange(e.target.value as string)}
      >
        {props.options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
