import type { OrdersPanelChip, OrdersPanelItem } from "@/types/editor/panel";
import { useMemo, useReducer } from "react";

type OrdersState = Record<number, OrdersPanelChip>;

export type OrdersActions = {
  loadState: (state: OrdersState) => void;
  removePanel: (panelId: number) => void;
  changeChip: (panelId: number) => void;
  addItem: (panelId: number) => void;
  addChildItem: (panelId: number, parentItemId: number) => void;
  addItemData: (
    panelId: number,
    parentItemId: number,
    childItemId: number,
  ) => void;
  addComplexItemData: (
    panelId: number,
    parentItemId: number,
    childItemId: number,
    itemDataId: number,
  ) => void;
  deleteItemData: (
    panelId: number,
    parentItemId: number,
    childItemId: number,
    itemDataId: number,
  ) => void;
  deleteComplexItemData: (
    panelId: number,
    parentItemId: number,
    childItemId: number,
    itemDataId: number,
    complexItemId: number,
  ) => void;
  deleteChildItem: (
    panelId: number,
    parentItemId: number,
    childItemId: number,
  ) => void;
  changeItem: (panelId: number, itemId: number) => void;
  changeItemForm: (
    panelId: number,
    itemId: number,
    label: string,
    value: string,
  ) => void;
  deleteItem: (panelId: number, itemId: number) => void;
};

type Action =
  | { type: "REMOVE_PANEL"; payload: { panelId: number } }
  | { type: "CHANGE_CHIP"; payload: { panelId: number } }
  | { type: "ADD_ITEM"; payload: { panelId: number } }
  | {
      type: "ADD_CHILD_ITEM";
      payload: { panelId: number; parentItemId: number };
    }
  | {
      type: "ADD_ITEM_DATA";
      payload: { panelId: number; parentItemId: number; childItemId: number };
    }
  | {
      type: "ADD_COMPLEX_ITEM_DATA";
      payload: {
        panelId: number;
        parentItemId: number;
        childItemId: number;
        itemDataId: number;
      };
    }
  | {
      type: "DELETE_ITEM_DATA";
      payload: {
        panelId: number;
        parentItemId: number;
        childItemId: number;
        itemDataId: number;
      };
    }
  | {
      type: "DELETE_COMPLEX_ITEM_DATA";
      payload: {
        panelId: number;
        parentItemId: number;
        childItemId: number;
        itemDataId: number;
        complexItemId: number;
      };
    }
  | {
      type: "DELETE_CHILD_ITEM";
      payload: { panelId: number; parentItemId: number; childItemId: number };
    }
  | { type: "CHANGE_ITEM"; payload: { panelId: number; itemId: number } }
  | {
      type: "CHANGE_ITEM_FORM";
      payload: {
        panelId: number;
        itemId: number;
        label: string;
        value: string;
      };
    }
  | { type: "DELETE_ITEM"; payload: { panelId: number; itemId: number } }
  | { type: "LOAD_STATE"; payload: OrdersState };

const initialState: OrdersState = {};

const getChip = (state: OrdersState, panelId: number): OrdersPanelChip =>
  state[panelId] ?? { selected: false, data: [] };

const createOrdersPanelItem = (): OrdersPanelItem => ({
  id: Date.now(),
  state: false,
  values: { key: "", label: "--" },
  data: [],
});

function reducer(state: OrdersState, action: Action): OrdersState {
  switch (action.type) {
    case "REMOVE_PANEL":
      return Object.fromEntries(
        Object.entries(state).filter(
          ([k]) => Number(k) !== action.payload.panelId,
        ),
      ) as OrdersState;
    case "CHANGE_CHIP": {
      const chip = getChip(state, action.payload.panelId);
      const selected = !chip.selected;
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          selected,
          data: selected ? chip.data : [],
        },
      };
    }
    case "ADD_ITEM": {
      const chip = getChip(state, action.payload.panelId);
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: [...chip.data, createOrdersPanelItem()],
        },
      };
    }
    case "ADD_CHILD_ITEM": {
      const chip = getChip(state, action.payload.panelId);
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === action.payload.parentItemId
              ? {
                  ...item,
                  data: [
                    ...item.data,
                    {
                      id: Date.now(),
                      values: { key: "", label: "", type: "Random" },
                      data: [],
                    },
                  ],
                }
              : item,
          ),
        },
      };
    }
    case "ADD_ITEM_DATA": {
      const chip = getChip(state, action.payload.panelId);
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === action.payload.parentItemId
              ? {
                  ...item,
                  data: item.data.map((child) =>
                    child.id === action.payload.childItemId
                      ? {
                          ...child,
                          data: [
                            ...child.data,
                            {
                              id: Date.now(),
                              values: { value: "", prompt: "", weight: "0" },
                              complexData: [],
                            },
                          ],
                        }
                      : child,
                  ),
                }
              : item,
          ),
        },
      };
    }
    case "ADD_COMPLEX_ITEM_DATA": {
      const chip = getChip(state, action.payload.panelId);
      const { parentItemId, childItemId, itemDataId } = action.payload;
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === parentItemId
              ? {
                  ...item,
                  data: item.data.map((child) =>
                    child.id === childItemId
                      ? {
                          ...child,
                          data: child.data.map((itemData) =>
                            itemData.id === itemDataId
                              ? {
                                  ...itemData,
                                  complexData: [
                                    ...(itemData.complexData ?? []),
                                    {
                                      id: Date.now(),
                                      values: {
                                        value: "",
                                        prompt: "",
                                        weight: "0",
                                      },
                                    },
                                  ],
                                }
                              : itemData,
                          ),
                        }
                      : child,
                  ),
                }
              : item,
          ),
        },
      };
    }
    case "DELETE_ITEM_DATA": {
      const chip = getChip(state, action.payload.panelId);
      const { parentItemId, childItemId, itemDataId } = action.payload;
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === parentItemId
              ? {
                  ...item,
                  data: item.data.map((child) =>
                    child.id === childItemId
                      ? {
                          ...child,
                          data: child.data.filter(
                            (itemData) => itemData.id !== itemDataId,
                          ),
                        }
                      : child,
                  ),
                }
              : item,
          ),
        },
      };
    }
    case "DELETE_COMPLEX_ITEM_DATA": {
      const chip = getChip(state, action.payload.panelId);
      const { parentItemId, childItemId, itemDataId, complexItemId } =
        action.payload;
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === parentItemId
              ? {
                  ...item,
                  data: item.data.map((child) =>
                    child.id === childItemId
                      ? {
                          ...child,
                          data: child.data.map((itemData) =>
                            itemData.id === itemDataId
                              ? {
                                  ...itemData,
                                  complexData: (
                                    itemData.complexData ?? []
                                  ).filter(
                                    (complexItem) =>
                                      complexItem.id !== complexItemId,
                                  ),
                                }
                              : itemData,
                          ),
                        }
                      : child,
                  ),
                }
              : item,
          ),
        },
      };
    }
    case "DELETE_CHILD_ITEM": {
      const chip = getChip(state, action.payload.panelId);
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === action.payload.parentItemId
              ? {
                  ...item,
                  data: item.data.filter(
                    (child) => child.id !== action.payload.childItemId,
                  ),
                }
              : item,
          ),
        },
      };
    }
    case "CHANGE_ITEM": {
      const chip = getChip(state, action.payload.panelId);
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === action.payload.itemId
              ? { ...item, state: !item.state }
              : item,
          ),
        },
      };
    }
    case "CHANGE_ITEM_FORM": {
      const chip = getChip(state, action.payload.panelId);
      const { itemId, label, value } = action.payload;
      const childMatch = label.match(/^child:(\d+):(.+)$/);
      if (childMatch) {
        const childId = Number(childMatch[1]);
        const childLabel = childMatch[2];
        const itemMatch = childLabel.match(/^item:(\d+):(.+)$/);
        if (itemMatch) {
          const itemDataId = Number(itemMatch[1]);
          const itemLabel = itemMatch[2];
          const nestedComplexMatch = itemLabel.match(
            /^complexItem:(\d+):(.+)$/,
          );
          if (nestedComplexMatch) {
            const complexItemId = Number(nestedComplexMatch[1]);
            const complexItemField = nestedComplexMatch[2];
            return {
              ...state,
              [action.payload.panelId]: {
                ...chip,
                data: chip.data.map((item) =>
                  item.id === itemId
                    ? {
                        ...item,
                        data: item.data.map((child) =>
                          child.id === childId
                            ? {
                                ...child,
                                data: child.data.map((itemData) =>
                                  itemData.id === itemDataId
                                    ? {
                                        ...itemData,
                                        complexData: (
                                          itemData.complexData ?? []
                                        ).map((complexItem) =>
                                          complexItem.id === complexItemId
                                            ? {
                                                ...complexItem,
                                                values: {
                                                  ...complexItem.values,
                                                  [complexItemField]: value,
                                                },
                                              }
                                            : complexItem,
                                        ),
                                      }
                                    : itemData,
                                ),
                              }
                            : child,
                        ),
                      }
                    : item,
                ),
              },
            };
          }
          return {
            ...state,
            [action.payload.panelId]: {
              ...chip,
              data: chip.data.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      data: item.data.map((child) =>
                        child.id === childId
                          ? {
                              ...child,
                              data: child.data.map((itemData) =>
                                itemData.id === itemDataId
                                  ? {
                                      ...itemData,
                                      values: {
                                        ...itemData.values,
                                        [itemLabel]: value,
                                      },
                                    }
                                  : itemData,
                              ),
                            }
                          : child,
                      ),
                    }
                  : item,
              ),
            },
          };
        }
        return {
          ...state,
          [action.payload.panelId]: {
            ...chip,
            data: chip.data.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    data: item.data.map((child) =>
                      child.id === childId
                        ? {
                            ...child,
                            values: { ...child.values, [childLabel]: value },
                            ...(childLabel === "type" && {
                              data: [],
                            }),
                          }
                        : child,
                    ),
                  }
                : item,
            ),
          },
        };
      }
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === itemId
              ? { ...item, values: { ...item.values, [label]: value } }
              : item,
          ),
        },
      };
    }
    case "DELETE_ITEM": {
      const chip = getChip(state, action.payload.panelId);
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.filter((item) => item.id !== action.payload.itemId),
        },
      };
    }
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

type Returns = {
  state: OrdersState;
  actions: OrdersActions;
};

export function useOrdersReducer(): Returns {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    (): OrdersActions => ({
      loadState: (newState) =>
        dispatch({ type: "LOAD_STATE", payload: newState }),
      removePanel: (panelId) =>
        dispatch({ type: "REMOVE_PANEL", payload: { panelId } }),
      changeChip: (panelId) =>
        dispatch({ type: "CHANGE_CHIP", payload: { panelId } }),
      addItem: (panelId) =>
        dispatch({ type: "ADD_ITEM", payload: { panelId } }),
      addChildItem: (panelId, parentItemId) =>
        dispatch({
          type: "ADD_CHILD_ITEM",
          payload: { panelId, parentItemId },
        }),
      addItemData: (panelId, parentItemId, childItemId) =>
        dispatch({
          type: "ADD_ITEM_DATA",
          payload: { panelId, parentItemId, childItemId },
        }),
      addComplexItemData: (panelId, parentItemId, childItemId, itemDataId) =>
        dispatch({
          type: "ADD_COMPLEX_ITEM_DATA",
          payload: { panelId, parentItemId, childItemId, itemDataId },
        }),
      deleteItemData: (panelId, parentItemId, childItemId, itemDataId) =>
        dispatch({
          type: "DELETE_ITEM_DATA",
          payload: { panelId, parentItemId, childItemId, itemDataId },
        }),
      deleteComplexItemData: (
        panelId,
        parentItemId,
        childItemId,
        itemDataId,
        complexItemId,
      ) =>
        dispatch({
          type: "DELETE_COMPLEX_ITEM_DATA",
          payload: {
            panelId,
            parentItemId,
            childItemId,
            itemDataId,
            complexItemId,
          },
        }),
      deleteChildItem: (panelId, parentItemId, childItemId) =>
        dispatch({
          type: "DELETE_CHILD_ITEM",
          payload: { panelId, parentItemId, childItemId },
        }),
      changeItem: (panelId, itemId) =>
        dispatch({ type: "CHANGE_ITEM", payload: { panelId, itemId } }),
      changeItemForm: (panelId, itemId, label, value) =>
        dispatch({
          type: "CHANGE_ITEM_FORM",
          payload: { panelId, itemId, label, value },
        }),
      deleteItem: (panelId, itemId) =>
        dispatch({ type: "DELETE_ITEM", payload: { panelId, itemId } }),
    }),
    [],
  );

  return { state, actions };
}
