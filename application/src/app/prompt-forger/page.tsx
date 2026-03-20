"use client";

import { usePromptForgerViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerViewModel";
import { PromptForgerTemplate } from "@/components/templates/PromptForgerTemplate";

export default function PromptForgerPage() {
  const { viewModel } = usePromptForgerViewModel();
  return <PromptForgerTemplate props={viewModel} />;
}
