import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface RadioGroupPanelProps {
  prop: {
    value: string | undefined;
    options: string[];
    onChange: (value: string) => void;
  };
}
export function RadioGroupPanel({
  prop: { value, options, onChange },
}: RadioGroupPanelProps) {
  return (
    <FormControl>
      <RadioGroup row value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio size="small" />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
