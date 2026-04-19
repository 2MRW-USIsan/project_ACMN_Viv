import { SelectorType } from "@/types/components/ui";
import { FormControl, MenuItem, Select } from "@mui/material";

export interface SelectorProps {
  props: SelectorType;
}

export function Selector({ props }: SelectorProps) {
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
