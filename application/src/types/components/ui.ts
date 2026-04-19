// Display Atoms ----------
export type IconButtonType = {
  onClick: () => void;
};
export type DividerLineType = {
  orientation?: "horizontal" | "vertical";
};
export type ExpandMarkType = {
  isExpanded: boolean;
};
export type LabelType = {
  text: string;
};
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
