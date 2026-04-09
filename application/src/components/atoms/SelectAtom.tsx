"use client";

import { FormControl, MenuItem, Select } from "@mui/material";

export interface SelectAtomProps {
  props: {
    value: string;
    options: string[];
    onChange: (value: string) => void;
  };
}

export function SelectAtom({ props }: SelectAtomProps) {
  return (
    <FormControl fullWidth>
      <Select
        value={props.options.length > 0 ? props.value : "-"}
        onChange={(e) => props.onChange(e.target.value)}
        size="small"
      >
        {props.options.length > 0 ? (
          props.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        ) : (
          <MenuItem key={"empty"} value={"-"}>
            {"-"}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
