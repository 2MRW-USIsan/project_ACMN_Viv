import type {
  SelectDataItem,
  SelectListDataItem,
  SelectPanelChip,
  SelectPanelItem,
} from "@/types/panel";
import { useMemo, useReducer } from "react";

type SelectState = Record<number, SelectPanelChip>;

export type SelectActions = {
  removePanel: (panelId: number) => void;
  changeChip: (panelId: number) => void;
  addItem: (panelId: number) => void;
  addChildItem: (panelId: number, parentItemId: number) => void;
  addListItem: (
    panelId: number,
    selectItemId: number,
    childItemId: number,
  ) => void;
  deleteChildItem: (panelId: number, parentItemId: number, childItemId: number) => void;
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
  | {
      type: "ADD_LIST_ITEM";
      payload: { panelId: number; selectItemId: number; childItemId: number };
    }
  | { type: "DELETE_CHILD_ITEM"; payload: { panelId: number; parentItemId: number; childItemId: number } }
  | { type: "CHANGE_ITEM"; payload: { panelId: number; itemId: number } }
  | {
      type: "CHANGE_ITEM_FORM";
      payload: { panelId: number; itemId: number; label: string; value: string };
    }
  | { type: "DELETE_ITEM"; payload: { panelId: number; itemId: number } };

const initialState: SelectState = {};

const getChip = (state: SelectState, panelId: number): SelectPanelChip =>
  state[panelId] ?? { selected: false, data: [] };

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

function reducer(state: SelectState, action: Action): SelectState {
  switch (action.type) {
    case "REMOVE_PANEL":
      return Object.fromEntries(
        Object.entries(state).filter(
          ([k]) => Number(k) !== action.payload.panelId,
        ),
      ) as SelectState;
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
          data: [...chip.data, createSelectPanelItem()],
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
              ? { ...item, data: [...item.data, createSelectDataItem()] }
              : item,
          ),
        },
      };
    }
    case "ADD_LIST_ITEM": {
      const chip = getChip(state, action.payload.panelId);
      return {
        ...state,
        [action.payload.panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === action.payload.selectItemId
              ? {
                  ...item,
                  data: item.data.map((child) =>
                    child.id === action.payload.childItemId
                      ? {
                          ...child,
                          data: [...child.data, createSelectListDataItem()],
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
              ? { ...item, data: item.data.filter((child) => child.id !== action.payload.childItemId) }
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
            if (!childMatch) {
              return { ...item, values: { ...item.values, [label]: value } };
            }

            const childId = Number(childMatch[1]);
            const rest = childMatch[2];

            const listItemMatch = rest.match(/^listItem:(\d+):(.*)$/);
            if (!listItemMatch) {
              return {
                ...item,
                data: item.data.map((child) =>
                  child.id === childId
                    ? { ...child, values: { ...child.values, [rest]: value } }
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
                              values: {
                                ...listItem.values,
                                [fieldLabel]: value,
                              },
                            }
                          : listItem,
                      ),
                    }
                  : child,
              ),
            };
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
    default:
      return state;
  }
}

type Returns = {
  state: SelectState;
  actions: SelectActions;
};

export default function useSelectReducer(): Returns {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    (): SelectActions => ({
      removePanel: (panelId) =>
        dispatch({ type: "REMOVE_PANEL", payload: { panelId } }),
      changeChip: (panelId) =>
        dispatch({ type: "CHANGE_CHIP", payload: { panelId } }),
      addItem: (panelId) =>
        dispatch({ type: "ADD_ITEM", payload: { panelId } }),
      addChildItem: (panelId, parentItemId) =>
        dispatch({ type: "ADD_CHILD_ITEM", payload: { panelId, parentItemId } }),
      addListItem: (panelId, selectItemId, childItemId) =>
        dispatch({
          type: "ADD_LIST_ITEM",
          payload: { panelId, selectItemId, childItemId },
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
