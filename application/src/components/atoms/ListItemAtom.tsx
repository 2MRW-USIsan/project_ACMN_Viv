"use client";

import { ListItem } from "@mui/material";

interface ListItemAtomProps {
  children?: React.ReactNode;
}

export function ListItemAtom({ children }: ListItemAtomProps) {
  return <ListItem disablePadding>{children}</ListItem>;
}
