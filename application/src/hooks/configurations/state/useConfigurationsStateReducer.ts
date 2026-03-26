"use client";

import { useEffect, useReducer } from "react";
import { ConfigurationsFetchItem, ConfigurationsRequest } from "@/hooks/configurations/state/useConfigurationsService";

export interface BlocPanelState {
  id: string;
  key: string;
  label: string;
  isExpanded: boolean;
}

export interface ConfigurationsReducerState {
  selectedConfigSet: string;
  configName: string;
  hasChanges: boolean;
  panels: BlocPanelState[];
}

export interface ConfigurationsReducerAction {
  setSelectedConfigSet: (value: string) => void;
  setConfigName: (value: string) => void;
  setHasChanges: (value: boolean) => void;
  addPanel: () => void;
  removePanel: (id: string) => void;
  togglePanel: (id: string) => void;
  updatePanelKey: (id: string, key: string) => void;
  updatePanelLabel: (id: string, label: string) => void;
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
    | { type: "SET_SELECTED_CONFIG_SET"; value: string }
    | { type: "SET_CONFIG_NAME"; value: string }
    | { type: "SET_HAS_CHANGES"; value: boolean }
    | { type: "ADD_PANEL" }
    | { type: "REMOVE_PANEL"; id: string }
    | { type: "TOGGLE_PANEL"; id: string }
    | { type: "UPDATE_PANEL_KEY"; id: string; key: string }
    | { type: "UPDATE_PANEL_LABEL"; id: string; label: string };

  const initItem: ConfigurationsReducerState = {
    selectedConfigSet: "",
    configName: "",
    hasChanges: false,
    panels: [],
  };

  const reducer = (state: STATE, action: ACTION): STATE => {
    const current = state ?? initItem;
    switch (action.type) {
      case "INITIALIZE":
        return initItem;
      case "SET_SELECTED_CONFIG_SET":
        return { ...current, selectedConfigSet: action.value };
      case "SET_CONFIG_NAME":
        return { ...current, configName: action.value, hasChanges: true };
      case "SET_HAS_CHANGES":
        return { ...current, hasChanges: action.value };
      case "ADD_PANEL":
        return {
          ...current,
          panels: [
            ...current.panels,
            { id: crypto.randomUUID(), key: "", label: "", isExpanded: false },
          ],
        };
      case "REMOVE_PANEL":
        return {
          ...current,
          panels: current.panels.filter((p) => p.id !== action.id),
        };
      case "TOGGLE_PANEL":
        return {
          ...current,
          panels: current.panels.map((p) =>
            p.id === action.id ? { ...p, isExpanded: !p.isExpanded } : p
          ),
        };
      case "UPDATE_PANEL_KEY":
        return {
          ...current,
          panels: current.panels.map((p) =>
            p.id === action.id ? { ...p, key: action.key } : p
          ),
        };
      case "UPDATE_PANEL_LABEL":
        return {
          ...current,
          panels: current.panels.map((p) =>
            p.id === action.id ? { ...p, label: action.label } : p
          ),
        };
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
      setSelectedConfigSet: (value: string) =>
        dispatch({ type: "SET_SELECTED_CONFIG_SET", value }),
      setConfigName: (value: string) =>
        dispatch({ type: "SET_CONFIG_NAME", value }),
      setHasChanges: (value: boolean) =>
        dispatch({ type: "SET_HAS_CHANGES", value }),
      addPanel: () => dispatch({ type: "ADD_PANEL" }),
      removePanel: (id: string) => dispatch({ type: "REMOVE_PANEL", id }),
      togglePanel: (id: string) => dispatch({ type: "TOGGLE_PANEL", id }),
      updatePanelKey: (id: string, key: string) =>
        dispatch({ type: "UPDATE_PANEL_KEY", id, key }),
      updatePanelLabel: (id: string, label: string) =>
        dispatch({ type: "UPDATE_PANEL_LABEL", id, label }),
    },
  };
}
