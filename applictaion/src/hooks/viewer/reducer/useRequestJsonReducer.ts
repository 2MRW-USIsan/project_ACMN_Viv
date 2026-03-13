"use client";

import { load as loadYaml } from "js-yaml";
import { useEffect, useMemo, useReducer } from "react";
import { generateRequestJson, shuffleRequestJson } from "@/utils/generateRequestJson";
import type { YamlData } from "@/types/viewer/yamlData";

export type RequestJsonReducerState = {
  text: string;
  yamlError: string;
  hasYamlData: boolean;
};

export type RequestJsonReducerAction = {
  loadYaml: (yamlContent: string) => void;
  shuffle: () => void;
};

type State = {
  text: string;
  yamlError: string;
  yamlData: YamlData | null;
};

type Action =
  | { type: "LOAD_YAML"; payload: string }
  | { type: "SHUFFLE" }
  | { type: "INITIALIZE" };

const parseYaml = (yamlContent: string): { data: YamlData | null; error: string } => {
  if (!yamlContent.trim()) return { data: null, error: "" };
  try {
    const parsed = loadYaml(yamlContent) as YamlData | null;
    if (!parsed?.blocs) {
      return { data: null, error: "YAMLにblocsフィールドがありません" };
    }
    return { data: parsed, error: "" };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { data: null, error: `YAMLの解析に失敗しました: ${detail}` };
  }
};

const initItem: State = { text: "", yamlError: "", yamlData: null };

const reducer = (state: State | undefined, action: Action): State | undefined => {
  if (action.type === "INITIALIZE") return initItem;
  if (!state) return state;
  const handlers: Record<Exclude<Action["type"], "INITIALIZE">, () => State> = {
    LOAD_YAML: () => {
      const yamlContent = (action as { type: "LOAD_YAML"; payload: string }).payload;
      const { data, error } = parseYaml(yamlContent);
      const text = data ? generateRequestJson(data) : "";
      return { text, yamlError: error, yamlData: data };
    },
    SHUFFLE: () => {
      if (!state.yamlData) return state;
      return { ...state, text: shuffleRequestJson(state.yamlData) };
    },
  };
  return handlers[action.type]?.() ?? state;
};

export interface RequestJsonReducerReturn {
  state: RequestJsonReducerState;
  action: RequestJsonReducerAction;
}

export function useRequestJsonReducer(): RequestJsonReducerReturn {
  const [state, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  const action = useMemo(
    (): RequestJsonReducerAction => ({
      loadYaml: (yamlContent) => dispatch({ type: "LOAD_YAML", payload: yamlContent }),
      shuffle: () => dispatch({ type: "SHUFFLE" }),
    }),
    [],
  );

  const currentState = state ?? initItem;
  return {
    state: {
      text: currentState.text,
      yamlError: currentState.yamlError,
      hasYamlData: currentState.yamlData !== null,
    },
    action,
  };
}
