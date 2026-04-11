

import { Link } from "@mui/material";
import { NavLinkAtomType } from "@/types/ui";

export interface NavLinkAtomProps {
  props: NavLinkAtomType;
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
