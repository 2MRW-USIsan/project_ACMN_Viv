"use client";

import { Divider } from "@mui/material";

interface DividerAtomProps {
  props?: {
    orientation?: "horizontal" | "vertical";
    my?: number;
    mt?: number;
  };
}

export function DividerAtom({ props = {} }: DividerAtomProps) {
  const { orientation, my, mt } = props;
  const sx = my !== undefined ? { my } : mt !== undefined ? { mt } : undefined;
  return <Divider orientation={orientation ?? "horizontal"} sx={sx} />;
}
