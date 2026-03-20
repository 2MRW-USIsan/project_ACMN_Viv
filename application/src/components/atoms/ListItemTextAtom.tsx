"use client";

import { ListItemText } from "@mui/material";

interface ListItemTextAtomProps {
  props: {
    primary: string;
  };
}

export function ListItemTextAtom({ props }: ListItemTextAtomProps) {
  return <ListItemText primary={props.primary} />;
}
