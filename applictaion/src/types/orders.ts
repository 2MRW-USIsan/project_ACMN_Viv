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

export type OrdersComplexItemViewItem = {
  id: number;
  values: { value: string; prompt: string; weight: string };
  onChangeForm: (label: string, value: string) => void;
  onDelete: () => void;
};

export type OrdersItemViewItem = {
  id: number;
  values: { value: string; prompt: string; weight: string };
  disabled: boolean;
  hidePrompt: boolean;
  complexData: OrdersComplexItemViewItem[];
  onAddComplexPanel?: () => void;
  onChangeForm: (label: string, value: string) => void;
  onDelete: () => void;
};

export type OrdersChildViewItem = {
  id: number;
  values: { key: string; label: string; type: string };
  data: OrdersItemViewItem[];
  onAddPanel?: () => void;
  onChangeForm: (label: string, value: string) => void;
  onDelete: () => void;
};
