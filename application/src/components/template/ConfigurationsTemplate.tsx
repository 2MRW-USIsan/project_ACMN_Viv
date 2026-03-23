"use client";
import { Box } from "@mui/material";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { NavigationLayoutOrganism } from "@/components/organisms/navigation/NavigationLayoutOrganism";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props }: ConfigurationsTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigation}>
      <Box sx={{ flex: 1, height: "100%", bgcolor: "grey.500" }} />
    </NavigationLayoutOrganism>
  );
}
