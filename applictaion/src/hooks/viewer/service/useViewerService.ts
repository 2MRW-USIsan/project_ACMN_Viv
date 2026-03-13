"use client";

import type { OrderJsonRecord } from "@/types/viewer/orderJson";
import {
  deleteOrderJson,
  registerOrderJson,
} from "@/services/viewerApiService";
import type { ViewerFetchItem } from "./useViewerFetchReducer";
import { useViewerFetchReducer } from "./useViewerFetchReducer";
import { useMemo } from "react";

export type { ViewerFetchItem };

export type ViewerRequest = {
  registerOrderJson: (jsonData: string) => Promise<OrderJsonRecord>;
  deleteOrderJson: (id: string) => Promise<void>;
};

export type ViewerServiceReturn = {
  fetchItem: ViewerFetchItem;
  request: ViewerRequest;
};

export function useViewerService(): ViewerServiceReturn {
  const { fetchItem } = useViewerFetchReducer();

  const request = useMemo(
    (): ViewerRequest => ({
      registerOrderJson,
      deleteOrderJson,
    }),
    [],
  );

  return { fetchItem, request };
}
