// Panel state management types (used by usePanelReducer)

export type ChipType = "orders" | "select" | "switch";

export type PanelDataStateType = {
  panels: PanelItem[];
};
export type PanelItemData = {
  id: number;
  state: boolean;
  values: { key: string; label: string };
};

export type PanelItem = PanelItemData & {
  label: string;
  orders: OrdersPanelChip;
  select: SelectPanelChip;
  switch: SwitchPanelChip;
};

export type OrdersPanelChip = { selected: boolean; data: OrdersPanelItem[] };
export type SelectPanelChip = { selected: boolean; data: SelectPanelItem[] };
export type SwitchPanelChip = { selected: boolean; data: SwitchPanelItem[] };

export type OrdersPanelItem = PanelItemData & { data: OrdersDataItem[] };
export type SelectPanelItem = PanelItemData & { data: SelectDataItem[] };
export type SwitchPanelItem = PanelItemData & { data: SwitchDataItem[] };

export type OrdersDataItem = {};
export type SelectDataItem = {
  id: number;
  values: { key: string; label: string };
  data: SelectListDataItem[];
};
export type SelectListDataItem = {
  id: number;
  values: { prompt: string; value: string };
};
export type SwitchDataItem = {
  key: string;
  label: string;
  value: string;
  altValue: string;
};

export type PanelDataActionsType = {
  addPanel: () => void;
  changePanel: (id: number) => void;
  deletePanel: (id: number) => void;
  changeChip: (id: number, chipType: ChipType) => void;
  changeForm: (id: number, label: string, value: string) => void;
  addItemPanel: (id: number, key: ChipType) => void;
  addOrdersChildItemPanel: (id: number, parentItemId: number) => void;
  addSelectChildItemPanel: (id: number, parentItemId: number) => void;
  addSelectListItemPanel: (
    id: number,
    selectItemId: number,
    childItemId: number,
  ) => void;
  addSwitchChildItemPanel: (id: number, parentItemId: number) => void;
  deleteOrdersChildItemPanel: (id: number, parentItemId: number) => void;
  deleteSelectChildItemPanel: (id: number, parentItemId: number) => void;
  deleteSwitchChildItemPanel: (id: number, parentItemId: number) => void;
  changeItemPanel: (id: number, key: ChipType, itemId: number) => void;
  changeItemForm: (
    id: number,
    key: ChipType,
    itemId: number,
    label: string,
    value: string,
  ) => void;
  deleteItemPanel: (id: number, key: ChipType, itemId: number) => void;
};
