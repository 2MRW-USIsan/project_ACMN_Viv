"use client";

import { useEffect, useReducer } from "react";

export interface PromptForgerFetchState {
  dummy: null;
}

export interface PromptForgerFetchAction {
  reset: () => void;
}

export interface PromptForgerFetchReturn {
  state: PromptForgerFetchState;
  action: PromptForgerFetchAction;
}

export function usePromptForgerFetchReducer(): PromptForgerFetchReturn {
  type STATE = PromptForgerFetchState | undefined;
  type ACTION = { type: "INITIALIZE" };

  const initItem: PromptForgerFetchState = { dummy: null };

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

  const handleReset = () => {
    dispatch({ type: "INITIALIZE" });
  };

  return {
    state: state ?? initItem,
    action: { reset: handleReset },
  };
}
