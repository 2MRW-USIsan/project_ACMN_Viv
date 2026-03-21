"use client";

import { usePromptForgerViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerViewModel";
import { PromptForgerTemplate } from "@/components/template/PromptForgerTemplate";

export default function PromptForgerPage() {
  const { viewModel } = usePromptForgerViewModel();
  return <PromptForgerTemplate props={viewModel} />;
}
