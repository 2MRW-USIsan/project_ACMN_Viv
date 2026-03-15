"use client";

import { useSampleService } from "@/hooks/sample/state/useSampleService";
import { useSampleStateReducer, SampleContexts } from "@/hooks/sample/state/useSampleStateReducer";

export type { SampleContexts };

export interface SampleContextReturns {
  contexts: SampleContexts;
}

export function useSampleContext(): SampleContextReturns {
  const { fetchItem, request } = useSampleService();
  const { state, action } = useSampleStateReducer();

  const contexts: SampleContexts = {
    service: { fetchItem, request },
    reducer: { state, action },
  };

  return { contexts };
}
