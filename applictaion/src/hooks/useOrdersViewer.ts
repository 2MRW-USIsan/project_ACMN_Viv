"use client";

import { load as loadYaml } from "js-yaml";
import { useCallback, useEffect, useReducer } from "react";
import type { YamlData } from "@/types/yamlData";

const STORAGE_KEY = "acmn_yaml_content";

type State = {
  leftText: string;
  rightText: string;
  errorMessage: string;
};

type Action =
  | { type: "SET_LEFT"; payload: string }
  | { type: "SET_RIGHT"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "REFRESH"; payload: string };

const parseOrdersJson = (yamlContent: string): { json: string; error: string } => {
  try {
    const parsed = loadYaml(yamlContent) as YamlData | null;
    const orders = parsed?.orders ?? [];
    return { json: JSON.stringify(orders, null, 2), error: "" };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { json: "", error: `YAMLの解析に失敗しました: ${detail}` };
  }
};

const reducer = (state: State, action: Action): State => {
  const handlers: Record<Action["type"], () => State> = {
    SET_LEFT: () => ({ ...state, leftText: (action as { type: "SET_LEFT"; payload: string }).payload }),
    SET_RIGHT: () => ({ ...state, rightText: (action as { type: "SET_RIGHT"; payload: string }).payload }),
    SET_ERROR: () => ({ ...state, errorMessage: (action as { type: "SET_ERROR"; payload: string }).payload }),
    REFRESH: () => {
      const yamlContent = (action as { type: "REFRESH"; payload: string }).payload;
      const { json, error } = parseOrdersJson(yamlContent);
      return { ...state, leftText: json, errorMessage: error };
    },
  };
  return handlers[action.type]?.() ?? state;
};

const loadYamlFromStorage = (): string => {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
};

export function useOrdersViewer() {
  const [state, dispatch] = useReducer(reducer, {
    leftText: "",
    rightText: "",
    errorMessage: "",
  });

  const refresh = useCallback(() => {
    const yamlContent = loadYamlFromStorage();
    dispatch({ type: "REFRESH", payload: yamlContent });
  }, []);

  // TODO: Implement right text area control when requirements are clarified
  const applyRight = useCallback(() => {
    dispatch({ type: "SET_RIGHT", payload: "TODO: 右テキストエリアの制御は未定義です" });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    leftText: state.leftText,
    rightText: state.rightText,
    errorMessage: state.errorMessage,
    refresh,
    applyRight,
  };
}
