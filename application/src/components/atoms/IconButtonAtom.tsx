"use client";

import { IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";

type IconType = "removeCircle" | "expandMore" | "expandLess" | "add";

interface IconButtonAtomProps {
  props: {
    icon: IconType;
    onClick: () => void;
    size?: "small" | "medium" | "large";
    color?: "default" | "primary" | "secondary" | "error";
  };
}

const ICONS: Record<IconType, React.ReactElement> = {
  removeCircle: <RemoveCircleOutlineIcon />,
  expandMore: <ExpandMoreIcon />,
  expandLess: <ExpandLessIcon />,
  add: <AddIcon />,
};

export function IconButtonAtom({ props }: IconButtonAtomProps) {
  return (
    <IconButton
      size={props.size ?? "small"}
      color={props.color ?? "default"}
      onClick={props.onClick}
    >
      {ICONS[props.icon]}
    </IconButton>
  );
}
