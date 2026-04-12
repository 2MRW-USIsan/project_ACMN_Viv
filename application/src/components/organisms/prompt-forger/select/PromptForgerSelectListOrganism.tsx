import { ForgerSelectGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { PromptForgerSelectItemOrganism } from "./PromptForgerSelectItemOrganism";

interface PromptForgerSelectListOrganismProps {
  props: {
    grpPanels: ForgerSelectGrpPanel[];
  };
}

export function PromptForgerSelectListOrganism({
  props,
}: PromptForgerSelectListOrganismProps) {
  return (
    <AlignLayout column={2}>
      {props.grpPanels.map((grp) => (
        <PromptForgerSelectItemOrganism key={grp.key} props={grp} />
      ))}
    </AlignLayout>
  );
}
