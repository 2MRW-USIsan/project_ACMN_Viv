"use client";

import { ConfigurationBodyOrganism } from "@/components/organisms/ConfigurationBodyOrganism";
import { NavigationLayoutOrganism } from "@/components/organisms/NavigationLayoutOrganism";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props }: ConfigurationsTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigationLayout}>
      <ConfigurationBodyOrganism props={props.configBody} />
    </NavigationLayoutOrganism>
  );
}
