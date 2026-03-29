"use client";

import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ConfigBodySection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box } from "@mui/material";

interface ConfigurationSwitchSectionOrganismProps {
  props: ConfigBodySection;
}

export function ConfigurationSwitchSectionOrganism({
  props,
}: ConfigurationSwitchSectionOrganismProps) {
  return (
    <Box mt={2}>
      <LabelAtom props={props.titleLabel} />
      <DividerAtom />
      <>TODO: Switch Sections Contents</>
    </Box>
  );
}
