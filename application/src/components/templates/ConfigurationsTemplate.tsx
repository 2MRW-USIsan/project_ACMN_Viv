"use client";

import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { ConfigurationsContentOrganism } from "@/components/organisms/ConfigurationsContentOrganism";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props }: ConfigurationsTemplateProps) {
  return <ConfigurationsContentOrganism props={props} />;
}
