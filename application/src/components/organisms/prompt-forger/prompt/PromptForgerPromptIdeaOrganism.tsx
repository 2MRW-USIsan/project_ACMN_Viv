import { PromptIdeaSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { PanelFrameAtoms } from "../../../atoms/layout/PanelFrameAtoms";
import { PromptForgerPromptFieldOrganism } from "./PromptForgerPromptFieldOrganism";

interface PromptForgerPromptIdeaOrganismProps {
  props: PromptIdeaSection;
}

export function PromptForgerPromptIdeaOrganism({
  props,
}: PromptForgerPromptIdeaOrganismProps) {
  return (
    <PanelFrameAtoms props={props.panelInfo}>
      <PromptForgerPromptFieldOrganism props={props.promptInfo} />
    </PanelFrameAtoms>
  );
}
