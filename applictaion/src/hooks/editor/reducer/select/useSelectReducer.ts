import type { SelectPanelChip } from "@/types/editor/panel";
import {
  addSelectChildItem,
  addSelectItem,
  addSelectListItem,
  changeSelectChip,
  changeSelectItem,
  changeSelectItemForm,
  deleteSelectChildItem,
  deleteSelectItem,
  deleteSelectListItem,
  removeSelectPanel,
  toggleSelectShuffle,
} from "@/utils/reducers/editor/selectReducerUtils";
import { useEffect, useReducer } from "react";

export type SelectReducerState = Record<number, SelectPanelChip>;

export type SelectReducerAction = {
  loadState: (state: SelectReducerState) => void;
  removePanel: (panelId: number) => void;
  changeChip: (panelId: number) => void;
  addItem: (panelId: number) => void;
  addChildItem: (panelId: number, parentItemId: number) => void;
  addListItem: (
    panelId: number,
    selectItemId: number,
    childItemId: number,
  ) => void;
  deleteListItem: (
    panelId: number,
    selectItemId: number,
    childItemId: number,
    listItemId: number,
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
  toggleShuffle: (panelId: number, itemId: number) => void;
};

export interface SelectReducerReturn {
  state: SelectReducerState;
  action: SelectReducerAction;
}

export function useSelectReducer(): SelectReducerReturn {
  type STATE = SelectReducerState | undefined;

  type REMOVE_PANEL = { panelId: number };
  type CHANGE_CHIP = { panelId: number };
  type ADD_ITEM = { panelId: number };
  type ADD_CHILD_ITEM = { panelId: number; parentItemId: number };
  type ADD_LIST_ITEM = {
    panelId: number;
    selectItemId: number;
    childItemId: number;
  };
  type DELETE_LIST_ITEM = {
    panelId: number;
    selectItemId: number;
    childItemId: number;
    listItemId: number;
  };
  type DELETE_CHILD_ITEM = {
    panelId: number;
    parentItemId: number;
    childItemId: number;
  };
  type CHANGE_ITEM = { panelId: number; itemId: number };
  type CHANGE_ITEM_FORM = {
    panelId: number;
    itemId: number;
    label: string;
    value: string;
  };
  type DELETE_ITEM = { panelId: number; itemId: number };
  type TOGGLE_SHUFFLE = { panelId: number; itemId: number };
  type LOAD_STATE = SelectReducerState;

  type ACTION =
    | { type: "REMOVE_PANEL"; payload: REMOVE_PANEL }
    | { type: "CHANGE_CHIP"; payload: CHANGE_CHIP }
    | { type: "ADD_ITEM"; payload: ADD_ITEM }
    | { type: "ADD_CHILD_ITEM"; payload: ADD_CHILD_ITEM }
    | { type: "ADD_LIST_ITEM"; payload: ADD_LIST_ITEM }
    | { type: "DELETE_LIST_ITEM"; payload: DELETE_LIST_ITEM }
    | { type: "DELETE_CHILD_ITEM"; payload: DELETE_CHILD_ITEM }
    | { type: "CHANGE_ITEM"; payload: CHANGE_ITEM }
    | { type: "CHANGE_ITEM_FORM"; payload: CHANGE_ITEM_FORM }
    | { type: "DELETE_ITEM"; payload: DELETE_ITEM }
    | { type: "TOGGLE_SHUFFLE"; payload: TOGGLE_SHUFFLE }
    | { type: "LOAD_STATE"; payload: LOAD_STATE }
    | { type: "INITIALIZE" };

  const initItem: SelectReducerState = {};

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "REMOVE_PANEL":
        return state && removeSelectPanel(state, action.payload.panelId);
      case "CHANGE_CHIP":
        return state && changeSelectChip(state, action.payload.panelId);
      case "ADD_ITEM":
        return state && addSelectItem(state, action.payload.panelId);
      case "ADD_CHILD_ITEM":
        return (
          state &&
          addSelectChildItem(
            state,
            action.payload.panelId,
            action.payload.parentItemId,
          )
        );
      case "ADD_LIST_ITEM":
        return (
          state &&
          addSelectListItem(
            state,
            action.payload.panelId,
            action.payload.selectItemId,
            action.payload.childItemId,
          )
        );
      case "DELETE_LIST_ITEM":
        return (
          state &&
          deleteSelectListItem(
            state,
            action.payload.panelId,
            action.payload.selectItemId,
            action.payload.childItemId,
            action.payload.listItemId,
          )
        );
      case "DELETE_CHILD_ITEM":
        return (
          state &&
          deleteSelectChildItem(
            state,
            action.payload.panelId,
            action.payload.parentItemId,
            action.payload.childItemId,
          )
        );
      case "CHANGE_ITEM":
        return (
          state &&
          changeSelectItem(
            state,
            action.payload.panelId,
            action.payload.itemId,
          )
        );
      case "CHANGE_ITEM_FORM":
        return (
          state &&
          changeSelectItemForm(
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
          deleteSelectItem(
            state,
            action.payload.panelId,
            action.payload.itemId,
          )
        );
      case "TOGGLE_SHUFFLE":
        return (
          state &&
          toggleSelectShuffle(
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

  const handleLoadState = (newState: SelectReducerState) =>
    dispatch({ type: "LOAD_STATE", payload: newState });
  const handleRemovePanel = (panelId: number) =>
    dispatch({ type: "REMOVE_PANEL", payload: { panelId } });
  const handleChangeChip = (panelId: number) =>
    dispatch({ type: "CHANGE_CHIP", payload: { panelId } });
  const handleAddItem = (panelId: number) =>
    dispatch({ type: "ADD_ITEM", payload: { panelId } });
  const handleAddChildItem = (panelId: number, parentItemId: number) =>
    dispatch({ type: "ADD_CHILD_ITEM", payload: { panelId, parentItemId } });
  const handleAddListItem = (
    panelId: number,
    selectItemId: number,
    childItemId: number,
  ) =>
    dispatch({
      type: "ADD_LIST_ITEM",
      payload: { panelId, selectItemId, childItemId },
    });
  const handleDeleteListItem = (
    panelId: number,
    selectItemId: number,
    childItemId: number,
    listItemId: number,
  ) =>
    dispatch({
      type: "DELETE_LIST_ITEM",
      payload: { panelId, selectItemId, childItemId, listItemId },
    });
  const handleDeleteChildItem = (
    panelId: number,
    parentItemId: number,
    childItemId: number,
  ) =>
    dispatch({
      type: "DELETE_CHILD_ITEM",
      payload: { panelId, parentItemId, childItemId },
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
  const handleToggleShuffle = (panelId: number, itemId: number) =>
    dispatch({ type: "TOGGLE_SHUFFLE", payload: { panelId, itemId } });

  return {
    state: state ?? initItem,
    action: {
      loadState: handleLoadState,
      removePanel: handleRemovePanel,
      changeChip: handleChangeChip,
      addItem: handleAddItem,
      addChildItem: handleAddChildItem,
      addListItem: handleAddListItem,
      deleteListItem: handleDeleteListItem,
      deleteChildItem: handleDeleteChildItem,
      changeItem: handleChangeItem,
      changeItemForm: handleChangeItemForm,
      deleteItem: handleDeleteItem,
      toggleShuffle: handleToggleShuffle,
    },
  };
}
