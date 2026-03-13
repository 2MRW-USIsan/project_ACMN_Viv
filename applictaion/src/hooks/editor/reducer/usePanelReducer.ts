import type {
  ChipType,
  PanelDataActionsType,
  PanelDataStateType,
} from "@/types/editor/panel";
import { useEffect } from "react";
import { useOrdersReducer } from "./orders/useOrdersReducer";
import { usePanelBaseReducer } from "./usePanelBaseReducer";
import { useSelectReducer } from "./select/useSelectReducer";
import { useSwitchReducer } from "./switch/useSwitchReducer";

export interface PanelReducerReturn {
  state: PanelDataStateType;
  action: PanelDataActionsType;
}

export function usePanelReducer(): PanelReducerReturn {
  const { state: panelBaseState, action: panelBaseActions } =
    usePanelBaseReducer();
  const { state: ordersState, action: ordersActions } = useOrdersReducer();
  const { state: selectState, action: selectActions } = useSelectReducer();
  const { state: switchState, action: switchActions } = useSwitchReducer();

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
    action: {
      loadState: (newState) => {
        panelBaseActions.loadState(
          newState.panels.map((p) => ({
            id: p.id,
            label: p.label,
            state: p.state,
            values: p.values,
          })),
        );
        ordersActions.loadState(
          Object.fromEntries(newState.panels.map((p) => [p.id, p.orders])),
        );
        selectActions.loadState(
          Object.fromEntries(newState.panels.map((p) => [p.id, p.select])),
        );
        switchActions.loadState(
          Object.fromEntries(newState.panels.map((p) => [p.id, p.switch])),
        );
      },
      addPanel: panelBaseActions.addPanel,
      changePanel: panelBaseActions.changePanel,
      deletePanel: panelBaseActions.deletePanel,
      changeForm: panelBaseActions.changeForm,
      changeChip: (id, chipType) => {
        const chipActionMap: Record<ChipType, (id: number) => void> = {
          orders: ordersActions.changeChip,
          select: selectActions.changeChip,
          switch: switchActions.changeChip,
        };
        chipActionMap[chipType](id);
      },
      addItemPanel: (id, key) => {
        const addItemMap: Record<ChipType, (id: number) => void> = {
          orders: ordersActions.addItem,
          select: selectActions.addItem,
          switch: switchActions.addItem,
        };
        addItemMap[key](id);
      },
      addOrdersChildItemPanel: ordersActions.addChildItem,
      addOrdersItemDataPanel: ordersActions.addItemData,
      addOrdersComplexItemDataPanel: ordersActions.addComplexItemData,
      deleteOrdersItemDataPanel: ordersActions.deleteItemData,
      deleteOrdersComplexItemDataPanel: ordersActions.deleteComplexItemData,
      addSelectChildItemPanel: selectActions.addChildItem,
      addSelectListItemPanel: selectActions.addListItem,
      deleteSelectListItemPanel: selectActions.deleteListItem,
      addSwitchChildItemPanel: switchActions.addChildItem,
      deleteOrdersChildItemPanel: ordersActions.deleteChildItem,
      deleteSelectChildItemPanel: selectActions.deleteChildItem,
      deleteSwitchChildItemPanel: switchActions.deleteChildItem,
      changeItemPanel: (id, key, itemId) => {
        const changeItemMap: Record<
          ChipType,
          (id: number, itemId: number) => void
        > = {
          orders: ordersActions.changeItem,
          select: selectActions.changeItem,
          switch: switchActions.changeItem,
        };
        changeItemMap[key](id, itemId);
      },
      changeItemForm: (id, key, itemId, label, value) => {
        const changeItemFormMap: Record<
          ChipType,
          (id: number, itemId: number, label: string, value: string) => void
        > = {
          orders: ordersActions.changeItemForm,
          select: selectActions.changeItemForm,
          switch: switchActions.changeItemForm,
        };
        changeItemFormMap[key](id, itemId, label, value);
      },
      deleteItemPanel: (id, key, itemId) => {
        const deleteItemMap: Record<
          ChipType,
          (id: number, itemId: number) => void
        > = {
          orders: ordersActions.deleteItem,
          select: selectActions.deleteItem,
          switch: switchActions.deleteItem,
        };
        deleteItemMap[key](id, itemId);
      },
      toggleSelectShuffle: (id, itemId) =>
        selectActions.toggleShuffle(id, itemId),
      toggleSwitchRandomize: (id, itemId) =>
        switchActions.toggleRandomize(id, itemId),
    },
  };
}
