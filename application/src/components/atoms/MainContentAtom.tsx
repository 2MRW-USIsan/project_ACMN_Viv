"use client";

import { Box, Toolbar } from "@mui/material";

interface MainContentAtomProps {
  children?: React.ReactNode;
}

export function MainContentAtom({ children }: MainContentAtomProps) {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      {children}
    </Box>
  );
}
