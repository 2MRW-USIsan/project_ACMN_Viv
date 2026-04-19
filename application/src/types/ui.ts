// Display Atoms

// Input Atoms

export type IconButtonAtomType = {
  icon: "removeCircle" | "expandMore" | "expandLess" | "add";
  onClick: () => void;
  color?: "primary" | "secondary" | "default";
  size?: "small" | "medium" | "large";
  style?: {
    color: "PRIMARY" | "ALTERED" | "DEFAULT";
    size: "SMALL" | "MEDIUM" | "LARGE";
  };
};

// Surface Atoms
export type AppBarType = {
  onMenuOpen: () => void;
};

export type DrawerType = {
  open: boolean;
  onClose: () => void;
};

export type AppBarAtomType = AppBarType;

export type DrawerAtomType = DrawerType;

export type NavLinkAtomType = {
  label: string;
  onClick: () => void;
};
