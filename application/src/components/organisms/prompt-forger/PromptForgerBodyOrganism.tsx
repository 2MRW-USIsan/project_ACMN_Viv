"use client";

import { Stack, Toolbar } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { PromptForgerBlocSectionOrganism } from "@/components/organisms/prompt-forger/PromptForgerBlocSectionOrganism";
import { PromptForgerSummaryBlocOrganism } from "@/components/organisms/prompt-forger/PromptForgerSummaryBlocOrganism";
import { PromptForgerBodyViewModel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

interface PromptForgerBodyOrganismProps {
  props: PromptForgerBodyViewModel;
}

export function PromptForgerBodyOrganism({ props }: PromptForgerBodyOrganismProps) {
  return (
    <GridLayoutAtom props={{ container: true }}>
      <Toolbar />

      {/* Information Field */}
      <LabelAtom props={props.infoSectionLabel} />
      <DividerAtom />

      <Stack spacing={1} pl={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.idLabel} />
          <LabelAtom props={props.idValueLabel} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.titleLabel} />
          <GridLayoutAtom props={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleField} />
          </GridLayoutAtom>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.statusLabel} />
          <LabelAtom props={props.statusValueLabel} />
          <ButtonAtom props={props.saveButton} />
        </Stack>
      </Stack>

      {/* Forgers Field */}
      <LabelAtom props={props.forgersSectionLabel} />
      <DividerAtom />

      <Stack spacing={2}>
        {props.blocPanels.map((bloc) => (
          <PromptForgerBlocSectionOrganism key={bloc.key} props={bloc} />
        ))}

        <PromptForgerSummaryBlocOrganism props={props.summaryBloc} />
      </Stack>
    </GridLayoutAtom>
  );
}
