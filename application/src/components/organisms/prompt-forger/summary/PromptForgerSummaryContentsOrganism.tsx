import {
  PromptIdeaSection,
  TuneupCompositionSection,
} from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Stack } from "@mui/material";
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
    <Stack spacing={1} pl={2} pt={1}>
      <PromptForgerTuneupCompositionOrganism props={props.tuneupComposition} />
      <PromptForgerPromptIdeaOrganism props={props.promptIdea} />
    </Stack>
  );
}
