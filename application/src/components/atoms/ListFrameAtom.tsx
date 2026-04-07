"use client";

import { List } from "@mui/material";

interface ListFrameAtomProps {
  children?: React.ReactNode;
}

export function ListFrameAtom({ children }: ListFrameAtomProps) {
  return <List disablePadding>{children}</List>;
}
