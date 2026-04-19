// ==========
// Atoms
// ==========
// Display Atoms ----------
export type IconButtonType = { onClick: () => void };
export type DividerLineType = { orientation?: "horizontal" | "vertical" };
export type ExpandMarkType = { isExpanded: boolean };
export type LabelType = { text: string };
// Input Atoms ----------
export type ButtonType = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};
export type ChipCheckType = {
  label: string;
  checked: boolean;
  onChange: () => void;
};
export type ChipRadioType = {
  label?: string;
  checked: boolean;
  onChange: () => void;
};
export type SelectorType = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
};
export type SwitcherType = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};
export type TextFieldType = {
  value: string;
  onChange: (value: string) => void;
};
export type TextAreaType = TextFieldType & { rows?: number };
// Input Atoms ----------
export type CollapseContainerType = { isExpanded: boolean };
export type PanelItemType = { onClick: () => void };
// Surface Atoms ----------
export type AppBarType = { onMenuOpen: () => void };
export type DrawerType = { open: boolean; onClose: () => void };

// ==========
// Molecules
// ==========
export type ExpandFrameType = {
  label: LabelType;
  toggle: IconButtonType;
  isExpanded: CollapseContainerType;
};
export type AddPanelButtonType = {
  label: LabelType;
  onClick: () => void;
};
export type ConfigPanelFormType = {
  onToggle: PanelItemType;
  field: {
    value: TextFieldType;
    key: TextFieldType;
  };
  label: {
    title: LabelType;
    value: LabelType;
    key: LabelType;
  };
  remove: IconButtonType;
  isExpanded: ExpandMarkType;
};
export type ListItemFormType = {
  field: {
    value: TextFieldType;
    prompt: TextFieldType;
  };
  label: {
    title: LabelType;
    value: LabelType;
    prompt: LabelType;
  };
  remove: IconButtonType;
};
export type RandomItemFormType = {
  field: {
    value: TextFieldType;
    prompt: TextFieldType;
    weight: TextFieldType;
  };
  label: {
    title: LabelType;
    value: LabelType;
    prompt: LabelType;
    weight: LabelType;
  };
  remove: IconButtonType;
};
export type SwitchItemFormType = {
  field: {
    value: TextFieldType;
    prompt: TextFieldType;
    weight: TextFieldType;
  };
  label: {
    title: LabelType;
    value: LabelType;
    prompt: LabelType;
    weight: LabelType;
  };
  remove: IconButtonType;
};
