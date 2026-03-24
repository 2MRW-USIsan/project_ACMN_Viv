"use client";
import { Box, BoxProps } from "@mui/material";

interface BoxAtomProps {
  props?: BoxProps;
  children?: React.ReactNode;
}

export function BoxAtom({ props, children }: BoxAtomProps) {
  return <Box {...props}>{children}</Box>;
}
