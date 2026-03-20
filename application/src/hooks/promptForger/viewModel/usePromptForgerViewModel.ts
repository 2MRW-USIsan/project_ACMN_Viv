"use client";

import { usePromptForgerContext } from "@/hooks/promptForger/state/usePromptForgerContext";
import { usePromptForgerController } from "@/hooks/promptForger/controller/usePromptForgerController";
import {
  usePromptForgerComposer,
  PromptForgerViewModel,
} from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

export type { PromptForgerViewModel };

interface PromptForgerViewModelReturns {
  viewModel: PromptForgerViewModel;
}

export function usePromptForgerViewModel(): PromptForgerViewModelReturns {
  const { contexts } = usePromptForgerContext();

  usePromptForgerController(contexts);
  const { viewModel } = usePromptForgerComposer(contexts);

  return { viewModel };
}
