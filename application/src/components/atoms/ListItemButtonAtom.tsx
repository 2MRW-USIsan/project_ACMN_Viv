"use client";

import { ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";

interface ListItemButtonAtomProps {
  props: {
    href: string;
    label: string;
    isActive: boolean;
  };
}

export function ListItemButtonAtom({ props }: ListItemButtonAtomProps) {
  return (
    <ListItemButton component={Link} href={props.href} selected={props.isActive}>
      <ListItemText primary={props.label} />
    </ListItemButton>
  );
}
