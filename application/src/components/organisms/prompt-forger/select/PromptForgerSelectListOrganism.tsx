import { ForgerSelectGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Stack } from "@mui/material";
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
    <Stack spacing={2} pt={1}>
      {props.grpPanels.map((grp) => (
        <PromptForgerSelectItemOrganism key={grp.key} props={grp} />
      ))}
    </Stack>
  );
}
