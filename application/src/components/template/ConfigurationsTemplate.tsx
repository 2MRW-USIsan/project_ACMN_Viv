"use client";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { NavigationLayoutOrganism } from "@/components/organisms/navigation/NavigationLayoutOrganism";
import { ConfigurationsContentOrganism } from "@/components/organisms/configurations/ConfigurationsContentOrganism";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props }: ConfigurationsTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigation}>
      <ConfigurationsContentOrganism props={props.configurations} />
    </NavigationLayoutOrganism>
  );
}
