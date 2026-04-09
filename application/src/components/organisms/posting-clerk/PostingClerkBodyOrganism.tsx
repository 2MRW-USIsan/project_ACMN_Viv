"use client";

import { ButtonAtom, ButtonAtomProps } from "@/components/atoms/ButtonAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import {
  IconButtonAtom,
  IconButtonAtomProps,
} from "@/components/atoms/IconButtonAtom";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";
import {
  TextFieldAtom,
  TextFieldAtomProps,
} from "@/components/atoms/TextFieldAtom";
import { TextAreaAtom, TextAreaAtomProps } from "@/components/atoms/TextAreaAtom";
import { Box, Collapse, Stack, Toolbar } from "@mui/material";
import { PostingClerkInformSectionOrganism } from "./PostingClerkInformSectionOrganism";

export interface UrlItemPanel {
  key: string;
  nameLabel: LabelAtomProps["props"];
  nameField: TextFieldAtomProps["props"];
  urlLabel: LabelAtomProps["props"];
  urlField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
}

export interface PlatformPreviewPanel {
  key: string;
  sectionLabel: LabelAtomProps["props"];
  isExpanded: boolean;
  toggleButton: IconButtonAtomProps["props"];
  titleLabel: LabelAtomProps["props"];
  titleCopyButton: ButtonAtomProps["props"];
  descLabel: LabelAtomProps["props"];
  descCopyButton: ButtonAtomProps["props"];
  urlsLabel: LabelAtomProps["props"];
  urlsAddButton: ButtonAtomProps["props"];
  urlItems: UrlItemPanel[];
  previewLabel: LabelAtomProps["props"];
  previewField: TextAreaAtomProps["props"];
}

export interface QuoteItemPanel {
  key: string;
  quoteLabel: LabelAtomProps["props"];
  quoteField: TextFieldAtomProps["props"];
  copyButton: ButtonAtomProps["props"];
}

export interface PostingClerkBodyViewModel {
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
  clerkingSectionLabel: LabelAtomProps["props"];
  titleJpLabel: LabelAtomProps["props"];
  titleJpField: TextFieldAtomProps["props"];
  titleEnLabel: LabelAtomProps["props"];
  titleEnField: TextFieldAtomProps["props"];
  symbolLabel: LabelAtomProps["props"];
  symbolField: TextFieldAtomProps["props"];
  picsLabel: LabelAtomProps["props"];
  picsField: TextFieldAtomProps["props"];
  postingPreviewLabel: LabelAtomProps["props"];
  platformPreviews: PlatformPreviewPanel[];
  quotesSectionLabel: LabelAtomProps["props"];
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
      <PostingClerkInformSectionOrganism props={props.informProps} />
      {/* Clerking Field */}
      <LabelAtom props={props.clerkingSectionLabel} />
      <DividerAtom />

      <Stack spacing={1} pl={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.titleJpLabel} />
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleJpField} />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.titleEnLabel} />
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleEnField} />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.symbolLabel} />
          <Box sx={{ width: 80 }}>
            <TextFieldAtom props={props.symbolField} />
          </Box>
          <LabelAtom props={props.picsLabel} />
          <Box sx={{ width: 80 }}>
            <TextFieldAtom props={props.picsField} />
          </Box>
        </Stack>
      </Stack>

      {/* Posting Preview */}
      <LabelAtom props={props.postingPreviewLabel} />

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
            <LabelAtom props={platform.sectionLabel} />
            <IconButtonAtom props={platform.toggleButton} />
          </Stack>

          <Collapse in={platform.isExpanded} timeout="auto" unmountOnExit>
            <Stack spacing={1} pt={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom props={platform.titleLabel} />
                <ButtonAtom props={platform.titleCopyButton} />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom props={platform.descLabel} />
                <ButtonAtom props={platform.descCopyButton} />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <LabelAtom props={platform.urlsLabel} />
                <ButtonAtom props={platform.urlsAddButton} />
              </Stack>

              <Stack spacing={0.5} pl={2}>
                {platform.urlItems.map((urlItem) => (
                  <Stack
                    key={urlItem.key}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <LabelAtom props={urlItem.nameLabel} />
                    <Box sx={{ width: 140 }}>
                      <TextFieldAtom props={urlItem.nameField} />
                    </Box>
                    <LabelAtom props={urlItem.urlLabel} />
                    <Box sx={{ flex: 1 }}>
                      <TextFieldAtom props={urlItem.urlField} />
                    </Box>
                    <IconButtonAtom props={urlItem.removeButton} />
                  </Stack>
                ))}
              </Stack>

              <LabelAtom props={platform.previewLabel} />
              <TextAreaAtom props={platform.previewField} />
            </Stack>
          </Collapse>
        </Box>
      ))}

      {/* Quotes Field */}
      <LabelAtom props={props.quotesSectionLabel} />
      <DividerAtom />

      <Stack spacing={0.5} pl={2}>
        {props.quoteItems.map((quoteItem) => (
          <Stack
            key={quoteItem.key}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <LabelAtom props={quoteItem.quoteLabel} />
            <Box sx={{ flex: 1, maxWidth: 400 }}>
              <TextFieldAtom props={quoteItem.quoteField} />
            </Box>
            <ButtonAtom props={quoteItem.copyButton} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
