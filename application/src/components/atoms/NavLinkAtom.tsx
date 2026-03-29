"use client";

import { Link } from "@mui/material";

interface NavLinkAtomProps {
  props: {
    label: string;
    onClick: () => void;
  };
}

export function NavLinkAtom({ props }: NavLinkAtomProps) {
  return (
    <Link
      component="button"
      onClick={props.onClick}
      underline="always"
      sx={{ textAlign: "left", display: "block", cursor: "pointer" }}
    >
      {`>> ${props.label}`}
    </Link>
  );
}
