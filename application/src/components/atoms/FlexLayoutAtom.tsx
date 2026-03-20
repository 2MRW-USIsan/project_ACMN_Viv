"use client";

import { Box } from "@mui/material";

interface FlexLayoutAtomProps {
  children?: React.ReactNode;
}

export function FlexLayoutAtom({ children }: FlexLayoutAtomProps) {
  return <Box sx={{ display: "flex" }}>{children}</Box>;
}
