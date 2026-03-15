"use client";

import { useEffect, useReducer } from "react";
import { SampleItem } from "@/types/sampleItem";

export interface SampleFetchState {
  itemList: SampleItem[] | null;
}

export interface SampleFetchAction {
  setItemList: (items: SampleItem[]) => void;
}

export interface SampleFetchReturn {
  state: SampleFetchState;
  action: SampleFetchAction;
}

export function useSampleFetchReducer(): SampleFetchReturn {
  type STATE = SampleFetchState | undefined;
  type SET_ITEM_LIST = { items: SampleItem[] };
  type ACTION =
    | { type: "SET_ITEM_LIST"; payload: SET_ITEM_LIST }
    | { type: "INITIALIZE" };

  const initItem: SampleFetchState = { itemList: null };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "SET_ITEM_LIST":
        return state && { ...state, itemList: action.payload.items };
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

  const handleSetItemList = (items: SampleItem[]) => {
    dispatch({ type: "SET_ITEM_LIST", payload: { items } });
  };

  return {
    state: state ?? initItem,
    action: { setItemList: handleSetItemList },
  };
}
