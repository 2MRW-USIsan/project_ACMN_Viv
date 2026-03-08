// Bloc domain view types (top-level panel item)

import { OrdersViewItem } from "./orders";
import { SelectViewItem } from "./select";
import { SwitchViewItem } from "./switch";

export type BlocViewItem = {
  id: number;
  label: string;
  state: boolean;
  value: { key: string; label: string };
  onChange: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
  orders: {
    selected: boolean;
    onClick: () => void;
    onAdd: () => void;
    data: OrdersViewItem[];
  };
  select: {
    selected: boolean;
    onClick: () => void;
    onAdd: () => void;
    data: SelectViewItem[];
  };
  switch: {
    selected: boolean;
    onClick: () => void;
    onAdd: () => void;
    data: SwitchViewItem[];
  };
};
