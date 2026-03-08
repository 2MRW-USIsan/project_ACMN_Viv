// Orders domain view types (used by components)

export type OrdersViewItem = {
  id: number;
  state: boolean;
  values: { key: string; label: string };
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};
