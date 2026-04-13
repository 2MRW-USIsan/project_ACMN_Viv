import { ForgerSwitchGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { PromptForgerSwitchItemOrganism } from "./PromptForgerSwitchItemOrganism";

interface PromptForgerSwitchListOrganismProps {
  props: {
    grpPanels: ForgerSwitchGrpPanel[];
  };
}

export function PromptForgerSwitchListOrganism({
  props,
}: PromptForgerSwitchListOrganismProps) {
  return (
    <AlignLayout column={1}>
      {props.grpPanels.map((grp) => (
        <PromptForgerSwitchItemOrganism key={grp.key} props={grp} />
      ))}
    </AlignLayout>
  );
}
