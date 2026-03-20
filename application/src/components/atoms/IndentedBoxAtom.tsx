"use client";

import { Box } from "@mui/material";

interface IndentedBoxAtomProps {
  children?: React.ReactNode;
}

export function IndentedBoxAtom({ children }: IndentedBoxAtomProps) {
  return <Box sx={{ pl: 3 }}>{children}</Box>;
}
