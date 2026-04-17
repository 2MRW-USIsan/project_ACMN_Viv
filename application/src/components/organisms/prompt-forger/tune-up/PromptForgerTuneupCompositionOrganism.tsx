import { TuneupCompositionSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { ExpandFrame } from "../../../molecules/ExpandFrame";
import { PromptForgerTuneupFieldOrganism } from "./PromptForgerTuneupFieldOrganism";

interface PromptForgerTuneupCompositionOrganismProps {
  props: TuneupCompositionSection;
}

export function PromptForgerTuneupCompositionOrganism({
  props,
}: PromptForgerTuneupCompositionOrganismProps) {
  return (
    <ExpandFrame props={props.panelInfo}>
      <PromptForgerTuneupFieldOrganism props={props.tunesInfo} />
    </ExpandFrame>
  );
}
