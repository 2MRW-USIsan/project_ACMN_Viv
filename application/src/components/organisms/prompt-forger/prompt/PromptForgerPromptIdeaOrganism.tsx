"use client";

import { PanelFrameAtoms } from "@/components/atoms/layout/PanelFrameAtoms";
import { PromptIdeaSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
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
