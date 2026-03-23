"use client";

import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface SelectAtomProps {
  props: {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    fullWidth?: boolean;
    size?: "small" | "medium";
  };
}

export function SelectAtom({ props }: SelectAtomProps) {
  const handleChange = (event: SelectChangeEvent) => {
    props.onChange(event.target.value);
  };

  return (
    <Select
      value={props.value}
      onChange={handleChange}
      fullWidth={props.fullWidth}
      size={props.size ?? "small"}
    >
      {props.options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
