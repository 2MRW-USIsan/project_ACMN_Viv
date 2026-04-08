import { ForgerOrdersGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Stack } from "@mui/material";
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
    <Stack spacing={2} pt={1}>
      {props.grpPanels.map((grp) => (
        <PromptForgerOrdersItemOrganism key={grp.key} props={grp} />
      ))}
    </Stack>
  );
}
