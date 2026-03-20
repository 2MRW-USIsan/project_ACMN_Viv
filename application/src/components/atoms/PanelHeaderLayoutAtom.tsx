"use client";

import { Box } from "@mui/material";

interface PanelHeaderLayoutAtomProps {
  children?: React.ReactNode;
}

export function PanelHeaderLayoutAtom({
  children,
}: PanelHeaderLayoutAtomProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 1,
        px: 1,
        py: 0.5,
      }}
    >
      {children}
    </Box>
  );
}
