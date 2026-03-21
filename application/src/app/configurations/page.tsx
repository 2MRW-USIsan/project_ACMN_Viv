"use client";

import { ConfigurationsTemplate } from "@/components/template/ConfigurationsTemplate";
import { useConfigurationsMock } from "@/hooks/configurations/mock/useConfigurationsMock";

export default function ConfigurationsPage() {
  const { viewModel } = useConfigurationsMock();
  return <ConfigurationsTemplate props={viewModel} />;
}
