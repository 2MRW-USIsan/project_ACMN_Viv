import { ForgerSwitchGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Stack } from "@mui/material";
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
    <Stack spacing={2} pt={1}>
      {props.grpPanels.map((grp) => (
        <PromptForgerSwitchItemOrganism key={grp.key} props={grp} />
      ))}
    </Stack>
  );
}
