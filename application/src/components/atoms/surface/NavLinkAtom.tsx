import { NavLinkAtomType } from "@/types/ui";
import { Box, Link } from "@mui/material";

export interface NavLinkAtomProps {
  props: NavLinkAtomType;
}

export function NavLinkAtom({ props }: NavLinkAtomProps) {
  return (
    <Box>
      <Link
        component="button"
        onClick={props.onClick}
        underline="always"
        sx={{ textAlign: "left", display: "block", cursor: "pointer" }}
      >
        {`${props.label}`}
      </Link>
    </Box>
  );
}
