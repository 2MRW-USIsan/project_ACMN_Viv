"use client";

import { NavigationLayoutOrganism } from "@/components/organisms/NavigationLayoutOrganism";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props }: ConfigurationsTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigationLayout}>
      <>TODO: ConfigurationBodyOrganism</>
    </NavigationLayoutOrganism>
  );
}
