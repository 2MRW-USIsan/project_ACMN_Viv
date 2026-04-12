import {
  ForgerOrdersSection,
  ForgerSelectSection,
  ForgerSwitchSection,
} from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
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
    <AlignLayout column={1}>
      {props.ordersSection && (
        <PromptForgerOrdersSectionOrganism props={props.ordersSection} />
      )}
      {props.switchSection && (
        <PromptForgerSwitchSectionOrganism props={props.switchSection} />
      )}
      {props.selectSection && (
        <PromptForgerSelectSectionOrganism props={props.selectSection} />
      )}
    </AlignLayout>
  );
}
