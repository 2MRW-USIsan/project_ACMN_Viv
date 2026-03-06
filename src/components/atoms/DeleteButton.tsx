"use client";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function DeleteButton({ onClick, disabled }: DeleteButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label="delete"
      color="error"
      size="small"
    >
      <DeleteIcon />
    </IconButton>
  );
}
