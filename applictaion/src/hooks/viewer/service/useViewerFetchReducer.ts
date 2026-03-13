"use client";

import type { OrderJsonRecord } from "@/types/viewer/orderJson";
import { fetchOrderJson } from "@/services/viewerApiService";
import { useEffect, useReducer } from "react";

export type ViewerFetchItem = {
  orderJson: OrderJsonRecord | null;
};

type ViewerFetchState = {
  orderJson: OrderJsonRecord | null;
};

type ViewerFetchAction = {
  type: "SET_ORDER_JSON";
  payload: OrderJsonRecord | null;
};

const initialState: ViewerFetchState = { orderJson: null };

const viewerFetchReducer = (
  state: ViewerFetchState,
  action: ViewerFetchAction,
): ViewerFetchState => {
  const handlers: Record<ViewerFetchAction["type"], () => ViewerFetchState> = {
    SET_ORDER_JSON: () => ({ ...state, orderJson: action.payload }),
  };
  return handlers[action.type]?.() ?? state;
};

export type ViewerFetchReducerReturn = {
  fetchItem: ViewerFetchItem;
};

export function useViewerFetchReducer(): ViewerFetchReducerReturn {
  const [state, dispatch] = useReducer(viewerFetchReducer, initialState);

  useEffect(() => {
    void fetchOrderJson().then((record) =>
      dispatch({ type: "SET_ORDER_JSON", payload: record }),
    );
  }, []);

  return {
    fetchItem: { orderJson: state.orderJson },
  };
}
