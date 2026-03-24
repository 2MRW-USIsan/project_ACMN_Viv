"use client";
import { ListItem, ListItemProps } from "@mui/material";

interface ListItemAtomProps {
  props?: ListItemProps;
  children?: React.ReactNode;
}

export function ListItemAtom({ props, children }: ListItemAtomProps) {
  return <ListItem {...props}>{children}</ListItem>;
}
