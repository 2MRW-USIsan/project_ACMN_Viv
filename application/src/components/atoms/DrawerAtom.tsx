"use client";

import { Drawer } from "@mui/material";

const DRAWER_WIDTH = 240;

interface DrawerAtomProps {
  props: {
    open: boolean;
  };
  children?: React.ReactNode;
}

export function DrawerAtom({ props, children }: DrawerAtomProps) {
  return (
    <Drawer
      variant="persistent"
      open={props.open}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
      }}
    >
      {children}
    </Drawer>
  );
}
