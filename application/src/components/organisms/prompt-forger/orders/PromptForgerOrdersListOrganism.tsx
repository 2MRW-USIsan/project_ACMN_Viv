import { ForgerOrdersGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { PromptForgerOrdersItemOrganism } from "./PromptForgerOrdersItemOrganism";

interface PromptForgerOrdersListOrganismProps {
  props: {
    grpPanels: ForgerOrdersGrpPanel[];
  };
}

export function PromptForgerOrdersListOrganism({
  props,
}: PromptForgerOrdersListOrganismProps) {
  return (
    <AlignLayout column={1}>
      {props.grpPanels.map((grp) => (
        <PromptForgerOrdersItemOrganism key={grp.key} props={grp} />
      ))}
    </AlignLayout>
  );
}
