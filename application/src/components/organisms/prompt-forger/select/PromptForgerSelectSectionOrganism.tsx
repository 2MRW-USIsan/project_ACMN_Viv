import { ForgerSelectSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { PanelFrameAtoms } from "../../../atoms/layout/PanelFrameAtoms";
import { PromptForgerSelectListOrganism } from "./PromptForgerSelectListOrganism";

interface PromptForgerSelectSectionOrganismProps {
  props: ForgerSelectSection;
}

export function PromptForgerSelectSectionOrganism({
  props,
}: PromptForgerSelectSectionOrganismProps) {
  return (
    <PanelFrameAtoms props={props.panelInfo}>
      <PromptForgerSelectListOrganism props={props.listInfo} />
    </PanelFrameAtoms>
  );
}
