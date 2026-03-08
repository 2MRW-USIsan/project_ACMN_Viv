import type { OrdersPanelChip, OrdersPanelItem } from "@/types/panel";
import { useMemo, useReducer } from "react";

type OrdersState = Record<number, OrdersPanelChip>;

export type OrdersActions = {
  removePanel: (panelId: number) => void;
  changeChip: (panelId: number) => void;
  addItem: (panelId: number) => void;
  addChildItem: (panelId: number, parentItemId: number) => void;
  deleteChildItem: (panelId: number, parentItemId: number) => void;
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
  | { type: "ADD_CHILD_ITEM"; payload: { panelId: number; parentItemId: number } }
  | { type: "DELETE_CHILD_ITEM"; payload: { panelId: number; parentItemId: number } }
  | { type: "CHANGE_ITEM"; payload: { panelId: number; itemId: number } }
  | {
      type: "CHANGE_ITEM_FORM";
      payload: { panelId: number; itemId: number; label: string; value: string };
    }
  | { type: "DELETE_ITEM"; payload: { panelId: number; itemId: number } };

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
      return {
        ...state,
        [action.payload.panelId]: { ...chip, selected: !chip.selected },
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
              ? { ...item, data: [...item.data, {}] }
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
              ? { ...item, data: item.data.slice(0, -1) }
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
    default:
      return state;
  }
}

type Returns = {
  state: OrdersState;
  actions: OrdersActions;
};

export default function useOrdersReducer(): Returns {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    (): OrdersActions => ({
      removePanel: (panelId) =>
        dispatch({ type: "REMOVE_PANEL", payload: { panelId } }),
      changeChip: (panelId) =>
        dispatch({ type: "CHANGE_CHIP", payload: { panelId } }),
      addItem: (panelId) =>
        dispatch({ type: "ADD_ITEM", payload: { panelId } }),
      addChildItem: (panelId, parentItemId) =>
        dispatch({ type: "ADD_CHILD_ITEM", payload: { panelId, parentItemId } }),
      deleteChildItem: (panelId, parentItemId) =>
        dispatch({
          type: "DELETE_CHILD_ITEM",
          payload: { panelId, parentItemId },
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
