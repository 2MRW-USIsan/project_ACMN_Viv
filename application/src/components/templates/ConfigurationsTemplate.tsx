"use client";

import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { NavigationLayoutOrganism } from "@/components/organisms/NavigationLayoutOrganism";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props }: ConfigurationsTemplateProps) {
  return (
    <NavigationLayoutOrganism props={{ configurations: props.navigation.configurations }}>
      {null}
    </NavigationLayoutOrganism>
  );
}
