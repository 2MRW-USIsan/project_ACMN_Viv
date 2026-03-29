"use client";

import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { NavigationLayoutOrganism } from "@/components/organisms/NavigationLayoutOrganism";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props: _props }: ConfigurationsTemplateProps) {
  return <NavigationLayoutOrganism>{null}</NavigationLayoutOrganism>;
}
