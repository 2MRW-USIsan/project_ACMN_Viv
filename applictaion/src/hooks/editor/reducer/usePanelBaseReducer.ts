import type { PanelBaseItem } from "@/types/editor/panel";
import {
  addPanelItem,
  changeFormItem,
  changePanelItem,
  deletePanelItem,
} from "@/utils/reducers/editor/panelBaseReducerUtils";
import { useEffect, useReducer } from "react";

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

export interface PanelBaseReducerReturn {
  state: PanelBaseReducerState;
  action: PanelBaseReducerAction;
}

export function usePanelBaseReducer(): PanelBaseReducerReturn {
  type STATE = PanelBaseReducerState | undefined;

  type CHANGE_PANEL = { id: number };
  type DELETE_PANEL = { id: number };
  type CHANGE_FORM = { id: number; label: string; value: string };
  type LOAD_STATE = { panels: PanelBaseItem[] };

  type ACTION =
    | { type: "ADD_PANEL" }
    | { type: "CHANGE_PANEL"; payload: CHANGE_PANEL }
    | { type: "DELETE_PANEL"; payload: DELETE_PANEL }
    | { type: "CHANGE_FORM"; payload: CHANGE_FORM }
    | { type: "LOAD_STATE"; payload: LOAD_STATE }
    | { type: "INITIALIZE" };

  const initItem: PanelBaseReducerState = { panels: [] };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "ADD_PANEL":
        return state && addPanelItem(state);
      case "CHANGE_PANEL":
        return state && changePanelItem(state, action.payload);
      case "DELETE_PANEL":
        return state && deletePanelItem(state, action.payload);
      case "CHANGE_FORM":
        return state && changeFormItem(state, action.payload);
      case "LOAD_STATE":
        return { panels: action.payload.panels };
      case "INITIALIZE":
        return initItem;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  const handleLoadState = (panels: PanelBaseItem[]) =>
    dispatch({ type: "LOAD_STATE", payload: { panels } });
  const handleAddPanel = () => dispatch({ type: "ADD_PANEL" });
  const handleChangePanel = (id: number) =>
    dispatch({ type: "CHANGE_PANEL", payload: { id } });
  const handleDeletePanel = (id: number) =>
    dispatch({ type: "DELETE_PANEL", payload: { id } });
  const handleChangeForm = (id: number, label: string, value: string) =>
    dispatch({ type: "CHANGE_FORM", payload: { id, label, value } });

  return {
    state: state ?? initItem,
    action: {
      loadState: handleLoadState,
      addPanel: handleAddPanel,
      changePanel: handleChangePanel,
      deletePanel: handleDeletePanel,
      changeForm: handleChangeForm,
    },
  };
}
