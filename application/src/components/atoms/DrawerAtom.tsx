"use client";

import {
  Drawer,
  List,
} from "@mui/material";

export interface NavItem {
  href: string;
  label: string;
}

interface DrawerAtomProps {
  props: {
    open: boolean;
    onClose: () => void;
  };
  children?: React.ReactNode;
}

export function DrawerAtom({ props, children }: DrawerAtomProps) {
  return (
    <Drawer anchor="left" open={props.open} onClose={props.onClose}>
      <List sx={{ width: 240 }}>{children}</List>
    </Drawer>
  );
}
