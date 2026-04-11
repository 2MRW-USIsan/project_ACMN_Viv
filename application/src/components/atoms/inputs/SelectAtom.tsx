

import { FormControl, MenuItem, Select } from "@mui/material";
import { SelectAtomType } from "@/types/ui";

export interface SelectAtomProps {
  props: SelectAtomType;
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
