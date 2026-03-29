"use client";

import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ConfigBodySection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box } from "@mui/material";

interface ConfigurationSelectSectionOrganismProps {
  props: ConfigBodySection;
}

export function ConfigurationSelectSectionOrganism({
  props,
}: ConfigurationSelectSectionOrganismProps) {
  return (
    <Box mt={2}>
      <LabelAtom props={props.titleLabel} />
      <DividerAtom />
      <>TODO: Select Sections Contents</>
    </Box>
  );
}
