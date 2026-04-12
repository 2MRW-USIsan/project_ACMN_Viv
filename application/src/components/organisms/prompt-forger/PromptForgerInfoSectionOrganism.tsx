import { PromptForgerInfoSectionViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Box, Stack } from "@mui/material";
import { DividerAtom } from "../../atoms/display/DividerAtom";
import { LabelAtom } from "../../atoms/display/LabelAtom";
import { ButtonAtom } from "../../atoms/inputs/ButtonAtom";
import { TextFieldAtom } from "../../atoms/inputs/TextFieldAtom";

interface PromptForgerInfoSectionOrganismProps {
  props: PromptForgerInfoSectionViewModel;
}

export function PromptForgerInfoSectionOrganism({
  props,
}: PromptForgerInfoSectionOrganismProps) {
  return (
    <>
      <LabelAtom props={props.infoSectionLabel} />
      <DividerAtom />

      <Stack spacing={1} pl={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.idLabel} />
          <LabelAtom props={props.idValueLabel} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.titleLabel} />
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleField} />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.statusLabel} />
          <LabelAtom props={props.statusValueLabel} />
          <ButtonAtom props={props.saveButton} />
        </Stack>
      </Stack>
    </>
  );
}
