import { useMemo } from "react";
import { PanelDataActionsType, PanelDataStateType } from "./usePanelReducer";

type PanelReducer = {
  state: PanelDataStateType;
  actions: PanelDataActionsType;
};
type OrdersStateItem =
  PanelReducer["state"]["panels"][number]["orders"]["data"][number];
type SelectStateItem =
  PanelReducer["state"]["panels"][number]["select"]["data"][number];
type SwitchStateItem =
  PanelReducer["state"]["panels"][number]["switch"]["data"][number];

type OrdersViewItem = {
  id: number;
  state: boolean;
  values: { key: string; label: string };
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};

type SelectViewItem = {
  id: number;
  state: boolean;
  values: { key: string; label: string };
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};

type SwitchChildViewItem = {
  id: number;
  values: {
    key: string;
    label: string;
    value: string;
    altValue: string;
  };
  onChangeForm: (label: string, value: string) => void;
};

type SwitchViewItem = {
  id: number;
  state: boolean;
  values: { key: string; label: string };
  data: SwitchChildViewItem[];
  onAddPanel: () => void;
  onChangeForm: (label: string, value: string) => void;
  onClick: () => void;
  onDelete: () => void;
};

export default function usePanelData(reducer: PanelReducer) {
  const { state, actions } = reducer;

  const mapOrdersItems = (panelId: number, items: OrdersStateItem[]): OrdersViewItem[] =>
    items.map((item) => ({
      ...item,
      onChangeForm: (key: string, label: string) =>
        actions.changeItemForm(panelId, "orders", item.id, key, label),
      onClick: () => actions.changeItemPanel(panelId, "orders", item.id),
      onDelete: () => actions.deleteItemPanel(panelId, "orders", item.id),
    }));

  const mapSelectItems = (panelId: number, items: SelectStateItem[]): SelectViewItem[] =>
    items.map((item) => ({
      ...item,
      onChangeForm: (key: string, label: string) =>
        actions.changeItemForm(panelId, "select", item.id, key, label),
      onClick: () => actions.changeItemPanel(panelId, "select", item.id),
      onDelete: () => actions.deleteItemPanel(panelId, "select", item.id),
    }));

  const mapSwitchItems = (panelId: number, items: SwitchStateItem[]): SwitchViewItem[] =>
    items.map((item) => ({
      ...item,
      data: item.data.map((child, index) => ({
        id: index,
        values: child,
        onChangeForm: (label: string, value: string) =>
          actions.changeItemForm(
            panelId,
            "switch",
            item.id,
            `child:${index}:${label}`,
            value,
          ),
      })),
      onAddPanel: () => actions.addSwitchChildItemPanel(panelId, item.id),
      onChangeForm: (key: string, label: string) =>
        actions.changeItemForm(panelId, "switch", item.id, key, label),
      onClick: () => actions.changeItemPanel(panelId, "switch", item.id),
      onDelete: () => actions.deleteItemPanel(panelId, "switch", item.id),
    }));

  return useMemo(
    () =>
      state.panels.map((panel) => ({
        id: panel.id,
        label: panel.label,
        state: panel.state,
        value: panel.value,
        onChange: (key: string, label: string) => {
          actions.changeForm(panel.id, key, label);
        },
        onClick: () => {
          actions.changePanel(panel.id);
        },
        onDelete: () => {
          actions.deletePanel(panel.id);
        },
        orders: {
          data: mapOrdersItems(panel.id, panel.orders.data),
          selected: panel.orders.selected,
          onClick: () => actions.changeChip(panel.id, "orders"),
          onAdd: () => actions.addItemPanel(panel.id, "orders"),
        },
        select: {
          data: mapSelectItems(panel.id, panel.select.data),
          selected: panel.select.selected,
          onClick: () => actions.changeChip(panel.id, "select"),
          onAdd: () => actions.addItemPanel(panel.id, "select"),
        },
        switch: {
          data: mapSwitchItems(panel.id, panel.switch.data),
          selected: panel.switch.selected,
          onClick: () => actions.changeChip(panel.id, "switch"),
          onAdd: () => actions.addItemPanel(panel.id, "switch"),
        },
      })),
    [state.panels, actions],
  );
}
