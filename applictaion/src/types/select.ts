// Select domain view types (used by components)

export type SelectViewItem = {
  id: number;
  state: boolean;
  values: { key: string; label: string };
  data: SelectChildViewItem[];
  onAddPanel: () => void;
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};

export type SelectChildViewItem = {
  id: number;
  values: { key: string; label: string };
  data: SelectListViewItem[];
  onAddPanel: () => void;
  onChangeForm: (label: string, value: string) => void;
  onDelete: () => void;
};

export type SelectListViewItem = {
  id: number;
  values: { prompt: string; value: string };
  onChangeForm: (label: string, value: string) => void;
  onDelete: () => void;
};
