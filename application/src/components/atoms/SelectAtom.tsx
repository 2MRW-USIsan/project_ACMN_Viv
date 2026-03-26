"use client";

import { Select, MenuItem } from "@mui/material";

interface SelectAtomProps {
  props: {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    placeholder?: string;
    fullWidth?: boolean;
    size?: "small" | "medium";
  };
}

export function SelectAtom({ props }: SelectAtomProps) {
  return (
    <Select
      value={props.value}
      onChange={(e) => props.onChange(e.target.value as string)}
      fullWidth={props.fullWidth}
      size={props.size ?? "small"}
      displayEmpty
    >
      {props.placeholder && (
        <MenuItem value="" disabled>
          {props.placeholder}
        </MenuItem>
      )}
      {props.options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
