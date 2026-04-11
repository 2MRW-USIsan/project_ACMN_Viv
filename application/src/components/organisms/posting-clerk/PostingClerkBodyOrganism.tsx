"use client";

import {
  ButtonAtomType,
  IconButtonAtomType,
  LabelAtomType,
  TextAreaAtomType,
  TextFieldAtomType,
} from "@/types/ui";
import { Stack, Toolbar } from "@mui/material";
import { PostingClerkClerkSectionOrganism, PostingClerkClerkSectionViewModel } from "./PostingClerkClerkSectionOrganism";
import {
  PostingClerkInformSectionOrganism,
  PostingClerkInformSectionViewModel,
} from "./PostingClerkInformSectionOrganism";

export interface UrlItemPanel {
  key: string;
  nameLabel: LabelAtomType;
  nameField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  urlLabel: LabelAtomType;
  urlField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  removeButton: Pick<IconButtonAtomType, "icon" | "onClick">;
}

export interface PlatformPreviewPanel {
  key: string;
  sectionLabel: LabelAtomType;
  isExpanded: boolean;
  toggleButton: Pick<IconButtonAtomType, "icon" | "onClick">;
  titleLabel: LabelAtomType;
  titleCopyButton: Pick<ButtonAtomType, "label" | "onClick">;
  descLabel: LabelAtomType;
  descCopyButton: Pick<ButtonAtomType, "label" | "onClick">;
  urlsLabel: LabelAtomType;
  urlsAddButton: Pick<ButtonAtomType, "label" | "onClick">;
  urlItems: UrlItemPanel[];
  previewLabel: LabelAtomType;
  previewField: Pick<TextAreaAtomType, "placeholder" | "value" | "onChange">;
}

export interface QuoteItemPanel {
  key: string;
  quoteLabel: LabelAtomType;
  quoteField: Pick<TextFieldAtomType, "placeholder" | "value" | "onChange">;
  copyButton: Pick<ButtonAtomType, "label" | "onClick">;
}


export interface PostingClerkBodyViewModel {
  informProps: PostingClerkInformSectionViewModel;
  clerkProps: PostingClerkClerkSectionViewModel;
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
      <PostingClerkClerkSectionOrganism props={props.clerkProps} />
    </Stack>
  );
}
