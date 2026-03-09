"use client";

import { useCallback, useEffect, useReducer } from "react";

const STORAGE_KEY = "acmn_yaml_content";

const INITIAL_YAML = `# YAML Editor
# TODO: Define the full YAML schema as requirements are clarified
orders:
  - id: "order-001"
    name: "Sample Order 1"
    status: "pending"
  - id: "order-002"
    name: "Sample Order 2"
    status: "completed"
`;

type State = {
  content: string;
  savedMessage: string;
};

type Action =
  | { type: "SET_CONTENT"; payload: string }
  | { type: "LOAD"; payload: string }
  | { type: "SAVE" }
  | { type: "NEW" }
  | { type: "CLEAR_MESSAGE" };

const SAVE_MESSAGE_DURATION_MS = 2000;

const saveToStorage = (content: string): void => {
  window.localStorage.setItem(STORAGE_KEY, content);
};

const reducer = (state: State, action: Action): State => {
  const handlers: Record<Action["type"], () => State> = {
    SET_CONTENT: () => ({ ...state, content: (action as { type: "SET_CONTENT"; payload: string }).payload }),
    LOAD: () => ({ ...state, content: (action as { type: "LOAD"; payload: string }).payload }),
    SAVE: () => {
      saveToStorage(state.content);
      return { ...state, savedMessage: "保存しました" };
    },
    NEW: () => ({ content: INITIAL_YAML, savedMessage: "" }),
    CLEAR_MESSAGE: () => ({ ...state, savedMessage: "" }),
  };
  return handlers[action.type]?.() ?? state;
};

export const useYamlEditor = () => {
  const [state, dispatch] = useReducer(reducer, {
    content: INITIAL_YAML,
    savedMessage: "",
  });

  // Load from localStorage on client only (after hydration)
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      dispatch({ type: "LOAD", payload: stored });
    }
  }, []);

  const setContent = useCallback((value: string) => {
    dispatch({ type: "SET_CONTENT", payload: value });
  }, []);

  const save = useCallback(() => {
    dispatch({ type: "SAVE" });
    setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), SAVE_MESSAGE_DURATION_MS);
  }, []);

  const createNew = useCallback(() => {
    dispatch({ type: "NEW" });
  }, []);

  // TODO: Implement file download when requirements are clarified
  const download = useCallback(() => {
    const blob = new Blob([state.content], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output_${Date.now()}.yaml`;
    a.click();
    URL.revokeObjectURL(url);
  }, [state.content]);

  return { content: state.content, savedMessage: state.savedMessage, setContent, save, createNew, download };
};
