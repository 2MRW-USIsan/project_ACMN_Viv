import { SummaryBlocPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { ExpandFrame } from "../../../atoms/layout/ExpandFrame";
import { PromptForgerSummaryContentsOrganism } from "./PromptForgerSummaryContentsOrganism";

interface PromptForgerSummaryBlocOrganismProps {
  props: SummaryBlocPanel;
}

export function PromptForgerSummaryBlocOrganism({
  props,
}: PromptForgerSummaryBlocOrganismProps) {
  return (
    <ExpandFrame props={props.panelInfo}>
      <PromptForgerSummaryContentsOrganism props={props.summaryInfo} />
    </ExpandFrame>
  );
}
