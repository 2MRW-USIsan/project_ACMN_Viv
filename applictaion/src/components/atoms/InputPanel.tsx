import { TextField } from "@mui/material";

interface InputPanelProps {
  props: {
    label: string;
    value: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    fullWidth?: boolean;
    size?: "small" | "medium";
    type?: string;
    multiline?: boolean;
    rows?: number;
    readOnly?: boolean;
    fontFamily?: string;
    fontSize?: string;
    step?: number;
    min?: number;
  };
}

export function InputPanel({ props }: InputPanelProps) {
  const {
    label,
    value,
    onChange,
    disabled,
    fullWidth,
    size = "small",
    type,
    multiline,
    rows,
    readOnly,
    fontFamily,
    fontSize,
    step,
    min,
  } = props;

  const hasSlotProps =
    readOnly !== undefined ||
    fontFamily !== undefined ||
    fontSize !== undefined ||
    step !== undefined ||
    min !== undefined;

  const slotProps = hasSlotProps
    ? {
        htmlInput: {
          ...(readOnly !== undefined && { readOnly }),
          ...(step !== undefined && { step }),
          ...(min !== undefined && { min }),
          ...((fontFamily !== undefined || fontSize !== undefined) && {
            style: {
              ...(fontFamily !== undefined && { fontFamily }),
              ...(fontSize !== undefined && { fontSize }),
            },
          }),
        },
      }
    : undefined;

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      type={type}
      multiline={multiline}
      rows={rows}
      slotProps={slotProps}
    />
  );
}
