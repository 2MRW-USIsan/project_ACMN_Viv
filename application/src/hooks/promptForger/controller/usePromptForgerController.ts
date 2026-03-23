"use client";

import { PromptForgerContexts } from "@/hooks/promptForger/state/usePromptForgerContext";
import { usePromptForgerInitialize } from "@/hooks/promptForger/controller/usePromptForgerInitialize";
import { usePromptForgerEffects } from "@/hooks/promptForger/controller/usePromptForgerEffects";

export function usePromptForgerController(
  contexts: PromptForgerContexts,
): void {
  usePromptForgerInitialize(contexts);
  usePromptForgerEffects(contexts);
}
