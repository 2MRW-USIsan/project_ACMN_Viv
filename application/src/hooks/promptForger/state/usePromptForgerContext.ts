"use client";

import { usePromptForgerService } from "@/hooks/promptForger/state/usePromptForgerService";
import { usePromptForgerStateReducer, PromptForgerContexts } from "@/hooks/promptForger/state/usePromptForgerStateReducer";

export type { PromptForgerContexts };

export interface PromptForgerContextReturns {
  contexts: PromptForgerContexts;
}

export function usePromptForgerContext(): PromptForgerContextReturns {
  const { fetchItem, request } = usePromptForgerService();
  const { state, action } = usePromptForgerStateReducer();

  const contexts: PromptForgerContexts = {
    service: { fetchItem, request },
    reducer: { state, action },
  };

  return { contexts };
}
