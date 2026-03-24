"use client";

import { FormControl, Select, MenuItem } from "@mui/material";

interface SelectAtomProps {
  props: {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    size?: "small" | "medium";
    minWidth?: number | string;
    fullWidth?: boolean;
  };
}

export function SelectAtom({ props }: SelectAtomProps) {
  return (
    <FormControl
      size={props.size ?? "small"}
      sx={{ minWidth: props.minWidth ?? 120 }}
      fullWidth={props.fullWidth}
    >
      <Select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value as string)}
        displayEmpty
      >
        {props.options.map((option, index) => (
          <MenuItem key={`${index}-${option}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
