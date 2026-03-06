"use client";

import { Checkbox } from "@mui/material";

interface TodoCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function TodoCheckbox({
  checked,
  onChange,
  disabled,
}: TodoCheckboxProps) {
  return (
    <Checkbox
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
    />
  );
}
