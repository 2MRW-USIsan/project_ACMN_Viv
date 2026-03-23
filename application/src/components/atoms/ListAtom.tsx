"use client";
import { List, ListProps } from "@mui/material";

interface ListAtomProps {
  props?: ListProps;
  children?: React.ReactNode;
}

export function ListAtom({ props, children }: ListAtomProps) {
  return <List {...props}>{children}</List>;
}
