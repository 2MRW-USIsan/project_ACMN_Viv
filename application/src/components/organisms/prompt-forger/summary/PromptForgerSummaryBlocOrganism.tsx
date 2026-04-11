

import { PanelFrameAtoms } from "@/components/atoms/layout/PanelFrameAtoms";
import { SummaryBlocPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { PromptForgerSummaryContentsOrganism } from "./PromptForgerSummaryContentsOrganism";

interface PromptForgerSummaryBlocOrganismProps {
  props: SummaryBlocPanel;
}

export function PromptForgerSummaryBlocOrganism({
  props,
}: PromptForgerSummaryBlocOrganismProps) {
  return (
    <PanelFrameAtoms props={props.panelInfo}>
      <PromptForgerSummaryContentsOrganism props={props.summaryInfo} />
    </PanelFrameAtoms>
  );
}
