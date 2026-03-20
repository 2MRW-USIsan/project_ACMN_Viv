"use client";

import { useEffect, useReducer } from "react";
import {
  ConfigurationsFetchItem,
  ConfigurationsRequest,
} from "@/hooks/configurations/state/useConfigurationsService";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigurationsReducerState {
  // 状態の詳細は工程2〜3で追加する
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigurationsReducerAction {
  // アクションの詳細は工程2〜3で追加する
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
  type ACTION = { type: "INITIALIZE" };

  const initItem: ConfigurationsReducerState = {};

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
