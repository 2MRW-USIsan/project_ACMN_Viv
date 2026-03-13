"use client";

import {
  loadYamlContent,
  shuffleRequestState,
} from "@/utils/reducers/viewer/requestJsonReducerUtils";
import type { YamlData } from "@/types/viewer/yamlData";
import { useEffect, useReducer } from "react";

export type RequestJsonReducerState = {
  text: string;
  yamlError: string;
  hasYamlData: boolean;
};

export type RequestJsonReducerAction = {
  loadYaml: (yamlContent: string) => void;
  shuffle: () => void;
};

export interface RequestJsonReducerReturn {
  state: RequestJsonReducerState;
  action: RequestJsonReducerAction;
}

export function useRequestJsonReducer(): RequestJsonReducerReturn {
  type InternalState = {
    text: string;
    yamlError: string;
    yamlData: YamlData | null;
  };
  type STATE = InternalState | undefined;

  type LOAD_YAML = string;

  type ACTION =
    | { type: "LOAD_YAML"; payload: LOAD_YAML }
    | { type: "SHUFFLE" }
    | { type: "INITIALIZE" };

  const initItem: InternalState = { text: "", yamlError: "", yamlData: null };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "LOAD_YAML":
        return loadYamlContent(action.payload);
      case "SHUFFLE":
        return state && shuffleRequestState(state);
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

  const handleLoadYaml = (yamlContent: string) =>
    dispatch({ type: "LOAD_YAML", payload: yamlContent });
  const handleShuffle = () => dispatch({ type: "SHUFFLE" });

  const currentState = state ?? initItem;
  return {
    state: {
      text: currentState.text,
      yamlError: currentState.yamlError,
      hasYamlData: currentState.yamlData !== null,
    },
    action: {
      loadYaml: handleLoadYaml,
      shuffle: handleShuffle,
    },
  };
}
