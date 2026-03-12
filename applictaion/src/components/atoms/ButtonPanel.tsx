import { Button } from "@mui/material";

interface ButtonPanelProps {
  props: {
    variant?: "contained" | "outlined" | "text";
    color?: "primary" | "secondary" | "error" | "warning" | "info" | "success" | "inherit";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    onClick?: () => void;
  };
  children: React.ReactNode;
}

export function ButtonPanel({ props, children }: ButtonPanelProps) {
  const { variant, color, size, disabled, onClick } = props;
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
