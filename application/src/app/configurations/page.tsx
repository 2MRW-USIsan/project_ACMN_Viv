"use client";

import { useConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsViewModel";
import { ConfigurationsTemplate } from "@/components/templates/ConfigurationsTemplate";

export default function ConfigurationsPage() {
  const { viewModel } = useConfigurationsViewModel();
  return <ConfigurationsTemplate props={viewModel} />;
}
