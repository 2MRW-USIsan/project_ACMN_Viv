"use client";

import { PromptForgerContexts } from "@/hooks/promptForger/state/usePromptForgerContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PromptForgerProperties {
  // Stub: add display properties in subsequent steps
}

export function usePromptForgerProperties(_contexts: PromptForgerContexts) {
  const properties: PromptForgerProperties = {};

  return { properties };
}
