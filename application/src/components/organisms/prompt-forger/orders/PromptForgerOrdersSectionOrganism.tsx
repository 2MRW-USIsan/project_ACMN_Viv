import { ForgerOrdersSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { ExpandFrame } from "../../../atoms/layout/ExpandFrame";
import { PromptForgerOrdersListOrganism } from "./PromptForgerOrdersListOrganism";

interface PromptForgerOrdersSectionOrganismProps {
  props: ForgerOrdersSection;
}

export function PromptForgerOrdersSectionOrganism({
  props,
}: PromptForgerOrdersSectionOrganismProps) {
  return (
    <ExpandFrame props={props.panelInfo}>
      <PromptForgerOrdersListOrganism props={props.listInfo} />
    </ExpandFrame>
  );
}
