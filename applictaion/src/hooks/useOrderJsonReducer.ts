"use client";

import { useMemo, useReducer } from "react";
import type { OrderJsonRecord } from "@/types/orderJson";

export type JsonValidationStatus = "empty" | "valid" | "invalid";

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
  | { type: "RESET" };

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

const reducer = (state: State, action: Action): State => {
  const handlers: Record<Action["type"], () => State> = {
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

export type OrderJsonActions = {
  setText: (text: string) => void;
  loadFromDb: (record: OrderJsonRecord | null) => void;
  paste: (text: string) => void;
  clear: () => void;
  reset: () => void;
};

type Returns = {
  text: string;
  dbRecord: OrderJsonRecord | null;
  validationStatus: JsonValidationStatus;
  validationError: string;
  hasDiff: boolean;
  actions: OrderJsonActions;
};

export function useOrderJsonReducer(): Returns {
  const [state, dispatch] = useReducer(reducer, {
    text: "",
    dbRecord: null,
    validationStatus: "empty",
    validationError: "",
  });

  const actions = useMemo(
    (): OrderJsonActions => ({
      setText: (text) => dispatch({ type: "SET_TEXT", payload: text }),
      loadFromDb: (record) => dispatch({ type: "LOAD_FROM_DB", payload: record }),
      paste: (text) => dispatch({ type: "PASTE", payload: text }),
      clear: () => dispatch({ type: "CLEAR" }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    [],
  );

  const hasDiff = state.text !== (state.dbRecord?.jsonData ?? "");

  return {
    text: state.text,
    dbRecord: state.dbRecord,
    validationStatus: state.validationStatus,
    validationError: state.validationError,
    hasDiff,
    actions,
  };
}
