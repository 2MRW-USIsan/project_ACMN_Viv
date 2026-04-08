"use client";

import { Stack, Toolbar } from "@mui/material";
import { PromptForgerInfoSectionOrganism } from "./PromptForgerInfoSectionOrganism";
import { PromptForgerForgersSectionOrganism } from "./PromptForgerForgersSectionOrganism";
import { PromptForgerBodyViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

interface PromptForgerBodyOrganismProps {
  props: PromptForgerBodyViewModel;
}

export function PromptForgerBodyOrganism({
  props,
}: PromptForgerBodyOrganismProps) {
  return (
    <Stack spacing={2} p={3} maxWidth={960} mx="auto">
      <Toolbar />
      <PromptForgerInfoSectionOrganism props={props.infoSection} />
      <PromptForgerForgersSectionOrganism props={props.forgersSection} />
    </Stack>
  );
}
