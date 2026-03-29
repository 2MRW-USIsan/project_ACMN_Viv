"use client";

import { Select, MenuItem, FormControl } from "@mui/material";

export interface SelectAtomProps {
  props: {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    fullWidth?: boolean;
  };
}

export function SelectAtom({ props }: SelectAtomProps) {
  return (
    <FormControl fullWidth={props.fullWidth}>
      <Select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        size="small"
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
