"use client";

import { IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";

type IconType = "removeCircle" | "arrowDown" | "arrowUp" | "add";

const iconMap: Record<IconType, React.ReactNode> = {
  removeCircle: <RemoveCircleIcon />,
  arrowDown: <KeyboardArrowDownIcon />,
  arrowUp: <KeyboardArrowUpIcon />,
  add: <AddIcon />,
};

interface IconButtonAtomProps {
  props: {
    icon: IconType;
    onClick: () => void;
    size?: "small" | "medium" | "large";
    color?: "default" | "primary" | "secondary" | "error" | "inherit";
    disabled?: boolean;
  };
}

export function IconButtonAtom({ props }: IconButtonAtomProps) {
  return (
    <IconButton
      onClick={props.onClick}
      size={props.size ?? "small"}
      color={props.color ?? "default"}
      disabled={props.disabled}
    >
      {iconMap[props.icon]}
    </IconButton>
  );
}
