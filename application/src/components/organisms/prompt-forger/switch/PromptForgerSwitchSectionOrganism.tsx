

import { PanelFrameAtoms } from "@/components/atoms/layout/PanelFrameAtoms";
import {
  ForgerSwitchGrpPanel,
  ForgerSwitchSection,
} from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Stack } from "@mui/material";
import { PromptForgerSwitchItemOrganism } from "./PromptForgerSwitchItemOrganism";
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
