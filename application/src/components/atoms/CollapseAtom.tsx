"use client";

import { Collapse } from "@mui/material";

interface CollapseAtomProps {
  props: {
    in: boolean;
  };
  children?: React.ReactNode;
}

export function CollapseAtom({ props, children }: CollapseAtomProps) {
  return <Collapse in={props.in}>{children}</Collapse>;
}
