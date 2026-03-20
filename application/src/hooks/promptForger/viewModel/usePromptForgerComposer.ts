"use client";

import { PromptForgerContexts } from "@/hooks/promptForger/state/usePromptForgerContext";
import { usePromptForgerProperties } from "@/hooks/promptForger/viewModel/usePromptForgerProperties";
import { usePromptForgerHandlers } from "@/hooks/promptForger/viewModel/usePromptForgerHandlers";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PromptForgerViewModel {
  // Stub: add ViewModel fields in subsequent steps
}

export function usePromptForgerComposer(contexts: PromptForgerContexts) {
  usePromptForgerProperties(contexts);
  usePromptForgerHandlers(contexts);

  return {
    viewModel: {} satisfies PromptForgerViewModel,
  };
}
