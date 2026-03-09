// Switch domain view types (used by components)

export type SwitchItemValues = {
  key: string;
  label: string;
  value: string;
  altValue: string;
};

export type SwitchViewItem = {
  id: number;
  state: boolean;
  randomize: boolean;
  values: { key: string; label: string };
  data: SwitchChildViewItem[];
  onAddPanel: () => void;
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onToggleRandomize: () => void;
  onDelete: () => void;
};

export type SwitchChildViewItem = {
  id: number;
  values: SwitchItemValues;
  onChangeForm: (label: string, value: string) => void;
  onDelete: () => void;
};
