import { TuneupCompositionSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { PanelFrameAtoms } from "../../../atoms/layout/PanelFrameAtoms";
import { PromptForgerTuneupFieldOrganism } from "./PromptForgerTuneupFieldOrganism";

interface PromptForgerTuneupCompositionOrganismProps {
  props: TuneupCompositionSection;
}

export function PromptForgerTuneupCompositionOrganism({
  props,
}: PromptForgerTuneupCompositionOrganismProps) {
  return (
    <PanelFrameAtoms props={props.panelInfo}>
      <PromptForgerTuneupFieldOrganism props={props.tunesInfo} />
    </PanelFrameAtoms>
  );
}
