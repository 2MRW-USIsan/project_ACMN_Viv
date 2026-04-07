"use client";

import { Box } from "@mui/material";

interface PanelFrameAtomProps {
  props?: {
    mt?: number;
    padding?: number;
  };
  children?: React.ReactNode;
}

export function PanelFrameAtom({ props = {}, children }: PanelFrameAtomProps) {
  const { mt, padding } = props;

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        ...(padding !== undefined ? { p: padding } : { overflow: "hidden" }),
        ...(mt !== undefined && { mt }),
      }}
    >
      {children}
    </Box>
  );
}
