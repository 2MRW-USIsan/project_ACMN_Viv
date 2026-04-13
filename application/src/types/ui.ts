// Display Atoms
export type DividerAtomType = {
  orientation?: "horizontal" | "vertical";
};

export type LabelAtomType = {
  text: string;
  variant?: string;
  color?: string;
  fontWeight?: string | number;
  style?: {
    size: "TITLE" | "HEADER" | "LABEL" | "BODY" | "INPUT" | "CAPTION";
    color: string;
  };
};

// Input Atoms
export type ButtonAtomType = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "error";
  style?: {
    shape: "FILLED" | "OUTLINED" | "TEXT";
    color: "PRIMARY" | "ALTERED" | "WARNING";
    size: "NORMAL" | "WIDE" | "FULL";
  };
};

export type ChipCheckboxAtomType = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

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

export type ChipRadioAtomType = {
  label?: string;
  checked: boolean;
  onChange: () => void;
};

export type SelectAtomType = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export type SwitchAtomType = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export type TextAreaAtomType = {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  rows?: number;
  multiline?: boolean;
  fullWidth?: boolean;
};

export type TextFieldAtomType = {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  size?: "small" | "medium";
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
};

// Surface Atoms
export type AppBarAtomType = {
  onMenuOpen: () => void;
};

export type DrawerAtomType = {
  open: boolean;
  onClose: () => void;
};

export type NavLinkAtomType = {
  label: string;
  onClick: () => void;
};
