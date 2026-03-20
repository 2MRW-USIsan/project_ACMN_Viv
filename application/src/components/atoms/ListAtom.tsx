"use client";

import { List } from "@mui/material";

interface ListAtomProps {
  children?: React.ReactNode;
}

export function ListAtom({ children }: ListAtomProps) {
  return <List>{children}</List>;
}
