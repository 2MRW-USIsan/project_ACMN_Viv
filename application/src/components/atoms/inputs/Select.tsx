import { SelectType } from "@/types/components/ui";
import { FormControl, MenuItem, Select as MuiSelect } from "@mui/material";

export interface SelectProps {
  props: SelectType;
}

export function Select({ props }: SelectProps) {
  return (
    <FormControl fullWidth>
      <MuiSelect
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
      </MuiSelect>
    </FormControl>
  );
}
