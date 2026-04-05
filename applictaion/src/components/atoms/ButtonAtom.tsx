"use client";

import { Button } from "@mui/material";

interface ButtonAtomProps {
  props: {
    label: string;
    onClick: () => void;
    variant?: "text" | "contained" | "outlined";
    size?: "small" | "medium" | "large";
  };
}

export function ButtonAtom({ props }: ButtonAtomProps) {
  return (
    <Button
      variant={props.variant ?? "text"}
      size={props.size ?? "medium"}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
}
