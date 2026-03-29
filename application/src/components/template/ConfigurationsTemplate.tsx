"use client";

import { Toolbar } from "@mui/material";
import { NavigationLayoutOrganism } from "@/components/organisms/NavigationLayoutOrganism";
import { ConfigurationBodyOrganism } from "@/components/organisms/ConfigurationBodyOrganism";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props }: ConfigurationsTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigationLayout}>
      <Toolbar />
      <ConfigurationBodyOrganism props={props.configBody} />
    </NavigationLayoutOrganism>
  );
}
