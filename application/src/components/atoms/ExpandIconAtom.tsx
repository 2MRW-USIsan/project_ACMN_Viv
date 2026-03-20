"use client";

import { ExpandMore } from "@mui/icons-material";

interface ExpandIconAtomProps {
  props: {
    expanded: boolean;
  };
}

export function ExpandIconAtom({ props }: ExpandIconAtomProps) {
  return (
    <ExpandMore
      sx={{
        transform: props.expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s",
      }}
    />
  );
}
