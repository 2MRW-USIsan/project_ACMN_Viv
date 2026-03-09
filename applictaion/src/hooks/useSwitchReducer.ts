import type {
  SwitchDataItem,
  SwitchPanelChip,
  SwitchPanelItem,
} from "@/types/panel";
import { useMemo, useReducer } from "react";

type SwitchState = Record<number, SwitchPanelChip>;

export type SwitchActions = {
  removePanel: (panelId: number) => void;
  changeChip: (panelId: number) => void;
  addItem: (panelId: number) => void;
  addChildItem: (panelId: number, parentItemId: number) => void;
  deleteChildItem: (
    panelId: number,
    parentItemId: number,
    childIndex: number,
  ) => void;
  changeItem: (panelId: number, itemId: number) => void;
  changeItemForm: (
    panelId: number,
    itemId: number,
    label: string,
    value: string,
  ) => void;
  deleteItem: (panelId: number, itemId: number) => void;
  toggleRandomize: (panelId: number, itemId: number) => void;
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
      type: "DELETE_CHILD_ITEM";
      payload: { panelId: number; parentItemId: number; childIndex: number };
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
  | { type: "TOGGLE_RANDOMIZE"; payload: { panelId: number; itemId: number } };

const initialState: SwitchState = {};

const getChip = (state: SwitchState, panelId: number): SwitchPanelChip =>
  state[panelId] ?? { selected: false, data: [] };

const createSwitchPanelItem = (): SwitchPanelItem => ({
  id: Date.now(),
  state: false,
  randomize: false,
  values: { key: "", label: "--" },
  data: [],
});

const createSwitchDataItem = (): SwitchDataItem => ({
  key: "",
  label: "",
  value: "",
  altValue: "",
});

function reducer(state: SwitchState, action: Action): SwitchState {
  switch (action.type) {
    case "REMOVE_PANEL":
      return Object.fromEntries(
        Object.entries(state).filter(
          ([k]) => Number(k) !== action.payload.panelId,
        ),
      ) as SwitchState;
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
          data: [...chip.data, createSwitchPanelItem()],
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
              ? { ...item, data: [...item.data, createSwitchDataItem()] }
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
                    (_, index) => index !== action.payload.childIndex,
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
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) => {
            if (item.id !== itemId) return item;

            const childMatch = label.match(/^child:(\d+):(.*)$/);
            if (childMatch) {
              const childIndex = Number(childMatch[1]);
              const childLabel = childMatch[2] as keyof SwitchDataItem;
              return {
                ...item,
                data: item.data.map((child, index) =>
                  index === childIndex
                    ? { ...child, [childLabel]: value }
                    : child,
                ),
              };
            }

            return { ...item, values: { ...item.values, [label]: value } };
          }),
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
    case "TOGGLE_RANDOMIZE": {
      const chip = getChip(state, action.payload.panelId);
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === action.payload.itemId
              ? { ...item, randomize: !item.randomize }
              : item,
          ),
        },
      };
    }
    default:
      return state;
  }
}

type Returns = {
  state: SwitchState;
  actions: SwitchActions;
};

export function useSwitchReducer(): Returns {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    (): SwitchActions => ({
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
      deleteChildItem: (panelId, parentItemId, childIndex) =>
        dispatch({
          type: "DELETE_CHILD_ITEM",
          payload: { panelId, parentItemId, childIndex },
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
      toggleRandomize: (panelId, itemId) =>
        dispatch({ type: "TOGGLE_RANDOMIZE", payload: { panelId, itemId } }),
    }),
    [],
  );

  return { state, actions };
}
