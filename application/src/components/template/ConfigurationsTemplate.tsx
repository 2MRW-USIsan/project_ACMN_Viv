"use client";

import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { AppPageOrganism } from "@/components/organisms/AppPageOrganism";
import { YamlPanelListOrganism } from "@/components/organisms/YamlPanelListOrganism";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props }: ConfigurationsTemplateProps) {
  return (
    <AppPageOrganism props={props.appPage}>
      <YamlPanelListOrganism props={props.yamlPanelList} />
    </AppPageOrganism>
  );
}
