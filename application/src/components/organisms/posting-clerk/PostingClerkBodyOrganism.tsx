"use client";

import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { IconButtonAtom } from "@/components/atoms/inputs/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { TextAreaAtom } from "@/components/atoms/inputs/TextAreaAtom";
import {
  LabelAtomType,
  ButtonAtomType,
  IconButtonAtomType,
  TextFieldAtomType,
  TextAreaAtomType,
} from "@/types/ui";
import { Box, Collapse, Stack, Toolbar } from "@mui/material";
import {
  PostingClerkInformSectionOrganism,
  PostingClerkInformSectionViewModel,
  PostingClerkInformSectionStyle,
} from "./PostingClerkInformSectionOrganism";

type LabelStyleType = NonNullable<LabelAtomType["style"]>;
type ButtonStyleType = NonNullable<ButtonAtomType["style"]>;
type IconButtonStyleType = NonNullable<IconButtonAtomType["style"]>;

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

export interface UrlItemPanelStyle {
  nameLabel: LabelStyleType;
  urlLabel: LabelStyleType;
  removeButton: IconButtonStyleType;
}

export interface PlatformPreviewPanelStyle {
  sectionLabel: LabelStyleType;
  toggleButton: IconButtonStyleType;
  titleLabel: LabelStyleType;
  titleCopyButton: ButtonStyleType;
  descLabel: LabelStyleType;
  descCopyButton: ButtonStyleType;
  urlsLabel: LabelStyleType;
  urlsAddButton: ButtonStyleType;
  urlItem: UrlItemPanelStyle;
  previewLabel: LabelStyleType;
  previewField: Pick<TextAreaAtomType, "rows">;
}

export interface QuoteItemPanelStyle {
  quoteLabel: LabelStyleType;
  copyButton: ButtonStyleType;
}

export interface PostingClerkBodyStyle {
  informSection: PostingClerkInformSectionStyle;
  clerkingSectionLabel: LabelStyleType;
  titleJpLabel: LabelStyleType;
  titleEnLabel: LabelStyleType;
  symbolLabel: LabelStyleType;
  picsLabel: LabelStyleType;
  postingPreviewLabel: LabelStyleType;
  quotesSectionLabel: LabelStyleType;
  platformPreview: PlatformPreviewPanelStyle;
  quoteItem: QuoteItemPanelStyle;
}

interface PostingClerkBodyOrganismProps {
  props: PostingClerkBodyViewModel;
  style: PostingClerkBodyStyle;
}

export function PostingClerkBodyOrganism({
  props,
  style,
}: PostingClerkBodyOrganismProps) {
  return (
    <Stack spacing={2} p={3} maxWidth={960} mx="auto">
      <Toolbar />
      <PostingClerkInformSectionOrganism
        props={props.informProps}
        style={style.informSection}
      />
      {/* Clerking Field */}
      <LabelAtom
        props={{ text: props.clerkingSectionLabel, style: style.clerkingSectionLabel }}
      />
      <DividerAtom />

      <Stack spacing={1} pl={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.titleJpLabel, style: style.titleJpLabel }} />
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleJpField} />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.titleEnLabel, style: style.titleEnLabel }} />
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleEnField} />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={{ text: props.symbolLabel, style: style.symbolLabel }} />
          <Box sx={{ width: 80 }}>
            <TextFieldAtom props={props.symbolField} />
          </Box>
          <LabelAtom props={{ text: props.picsLabel, style: style.picsLabel }} />
          <Box sx={{ width: 80 }}>
            <TextFieldAtom props={props.picsField} />
          </Box>
        </Stack>
      </Stack>

      {/* Posting Preview */}
      <LabelAtom
        props={{ text: props.postingPreviewLabel, style: style.postingPreviewLabel }}
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
              props={{
                text: platform.sectionLabel,
                style: style.platformPreview.sectionLabel,
              }}
            />
            <IconButtonAtom
              props={{ ...platform.toggleButton, style: style.platformPreview.toggleButton }}
            />
          </Stack>

          <Collapse in={platform.isExpanded} timeout="auto" unmountOnExit>
            <Stack spacing={1} pt={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom
                  props={{
                    text: platform.titleLabel,
                    style: style.platformPreview.titleLabel,
                  }}
                />
                <ButtonAtom
                  props={{
                    ...platform.titleCopyButton,
                    style: style.platformPreview.titleCopyButton,
                  }}
                />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom
                  props={{
                    text: platform.descLabel,
                    style: style.platformPreview.descLabel,
                  }}
                />
                <ButtonAtom
                  props={{
                    ...platform.descCopyButton,
                    style: style.platformPreview.descCopyButton,
                  }}
                />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom
                  props={{
                    text: platform.urlsLabel,
                    style: style.platformPreview.urlsLabel,
                  }}
                />
                <ButtonAtom
                  props={{
                    ...platform.urlsAddButton,
                    style: style.platformPreview.urlsAddButton,
                  }}
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
                      props={{
                        text: urlItem.nameLabel,
                        style: style.platformPreview.urlItem.nameLabel,
                      }}
                    />
                    <Box sx={{ width: 140 }}>
                      <TextFieldAtom props={urlItem.nameField} />
                    </Box>
                    <LabelAtom
                      props={{
                        text: urlItem.urlLabel,
                        style: style.platformPreview.urlItem.urlLabel,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <TextFieldAtom props={urlItem.urlField} />
                    </Box>
                    <IconButtonAtom
                      props={{
                        ...urlItem.removeButton,
                        style: style.platformPreview.urlItem.removeButton,
                      }}
                    />
                  </Stack>
                ))}
              </Stack>

              <LabelAtom
                props={{
                  text: platform.previewLabel,
                  style: style.platformPreview.previewLabel,
                }}
              />
              <TextAreaAtom
                props={{
                  ...platform.previewField,
                  rows: style.platformPreview.previewField.rows,
                }}
              />
            </Stack>
          </Collapse>
        </Box>
      ))}

      {/* Quotes Field */}
      <LabelAtom
        props={{ text: props.quotesSectionLabel, style: style.quotesSectionLabel }}
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
              props={{ text: quoteItem.quoteLabel, style: style.quoteItem.quoteLabel }}
            />
            <Box sx={{ flex: 1, maxWidth: 400 }}>
              <TextFieldAtom props={quoteItem.quoteField} />
            </Box>
            <ButtonAtom
              props={{ ...quoteItem.copyButton, style: style.quoteItem.copyButton }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
