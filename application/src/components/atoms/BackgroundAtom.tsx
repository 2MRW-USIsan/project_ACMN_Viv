"use client";
import { Box, BoxProps, Toolbar, ToolbarProps } from "@mui/material";

interface BackgroundAtomProps {
  props?: {
    boxProps?: BoxProps;
    toolbarProps?: ToolbarProps;
  };
  children?: React.ReactNode;
}

export function BackgroundAtom({ props, children }: BackgroundAtomProps) {
  return (
    <Box {...props?.boxProps}>
      <Toolbar {...props?.toolbarProps} />
      {children}
    </Box>
  );
}