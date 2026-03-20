"use client";

import { ListItemButton } from "@mui/material";
import Link from "next/link";

interface NavLinkButtonAtomProps {
  props: {
    href: string;
  };
  children?: React.ReactNode;
}

export function NavLinkButtonAtom({ props, children }: NavLinkButtonAtomProps) {
  return (
    <ListItemButton component={Link} href={props.href}>
      {children}
    </ListItemButton>
  );
}
