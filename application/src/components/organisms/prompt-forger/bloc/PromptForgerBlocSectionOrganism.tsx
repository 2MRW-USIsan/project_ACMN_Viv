import { ForgerBlocPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { ExpandFrame } from "../../../atoms/layout/ExpandFrame";
import { PromptForgerBlocContentsOrganism } from "./PromptForgerBlocContentsOrganism";

interface PromptForgerBlocSectionOrganismProps {
  props: ForgerBlocPanel;
}

export function PromptForgerBlocSectionOrganism({
  props,
}: PromptForgerBlocSectionOrganismProps) {
  return (
    <ExpandFrame props={props.panelInfo}>
      <PromptForgerBlocContentsOrganism props={props.blocInfo} />
    </ExpandFrame>
  );
}
