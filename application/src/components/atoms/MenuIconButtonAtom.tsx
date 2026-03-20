"use client";

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface MenuIconButtonAtomProps {
  props: {
    onClick: () => void;
    ariaLabel: string;
  };
}

export function MenuIconButtonAtom({ props }: MenuIconButtonAtomProps) {
  return (
    <IconButton
      color="inherit"
      edge="start"
      onClick={props.onClick}
      aria-label={props.ariaLabel}
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  );
}
