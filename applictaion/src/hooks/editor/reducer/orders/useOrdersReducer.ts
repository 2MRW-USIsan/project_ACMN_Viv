import type { OrdersPanelChip } from "@/types/editor/panel";
import {
  addOrdersChildItem,
  addOrdersComplexItemData,
  addOrdersItem,
  addOrdersItemData,
  changeOrdersChip,
  changeOrdersItem,
  changeOrdersItemForm,
  deleteOrdersChildItem,
  deleteOrdersComplexItemData,
  deleteOrdersItem,
  deleteOrdersItemData,
  removeOrdersPanel,
} from "@/utils/reducers/editor/ordersReducerUtils";
import { useEffect, useReducer } from "react";

export type OrdersReducerState = Record<number, OrdersPanelChip>;

export type OrdersReducerAction = {
  loadState: (state: OrdersReducerState) => void;
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

export interface OrdersReducerReturn {
  state: OrdersReducerState;
  action: OrdersReducerAction;
}

export function useOrdersReducer(): OrdersReducerReturn {
  type STATE = OrdersReducerState | undefined;

  type REMOVE_PANEL = { panelId: number };
  type CHANGE_CHIP = { panelId: number };
  type ADD_ITEM = { panelId: number };
  type ADD_CHILD_ITEM = { panelId: number; parentItemId: number };
  type ADD_ITEM_DATA = {
    panelId: number;
    parentItemId: number;
    childItemId: number;
  };
  type ADD_COMPLEX_ITEM_DATA = {
    panelId: number;
    parentItemId: number;
    childItemId: number;
    itemDataId: number;
  };
  type DELETE_ITEM_DATA = {
    panelId: number;
    parentItemId: number;
    childItemId: number;
    itemDataId: number;
  };
  type DELETE_COMPLEX_ITEM_DATA = {
    panelId: number;
    parentItemId: number;
    childItemId: number;
    itemDataId: number;
    complexItemId: number;
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
  type LOAD_STATE = OrdersReducerState;

  type ACTION =
    | { type: "REMOVE_PANEL"; payload: REMOVE_PANEL }
    | { type: "CHANGE_CHIP"; payload: CHANGE_CHIP }
    | { type: "ADD_ITEM"; payload: ADD_ITEM }
    | { type: "ADD_CHILD_ITEM"; payload: ADD_CHILD_ITEM }
    | { type: "ADD_ITEM_DATA"; payload: ADD_ITEM_DATA }
    | { type: "ADD_COMPLEX_ITEM_DATA"; payload: ADD_COMPLEX_ITEM_DATA }
    | { type: "DELETE_ITEM_DATA"; payload: DELETE_ITEM_DATA }
    | { type: "DELETE_COMPLEX_ITEM_DATA"; payload: DELETE_COMPLEX_ITEM_DATA }
    | { type: "DELETE_CHILD_ITEM"; payload: DELETE_CHILD_ITEM }
    | { type: "CHANGE_ITEM"; payload: CHANGE_ITEM }
    | { type: "CHANGE_ITEM_FORM"; payload: CHANGE_ITEM_FORM }
    | { type: "DELETE_ITEM"; payload: DELETE_ITEM }
    | { type: "LOAD_STATE"; payload: LOAD_STATE }
    | { type: "INITIALIZE" };

  const initItem: OrdersReducerState = {};

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "REMOVE_PANEL":
        return state && removeOrdersPanel(state, action.payload.panelId);
      case "CHANGE_CHIP":
        return state && changeOrdersChip(state, action.payload.panelId);
      case "ADD_ITEM":
        return state && addOrdersItem(state, action.payload.panelId);
      case "ADD_CHILD_ITEM":
        return (
          state &&
          addOrdersChildItem(
            state,
            action.payload.panelId,
            action.payload.parentItemId,
          )
        );
      case "ADD_ITEM_DATA":
        return (
          state &&
          addOrdersItemData(
            state,
            action.payload.panelId,
            action.payload.parentItemId,
            action.payload.childItemId,
          )
        );
      case "ADD_COMPLEX_ITEM_DATA":
        return (
          state &&
          addOrdersComplexItemData(
            state,
            action.payload.panelId,
            action.payload.parentItemId,
            action.payload.childItemId,
            action.payload.itemDataId,
          )
        );
      case "DELETE_ITEM_DATA":
        return (
          state &&
          deleteOrdersItemData(
            state,
            action.payload.panelId,
            action.payload.parentItemId,
            action.payload.childItemId,
            action.payload.itemDataId,
          )
        );
      case "DELETE_COMPLEX_ITEM_DATA":
        return (
          state &&
          deleteOrdersComplexItemData(
            state,
            action.payload.panelId,
            action.payload.parentItemId,
            action.payload.childItemId,
            action.payload.itemDataId,
            action.payload.complexItemId,
          )
        );
      case "DELETE_CHILD_ITEM":
        return (
          state &&
          deleteOrdersChildItem(
            state,
            action.payload.panelId,
            action.payload.parentItemId,
            action.payload.childItemId,
          )
        );
      case "CHANGE_ITEM":
        return (
          state &&
          changeOrdersItem(
            state,
            action.payload.panelId,
            action.payload.itemId,
          )
        );
      case "CHANGE_ITEM_FORM":
        return (
          state &&
          changeOrdersItemForm(
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
          deleteOrdersItem(
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

  const handleLoadState = (newState: OrdersReducerState) =>
    dispatch({ type: "LOAD_STATE", payload: newState });
  const handleRemovePanel = (panelId: number) =>
    dispatch({ type: "REMOVE_PANEL", payload: { panelId } });
  const handleChangeChip = (panelId: number) =>
    dispatch({ type: "CHANGE_CHIP", payload: { panelId } });
  const handleAddItem = (panelId: number) =>
    dispatch({ type: "ADD_ITEM", payload: { panelId } });
  const handleAddChildItem = (panelId: number, parentItemId: number) =>
    dispatch({ type: "ADD_CHILD_ITEM", payload: { panelId, parentItemId } });
  const handleAddItemData = (
    panelId: number,
    parentItemId: number,
    childItemId: number,
  ) =>
    dispatch({
      type: "ADD_ITEM_DATA",
      payload: { panelId, parentItemId, childItemId },
    });
  const handleAddComplexItemData = (
    panelId: number,
    parentItemId: number,
    childItemId: number,
    itemDataId: number,
  ) =>
    dispatch({
      type: "ADD_COMPLEX_ITEM_DATA",
      payload: { panelId, parentItemId, childItemId, itemDataId },
    });
  const handleDeleteItemData = (
    panelId: number,
    parentItemId: number,
    childItemId: number,
    itemDataId: number,
  ) =>
    dispatch({
      type: "DELETE_ITEM_DATA",
      payload: { panelId, parentItemId, childItemId, itemDataId },
    });
  const handleDeleteComplexItemData = (
    panelId: number,
    parentItemId: number,
    childItemId: number,
    itemDataId: number,
    complexItemId: number,
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

  return {
    state: state ?? initItem,
    action: {
      loadState: handleLoadState,
      removePanel: handleRemovePanel,
      changeChip: handleChangeChip,
      addItem: handleAddItem,
      addChildItem: handleAddChildItem,
      addItemData: handleAddItemData,
      addComplexItemData: handleAddComplexItemData,
      deleteItemData: handleDeleteItemData,
      deleteComplexItemData: handleDeleteComplexItemData,
      deleteChildItem: handleDeleteChildItem,
      changeItem: handleChangeItem,
      changeItemForm: handleChangeItemForm,
      deleteItem: handleDeleteItem,
    },
  };
}
