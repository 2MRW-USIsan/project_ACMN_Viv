"use client";

import { load as loadYaml } from "js-yaml";
import { useMemo, useReducer } from "react";
import { generateRequestJson, shuffleRequestJson } from "@/utils/generateRequestJson";
import type { YamlData } from "@/types/viewer/yamlData";

type State = {
  text: string;
  yamlError: string;
  yamlData: YamlData | null;
};

type Action =
  | { type: "LOAD_YAML"; payload: string }
  | { type: "SHUFFLE" };

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

const reducer = (state: State, action: Action): State => {
  const handlers: Record<Action["type"], () => State> = {
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

export type RequestJsonActions = {
  loadYaml: (yamlContent: string) => void;
  shuffle: () => void;
};

type Returns = {
  text: string;
  yamlError: string;
  hasYamlData: boolean;
  actions: RequestJsonActions;
};

export function useRequestJsonReducer(): Returns {
  const [state, dispatch] = useReducer(reducer, {
    text: "",
    yamlError: "",
    yamlData: null,
  });

  const actions = useMemo(
    (): RequestJsonActions => ({
      loadYaml: (yamlContent) => dispatch({ type: "LOAD_YAML", payload: yamlContent }),
      shuffle: () => dispatch({ type: "SHUFFLE" }),
    }),
    [],
  );

  return {
    text: state.text,
    yamlError: state.yamlError,
    hasYamlData: state.yamlData !== null,
    actions,
  };
}
