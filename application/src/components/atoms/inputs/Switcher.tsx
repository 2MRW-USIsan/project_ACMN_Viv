import { SwitcherType } from "@/types/components/ui";
import { Switch } from "@mui/material";

export interface SwitcherProps {
  props: SwitcherType;
}

export function Switcher({ props }: SwitcherProps) {
  return (
    <Switch
      checked={props.checked}
      onChange={(_, checked) => props.onChange(checked)}
      size="small"
    />
  );
}
