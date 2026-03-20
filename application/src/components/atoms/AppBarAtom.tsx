"use client";

import { AppBar, Toolbar } from "@mui/material";

interface AppBarAtomProps {
  children?: React.ReactNode;
}

export function AppBarAtom({ children }: AppBarAtomProps) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}
