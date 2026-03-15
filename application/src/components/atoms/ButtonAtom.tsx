"use client";

import { Button, CircularProgress } from "@mui/material";

interface ButtonAtomProps {
  props: {
    label: string;
    onClick: () => void;
    variant?: "contained" | "outlined" | "text";
    color?: "primary" | "secondary" | "error" | "warning" | "success" | "info";
    disabled?: boolean;
    isLoading?: boolean;
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
  };
}

const ButtonAtom = ({ props }: ButtonAtomProps) => (
  <Button
    variant={props.variant ?? "contained"}
    color={props.color ?? "primary"}
    onClick={props.onClick}
    disabled={props.disabled || props.isLoading}
    size={props.size ?? "small"}
    fullWidth={props.fullWidth}
    startIcon={props.isLoading ? <CircularProgress size={14} /> : undefined}
  >
    {props.label}
  </Button>
);

export { ButtonAtom };
