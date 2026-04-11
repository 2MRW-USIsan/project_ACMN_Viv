"use client";

import { Box, Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { PromptForgerInfoSectionViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

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
