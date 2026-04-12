import { Box, Stack } from "@mui/material";
import { DividerAtom } from "../../atoms/display/DividerAtom";
import { LabelAtom, LabelAtomProps } from "../../atoms/display/LabelAtom";
import { ButtonAtom, ButtonAtomProps } from "../../atoms/inputs/ButtonAtom";
import {
  TextFieldAtom,
  TextFieldAtomProps,
} from "../../atoms/inputs/TextFieldAtom";

interface PresetBuilderInformSectionOrganismProps {
  props: {
    infoSectionLabel: LabelAtomProps["props"];
    idLabel: LabelAtomProps["props"];
    idValueLabel: LabelAtomProps["props"];
    titleLabel: LabelAtomProps["props"];
    titleField: TextFieldAtomProps["props"];
    statusLabel: LabelAtomProps["props"];
    statusValueLabel: LabelAtomProps["props"];
    saveButton: ButtonAtomProps["props"];
  };
}
export function PresetBuilderInformSectionOrganism({
  props,
}: PresetBuilderInformSectionOrganismProps) {
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
          <ButtonAtom props={props.saveButton} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.statusLabel} />
          <LabelAtom props={props.statusValueLabel} />
        </Stack>
      </Stack>
    </>
  );
}
