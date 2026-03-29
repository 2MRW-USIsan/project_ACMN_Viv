"use client";

import { Stack } from "@mui/material";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";
import { TextFieldAtom, TextFieldAtomProps } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom, ButtonAtomProps } from "@/components/atoms/ButtonAtom";

interface SampleEditorOrganismProps {
  props: {
    titleLabel: LabelAtomProps["props"];
    titleField: TextFieldAtomProps["props"];
    descriptionField: TextFieldAtomProps["props"];
    saveButton: ButtonAtomProps["props"];
    cancelButton?: ButtonAtomProps["props"];
  };
}

export function SampleEditorOrganism({ props }: SampleEditorOrganismProps) {
  return (
    <Stack spacing={2}>
      <LabelAtom props={props.titleLabel} />
      <TextFieldAtom props={props.titleField} />
      <TextFieldAtom props={props.descriptionField} />
      <Stack direction="row" spacing={1}>
        <ButtonAtom props={props.saveButton} />
        {props.cancelButton && <ButtonAtom props={props.cancelButton} />}
      </Stack>
    </Stack>
  );
}
