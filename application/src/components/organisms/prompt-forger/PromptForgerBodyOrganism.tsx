import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { BodyFrame } from "@/components/atoms/layout/BodyFrame";
import { PromptForgerBodyViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { PromptForgerForgersSectionOrganism } from "./PromptForgerForgersSectionOrganism";
import { PromptForgerInfoSectionOrganism } from "./PromptForgerInfoSectionOrganism";

interface PromptForgerBodyOrganismProps {
  props: PromptForgerBodyViewModel;
}

export function PromptForgerBodyOrganism({
  props,
}: PromptForgerBodyOrganismProps) {
  return (
    <BodyFrame>
      <AlignLayout column={1}>
        <PromptForgerInfoSectionOrganism props={props.infoSection} />
        <PromptForgerForgersSectionOrganism props={props.forgersSection} />
      </AlignLayout>
    </BodyFrame>
  );
}
