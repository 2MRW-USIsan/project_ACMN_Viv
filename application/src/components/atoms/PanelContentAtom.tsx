"use client";

import { Box } from "@mui/material";

interface PanelContentAtomProps {
  children?: React.ReactNode;
}

export function PanelContentAtom({ children }: PanelContentAtomProps) {
  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        px: 3,
        py: 2,
      }}
    >
      {children}
    </Box>
  );
}
