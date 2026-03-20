"use client";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteIconButtonAtomProps {
  props: {
    onClick: () => void;
  };
}

export function DeleteIconButtonAtom({ props }: DeleteIconButtonAtomProps) {
  return (
    <IconButton onClick={props.onClick} edge="end" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
}
