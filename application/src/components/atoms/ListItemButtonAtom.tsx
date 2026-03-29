"use client";

import { ListItem, ListItemButton, ListItemText } from "@mui/material";

interface ListItemButtonAtomProps {
  props: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  };
}

export function ListItemButtonAtom({ props }: ListItemButtonAtomProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton selected={props.isActive} onClick={props.onClick}>
        <ListItemText primary={props.label} />
      </ListItemButton>
    </ListItem>
  );
}
