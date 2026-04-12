import { IconButtonAtomType } from "@/types/ui";
import AddIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";

export interface IconButtonAtomProps {
  props: IconButtonAtomType;
  style?: IconButtonAtomType["style"];
}

type IconColor = "PRIMARY" | "ALTERED" | "DEFAULT";
type IconSize = "SMALL" | "MEDIUM" | "LARGE";
type IconType = "removeCircle" | "expandMore" | "expandLess" | "add";

export function IconButtonAtom({
  props,
  style = { color: "DEFAULT", size: "SMALL" },
}: IconButtonAtomProps) {
  type MuiIconColor = "primary" | "secondary" | "default";
  type MuiIconSize = "small" | "medium" | "large";
  const {} = style;

  const iconShape: Record<IconType, React.ReactElement> = {
    removeCircle: <RemoveCircleOutlineIcon />,
    expandMore: <ExpandMoreIcon />,
    expandLess: <ExpandLessIcon />,
    add: <AddIcon />,
  };
  const iconColor: Record<IconColor, MuiIconColor> = {
    PRIMARY: "primary",
    ALTERED: "secondary",
    DEFAULT: "default",
  };
  const iconSize: Record<IconSize, MuiIconSize> = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
  };
  return (
    <IconButton
      size={iconSize[style.size]}
      color={iconColor[style.color]}
      onClick={props.onClick}
    >
      {iconShape[props.icon]}
    </IconButton>
  );
}
