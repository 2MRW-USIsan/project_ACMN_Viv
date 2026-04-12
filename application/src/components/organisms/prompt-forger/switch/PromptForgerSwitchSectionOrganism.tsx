import { ForgerSwitchSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { PanelFrameAtoms } from "../../../atoms/layout/PanelFrameAtoms";
import { PromptForgerSwitchListOrganism } from "./PromptForgerSwitchListOrganism";

interface PromptForgerSwitchSectionOrganismProps {
  props: ForgerSwitchSection;
}

export function PromptForgerSwitchSectionOrganism({
  props,
}: PromptForgerSwitchSectionOrganismProps) {
  return (
    <PanelFrameAtoms props={props.panelInfo}>
      <PromptForgerSwitchListOrganism props={props.listInfo} />
    </PanelFrameAtoms>
  );
}
