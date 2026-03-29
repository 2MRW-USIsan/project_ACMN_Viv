"use client";

import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ConfigBodySection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box } from "@mui/material";

interface ConfigurationOrdersSectionOrganismProps {
  props: ConfigBodySection;
}

export function ConfigurationOrdersSectionOrganism({
  props,
}: ConfigurationOrdersSectionOrganismProps) {
  return (
    <Box mt={2}>
      <LabelAtom props={props.titleLabel} />
      <DividerAtom />
      <>TODO: Orders Sections Contents</>
    </Box>
  );
}
