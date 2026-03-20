"use client";

import { useConfigurationsMock } from "@/hooks/configurations/mock/useConfigurationsMock";
import { ConfigurationsTemplate } from "@/components/templates/ConfigurationsTemplate";

export default function ConfigurationsPage() {
  const { viewModel } = useConfigurationsMock();
  return <ConfigurationsTemplate props={viewModel} />;
}
