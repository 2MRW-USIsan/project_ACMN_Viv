import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ForgerOrdersGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Box, Divider, Stack } from "@mui/material";

interface PromptForgerOrdersItemOrganismProps {
  props: ForgerOrdersGrpPanel;
}

export function PromptForgerOrdersItemOrganism({
  props,
}: PromptForgerOrdersItemOrganismProps) {
  return (
    <Box>
      <LabelAtom props={props.grpLabel} />
      <Divider sx={{ my: 0.5 }} />

      <Stack spacing={0.5} pl={1} pt={0.5}>
        {props.displayLines.map((line, i) => (
          <LabelAtom key={i} props={line} />
        ))}
        <LabelAtom props={props.scriptsLabel} />
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1} pt={1}>
        <LabelAtom props={props.promptLabel} />
        <Box sx={{ flex: 1 }}>
          <TextFieldAtom props={props.promptField} />
        </Box>
        <ButtonAtom props={props.resetButton} />
        <ButtonAtom props={props.clearButton} />
      </Stack>
    </Box>
  );
}
