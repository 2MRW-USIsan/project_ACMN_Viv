import type { PanelDataActionsType, PanelDataStateType } from "@/types/panel";
import { useEffect } from "react";
import useOrdersReducer from "./useOrdersReducer";
import usePanelBaseReducer from "./usePanelBaseReducer";
import useSelectReducer from "./useSelectReducer";
import useSwitchReducer from "./useSwitchReducer";

// Re-export for backward compatibility
export type { PanelDataActionsType, PanelDataStateType };

interface Returns {
  state: PanelDataStateType;
  actions: PanelDataActionsType;
}

export default function usePanelReducer(): Returns {
  const { state: panelBaseState, actions: panelBaseActions } =
    usePanelBaseReducer();
  const { state: ordersState, actions: ordersActions } = useOrdersReducer();
  const { state: selectState, actions: selectActions } = useSelectReducer();
  const { state: switchState, actions: switchActions } = useSwitchReducer();

  // Synchronize domain reducers when panels are deleted from the panel list.
  // Actions are memoized so they are stable across renders.
  useEffect(() => {
    const currentPanelIds = new Set(panelBaseState.panels.map((p) => p.id));

    for (const panelId of Object.keys(ordersState).map(Number)) {
      if (!currentPanelIds.has(panelId)) ordersActions.removePanel(panelId);
    }
    for (const panelId of Object.keys(selectState).map(Number)) {
      if (!currentPanelIds.has(panelId)) selectActions.removePanel(panelId);
    }
    for (const panelId of Object.keys(switchState).map(Number)) {
      if (!currentPanelIds.has(panelId)) switchActions.removePanel(panelId);
    }
  }, [
    panelBaseState.panels,
    ordersState,
    ordersActions,
    selectState,
    selectActions,
    switchState,
    switchActions,
  ]);

  const state: PanelDataStateType = {
    panels: panelBaseState.panels.map((panel) => ({
      ...panel,
      orders: ordersState[panel.id] ?? { selected: false, data: [] },
      select: selectState[panel.id] ?? { selected: false, data: [] },
      switch: switchState[panel.id] ?? { selected: false, data: [] },
    })),
  };

  return {
    state,
    actions: {
      addPanel: panelBaseActions.addPanel,
      changePanel: panelBaseActions.changePanel,
      deletePanel: panelBaseActions.deletePanel,
      changeForm: panelBaseActions.changeForm,
      changeChip: (id, chipType) => {
        if (chipType === "orders") ordersActions.changeChip(id);
        else if (chipType === "select") selectActions.changeChip(id);
        else switchActions.changeChip(id);
      },
      addItemPanel: (id, key) => {
        if (key === "orders") ordersActions.addItem(id);
        else if (key === "select") selectActions.addItem(id);
        else switchActions.addItem(id);
      },
      addOrdersChildItemPanel: ordersActions.addChildItem,
      addOrdersItemDataPanel: ordersActions.addItemData,
      addOrdersComplexItemDataPanel: ordersActions.addComplexItemData,
      addSelectChildItemPanel: selectActions.addChildItem,
      addSelectListItemPanel: selectActions.addListItem,
      addSwitchChildItemPanel: switchActions.addChildItem,
      deleteOrdersChildItemPanel: ordersActions.deleteChildItem,
      deleteSelectChildItemPanel: selectActions.deleteChildItem,
      deleteSwitchChildItemPanel: switchActions.deleteChildItem,
      changeItemPanel: (id, key, itemId) => {
        if (key === "orders") ordersActions.changeItem(id, itemId);
        else if (key === "select") selectActions.changeItem(id, itemId);
        else switchActions.changeItem(id, itemId);
      },
      changeItemForm: (id, key, itemId, label, value) => {
        if (key === "orders")
          ordersActions.changeItemForm(id, itemId, label, value);
        else if (key === "select")
          selectActions.changeItemForm(id, itemId, label, value);
        else switchActions.changeItemForm(id, itemId, label, value);
      },
      deleteItemPanel: (id, key, itemId) => {
        if (key === "orders") ordersActions.deleteItem(id, itemId);
        else if (key === "select") selectActions.deleteItem(id, itemId);
        else switchActions.deleteItem(id, itemId);
      },
    },
  };
}
