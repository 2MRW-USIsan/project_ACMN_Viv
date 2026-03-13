"use client";

import { useMemo, useReducer, useEffect } from "react";
import type { JsonValidationStatus, OrderJsonRecord } from "@/types/viewer/orderJson";

export type OrderJsonReducerState = {
  text: string;
  dbRecord: OrderJsonRecord | null;
  validationStatus: JsonValidationStatus;
  validationError: string;
  hasDiff: boolean;
};

export type OrderJsonReducerAction = {
  setText: (text: string) => void;
  loadFromDb: (record: OrderJsonRecord | null) => void;
  paste: (text: string) => void;
  clear: () => void;
  reset: () => void;
};

type State = {
  text: string;
  dbRecord: OrderJsonRecord | null;
  validationStatus: JsonValidationStatus;
  validationError: string;
};

type Action =
  | { type: "SET_TEXT"; payload: string }
  | { type: "LOAD_FROM_DB"; payload: OrderJsonRecord | null }
  | { type: "PASTE"; payload: string }
  | { type: "CLEAR" }
  | { type: "RESET" }
  | { type: "INITIALIZE" };

const validateJson = (text: string): { status: JsonValidationStatus; error: string } => {
  if (text.trim() === "") return { status: "empty", error: "" };
  try {
    JSON.parse(text);
    return { status: "valid", error: "" };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { status: "invalid", error: detail };
  }
};

const applyText = (state: State, text: string): State => {
  const { status, error } = validateJson(text);
  return { ...state, text, validationStatus: status, validationError: error };
};

const initItem: State = {
  text: "",
  dbRecord: null,
  validationStatus: "empty",
  validationError: "",
};

const reducer = (state: State | undefined, action: Action): State | undefined => {
  if (action.type === "INITIALIZE") return initItem;
  if (!state) return state;
  const handlers: Record<Exclude<Action["type"], "INITIALIZE">, () => State> = {
    SET_TEXT: () =>
      applyText(state, (action as { type: "SET_TEXT"; payload: string }).payload),
    LOAD_FROM_DB: () => {
      const record = (action as { type: "LOAD_FROM_DB"; payload: OrderJsonRecord | null }).payload;
      const text = record?.jsonData ?? "";
      const { status, error } = validateJson(text);
      return {
        text,
        dbRecord: record,
        validationStatus: status,
        validationError: error,
      };
    },
    PASTE: () =>
      applyText(state, (action as { type: "PASTE"; payload: string }).payload),
    CLEAR: () => applyText(state, ""),
    RESET: () => applyText(state, state.dbRecord?.jsonData ?? ""),
  };
  return handlers[action.type]?.() ?? state;
};

export interface OrderJsonReducerReturn {
  state: OrderJsonReducerState;
  action: OrderJsonReducerAction;
}

export function useOrderJsonReducer(): OrderJsonReducerReturn {
  const [state, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  const action = useMemo(
    (): OrderJsonReducerAction => ({
      setText: (text) => dispatch({ type: "SET_TEXT", payload: text }),
      loadFromDb: (record) => dispatch({ type: "LOAD_FROM_DB", payload: record }),
      paste: (text) => dispatch({ type: "PASTE", payload: text }),
      clear: () => dispatch({ type: "CLEAR" }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    [],
  );

  const currentState = state ?? initItem;
  return {
    state: {
      text: currentState.text,
      dbRecord: currentState.dbRecord,
      validationStatus: currentState.validationStatus,
      validationError: currentState.validationError,
      hasDiff: currentState.text !== (currentState.dbRecord?.jsonData ?? ""),
    },
    action,
  };
}
