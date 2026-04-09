"use client";

import { Divider } from "@mui/material";

interface DividerAtomProps {
  props?: {
    orientation?: "horizontal" | "vertical";
  };
}

export function DividerAtom({
  props = { orientation: "horizontal" },
}: DividerAtomProps) {
  return <Divider flexItem orientation={props.orientation} />;
}
