"use client";

import { Stack, Toolbar } from "@mui/material";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { TextFieldAtom, TextFieldAtomProps } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom, ButtonAtomProps } from "@/components/atoms/ButtonAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";

export interface PresetBuilderBodyViewModel {
  infoSectionLabel: LabelAtomProps["props"];
  idLabel: LabelAtomProps["props"];
  idValueLabel: LabelAtomProps["props"];
  titleLabel: LabelAtomProps["props"];
  titleField: TextFieldAtomProps["props"];
  statusLabel: LabelAtomProps["props"];
  statusValueLabel: LabelAtomProps["props"];
  saveButton: ButtonAtomProps["props"];
  buildersSectionLabel: LabelAtomProps["props"];
  shuffleButton: ButtonAtomProps["props"];
  copyButton: ButtonAtomProps["props"];
  pasteButton: ButtonAtomProps["props"];
  resetButton: ButtonAtomProps["props"];
  clearButton: ButtonAtomProps["props"];
  presetsTemplateLabel: LabelAtomProps["props"];
  presetsTemplateField: TextFieldAtomProps["props"];
  orderPresetsLabel: LabelAtomProps["props"];
  orderPresetsField: TextFieldAtomProps["props"];
}

interface PresetBuilderBodyOrganismProps {
  props: PresetBuilderBodyViewModel;
}

export function PresetBuilderBodyOrganism({ props }: PresetBuilderBodyOrganismProps) {
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
          <ButtonAtom props={props.saveButton} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.statusLabel} />
          <LabelAtom props={props.statusValueLabel} />
        </Stack>
      </Stack>

      {/* Builders Field */}
      <LabelAtom props={props.buildersSectionLabel} />
      <DividerAtom />

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <ButtonAtom props={props.shuffleButton} />
          <ButtonAtom props={props.copyButton} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <ButtonAtom props={props.pasteButton} />
          <ButtonAtom props={props.resetButton} />
          <ButtonAtom props={props.clearButton} />
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Stack spacing={1} flex={1}>
          <LabelAtom props={props.presetsTemplateLabel} />
          <TextFieldAtom props={props.presetsTemplateField} />
        </Stack>

        <Stack spacing={1} flex={1}>
          <LabelAtom props={props.orderPresetsLabel} />
          <TextFieldAtom props={props.orderPresetsField} />
        </Stack>
      </Stack>
    </GridLayoutAtom>
  );
}
