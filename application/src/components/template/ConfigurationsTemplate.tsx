

import { ConfigurationBodyOrganism } from "@/components/organisms/configuration/ConfigurationBodyOrganism";
import { NavigationLayoutOrganism } from "@/components/organisms/navigation/NavigationLayoutOrganism";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props }: ConfigurationsTemplateProps) {
  return (
    <></>
    // <NavigationLayoutOrganism props={props.navigationLayout}>
    //   <ConfigurationBodyOrganism props={props.configBody} />
    // </NavigationLayoutOrganism>
  );
}
