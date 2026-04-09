"use client";

import { Button, CircularProgress } from "@mui/material";

export interface ButtonAtomProps {
  props: {
    label: string;
    shape: ButtonShape;
    color: ButtonColor;
    size: ButtonSize;
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
  };
}

type ButtonShape = "FILLED" | "OUTLINED" | "TEXT";
type ButtonColor = "PRIMARY" | "ALTERED" | "WARNING";
type ButtonSize = "NORMAL" | "WIDE" | "FULL";
export function ButtonAtom({ props }: ButtonAtomProps) {
  type MuiButtonVariant = "contained" | "outlined" | "text";
  type MuiButtonColor = "primary" | "secondary" | "error";
  type MuiButtonSize = "small" | "medium" | "large";

  const buttonVariant: Record<ButtonShape, MuiButtonVariant> = {
    FILLED: "contained",
    OUTLINED: "outlined",
    TEXT: "text",
  };
  const buttonColor: Record<ButtonColor, MuiButtonColor> = {
    PRIMARY: "primary",
    ALTERED: "secondary",
    WARNING: "error",
  };
  const isFullWidth = props.size === "FULL";
  const buttonSize: Record<ButtonSize, MuiButtonSize> = {
    NORMAL: "small",
    WIDE: "large",
    FULL: "medium",
  };
  return (
    <Button
      onClick={props.onClick}
      variant={buttonVariant[props.shape] ?? "text"}
      color={buttonColor[props.color] ?? "primary"}
      size={buttonSize[props.size] ?? "small"}
      fullWidth={isFullWidth}
      disabled={props.disabled || props.isLoading}
      startIcon={props.isLoading ? <CircularProgress size={14} /> : undefined}
    >
      {props.label}
    </Button>
  );
}
