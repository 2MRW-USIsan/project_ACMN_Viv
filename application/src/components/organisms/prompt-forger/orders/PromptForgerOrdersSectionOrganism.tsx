import { ForgerOrdersSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { PanelFrameAtoms } from "../../../atoms/layout/PanelFrameAtoms";
import { PromptForgerOrdersListOrganism } from "./PromptForgerOrdersListOrganism";

interface PromptForgerOrdersSectionOrganismProps {
  props: ForgerOrdersSection;
}

export function PromptForgerOrdersSectionOrganism({
  props,
}: PromptForgerOrdersSectionOrganismProps) {
  return (
    <PanelFrameAtoms props={props.panelInfo}>
      <PromptForgerOrdersListOrganism props={props.listInfo} />
    </PanelFrameAtoms>
  );
}
