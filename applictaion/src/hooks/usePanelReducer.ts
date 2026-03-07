import { useEffect, useReducer } from "react";

type ChipType = "orders" | "select" | "switch";

type PanelItemData = {
  id: number;
  label: string;
  state: boolean;
};

type PanelChip = {
  selected: boolean;
  data: PanelItemData[];
};

type PanelItem = {
  id: number;
  label: string;
  value: { key: string; label: string };
  state: boolean;
  orders: PanelChip;
  select: PanelChip;
  switch: PanelChip;
};

type PanelDataStateType = {
  panels: PanelItem[];
};

type PanelDataActionsType = {
  addPanel: () => void;
  changePanel: (id: number) => void;
  deletePanel: (id: number) => void;
  changeChip: (id: number, chipType: ChipType) => void;
  changeForm: (id: number, label: string, value: string) => void;
  addItemPanel: (id: number, key: ChipType) => void;
  deleteItemPanel: (id: number, key: ChipType, itemId: number) => void;
};

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
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          [payload.key]: {
            ...p[payload.key],
            data: [
              ...p[payload.key].data,
              { id: Date.now(), label: "", state: false },
            ],
          },
        }
      : p,
  ),
});

const deleteItemPanelState = (
  state: PanelDataStateType,
  payload: { id: number; key: ChipType; itemId: number },
): PanelDataStateType => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          [payload.key]: {
            ...p[payload.key],
            data: p[payload.key].data.filter(
              (item) => item.id !== payload.itemId,
            ),
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
    | { type: "CHANGE_FORM"; payload: { id: number; label: string; value: string } }
    | { type: "ADD_ITEM_PANEL"; payload: { id: number; key: ChipType } }
    | { type: "DELETE_ITEM_PANEL"; payload: { id: number; key: ChipType; itemId: number } }
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
      deleteItemPanel: (id: number, key: ChipType, itemId: number) =>
        dispatch({ type: "DELETE_ITEM_PANEL", payload: { id, key, itemId } }),
    },
  };
}