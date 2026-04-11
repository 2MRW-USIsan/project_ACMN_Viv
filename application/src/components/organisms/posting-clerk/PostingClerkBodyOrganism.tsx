"use client";

import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { IconButtonAtom } from "@/components/atoms/inputs/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { TextAreaAtom } from "@/components/atoms/inputs/TextAreaAtom";
import {
  ButtonAtomType,
  IconButtonAtomType,
  TextFieldAtomType,
  TextAreaAtomType,
} from "@/types/ui";
import { Box, Collapse, Stack, Toolbar } from "@mui/material";
import {
  PostingClerkInformSectionOrganism,
  PostingClerkInformSectionViewModel,
} from "./PostingClerkInformSectionOrganism";
import { postingClerkTheme } from "@/theme/postingClerk";

export interface UrlItemPanel {
  key: string;
  nameLabel: string;
  nameField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  urlLabel: string;
  urlField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  removeButton: Pick<IconButtonAtomType, "icon" | "onClick">;
}

export interface PlatformPreviewPanel {
  key: string;
  sectionLabel: string;
  isExpanded: boolean;
  toggleButton: Pick<IconButtonAtomType, "icon" | "onClick">;
  titleLabel: string;
  titleCopyButton: Pick<ButtonAtomType, "label" | "onClick">;
  descLabel: string;
  descCopyButton: Pick<ButtonAtomType, "label" | "onClick">;
  urlsLabel: string;
  urlsAddButton: Pick<ButtonAtomType, "label" | "onClick">;
  urlItems: UrlItemPanel[];
  previewLabel: string;
  previewField: Pick<TextAreaAtomType, "placeholder" | "value" | "onChange">;
}

export interface QuoteItemPanel {
  key: string;
  quoteLabel: string;
  quoteField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  copyButton: Pick<ButtonAtomType, "label" | "onClick">;
}

export interface PostingClerkBodyViewModel {
  informProps: PostingClerkInformSectionViewModel;
  clerkingSectionLabel: string;
  titleJpLabel: string;
  titleJpField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  titleEnLabel: string;
  titleEnField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  symbolLabel: string;
  symbolField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  picsLabel: string;
  picsField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  postingPreviewLabel: string;
  platformPreviews: PlatformPreviewPanel[];
  quotesSectionLabel: string;
  quoteItems: QuoteItemPanel[];
}

interface PostingClerkBodyOrganismProps {
  props: PostingClerkBodyViewModel;
}

export function PostingClerkBodyOrganism({
  props,
}: PostingClerkBodyOrganismProps) {
  return (
    <Stack spacing={2} p={3} maxWidth={960} mx="auto">
      <Toolbar />
      <PostingClerkInformSectionOrganism
        props={props.informProps}
      />
      {/* Clerking Field */}
      <LabelAtom
        props={{ text: props.clerkingSectionLabel }}
        style={postingClerkTheme.sectionLabel}
      />
      <DividerAtom />

      <Stack spacing={1} pl={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.titleJpLabel }} style={postingClerkTheme.fieldLabel} />
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleJpField} />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.titleEnLabel }} style={postingClerkTheme.fieldLabel} />
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleEnField} />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.symbolLabel }} style={postingClerkTheme.fieldLabel} />
          <Box sx={{ width: 80 }}>
            <TextFieldAtom props={props.symbolField} />
          </Box>
          <LabelAtom props={{ text: props.picsLabel }} style={postingClerkTheme.fieldLabel} />
          <Box sx={{ width: 80 }}>
            <TextFieldAtom props={props.picsField} />
          </Box>
        </Stack>
      </Stack>

      {/* Posting Preview */}
      <LabelAtom
        props={{ text: props.postingPreviewLabel }}
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
              props={{ text: platform.sectionLabel }}
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
                  props={{ text: platform.titleLabel }}
                  style={postingClerkTheme.fieldLabel}
                />
                <ButtonAtom
                  props={platform.titleCopyButton}
                  style={postingClerkTheme.standardButton}
                />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom
                  props={{ text: platform.descLabel }}
                  style={postingClerkTheme.fieldLabel}
                />
                <ButtonAtom
                  props={platform.descCopyButton}
                  style={postingClerkTheme.standardButton}
                />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom
                  props={{ text: platform.urlsLabel }}
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
                      props={{ text: urlItem.nameLabel }}
                      style={postingClerkTheme.fieldLabel}
                    />
                    <Box sx={{ width: 140 }}>
                      <TextFieldAtom props={urlItem.nameField} />
                    </Box>
                    <LabelAtom
                      props={{ text: urlItem.urlLabel }}
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
                props={{ text: platform.previewLabel }}
                style={postingClerkTheme.fieldLabel}
              />
              <TextAreaAtom
                props={{ ...platform.previewField, rows: postingClerkTheme.previewRows }}
              />
            </Stack>
          </Collapse>
        </Box>
      ))}

      {/* Quotes Field */}
      <LabelAtom
        props={{ text: props.quotesSectionLabel }}
        style={postingClerkTheme.sectionLabel}
      />
      <DividerAtom />

      <Stack spacing={0.5} pl={2}>
        {props.quoteItems.map((quoteItem) => (
          <Stack
            key={quoteItem.key}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <LabelAtom
              props={{ text: quoteItem.quoteLabel }}
              style={postingClerkTheme.fieldLabel}
            />
            <Box sx={{ flex: 1, maxWidth: 400 }}>
              <TextFieldAtom props={quoteItem.quoteField} />
            </Box>
            <ButtonAtom
              props={quoteItem.copyButton}
              style={postingClerkTheme.standardButton}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
