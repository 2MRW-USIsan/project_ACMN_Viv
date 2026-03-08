import { useEffect, useReducer } from "react";

type ChipType = "orders" | "select" | "switch";
export type PanelDataStateType = {
  panels: PanelItem[];
};
type PanelItem = {
  id: number;
  label: string;
  value: { key: string; label: string };
  state: boolean;
  orders: OrdersPanelChip;
  select: SelectPanelChip;
  switch: SwitchPanelChip;
};
type OrdersPanelChip = { selected: boolean; data: OrdersPanelItem[] };
type SelectPanelChip = { selected: boolean; data: SelectPanelItem[] };
type SwitchPanelChip = { selected: boolean; data: SwitchPanelItem[] };

type PanelItemData = {
  id: number;
  state: boolean;
  values: { key: string; label: string };
};
type OrdersPanelItem = PanelItemData & { data: OrdersDataItem[] };
type SelectPanelItem = PanelItemData & { data: SelectDataItem[] };
type SwitchPanelItem = PanelItemData & { data: SwitchDataItem[] };

type OrdersDataItem = {};
type SelectDataItem = {
  id: number;
  values: { key: string; label: string };
  data: SelectListDataItem[];
};
type SelectListDataItem = {
  id: number;
  values: { prompt: string; value: string };
};
type SwitchDataItem = {
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
  addSelectListItemPanel: (id: number, selectItemId: number, childItemId: number) => void;
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



type ItemPanelPayload = { id: number; key: ChipType; itemId: number };
type ChildItemPayload = { id: number; parentItemId: number };
type SelectListItemPayload = { id: number; selectItemId: number; childItemId: number };

const createOrdersPanelItem = (): OrdersPanelItem => ({
  id: Date.now(),
  state: false,
  values: { key: "", label: "--" },
  data: [],
});

const createSelectPanelItem = (): SelectPanelItem => ({
  id: Date.now(),
  state: false,
  values: { key: "", label: "--" },
  data: [],
});

const createSelectDataItem = (): SelectDataItem => ({
  id: Date.now(),
  values: { key: "", label: "" },
  data: [],
});

const createSelectListDataItem = (): SelectListDataItem => ({
  id: Date.now(),
  values: { prompt: "", value: "" },
});

const createSwitchPanelItem = (): SwitchPanelItem => ({
  id: Date.now(),
  state: false,
  values: { key: "", label: "--" },
  data: [],
});

const createSwitchDataItem = (): SwitchDataItem => ({
  key: "",
  label: "",
  value: "",
  altValue: "",
});

const addPanelState = (state: PanelDataStateType): PanelDataStateType => ({
  ...state,
  panels: [
    ...state.panels,
    {
      id: Date.now(),
      label: `Panel ${state.panels.length + 1}`,
      value: { key: `key-${Date.now()}`, label: `label-${Date.now()}` },
      state: false,
      orders: { selected: false, data: [] },
      select: { selected: false, data: [] },
      switch: { selected: false, data: [] },
    },
  ],
});

const changePanelState = (
  state: PanelDataStateType,
  payload: { id: number; chipType?: ChipType },
): PanelDataStateType => {
  if (payload.chipType) {
    const chipType = payload.chipType;
    return {
      ...state,
      panels: state.panels.map((p) =>
        p.id === payload.id
          ? {
              ...p,
              [chipType]: {
                ...p[chipType],
                selected: !p[chipType].selected,
              },
            }
          : p,
      ),
    };
  }
  return {
    ...state,
    panels: state.panels.map((p) =>
      p.id === payload.id ? { ...p, state: !p.state } : p,
    ),
  };
};

const deletePanelState = (
  state: PanelDataStateType,
  payload: { id: number },
): PanelDataStateType => ({
  ...state,
  panels: state.panels.filter((p) => p.id !== payload.id),
});

const changeFormState = (
  state: PanelDataStateType,
  payload: { id: number; label: string; value: string },
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? { ...p, value: { ...p.value, [payload.label]: payload.value } }
      : p,
  ),
});

const addItemPanelState = (
  state: PanelDataStateType,
  payload: { id: number; key: ChipType },
): PanelDataStateType => {
  const newItemByKey = {
    orders: createOrdersPanelItem,
    select: createSelectPanelItem,
    switch: createSwitchPanelItem,
  } as const;

  return {
    ...state,
    panels: state.panels.map((p) =>
      p.id === payload.id
        ? {
            ...p,
            [payload.key]: {
              ...p[payload.key],
              data: [...p[payload.key].data, newItemByKey[payload.key]()],
            },
          }
        : p,
    ),
  };
};

const addOrdersChildItemPanelState = (
  state: PanelDataStateType,
  payload: ChildItemPayload,
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          orders: {
            ...p.orders,
            data: p.orders.data.map((item) =>
              item.id === payload.parentItemId
                ? { ...item, data: [...item.data, {}] }
                : item,
            ),
          },
        }
      : p,
  ),
});

const addSelectChildItemPanelState = (
  state: PanelDataStateType,
  payload: ChildItemPayload,
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          select: {
            ...p.select,
            data: p.select.data.map((item) =>
              item.id === payload.parentItemId
                ? { ...item, data: [...item.data, createSelectDataItem()] }
                : item,
            ),
          },
        }
      : p,
  ),
});

const addSelectListItemPanelState = (
  state: PanelDataStateType,
  payload: SelectListItemPayload,
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          select: {
            ...p.select,
            data: p.select.data.map((item) =>
              item.id === payload.selectItemId
                ? {
                    ...item,
                    data: item.data.map((child) =>
                      child.id === payload.childItemId
                        ? { ...child, data: [...child.data, createSelectListDataItem()] }
                        : child,
                    ),
                  }
                : item,
            ),
          },
        }
      : p,
  ),
});

const addSwitchChildItemPanelState = (
  state: PanelDataStateType,
  payload: ChildItemPayload,
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          switch: {
            ...p.switch,
            data: p.switch.data.map((item) =>
              item.id === payload.parentItemId
                ? { ...item, data: [...item.data, createSwitchDataItem()] }
                : item,
            ),
          },
        }
      : p,
  ),
});

const deleteOrdersChildItemPanelState = (
  state: PanelDataStateType,
  payload: ChildItemPayload,
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          orders: {
            ...p.orders,
            data: p.orders.data.map((item) =>
              item.id === payload.parentItemId
                ? { ...item, data: item.data.slice(0, -1) }
                : item,
            ),
          },
        }
      : p,
  ),
});

const deleteSelectChildItemPanelState = (
  state: PanelDataStateType,
  payload: ChildItemPayload,
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          select: {
            ...p.select,
            data: p.select.data.map((item) =>
              item.id === payload.parentItemId
                ? { ...item, data: item.data.slice(0, -1) }
                : item,
            ),
          },
        }
      : p,
  ),
});

const deleteSwitchChildItemPanelState = (
  state: PanelDataStateType,
  payload: ChildItemPayload,
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          switch: {
            ...p.switch,
            data: p.switch.data.map((item) =>
              item.id === payload.parentItemId
                ? { ...item, data: item.data.slice(0, -1) }
                : item,
            ),
          },
        }
      : p,
  ),
});

const changeItemPanelState = (
  state: PanelDataStateType,
  payload: ItemPanelPayload,
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          [payload.key]: {
            ...p[payload.key],
            data:
              p[payload.key].data.map((item) =>
                item.id === payload.itemId
                  ? { ...item, state: !item.state }
                  : item,
              ),
          },
        }
      : p,
  ),
});

const changeItemFormState = (
  state: PanelDataStateType,
  payload: {
    id: number;
    key: ChipType;
    itemId: number;
    label: string;
    value: string;
  },
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          [payload.key]: {
            ...p[payload.key],
            data:
              payload.key === "switch"
                ? p[payload.key].data.map((item) => {
                    if (item.id !== payload.itemId) {
                      return item;
                    }

                    const childMatch = payload.label.match(/^child:(\d+):(.*)$/);
                    if (childMatch) {
                      const childIndex = Number(childMatch[1]);
                      const childLabel = childMatch[2] as keyof SwitchDataItem;
                      return {
                        ...item,
                        data: item.data.map((child, index) =>
                          index === childIndex
                            ? { ...child, [childLabel]: payload.value }
                            : child,
                        ),
                      };
                    }

                    return {
                      ...item,
                      values: {
                        ...item.values,
                        [payload.label]: payload.value,
                      },
                    };
                  })
                : payload.key === "select"
                ? p.select.data.map((item) => {
                    if (item.id !== payload.itemId) {
                      return item;
                    }

                    const childMatch = payload.label.match(/^child:(\d+):(.*)$/);
                    if (!childMatch) {
                      return {
                        ...item,
                        values: { ...item.values, [payload.label]: payload.value },
                      };
                    }

                    const childId = Number(childMatch[1]);
                    const rest = childMatch[2];

                    const listItemMatch = rest.match(/^listItem:(\d+):(.*)$/);
                    if (!listItemMatch) {
                      return {
                        ...item,
                        data: item.data.map((child) =>
                          child.id === childId
                            ? { ...child, values: { ...child.values, [rest]: payload.value } }
                            : child,
                        ),
                      };
                    }

                    const listItemId = Number(listItemMatch[1]);
                    const fieldLabel = listItemMatch[2];
                    return {
                      ...item,
                      data: item.data.map((child) =>
                        child.id === childId
                          ? {
                              ...child,
                              data: child.data.map((listItem) =>
                                listItem.id === listItemId
                                  ? {
                                      ...listItem,
                                      values: { ...listItem.values, [fieldLabel]: payload.value },
                                    }
                                  : listItem,
                              ),
                            }
                          : child,
                      ),
                    };
                  })
                : p[payload.key].data.map((item) =>
                    item.id === payload.itemId
                      ? {
                          ...item,
                          values: {
                            ...item.values,
                            [payload.label]: payload.value,
                          },
                        }
                      : item,
                  ),
          },
        }
      : p,
  ),
});

const deleteItemPanelState = (
  state: PanelDataStateType,
  payload: ItemPanelPayload,
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          [payload.key]: {
            ...p[payload.key],
            data:
              p[payload.key].data.filter((item) => item.id !== payload.itemId),
          },
        }
      : p,
  ),
});

interface Returns {
  state: PanelDataStateType;
  actions: PanelDataActionsType;
}

export default function usePanelReducer(): Returns {
  type STATE = PanelDataStateType | undefined;
  type ACTION =
    | { type: "ADD_PANEL"; payload?: undefined }
    | { type: "CHANGE_PANEL"; payload: { id: number; chipType?: ChipType } }
    | { type: "DELETE_PANEL"; payload: { id: number } }
    | {
        type: "CHANGE_FORM";
        payload: { id: number; label: string; value: string };
      }
    | { type: "ADD_ITEM_PANEL"; payload: { id: number; key: ChipType } }
    | { type: "ADD_ORDERS_CHILD_ITEM_PANEL"; payload: ChildItemPayload }
    | { type: "ADD_SELECT_CHILD_ITEM_PANEL"; payload: ChildItemPayload }
    | { type: "ADD_SELECT_LIST_ITEM_PANEL"; payload: SelectListItemPayload }
    | {
        type: "ADD_SWITCH_CHILD_ITEM_PANEL";
        payload: ChildItemPayload;
      }
    | { type: "DELETE_ORDERS_CHILD_ITEM_PANEL"; payload: ChildItemPayload }
    | { type: "DELETE_SELECT_CHILD_ITEM_PANEL"; payload: ChildItemPayload }
    | { type: "DELETE_SWITCH_CHILD_ITEM_PANEL"; payload: ChildItemPayload }
    | { type: "CHANGE_ITEM_PANEL"; payload: ItemPanelPayload }
    | {
        type: "CHANGE_ITEM_FORM";
        payload: {
          id: number;
          key: ChipType;
          itemId: number;
          label: string;
          value: string;
        };
      }
    | { type: "DELETE_ITEM_PANEL"; payload: ItemPanelPayload }
    | { type: "INITIALIZE"; payload?: undefined };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "ADD_PANEL":
        return state && addPanelState(state);
      case "CHANGE_PANEL":
        return state && changePanelState(state, action.payload);
      case "DELETE_PANEL":
        return state && deletePanelState(state, action.payload);
      case "CHANGE_FORM":
        return state && changeFormState(state, action.payload);
      case "ADD_ITEM_PANEL":
        return state && addItemPanelState(state, action.payload);
      case "ADD_ORDERS_CHILD_ITEM_PANEL":
        return state && addOrdersChildItemPanelState(state, action.payload);
      case "ADD_SELECT_CHILD_ITEM_PANEL":
        return state && addSelectChildItemPanelState(state, action.payload);
      case "ADD_SELECT_LIST_ITEM_PANEL":
        return state && addSelectListItemPanelState(state, action.payload);
      case "ADD_SWITCH_CHILD_ITEM_PANEL":
        return state && addSwitchChildItemPanelState(state, action.payload);
      case "DELETE_ORDERS_CHILD_ITEM_PANEL":
        return state && deleteOrdersChildItemPanelState(state, action.payload);
      case "DELETE_SELECT_CHILD_ITEM_PANEL":
        return state && deleteSelectChildItemPanelState(state, action.payload);
      case "DELETE_SWITCH_CHILD_ITEM_PANEL":
        return state && deleteSwitchChildItemPanelState(state, action.payload);
      case "CHANGE_ITEM_PANEL":
        return state && changeItemPanelState(state, action.payload);
      case "CHANGE_ITEM_FORM":
        return state && changeItemFormState(state, action.payload);
      case "DELETE_ITEM_PANEL":
        return state && deleteItemPanelState(state, action.payload);
      case "INITIALIZE":
        return { panels: [] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  return {
    state: state ?? { panels: [] },
    actions: {
      addPanel: () => dispatch({ type: "ADD_PANEL" }),
      changePanel: (id: number) =>
        dispatch({ type: "CHANGE_PANEL", payload: { id } }),
      deletePanel: (id: number) =>
        dispatch({ type: "DELETE_PANEL", payload: { id } }),
      changeChip: (id: number, chipType: ChipType) =>
        dispatch({ type: "CHANGE_PANEL", payload: { id, chipType } }),
      changeForm: (id: number, label: string, value: string) =>
        dispatch({ type: "CHANGE_FORM", payload: { id, label, value } }),
      addItemPanel: (id: number, key: ChipType) =>
        dispatch({ type: "ADD_ITEM_PANEL", payload: { id, key } }),
      addOrdersChildItemPanel: (id: number, parentItemId: number) =>
        dispatch({
          type: "ADD_ORDERS_CHILD_ITEM_PANEL",
          payload: { id, parentItemId },
        }),
      addSelectChildItemPanel: (id: number, parentItemId: number) =>
        dispatch({
          type: "ADD_SELECT_CHILD_ITEM_PANEL",
          payload: { id, parentItemId },
        }),
      addSelectListItemPanel: (id: number, selectItemId: number, childItemId: number) =>
        dispatch({
          type: "ADD_SELECT_LIST_ITEM_PANEL",
          payload: { id, selectItemId, childItemId },
        }),
      addSwitchChildItemPanel: (id: number, parentItemId: number) =>
        dispatch({
          type: "ADD_SWITCH_CHILD_ITEM_PANEL",
          payload: { id, parentItemId },
        }),
      deleteOrdersChildItemPanel: (id: number, parentItemId: number) =>
        dispatch({
          type: "DELETE_ORDERS_CHILD_ITEM_PANEL",
          payload: { id, parentItemId },
        }),
      deleteSelectChildItemPanel: (id: number, parentItemId: number) =>
        dispatch({
          type: "DELETE_SELECT_CHILD_ITEM_PANEL",
          payload: { id, parentItemId },
        }),
      deleteSwitchChildItemPanel: (id: number, parentItemId: number) =>
        dispatch({
          type: "DELETE_SWITCH_CHILD_ITEM_PANEL",
          payload: { id, parentItemId },
        }),
      changeItemPanel: (id: number, key: ChipType, itemId: number) =>
        dispatch({ type: "CHANGE_ITEM_PANEL", payload: { id, key, itemId } }),
      changeItemForm: (
        id: number,
        key: ChipType,
        itemId: number,
        label: string,
        value: string,
      ) =>
        dispatch({
          type: "CHANGE_ITEM_FORM",
          payload: { id, key, itemId, label, value },
        }),
      deleteItemPanel: (id: number, key: ChipType, itemId: number) =>
        dispatch({ type: "DELETE_ITEM_PANEL", payload: { id, key, itemId } }),
    },
  };
}
