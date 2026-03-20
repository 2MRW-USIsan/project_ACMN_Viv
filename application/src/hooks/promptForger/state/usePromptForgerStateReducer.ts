"use client";

import { useReducer, useEffect } from "react";
import { PromptForgerFetchItem, PromptForgerRequest } from "@/hooks/promptForger/state/usePromptForgerService";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PromptForgerReducerState {
  // Stub: add state fields in subsequent steps
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PromptForgerReducerAction {
  // Stub: add action handlers in subsequent steps
}

export interface PromptForgerReducerReturn {
  state: PromptForgerReducerState;
  action: PromptForgerReducerAction;
}

export interface PromptForgerContexts {
  service: {
    fetchItem: PromptForgerFetchItem;
    request: PromptForgerRequest;
  };
  reducer: {
    state: PromptForgerReducerState;
    action: PromptForgerReducerAction;
  };
}

export function usePromptForgerStateReducer(): PromptForgerReducerReturn {
  type STATE = PromptForgerReducerState | undefined;
  type ACTION = { type: "INITIALIZE" };

  const initItem: PromptForgerReducerState = {};

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
