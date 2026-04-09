"use client";

import { PostingClerkContexts } from "@/hooks/posting-clerk/state/usePostingClerkContext";
import { usePostingClerkProperties } from "@/hooks/posting-clerk/viewModel/usePostingClerkProperties";
import { usePostingClerkHandlers } from "@/hooks/posting-clerk/viewModel/usePostingClerkHandlers";
import { PostingClerkBodyViewModel } from "@/components/organisms/posting-clerk/PostingClerkBodyOrganism";
import { NavigationOrganismProps } from "@/components/organisms/navigation/NavigationOrganism";

export type { PostingClerkBodyViewModel };

export interface PostingClerkViewModel {
  navigationLayout: {
    appBar: {
      title: string;
      onMenuOpen: () => void;
    };
    drawer: {
      open: boolean;
      onClose: () => void;
    };
    navigation: NavigationOrganismProps["props"];
  };
  postingClerkBody: PostingClerkBodyViewModel;
}

export function usePostingClerkComposer(contexts: PostingClerkContexts) {
  const { properties: _properties } = usePostingClerkProperties(contexts);
  const { handlers: _handlers } = usePostingClerkHandlers(contexts);

  return {
    viewModel: {
      navigationLayout: {
        appBar: {
          title: "ACMN",
          onMenuOpen: () => {},
        },
        drawer: {
          open: false,
          onClose: () => {},
        },
        navigation: {
          activeItemLabel: undefined,
          links: [],
        },
      },
      postingClerkBody: {
        infoSectionLabel: {
          text: "Information Field:",
          variant: "subtitle1" as const,
        },
        idLabel: { text: "ID:", variant: "body2" as const },
        idValueLabel: { text: "#01 - [uuid]", variant: "body2" as const },
        titleLabel: { text: "Title:", variant: "body2" as const },
        titleField: {
          placeholder: "text field...",
          defaultValue: "",
          onBlur: () => {},
          size: "small" as const,
          fullWidth: true,
        },
        statusLabel: { text: "Status:", variant: "body2" as const },
        statusValueLabel: {
          text: "- there are some changes... -",
          variant: "body2" as const,
        },
        saveButton: {
          label: "Save",
          onClick: () => {},
          size: "small" as const,
        },
        clerkingSectionLabel: {
          text: "Clerking Field:",
          variant: "subtitle1" as const,
        },
        titleJpLabel: { text: "Title[JP]:", variant: "body2" as const },
        titleJpField: {
          placeholder: "text field...",
          value: "",
          onChange: () => {},
          size: "small" as const,
          fullWidth: true,
        },
        titleEnLabel: { text: "Title[EN]:", variant: "body2" as const },
        titleEnField: {
          placeholder: "text field...",
          value: "",
          onChange: () => {},
          size: "small" as const,
          fullWidth: true,
        },
        symbolLabel: { text: "Symbol:", variant: "body2" as const },
        symbolField: {
          placeholder: "...",
          value: "",
          onChange: () => {},
          size: "small" as const,
        },
        picsLabel: { text: "Pics:", variant: "body2" as const },
        picsField: {
          placeholder: "...",
          value: "",
          onChange: () => {},
          size: "small" as const,
        },
        postingPreviewLabel: {
          text: "Posting Preview:",
          variant: "subtitle1" as const,
        },
        platformPreviews: [],
        quotesSectionLabel: {
          text: "Quotes Field:",
          variant: "subtitle1" as const,
        },
        quoteItems: [],
      },
    } satisfies PostingClerkViewModel,
  };
}
