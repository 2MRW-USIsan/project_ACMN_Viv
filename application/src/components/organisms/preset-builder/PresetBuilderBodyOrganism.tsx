"use client";

import { ButtonAtomProps } from "@/components/atoms/inputs/ButtonAtom";
import { LabelAtomProps } from "@/components/atoms/display/LabelAtom";
import { TextFieldAtomProps } from "@/components/atoms/inputs/TextFieldAtom";
import { TextAreaAtomProps } from "@/components/atoms/inputs/TextAreaAtom";
import { Stack, Toolbar } from "@mui/material";
import { PresetBuilderBuildersSectionOrganism } from "./PresetBuilderBuildersSectionOrganism";
import { PresetBuilderInformSectionOrganism } from "./PresetBuilderInformSectionOrganism";

export interface PresetBuilderBodyViewModel {
  informProps: {
    infoSectionLabel: LabelAtomProps["props"];
    idLabel: LabelAtomProps["props"];
    idValueLabel: LabelAtomProps["props"];
    titleLabel: LabelAtomProps["props"];
    titleField: TextFieldAtomProps["props"];
    statusLabel: LabelAtomProps["props"];
    statusValueLabel: LabelAtomProps["props"];
    saveButton: ButtonAtomProps["props"];
  };
  builderProps: {
    buildersSectionLabel: LabelAtomProps["props"];
    shuffleButton: ButtonAtomProps["props"];
    copyButton: ButtonAtomProps["props"];
    pasteButton: ButtonAtomProps["props"];
    resetButton: ButtonAtomProps["props"];
    clearButton: ButtonAtomProps["props"];
    presetsTemplateLabel: LabelAtomProps["props"];
    presetsTemplateField: TextAreaAtomProps["props"];
    orderPresetsLabel: LabelAtomProps["props"];
    orderPresetsField: TextAreaAtomProps["props"];
  };
}

interface PresetBuilderBodyOrganismProps {
  props: PresetBuilderBodyViewModel;
}

export function PresetBuilderBodyOrganism({
  props,
}: PresetBuilderBodyOrganismProps) {
  return (
    <Stack spacing={2} p={3} maxWidth={960} mx="auto">
      <Toolbar />
      <PresetBuilderInformSectionOrganism props={props.informProps} />
      <PresetBuilderBuildersSectionOrganism props={props.builderProps} />
    </Stack>
  );
}
