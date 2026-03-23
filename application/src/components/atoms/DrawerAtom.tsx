"use client";
import { Backdrop, Drawer, Toolbar } from "@mui/material";

interface DrawerAtomProps {
  props: {
    open: boolean;
    onOverlayClick?: () => void;
  };
  children?: React.ReactNode;
}

export function DrawerAtom({ props, children }: DrawerAtomProps) {
  return (
    <>
      <Backdrop open={props.open} onClick={props.onOverlayClick} />
      <Drawer open={props.open}>
        <Toolbar />
        {children}
      </Drawer>
    </>
  );
}
