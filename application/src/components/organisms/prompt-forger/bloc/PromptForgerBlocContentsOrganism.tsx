import {
  ForgerOrdersSection,
  ForgerSelectSection,
  ForgerSwitchSection,
} from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Stack } from "@mui/material";
import { PromptForgerOrdersSectionOrganism } from "../orders/PromptForgerOrdersSectionOrganism";
import { PromptForgerSelectSectionOrganism } from "../select/PromptForgerSelectSectionOrganism";
import { PromptForgerSwitchSectionOrganism } from "../switch/PromptForgerSwitchSectionOrganism";

interface PromptForgerBlocContentsOrganismProps {
  props: {
    ordersSection: ForgerOrdersSection | null;
    switchSection: ForgerSwitchSection | null;
    selectSection: ForgerSelectSection | null;
  };
}

export function PromptForgerBlocContentsOrganism({
  props,
}: PromptForgerBlocContentsOrganismProps) {
  return (
    <Stack spacing={1} pl={2} pt={1}>
      {props.ordersSection && (
        <PromptForgerOrdersSectionOrganism props={props.ordersSection} />
      )}
      {props.switchSection && (
        <PromptForgerSwitchSectionOrganism props={props.switchSection} />
      )}
      {props.selectSection && (
        <PromptForgerSelectSectionOrganism props={props.selectSection} />
      )}
    </Stack>
  );
}
