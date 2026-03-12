"use client";

import type { OrderJsonRecord } from "@/types/viewer/orderJson";
import { useMemo } from "react";

export type ViewerFetchItem = {
  fetchOrderJson: () => Promise<OrderJsonRecord | null>;
};

export type ViewerRequest = {
  registerOrderJson: (jsonData: string) => Promise<OrderJsonRecord>;
  deleteOrderJson: (id: string) => Promise<void>;
};

export type ViewerServiceReturn = {
  fetchItem: ViewerFetchItem;
  request: ViewerRequest;
};

export function useViewerService(): ViewerServiceReturn {
  const fetchItem = useMemo(
    (): ViewerFetchItem => ({
      fetchOrderJson: async () => {
        const res = await fetch("/api/orderJson");
        if (!res.ok) return null;
        return (await res.json()) as OrderJsonRecord | null;
      },
    }),
    [],
  );

  const request = useMemo(
    (): ViewerRequest => ({
      registerOrderJson: async (jsonData) => {
        const res = await fetch("/api/orderJson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jsonData }),
        });
        if (!res.ok) throw new Error(`Failed to register: ${res.status}`);
        return (await res.json()) as OrderJsonRecord;
      },
      deleteOrderJson: async (id) => {
        const res = await fetch(`/api/orderJson/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
      },
    }),
    [],
  );

  return { fetchItem, request };
}
