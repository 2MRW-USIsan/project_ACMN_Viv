// Orders domain view types (used by components)

export type OrdersViewItem = {
  id: number;
  state: boolean;
  values: { key: string; label: string };
  data: OrdersChildViewItem[];
  onAddPanel: () => void;
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};

export type OrdersItemViewItem = {
  id: number;
  values: { value: string; prompt: string; weight: string };
  disabled: boolean;
  onChangeForm: (label: string, value: string) => void;
};

export type OrdersChildViewItem = {
  id: number;
  values: { key: string; label: string; type: string; param: string };
  data: OrdersItemViewItem[];
  onAddPanel?: () => void;
  onChangeForm: (label: string, value: string) => void;
  onDelete: () => void;
};
