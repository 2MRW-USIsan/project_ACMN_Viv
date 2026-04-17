import { ForgerSwitchSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { ExpandFrame } from "../../../molecules/ExpandFrame";
import { PromptForgerSwitchListOrganism } from "./PromptForgerSwitchListOrganism";

interface PromptForgerSwitchSectionOrganismProps {
  props: ForgerSwitchSection;
}

export function PromptForgerSwitchSectionOrganism({
  props,
}: PromptForgerSwitchSectionOrganismProps) {
  return (
    <ExpandFrame props={props.panelInfo}>
      <PromptForgerSwitchListOrganism props={props.listInfo} />
    </ExpandFrame>
  );
}
