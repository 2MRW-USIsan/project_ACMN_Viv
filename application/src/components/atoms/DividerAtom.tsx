"use client";
import { Divider, DividerProps } from "@mui/material";

interface DividerAtomProps {
  props?: DividerProps;
}

export function DividerAtom({ props }: DividerAtomProps) {
  return <Divider {...props} />;
}