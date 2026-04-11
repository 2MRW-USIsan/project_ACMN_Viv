import {
  ButtonAtomProps,
  ButtonAtom,
} from "@/components/atoms/inputs/ButtonAtom";
import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import {
  LabelAtomProps,
  LabelAtom,
} from "@/components/atoms/display/LabelAtom";
import {
  TextFieldAtomProps,
  TextFieldAtom,
} from "@/components/atoms/inputs/TextFieldAtom";
import { Stack, Box } from "@mui/material";

interface PostingClerkInformSectionOrganismProps {
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
export function PostingClerkInformSectionOrganism({
  props,
}: PostingClerkInformSectionOrganismProps) {
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
