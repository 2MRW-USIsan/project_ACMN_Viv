"use client";

import { ListItemButton } from "@mui/material";

interface ListItemButtonAtomProps {
  props: {
    onClick: () => void;
  };
  children?: React.ReactNode;
}

export function ListItemButtonAtom({
  props,
  children,
}: ListItemButtonAtomProps) {
  return <ListItemButton onClick={props.onClick}>{children}</ListItemButton>;
}
