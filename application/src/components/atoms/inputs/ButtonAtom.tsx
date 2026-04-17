import { ButtonAtomType } from "@/types/ui";
import { Button, CircularProgress } from "@mui/material";

export interface ButtonAtomProps {
  props: ButtonAtomType;
  style?: ButtonAtomType["style"];
}

type ButtonShape = "FILLED" | "OUTLINED" | "TEXT";
type ButtonColor = "PRIMARY" | "ALTERED" | "WARNING";
type ButtonSize = "NORMAL" | "WIDE" | "FULL";
export function ButtonAtom({ props, style: styleProp }: ButtonAtomProps) {
  type MuiButtonVariant = "contained" | "outlined" | "text";
  type MuiButtonColor = "primary" | "secondary" | "error";
  type MuiButtonSize = "small" | "medium" | "large";
  const style = styleProp ??
    props.style ?? { shape: "TEXT", color: "PRIMARY", size: "NORMAL" };

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
  const buttonSize: Record<ButtonSize, MuiButtonSize> = {
    NORMAL: "small",
    WIDE: "large",
    FULL: "medium",
  };
  return (
    <Button
      onClick={props.onClick}
      variant={buttonVariant[style.shape] ?? "text"}
      color={buttonColor[style.color] ?? "primary"}
      size={buttonSize[style.size] ?? "small"}
      fullWidth={style.size === "FULL"}
      disabled={props.disabled || props.isLoading}
      startIcon={props.isLoading ? <CircularProgress size={14} /> : undefined}
    >
      {props.label}
    </Button>
  );
}
