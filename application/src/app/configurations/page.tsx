"use client";

import { ConfigurationsTemplate } from "@/components/templates/ConfigurationsTemplate";
import { useConfigurationsMock } from "@/hooks/configurations/mock/useConfigurationsMock";

export default function ConfigurationsPage() {
  const { viewModel } = useConfigurationsMock();
  const { viewModel: viewModelMock } = useConfigurationsMock();
  return <ConfigurationsTemplate props={viewModelMock} />;
}
