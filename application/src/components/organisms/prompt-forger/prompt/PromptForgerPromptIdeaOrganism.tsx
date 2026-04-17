import { PromptIdeaSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { ExpandFrame } from "../../../molecules/ExpandFrame";
import { PromptForgerPromptFieldOrganism } from "./PromptForgerPromptFieldOrganism";

interface PromptForgerPromptIdeaOrganismProps {
  props: PromptIdeaSection;
}

export function PromptForgerPromptIdeaOrganism({
  props,
}: PromptForgerPromptIdeaOrganismProps) {
  return (
    <ExpandFrame props={props.panelInfo}>
      <PromptForgerPromptFieldOrganism props={props.promptInfo} />
    </ExpandFrame>
  );
}
