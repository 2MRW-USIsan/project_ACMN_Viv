import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { IconButtonAtom } from "@/components/atoms/inputs/IconButtonAtom";
import { TextAreaAtom } from "@/components/atoms/inputs/TextAreaAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { postingClerkTheme } from "@/theme/postingClerk";
import {
  ButtonAtomType,
  IconButtonAtomType,
  LabelAtomType,
  TextAreaAtomType,
  TextFieldAtomType,
} from "@/types/ui";
import { Box, Collapse, Stack } from "@mui/material";

export type UrlItem = {
  key: string;
  nameLabel: LabelAtomType;
  nameField: TextFieldAtomType;
  urlLabel: LabelAtomType;
  urlField: TextFieldAtomType;
  removeButton: IconButtonAtomType;
};
export type PreviewItemType = {
  toggleButton: IconButtonAtomType;
  isExpanded: boolean | undefined;
  titleLabel: LabelAtomType;
  titleCopyButton: ButtonAtomType;
  descLabel: LabelAtomType;
  descCopyButton: ButtonAtomType;
  urlsLabel: LabelAtomType;
  urlsAddButton: ButtonAtomType;
  urlItems: UrlItem[];
  previewLabel: LabelAtomType;
  previewField: TextAreaAtomType;
  key: string;
  sectionLabel: LabelAtomType;
};
export type PreviewFieldType = {
  postingPreviewLabel: LabelAtomType;
  platformPreviews: PreviewItemType[];
};
interface PreviewFieldProps {
  props: PreviewFieldType;
}
export function PreviewField({ props }: PreviewFieldProps) {
  return (
    <>
      {/* Posting Preview */}
      <LabelAtom
        props={props.postingPreviewLabel}
        style={postingClerkTheme.sectionLabel}
      />
      {props.platformPreviews.map((platform) => (
        <Box
          key={platform.key}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            p: 2,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <LabelAtom
              props={platform.sectionLabel}
              style={postingClerkTheme.sectionLabel}
            />
            <IconButtonAtom
              props={platform.toggleButton}
              style={postingClerkTheme.smallIconButton}
            />
          </Stack>

          <Collapse in={platform.isExpanded} timeout="auto" unmountOnExit>
            <Stack spacing={1} pt={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom
                  props={platform.titleLabel}
                  style={postingClerkTheme.fieldLabel}
                />
                <ButtonAtom
                  props={platform.titleCopyButton}
                  style={postingClerkTheme.standardButton}
                />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom
                  props={platform.descLabel}
                  style={postingClerkTheme.fieldLabel}
                />
                <ButtonAtom
                  props={platform.descCopyButton}
                  style={postingClerkTheme.standardButton}
                />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom
                  props={platform.urlsLabel}
                  style={postingClerkTheme.fieldLabel}
                />
                <ButtonAtom
                  props={platform.urlsAddButton}
                  style={postingClerkTheme.standardButton}
                />
              </Stack>

              <Stack spacing={0.5} pl={2}>
                {platform.urlItems.map((urlItem) => (
                  <Stack
                    key={urlItem.key}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <LabelAtom
                      props={urlItem.nameLabel}
                      style={postingClerkTheme.fieldLabel}
                    />
                    <Box sx={{ width: 140 }}>
                      <TextFieldAtom props={urlItem.nameField} />
                    </Box>
                    <LabelAtom
                      props={urlItem.urlLabel}
                      style={postingClerkTheme.fieldLabel}
                    />
                    <Box sx={{ flex: 1 }}>
                      <TextFieldAtom props={urlItem.urlField} />
                    </Box>
                    <IconButtonAtom
                      props={urlItem.removeButton}
                      style={postingClerkTheme.smallIconButton}
                    />
                  </Stack>
                ))}
              </Stack>

              <LabelAtom
                props={platform.previewLabel}
                style={postingClerkTheme.fieldLabel}
              />
              <TextAreaAtom
                props={{
                  ...platform.previewField,
                  rows: postingClerkTheme.previewRows,
                }}
              />
            </Stack>
          </Collapse>
        </Box>
      ))}
    </>
  );
}
