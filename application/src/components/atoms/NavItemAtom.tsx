"use client";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface NavItemAtomProps {
  props: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  };
}

export function NavItemAtom({ props }: NavItemAtomProps) {
  return (
    <ListItemButton onClick={props.onClick}>
      <ListItemIcon sx={{ minWidth: 32 }}>
        {props.isActive && <CheckIcon color="success" fontSize="small" />}
      </ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItemButton>
  );
}
