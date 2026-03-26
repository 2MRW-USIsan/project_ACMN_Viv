"use client";

import { Drawer } from "@mui/material";
import { ReactNode } from "react";

interface DrawerAtomProps {
  props: {
    open: boolean;
    onClose: () => void;
  };
  children: ReactNode;
}

export function DrawerAtom({ props, children }: DrawerAtomProps) {
  return (
    <Drawer open={props.open} onClose={props.onClose}>
      {children}
    </Drawer>
  );
}
