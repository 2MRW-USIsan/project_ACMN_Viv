"use client";
import { Collapse } from "@mui/material";

interface CollapseAtomProps {
  props: {
    in: boolean;
    unmountOnExit?: boolean;
  };
  children?: React.ReactNode;
}

export function CollapseAtom({ props, children }: CollapseAtomProps) {
  return (
    <Collapse in={props.in} unmountOnExit={props.unmountOnExit ?? true}>
      {children}
    </Collapse>
  );
}
