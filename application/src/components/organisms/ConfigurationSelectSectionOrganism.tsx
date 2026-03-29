"use client";

import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { SectionPlaceholderMolecule } from "@/components/molecules/SectionPlaceholderMolecule";
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
      <SectionPlaceholderMolecule props={{ placeholderLabel: props.placeholderLabel }} />
    </Box>
  );
}
