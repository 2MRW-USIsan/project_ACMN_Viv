"use client";

import { useEffect, useReducer } from "react";
import { ConfigurationsFetchItem, ConfigurationsRequest } from "@/hooks/configurations/state/useConfigurationsService";

export interface ConfigurationsReducerState {
  isDrawerOpen: boolean;
}

export interface ConfigurationsReducerAction {
  toggleDrawer: () => void;
}

export interface ConfigurationsReducerReturn {
  state: ConfigurationsReducerState;
  action: ConfigurationsReducerAction;
}

export interface ConfigurationsContexts {
  service: {
    fetchItem: ConfigurationsFetchItem;
    request: ConfigurationsRequest;
  };
  reducer: {
    state: ConfigurationsReducerState;
    action: ConfigurationsReducerAction;
  };
}

export function useConfigurationsStateReducer(): ConfigurationsReducerReturn {
  type STATE = ConfigurationsReducerState | undefined;
  type ACTION = { type: "INITIALIZE" } | { type: "TOGGLE_DRAWER" };

  const initItem: ConfigurationsReducerState = {
    isDrawerOpen: true,
  };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "INITIALIZE":
        return initItem;
      case "TOGGLE_DRAWER":
        return { ...(state ?? initItem), isDrawerOpen: !(state ?? initItem).isDrawerOpen };
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
    action: {
      toggleDrawer: () => dispatch({ type: "TOGGLE_DRAWER" }),
    },
  };
}
