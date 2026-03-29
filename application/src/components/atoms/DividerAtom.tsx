"use client";

import { Divider } from "@mui/material";

interface DividerAtomProps {
  props?: {
    orientation?: "horizontal" | "vertical";
  };
}

export function DividerAtom({ props = {} }: DividerAtomProps) {
  return <Divider orientation={props.orientation ?? "horizontal"} />;
}
