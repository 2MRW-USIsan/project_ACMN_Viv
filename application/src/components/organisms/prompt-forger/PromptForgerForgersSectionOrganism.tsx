import { PromptForgerForgersSectionViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Stack } from "@mui/material";
import { DividerAtom } from "../..//atoms/display/DividerAtom";
import { LabelAtom } from "../..//atoms/display/LabelAtom";
import { PromptForgerBlocSectionOrganism } from "../..//organisms/prompt-forger/bloc/PromptForgerBlocSectionOrganism";
import { PromptForgerSummaryBlocOrganism } from "../..//organisms/prompt-forger/summary/PromptForgerSummaryBlocOrganism";

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
