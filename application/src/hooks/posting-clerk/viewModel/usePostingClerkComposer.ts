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
        informProps: {
          infoSectionLabel: "Information Field:",
          idLabel: "ID:",
          idValueLabel: "#01 - [uuid]",
          titleLabel: "Title:",
          titleField: { placeholder: "text field...", value: "", onChange: () => {} },
          statusLabel: "Status:",
          statusValueLabel: "- there are some changes... -",
          saveButton: { label: "Save", onClick: () => {} },
        },
        clerkingSectionLabel: "Clerking Field:",
        titleJpLabel: "Title[JP]:",
        titleJpField: { placeholder: "text field...", value: "", onChange: () => {} },
        titleEnLabel: "Title[EN]:",
        titleEnField: { placeholder: "text field...", value: "", onChange: () => {} },
        symbolLabel: "Symbol:",
        symbolField: { placeholder: "...", value: "", onChange: () => {} },
        picsLabel: "Pics:",
        picsField: { placeholder: "...", value: "", onChange: () => {} },
        postingPreviewLabel: "Posting Preview:",
        platformPreviews: [],
        quotesSectionLabel: "Quotes Field:",
        quoteItems: [],
      },
    } satisfies PostingClerkViewModel,
  };
}
