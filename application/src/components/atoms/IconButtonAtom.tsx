"use client";

import { IconButton } from "@mui/material";

interface IconButtonAtomProps {
  props: {
    icon: React.ReactNode;
    onClick: () => void;
    color?:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
  };
}

export function IconButtonAtom({ props }: IconButtonAtomProps) {
  return (
    <IconButton
      onClick={props.onClick}
      color={props.color ?? "default"}
      size={props.size ?? "small"}
      disabled={props.disabled}
    >
      {props.icon}
    </IconButton>
  );
}
