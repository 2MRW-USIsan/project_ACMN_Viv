"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { PromptForgerBlocSectionOrganism } from "@/components/organisms/prompt-forger/bloc/PromptForgerBlocSectionOrganism";
import { PromptForgerSummaryBlocOrganism } from "@/components/organisms/prompt-forger/summary/PromptForgerSummaryBlocOrganism";
import { PromptForgerForgersSectionViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

interface PromptForgerForgersSectionOrganismProps {
  props: PromptForgerForgersSectionViewModel;
}

export function PromptForgerForgersSectionOrganism({
  props,
}: PromptForgerForgersSectionOrganismProps) {
  return (
    <>
      <LabelAtom props={props.forgersSectionLabel} />
      <DividerAtom />

      <Stack spacing={2}>
        {props.blocPanels.map((bloc) => (
          <PromptForgerBlocSectionOrganism key={bloc.key} props={bloc} />
        ))}

        <PromptForgerSummaryBlocOrganism props={props.summaryBloc} />
      </Stack>
    </>
  );
}
