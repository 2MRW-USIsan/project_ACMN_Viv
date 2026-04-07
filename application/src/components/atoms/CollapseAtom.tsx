"use client";

import { Collapse } from "@mui/material";

interface CollapseAtomProps {
  props: {
    isOpen: boolean;
  };
  children?: React.ReactNode;
}

export function CollapseAtom({ props, children }: CollapseAtomProps) {
  return (
    <Collapse in={props.isOpen} timeout="auto" unmountOnExit>
      {children}
    </Collapse>
  );
}
