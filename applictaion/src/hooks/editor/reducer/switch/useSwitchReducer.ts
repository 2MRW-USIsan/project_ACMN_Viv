import type { SwitchPanelChip } from "@/types/editor/panel";
import {
  addSwitchChildItem,
  addSwitchItem,
  changeSwitchChip,
  changeSwitchItem,
  changeSwitchItemForm,
  deleteSwitchChildItem,
  deleteSwitchItem,
  removeSwitchPanel,
  toggleSwitchRandomize,
} from "@/utils/reducers/editor/switchReducerUtils";
import { useEffect, useReducer } from "react";

export type SwitchReducerState = Record<number, SwitchPanelChip>;

export type SwitchReducerAction = {
  loadState: (state: SwitchReducerState) => void;
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

export interface SwitchReducerReturn {
  state: SwitchReducerState;
  action: SwitchReducerAction;
}

export function useSwitchReducer(): SwitchReducerReturn {
  type STATE = SwitchReducerState | undefined;

  type REMOVE_PANEL = { panelId: number };
  type CHANGE_CHIP = { panelId: number };
  type ADD_ITEM = { panelId: number };
  type ADD_CHILD_ITEM = { panelId: number; parentItemId: number };
  type DELETE_CHILD_ITEM = {
    panelId: number;
    parentItemId: number;
    childIndex: number;
  };
  type CHANGE_ITEM = { panelId: number; itemId: number };
  type CHANGE_ITEM_FORM = {
    panelId: number;
    itemId: number;
    label: string;
    value: string;
  };
  type DELETE_ITEM = { panelId: number; itemId: number };
  type TOGGLE_RANDOMIZE = { panelId: number; itemId: number };
  type LOAD_STATE = SwitchReducerState;

  type ACTION =
    | { type: "REMOVE_PANEL"; payload: REMOVE_PANEL }
    | { type: "CHANGE_CHIP"; payload: CHANGE_CHIP }
    | { type: "ADD_ITEM"; payload: ADD_ITEM }
    | { type: "ADD_CHILD_ITEM"; payload: ADD_CHILD_ITEM }
    | { type: "DELETE_CHILD_ITEM"; payload: DELETE_CHILD_ITEM }
    | { type: "CHANGE_ITEM"; payload: CHANGE_ITEM }
    | { type: "CHANGE_ITEM_FORM"; payload: CHANGE_ITEM_FORM }
    | { type: "DELETE_ITEM"; payload: DELETE_ITEM }
    | { type: "TOGGLE_RANDOMIZE"; payload: TOGGLE_RANDOMIZE }
    | { type: "LOAD_STATE"; payload: LOAD_STATE }
    | { type: "INITIALIZE" };

  const initItem: SwitchReducerState = {};

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "REMOVE_PANEL":
        return state && removeSwitchPanel(state, action.payload.panelId);
      case "CHANGE_CHIP":
        return state && changeSwitchChip(state, action.payload.panelId);
      case "ADD_ITEM":
        return state && addSwitchItem(state, action.payload.panelId);
      case "ADD_CHILD_ITEM":
        return (
          state &&
          addSwitchChildItem(
            state,
            action.payload.panelId,
            action.payload.parentItemId,
          )
        );
      case "DELETE_CHILD_ITEM":
        return (
          state &&
          deleteSwitchChildItem(
            state,
            action.payload.panelId,
            action.payload.parentItemId,
            action.payload.childIndex,
          )
        );
      case "CHANGE_ITEM":
        return (
          state &&
          changeSwitchItem(
            state,
            action.payload.panelId,
            action.payload.itemId,
          )
        );
      case "CHANGE_ITEM_FORM":
        return (
          state &&
          changeSwitchItemForm(
            state,
            action.payload.panelId,
            action.payload.itemId,
            action.payload.label,
            action.payload.value,
          )
        );
      case "DELETE_ITEM":
        return (
          state &&
          deleteSwitchItem(
            state,
            action.payload.panelId,
            action.payload.itemId,
          )
        );
      case "TOGGLE_RANDOMIZE":
        return (
          state &&
          toggleSwitchRandomize(
            state,
            action.payload.panelId,
            action.payload.itemId,
          )
        );
      case "LOAD_STATE":
        return action.payload;
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

  const handleLoadState = (newState: SwitchReducerState) =>
    dispatch({ type: "LOAD_STATE", payload: newState });
  const handleRemovePanel = (panelId: number) =>
    dispatch({ type: "REMOVE_PANEL", payload: { panelId } });
  const handleChangeChip = (panelId: number) =>
    dispatch({ type: "CHANGE_CHIP", payload: { panelId } });
  const handleAddItem = (panelId: number) =>
    dispatch({ type: "ADD_ITEM", payload: { panelId } });
  const handleAddChildItem = (panelId: number, parentItemId: number) =>
    dispatch({ type: "ADD_CHILD_ITEM", payload: { panelId, parentItemId } });
  const handleDeleteChildItem = (
    panelId: number,
    parentItemId: number,
    childIndex: number,
  ) =>
    dispatch({
      type: "DELETE_CHILD_ITEM",
      payload: { panelId, parentItemId, childIndex },
    });
  const handleChangeItem = (panelId: number, itemId: number) =>
    dispatch({ type: "CHANGE_ITEM", payload: { panelId, itemId } });
  const handleChangeItemForm = (
    panelId: number,
    itemId: number,
    label: string,
    value: string,
  ) =>
    dispatch({
      type: "CHANGE_ITEM_FORM",
      payload: { panelId, itemId, label, value },
    });
  const handleDeleteItem = (panelId: number, itemId: number) =>
    dispatch({ type: "DELETE_ITEM", payload: { panelId, itemId } });
  const handleToggleRandomize = (panelId: number, itemId: number) =>
    dispatch({ type: "TOGGLE_RANDOMIZE", payload: { panelId, itemId } });

  return {
    state: state ?? initItem,
    action: {
      loadState: handleLoadState,
      removePanel: handleRemovePanel,
      changeChip: handleChangeChip,
      addItem: handleAddItem,
      addChildItem: handleAddChildItem,
      deleteChildItem: handleDeleteChildItem,
      changeItem: handleChangeItem,
      changeItemForm: handleChangeItemForm,
      deleteItem: handleDeleteItem,
      toggleRandomize: handleToggleRandomize,
    },
  };
}
