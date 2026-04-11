import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { LabelAtomType, ButtonAtomType, TextFieldAtomType } from "@/types/ui";
import { Stack, Box } from "@mui/material";

export interface PostingClerkInformSectionViewModel {
  infoSectionLabel: string;
  idLabel: string;
  idValueLabel: string;
  titleLabel: string;
  titleField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange" | "label">;
  statusLabel: string;
  statusValueLabel: string;
  saveButton: Pick<ButtonAtomType, "label" | "onClick" | "disabled" | "isLoading">;
}

export interface PostingClerkInformSectionStyle {
  infoSectionLabel: NonNullable<LabelAtomType["style"]>;
  idLabel: NonNullable<LabelAtomType["style"]>;
  idValueLabel: NonNullable<LabelAtomType["style"]>;
  titleLabel: NonNullable<LabelAtomType["style"]>;
  statusLabel: NonNullable<LabelAtomType["style"]>;
  statusValueLabel: NonNullable<LabelAtomType["style"]>;
  saveButton: NonNullable<ButtonAtomType["style"]>;
}

interface PostingClerkInformSectionOrganismProps {
  props: PostingClerkInformSectionViewModel;
  style: PostingClerkInformSectionStyle;
}

export function PostingClerkInformSectionOrganism({
  props,
  style,
}: PostingClerkInformSectionOrganismProps) {
  return (
    <>
      <LabelAtom props={{ text: props.infoSectionLabel, style: style.infoSectionLabel }} />
      <DividerAtom />

      <Stack spacing={1} pl={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.idLabel, style: style.idLabel }} />
          <LabelAtom props={{ text: props.idValueLabel, style: style.idValueLabel }} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.titleLabel, style: style.titleLabel }} />
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleField} />
          </Box>
          <ButtonAtom props={{ ...props.saveButton, style: style.saveButton }} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.statusLabel, style: style.statusLabel }} />
          <LabelAtom props={{ text: props.statusValueLabel, style: style.statusValueLabel }} />
        </Stack>
      </Stack>
    </>
  );
}
