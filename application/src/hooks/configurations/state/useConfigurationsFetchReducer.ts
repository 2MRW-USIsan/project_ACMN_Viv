"use client";

import { useEffect, useReducer } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigurationsFetchState {
  // フェッチ状態の詳細は工程3で追加する
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigurationsFetchAction {
  // フェッチアクションの詳細は工程3で追加する
}

export interface ConfigurationsFetchReturn {
  state: ConfigurationsFetchState;
  action: ConfigurationsFetchAction;
}

export function useConfigurationsFetchReducer(): ConfigurationsFetchReturn {
  type STATE = ConfigurationsFetchState | undefined;
  type ACTION = { type: "INITIALIZE" };

  const initItem: ConfigurationsFetchState = {};

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
