"use client";

import { ListItem } from "@mui/material";

type ListRowVariant = "item" | "footer" | "plain" | "compact";

const variantStyles: Record<ListRowVariant, object> = {
  item: {
    px: 2,
    py: 1,
    display: "flex",
    alignItems: "center",
    gap: 1,
    flexWrap: "wrap",
  },
  footer: {
    px: 2,
    py: 1.5,
    display: "flex",
    justifyContent: "center",
  },
  plain: {
    px: 0,
    py: 1,
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  compact: {
    px: 0,
    py: 0.5,
    display: "flex",
    alignItems: "center",
    gap: 1,
    flexWrap: "wrap",
  },
};

interface ListRowAtomProps {
  props?: {
    variant?: ListRowVariant;
  };
  children?: React.ReactNode;
}

export function ListRowAtom({ props = {}, children }: ListRowAtomProps) {
  const variant = props.variant ?? "item";

  return (
    <ListItem disablePadding sx={variantStyles[variant]}>
      {children}
    </ListItem>
  );
}
