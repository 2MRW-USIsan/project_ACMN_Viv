"use client";

// import { usePromptForgerViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerViewModel";
import { usePromptForgerViewModelMocks } from "@/hooks/promptForger/mocks/usePromptForgerViewModelMocks";
import { PromptForgerTemplate } from "@/components/template/PromptForgerTemplate";

export default function PromptForgerPage() {
  // const { viewModel } = usePromptForgerViewModel();
  const { viewModel } = usePromptForgerViewModelMocks();
  return <PromptForgerTemplate props={viewModel} />;
}
