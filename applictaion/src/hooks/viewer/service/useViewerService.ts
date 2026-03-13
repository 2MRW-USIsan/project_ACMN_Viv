"use client";

import type { OrderJsonRecord } from "@/types/viewer/orderJson";
import {
  deleteOrderJson,
  fetchOrderJson,
  registerOrderJson,
} from "@/services/viewerApiService";
import { useEffect, useMemo, useReducer } from "react";

export type ViewerFetchItem = {
  orderJson: OrderJsonRecord | null;
};

export type ViewerRequest = {
  registerOrderJson: (jsonData: string) => Promise<OrderJsonRecord>;
  deleteOrderJson: (id: string) => Promise<void>;
};

export type ViewerServiceReturn = {
  fetchItem: ViewerFetchItem;
  request: ViewerRequest;
};

type ServiceState = {
  orderJson: OrderJsonRecord | null;
};

type ServiceAction = { type: "SET_ORDER_JSON"; payload: OrderJsonRecord | null };

const initialState: ServiceState = { orderJson: null };

const serviceReducer = (state: ServiceState, action: ServiceAction): ServiceState => {
  const handlers: Record<ServiceAction["type"], () => ServiceState> = {
    SET_ORDER_JSON: () => ({
      ...state,
      orderJson: action.payload,
    }),
  };
  return handlers[action.type]?.() ?? state;
};

export function useViewerService(): ViewerServiceReturn {
  const [state, dispatch] = useReducer(serviceReducer, initialState);

  useEffect(() => {
    void fetchOrderJson().then((record) =>
      dispatch({ type: "SET_ORDER_JSON", payload: record }),
    );
  }, []);

  const request = useMemo(
    (): ViewerRequest => ({
      registerOrderJson,
      deleteOrderJson,
    }),
    [],
  );

  const fetchItem: ViewerFetchItem = { orderJson: state.orderJson };
  return { fetchItem, request };
}
