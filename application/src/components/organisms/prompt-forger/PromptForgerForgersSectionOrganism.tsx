import { PromptForgerForgersSectionViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { AlignLayout } from "../../atoms/layout/AlignLayout";
import { SectionLabel } from "../../molecules/SectionLabel";
import { PromptForgerBlocSectionOrganism } from "../../organisms/prompt-forger/bloc/PromptForgerBlocSectionOrganism";
import { PromptForgerSummaryBlocOrganism } from "../../organisms/prompt-forger/summary/PromptForgerSummaryBlocOrganism";

interface PromptForgerForgersSectionOrganismProps {
  props: PromptForgerForgersSectionViewModel;
}

export function PromptForgerForgersSectionOrganism({
  props,
}: PromptForgerForgersSectionOrganismProps) {
  return (
    <AlignLayout column={0.5}>
      <SectionLabel props={props.forgersSectionLabel} />
      <AlignLayout column={0.1}>
        {props.blocPanels.map((bloc) => (
          <PromptForgerBlocSectionOrganism key={bloc.key} props={bloc} />
        ))}
        <PromptForgerSummaryBlocOrganism props={props.summaryBloc} />
      </AlignLayout>
    </AlignLayout>
  );
}
