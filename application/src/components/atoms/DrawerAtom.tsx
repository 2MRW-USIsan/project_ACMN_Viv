"use client";

import { Drawer } from "@mui/material";

const DRAWER_WIDTH = 240;

interface DrawerAtomProps {
  props: {
    open: boolean;
    onClose: () => void;
  };
  children?: React.ReactNode;
}

export function DrawerAtom({ props, children }: DrawerAtomProps) {
  return (
    <Drawer
      variant="temporary"
      open={props.open}
      onClose={props.onClose}
      sx={{
        "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
      }}
    >
      {children}
    </Drawer>
  );
}
