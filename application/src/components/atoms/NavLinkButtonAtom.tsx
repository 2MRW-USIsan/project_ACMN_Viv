"use client";

import { ListItemButton } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkButtonAtomProps {
  props: {
    href: string;
  };
  children?: React.ReactNode;
}

export function NavLinkButtonAtom({ props, children }: NavLinkButtonAtomProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(props.href);

  return (
    <ListItemButton
      component={Link}
      href={props.href}
      selected={isActive}
      sx={isActive ? { "& .MuiListItemText-primary": { fontWeight: "bold" } } : undefined}
    >
      {children}
    </ListItemButton>
  );
}
