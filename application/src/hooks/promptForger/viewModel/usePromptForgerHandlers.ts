"use client";

import { PromptForgerContexts } from "@/hooks/promptForger/state/usePromptForgerContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PromptForgerHandlers {
  // Stub: add UI handlers in subsequent steps
}

export function usePromptForgerHandlers(_contexts: PromptForgerContexts) {
  const handlers: PromptForgerHandlers = {};

  return { handlers };
}
