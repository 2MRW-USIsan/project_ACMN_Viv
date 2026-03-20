"use client";

import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExpandIconButtonAtomProps {
  props: {
    expanded: boolean;
    onClick: () => void;
  };
}

export function ExpandIconButtonAtom({ props }: ExpandIconButtonAtomProps) {
  return (
    <IconButton onClick={props.onClick} aria-label="expand">
      <ExpandMoreIcon
        sx={{
          transform: props.expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
        }}
      />
    </IconButton>
  );
}
