"use client";

import { useReducer, useEffect } from "react";
import { PresetBuilderFetchItem, PresetBuilderRequest } from "@/hooks/preset-builder/state/usePresetBuilderService";

export interface PresetBuilderReducerState {}

export interface PresetBuilderReducerAction {}

export interface PresetBuilderReducerReturn {
  state: PresetBuilderReducerState;
  action: PresetBuilderReducerAction;
}

export interface PresetBuilderContexts {
  service: {
    fetchItem: PresetBuilderFetchItem;
    request: PresetBuilderRequest;
  };
  reducer: {
    state: PresetBuilderReducerState;
    action: PresetBuilderReducerAction;
  };
}

export function usePresetBuilderStateReducer(): PresetBuilderReducerReturn {
  type STATE = PresetBuilderReducerState | undefined;
  type ACTION = { type: "INITIALIZE" };

  const initItem: PresetBuilderReducerState = {};

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
