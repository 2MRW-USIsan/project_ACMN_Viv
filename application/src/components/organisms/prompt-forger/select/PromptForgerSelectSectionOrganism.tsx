"use client";

import { PanelFrameAtoms } from "@/components/atoms/layout/PanelFrameAtoms";
import { ForgerSelectSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
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
