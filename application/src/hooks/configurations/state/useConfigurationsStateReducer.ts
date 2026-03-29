"use client";

import { useEffect, useReducer } from "react";
import { ConfigurationsFetchItem, ConfigurationsRequest } from "@/hooks/configurations/state/useConfigurationsService";

export interface ConfigurationsReducerState {
  selectedConfig: string;
  configName: string;
  configValue: string;
  isLoading: boolean;
}

export interface ConfigurationsReducerAction {
  setSelectedConfig: (config: string) => void;
  setConfigName: (name: string) => void;
  setConfigValue: (value: string) => void;
  resetForm: () => void;
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
  type ACTION =
    | { type: "INITIALIZE" }
    | { type: "SET_SELECTED_CONFIG"; payload: string }
    | { type: "SET_CONFIG_NAME"; payload: string }
    | { type: "SET_CONFIG_VALUE"; payload: string }
    | { type: "RESET_FORM" };

  const initItem: ConfigurationsReducerState = {
    selectedConfig: "",
    configName: "",
    configValue: "",
    isLoading: false,
  };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "INITIALIZE":
        return initItem;
      case "SET_SELECTED_CONFIG":
        return { ...(state ?? initItem), selectedConfig: action.payload };
      case "SET_CONFIG_NAME":
        return { ...(state ?? initItem), configName: action.payload };
      case "SET_CONFIG_VALUE":
        return { ...(state ?? initItem), configValue: action.payload };
      case "RESET_FORM":
        return { ...(state ?? initItem), configName: "", configValue: "" };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  const action: ConfigurationsReducerAction = {
    setSelectedConfig: (config: string) => dispatch({ type: "SET_SELECTED_CONFIG", payload: config }),
    setConfigName: (name: string) => dispatch({ type: "SET_CONFIG_NAME", payload: name }),
    setConfigValue: (value: string) => dispatch({ type: "SET_CONFIG_VALUE", payload: value }),
    resetForm: () => dispatch({ type: "RESET_FORM" }),
  };

  return {
    state: state ?? initItem,
    action,
  };
}
