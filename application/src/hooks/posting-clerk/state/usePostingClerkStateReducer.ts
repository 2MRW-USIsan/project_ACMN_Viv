"use client";

import { useReducer, useEffect } from "react";
import {
  PostingClerkFetchItem,
  PostingClerkRequest,
} from "@/hooks/posting-clerk/state/usePostingClerkService";

export interface PostingClerkReducerState {
  // UI状態は後続工程で追加予定
}

export interface PostingClerkReducerAction {
  // アクションは後続工程で追加予定
}

export interface PostingClerkReducerReturn {
  state: PostingClerkReducerState;
  action: PostingClerkReducerAction;
}

export interface PostingClerkContexts {
  service: {
    fetchItem: PostingClerkFetchItem;
    request: PostingClerkRequest;
  };
  reducer: {
    state: PostingClerkReducerState;
    action: PostingClerkReducerAction;
  };
}

export function usePostingClerkStateReducer(): PostingClerkReducerReturn {
  type STATE = PostingClerkReducerState | undefined;
  type ACTION = { type: "INITIALIZE" };

  const initItem: PostingClerkReducerState = {};

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
