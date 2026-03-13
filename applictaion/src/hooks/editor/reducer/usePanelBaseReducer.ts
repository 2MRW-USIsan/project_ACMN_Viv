import type { PanelBaseItem } from "@/types/editor/panel";
import { useEffect, useMemo, useReducer } from "react";

export type PanelBaseReducerState = {
  panels: PanelBaseItem[];
};

export type PanelBaseReducerAction = {
  loadState: (panels: PanelBaseItem[]) => void;
  addPanel: () => void;
  changePanel: (id: number) => void;
  deletePanel: (id: number) => void;
  changeForm: (id: number, label: string, value: string) => void;
};

type Action =
  | { type: "ADD_PANEL" }
  | { type: "CHANGE_PANEL"; payload: { id: number } }
  | { type: "DELETE_PANEL"; payload: { id: number } }
  | {
      type: "CHANGE_FORM";
      payload: { id: number; label: string; value: string };
    }
  | { type: "LOAD_STATE"; payload: { panels: PanelBaseItem[] } }
  | { type: "INITIALIZE" };

const initItem: PanelBaseReducerState = { panels: [] };

function reducer(
  state: PanelBaseReducerState | undefined,
  action: Action,
): PanelBaseReducerState | undefined {
  if (action.type === "INITIALIZE") return initItem;
  if (!state) return state;
  switch (action.type) {
    case "ADD_PANEL":
      return {
        ...state,
        panels: [
          ...state.panels,
          {
            id: Date.now(),
            label: `Panel ${state.panels.length + 1}`,
            values: { key: `key-${Date.now()}`, label: `label-${Date.now()}` },
            state: false,
          },
        ],
      };
    case "CHANGE_PANEL":
      return {
        ...state,
        panels: state.panels.map((p) =>
          p.id === action.payload.id ? { ...p, state: !p.state } : p,
        ),
      };
    case "DELETE_PANEL":
      return {
        ...state,
        panels: state.panels.filter((p) => p.id !== action.payload.id),
      };
    case "CHANGE_FORM":
      return {
        ...state,
        panels: state.panels.map((p) =>
          p.id === action.payload.id
            ? {
                ...p,
                values: {
                  ...p.values,
                  [action.payload.label]: action.payload.value,
                },
              }
            : p,
        ),
      };
    case "LOAD_STATE":
      return { panels: action.payload.panels };
    default:
      return state;
  }
}

export interface PanelBaseReducerReturn {
  state: PanelBaseReducerState;
  action: PanelBaseReducerAction;
}

export function usePanelBaseReducer(): PanelBaseReducerReturn {
  const [state, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  const action = useMemo(
    (): PanelBaseReducerAction => ({
      loadState: (panels) =>
        dispatch({ type: "LOAD_STATE", payload: { panels } }),
      addPanel: () => dispatch({ type: "ADD_PANEL" }),
      changePanel: (id) => dispatch({ type: "CHANGE_PANEL", payload: { id } }),
      deletePanel: (id) => dispatch({ type: "DELETE_PANEL", payload: { id } }),
      changeForm: (id, label, value) =>
        dispatch({ type: "CHANGE_FORM", payload: { id, label, value } }),
    }),
    [],
  );

  return { state: state ?? initItem, action };
}
