import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { ButtonAtomType, TextFieldAtomType } from "@/types/ui";
import { Stack, Box } from "@mui/material";
import { postingClerkTheme } from "@/theme/postingClerk";

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

interface PostingClerkInformSectionOrganismProps {
  props: PostingClerkInformSectionViewModel;
}

export function PostingClerkInformSectionOrganism({
  props,
}: PostingClerkInformSectionOrganismProps) {
  return (
    <>
      <LabelAtom props={{ text: props.infoSectionLabel }} style={postingClerkTheme.sectionLabel} />
      <DividerAtom />

      <Stack spacing={1} pl={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.idLabel }} style={postingClerkTheme.fieldLabel} />
          <LabelAtom props={{ text: props.idValueLabel }} style={postingClerkTheme.fieldLabel} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.titleLabel }} style={postingClerkTheme.fieldLabel} />
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleField} />
          </Box>
          <ButtonAtom props={props.saveButton} style={postingClerkTheme.standardButton} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.statusLabel }} style={postingClerkTheme.fieldLabel} />
          <LabelAtom props={{ text: props.statusValueLabel }} style={postingClerkTheme.fieldLabel} />
        </Stack>
      </Stack>
    </>
  );
}
