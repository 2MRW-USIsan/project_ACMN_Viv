"use client";

import { Box, Collapse, Stack, Toolbar } from "@mui/material";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { TextFieldAtom, TextFieldAtomProps } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom, ButtonAtomProps } from "@/components/atoms/ButtonAtom";
import { IconButtonAtom, IconButtonAtomProps } from "@/components/atoms/IconButtonAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";

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
  previewField: TextFieldAtomProps["props"];
}

export interface QuoteItemPanel {
  key: string;
  quoteLabel: LabelAtomProps["props"];
  quoteField: TextFieldAtomProps["props"];
  copyButton: ButtonAtomProps["props"];
}

export interface PostingClerkBodyViewModel {
  infoSectionLabel: LabelAtomProps["props"];
  idLabel: LabelAtomProps["props"];
  idValueLabel: LabelAtomProps["props"];
  titleLabel: LabelAtomProps["props"];
  titleField: TextFieldAtomProps["props"];
  statusLabel: LabelAtomProps["props"];
  statusValueLabel: LabelAtomProps["props"];
  saveButton: ButtonAtomProps["props"];
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

export function PostingClerkBodyOrganism({ props }: PostingClerkBodyOrganismProps) {
  return (
    <GridLayoutAtom props={{ container: true }}>
      <Toolbar />

      {/* Information Field */}
      <LabelAtom props={props.infoSectionLabel} />
      <DividerAtom />

      <Stack spacing={1} pl={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.idLabel} />
          <LabelAtom props={props.idValueLabel} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.titleLabel} />
          <GridLayoutAtom props={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleField} />
          </GridLayoutAtom>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.statusLabel} />
          <LabelAtom props={props.statusValueLabel} />
          <ButtonAtom props={props.saveButton} />
        </Stack>
      </Stack>

      {/* Clerking Field */}
      <LabelAtom props={props.clerkingSectionLabel} />
      <DividerAtom />

      <Stack spacing={1} pl={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.titleJpLabel} />
          <GridLayoutAtom props={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleJpField} />
          </GridLayoutAtom>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.titleEnLabel} />
          <GridLayoutAtom props={{ flex: 1, maxWidth: 400 }}>
            <TextFieldAtom props={props.titleEnField} />
          </GridLayoutAtom>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LabelAtom props={props.symbolLabel} />
          <GridLayoutAtom props={{ width: 80 }}>
            <TextFieldAtom props={props.symbolField} />
          </GridLayoutAtom>
          <LabelAtom props={props.picsLabel} />
          <GridLayoutAtom props={{ width: 80 }}>
            <TextFieldAtom props={props.picsField} />
          </GridLayoutAtom>
        </Stack>
      </Stack>

      {/* Posting Preview */}
      <LabelAtom props={props.postingPreviewLabel} />

      {props.platformPreviews.map((platform) => (
        <Box
          key={platform.key}
          sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, p: 2 }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
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
                  <Stack key={urlItem.key} direction="row" alignItems="center" spacing={1}>
                    <LabelAtom props={urlItem.nameLabel} />
                    <GridLayoutAtom props={{ width: 140 }}>
                      <TextFieldAtom props={urlItem.nameField} />
                    </GridLayoutAtom>
                    <LabelAtom props={urlItem.urlLabel} />
                    <GridLayoutAtom props={{ flex: 1 }}>
                      <TextFieldAtom props={urlItem.urlField} />
                    </GridLayoutAtom>
                    <IconButtonAtom props={urlItem.removeButton} />
                  </Stack>
                ))}
              </Stack>

              <LabelAtom props={platform.previewLabel} />
              <TextFieldAtom props={platform.previewField} />
            </Stack>
          </Collapse>
        </Box>
      ))}

      {/* Quotes Field */}
      <LabelAtom props={props.quotesSectionLabel} />
      <DividerAtom />

      <Stack spacing={0.5} pl={2}>
        {props.quoteItems.map((quoteItem) => (
          <Stack key={quoteItem.key} direction="row" alignItems="center" spacing={1}>
            <LabelAtom props={quoteItem.quoteLabel} />
            <GridLayoutAtom props={{ flex: 1, maxWidth: 400 }}>
              <TextFieldAtom props={quoteItem.quoteField} />
            </GridLayoutAtom>
            <ButtonAtom props={quoteItem.copyButton} />
          </Stack>
        ))}
      </Stack>
    </GridLayoutAtom>
  );
}
