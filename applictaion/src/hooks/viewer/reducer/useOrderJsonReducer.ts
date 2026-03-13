"use client";

import {
  applyTextToState,
  loadFromDbToState,
} from "@/utils/reducers/viewer/orderJsonReducerUtils";
import type {
  JsonValidationStatus,
  OrderJsonRecord,
} from "@/types/viewer/orderJson";
import { useEffect, useReducer } from "react";

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

export interface OrderJsonReducerReturn {
  state: OrderJsonReducerState;
  action: OrderJsonReducerAction;
}

export function useOrderJsonReducer(): OrderJsonReducerReturn {
  type InternalState = {
    text: string;
    dbRecord: OrderJsonRecord | null;
    validationStatus: JsonValidationStatus;
    validationError: string;
  };
  type STATE = InternalState | undefined;

  type SET_TEXT = string;
  type LOAD_FROM_DB = OrderJsonRecord | null;
  type PASTE = string;

  type ACTION =
    | { type: "SET_TEXT"; payload: SET_TEXT }
    | { type: "LOAD_FROM_DB"; payload: LOAD_FROM_DB }
    | { type: "PASTE"; payload: PASTE }
    | { type: "CLEAR" }
    | { type: "RESET" }
    | { type: "INITIALIZE" };

  const initItem: InternalState = {
    text: "",
    dbRecord: null,
    validationStatus: "empty",
    validationError: "",
  };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "SET_TEXT":
        return state && applyTextToState(state, action.payload);
      case "LOAD_FROM_DB":
        return state && loadFromDbToState(state, action.payload);
      case "PASTE":
        return state && applyTextToState(state, action.payload);
      case "CLEAR":
        return state && applyTextToState(state, "");
      case "RESET":
        return state && applyTextToState(state, state.dbRecord?.jsonData ?? "");
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

  const handleSetText = (text: string) =>
    dispatch({ type: "SET_TEXT", payload: text });
  const handleLoadFromDb = (record: OrderJsonRecord | null) =>
    dispatch({ type: "LOAD_FROM_DB", payload: record });
  const handlePaste = (text: string) =>
    dispatch({ type: "PASTE", payload: text });
  const handleClear = () => dispatch({ type: "CLEAR" });
  const handleReset = () => dispatch({ type: "RESET" });

  const currentState = state ?? initItem;
  return {
    state: {
      text: currentState.text,
      dbRecord: currentState.dbRecord,
      validationStatus: currentState.validationStatus,
      validationError: currentState.validationError,
      hasDiff: currentState.text !== (currentState.dbRecord?.jsonData ?? ""),
    },
    action: {
      setText: handleSetText,
      loadFromDb: handleLoadFromDb,
      paste: handlePaste,
      clear: handleClear,
      reset: handleReset,
    },
  };
}
