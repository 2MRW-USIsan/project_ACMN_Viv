import { ForgerSelectSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { ExpandFrame } from "../../../molecules/ExpandFrame";
import { PromptForgerSelectListOrganism } from "./PromptForgerSelectListOrganism";

interface PromptForgerSelectSectionOrganismProps {
  props: ForgerSelectSection;
}

export function PromptForgerSelectSectionOrganism({
  props,
}: PromptForgerSelectSectionOrganismProps) {
  return (
    <ExpandFrame props={props.panelInfo}>
      <PromptForgerSelectListOrganism props={props.listInfo} />
    </ExpandFrame>
  );
}
