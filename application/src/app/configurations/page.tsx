"use client";

// import { useConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsViewModel";
import { useConfigurationsViewModelMocks } from "@/hooks/configurations/mocks/useConfigurationsViewModelMocks";
import { ConfigurationsTemplate } from "@/components/templates/ConfigurationsTemplate";

export default function ConfigurationsPage() {
  // const { viewModel } = useConfigurationsViewModel();
  const { viewModel } = useConfigurationsViewModelMocks();
  return <ConfigurationsTemplate props={viewModel} />;
}
