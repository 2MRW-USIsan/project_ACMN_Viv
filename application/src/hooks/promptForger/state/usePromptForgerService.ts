"use client";

import { usePromptForgerFetchReducer } from "@/hooks/promptForger/state/usePromptForgerFetchReducer";

export interface PromptForgerFetchItem {
  dummy: null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PromptForgerRequest {
  // Stub: add request handlers in subsequent steps
}

export interface PromptForgerServiceReturns {
  fetchItem: PromptForgerFetchItem;
  request: PromptForgerRequest;
}

export function usePromptForgerService(): PromptForgerServiceReturns {
  const { state: fetchState } = usePromptForgerFetchReducer();

  return {
    fetchItem: { dummy: fetchState.dummy },
    request: {},
  };
}
