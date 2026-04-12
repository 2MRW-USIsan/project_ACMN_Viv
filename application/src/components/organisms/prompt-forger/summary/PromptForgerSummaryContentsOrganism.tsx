import {
  PromptIdeaSection,
  TuneupCompositionSection,
} from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { PromptForgerPromptIdeaOrganism } from "../prompt/PromptForgerPromptIdeaOrganism";
import { PromptForgerTuneupCompositionOrganism } from "../tune-up/PromptForgerTuneupCompositionOrganism";

interface PromptForgerSummaryContentsOrganismProps {
  props: {
    tuneupComposition: TuneupCompositionSection;
    promptIdea: PromptIdeaSection;
  };
}

export function PromptForgerSummaryContentsOrganism({
  props,
}: PromptForgerSummaryContentsOrganismProps) {
  return (
    <AlignLayout column={1}>
      <PromptForgerTuneupCompositionOrganism props={props.tuneupComposition} />
      <PromptForgerPromptIdeaOrganism props={props.promptIdea} />
    </AlignLayout>
  );
}
