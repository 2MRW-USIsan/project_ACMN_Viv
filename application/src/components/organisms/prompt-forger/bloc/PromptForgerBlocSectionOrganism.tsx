

import { ForgerBlocPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { PanelFrameAtoms } from "../../../atoms/layout/PanelFrameAtoms";
import { PromptForgerBlocContentsOrganism } from "./PromptForgerBlocContentsOrganism";

interface PromptForgerBlocSectionOrganismProps {
  props: ForgerBlocPanel;
}

export function PromptForgerBlocSectionOrganism({
  props,
}: PromptForgerBlocSectionOrganismProps) {
  return (
    <PanelFrameAtoms props={props.panelInfo}>
      <PromptForgerBlocContentsOrganism props={props.blocInfo} />
    </PanelFrameAtoms>
  );
}
