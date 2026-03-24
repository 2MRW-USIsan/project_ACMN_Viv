"use client";
import { Stack, StackProps } from "@mui/material";

interface StackAtomProps {
  props?: StackProps;
  children?: React.ReactNode;
}

export function StackAtom({ props, children }: StackAtomProps) {
  return <Stack {...props}>{children}</Stack>;
}