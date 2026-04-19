import { ButtonType } from "@/types/components/ui";
import { CircularProgress, Button as MuiButton } from "@mui/material";

export interface ButtonProps {
  props: ButtonType;
  style?: ButtonSize;
  text?: boolean;
  error?: boolean;
  grey?: boolean;
  sub?: boolean;
}
type ButtonSize = "NORMAL" | "WIDE" | "FULL";
type MuiButtonSize = "small" | "medium" | "large";

export function Button({
  props,
  style = "NORMAL",
  text,
  error,
  sub,
}: ButtonProps) {
  const buttonSize: Record<ButtonSize, MuiButtonSize> = {
    NORMAL: "small",
    WIDE: "large",
    FULL: "medium",
  };
  return (
    <MuiButton
      onClick={props.onClick}
      variant={text ? "text" : "contained"}
      color={sub ? "secondary" : error ? "error" : "primary"}
      size={buttonSize[style] ?? "small"}
      fullWidth={style === "FULL"}
      disabled={props.disabled || props.isLoading}
      startIcon={props.isLoading ? <CircularProgress size={14} /> : undefined}
    >
      {props.label}
    </MuiButton>
  );
}
