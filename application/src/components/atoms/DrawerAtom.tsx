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
      variant="permanent"
      sx={{
        width: props.open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        overflow: "hidden",
        "& .MuiDrawer-paper": {
          width: props.open ? DRAWER_WIDTH : 0,
          boxSizing: "border-box",
          position: "relative",
          height: "100%",
          overflow: "hidden",
        },
      }}
    >
      {children}
    </Drawer>
  );
}
