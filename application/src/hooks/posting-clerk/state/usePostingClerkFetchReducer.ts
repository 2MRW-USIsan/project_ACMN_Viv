"use client";

import { useEffect, useReducer } from "react";

export interface PostingClerkFetchState {
  // フェッチ状態は後続工程で追加予定
}

export interface PostingClerkFetchAction {
  // フェッチアクションは後続工程で追加予定
}

export interface PostingClerkFetchReturn {
  state: PostingClerkFetchState;
  action: PostingClerkFetchAction;
}

export function usePostingClerkFetchReducer(): PostingClerkFetchReturn {
  type STATE = PostingClerkFetchState | undefined;
  type ACTION = { type: "INITIALIZE" };

  const initItem: PostingClerkFetchState = {};

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
