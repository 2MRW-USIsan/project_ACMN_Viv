"use client";

import { useEffect, useReducer } from "react";

export interface PresetBuilderFetchState {}

export interface PresetBuilderFetchAction {}

export interface PresetBuilderFetchReturn {
  state: PresetBuilderFetchState;
  action: PresetBuilderFetchAction;
}

export function usePresetBuilderFetchReducer(): PresetBuilderFetchReturn {
  type STATE = PresetBuilderFetchState | undefined;
  type ACTION = { type: "INITIALIZE" };

  const initItem: PresetBuilderFetchState = {};

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
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

  return {
    state: state ?? initItem,
    action: {},
  };
}
