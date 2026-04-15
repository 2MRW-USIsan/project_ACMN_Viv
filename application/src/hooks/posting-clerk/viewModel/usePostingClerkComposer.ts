import { NavigationOrganismProps } from "@/components/organisms/navigation/NavigationOrganism";
import { PostingClerkContexts } from "@/hooks/posting-clerk/state/usePostingClerkContext";
import { usePostingClerkHandlers } from "@/hooks/posting-clerk/viewModel/usePostingClerkHandlers";
import { usePostingClerkProperties } from "@/hooks/posting-clerk/viewModel/usePostingClerkProperties";
import { BodyType } from "@/types/posting-clerk";
import { AppBarType, DrawerType, LabelAtomType } from "@/types/ui";

export interface PostingClerkViewModel {
  navigationLayout: {
    appBar: AppBarType;
    drawer: DrawerType;
    title: LabelAtomType;
    navigation: NavigationOrganismProps["props"];
  };
  postingClerkBody: BodyType;
}

export function usePostingClerkComposer(contexts: PostingClerkContexts) {
  const { properties: _properties } = usePostingClerkProperties(contexts);
  const { handlers: _handlers } = usePostingClerkHandlers(contexts);

  return {
    viewModel: {
      navigationLayout: {
        appBar: {
          onMenuOpen: () => {},
        },
        drawer: {
          open: false,
          onClose: () => {},
        },
        title: { text: "ACMN" },
        navigation: {
          activeItemLabel: undefined,
          links: [],
        },
      },
      postingClerkBody: {
        informProps: {
          infoSectionLabel: { text: "Information Field:" },
          idLabel: { text: "ID:" },
          idValueLabel: { text: "#01 - [uuid]" },
          titleLabel: { text: "Title:" },
          titleField: {
            placeholder: "text field...",
            value: "",
            onChange: () => {},
          },
          statusLabel: { text: "Status:" },
          statusValueLabel: { text: "- there are some changes... -" },
          saveButton: { label: "Save", onClick: () => {} },
        },
        clerkProps: {
          label: { text: "Clerking Field:" },
          clerks: {
            titleJpLabel: { text: "Title[JP]:" },
            titleEnLabel: { text: "Title[EN]:" },
            symbolLabel: { text: "Symbol:" },
            picsLabel: { text: "Pics:" },
            titleJpField: {
              placeholder: "text field...",
              value: "",
              onChange: () => {},
            },
            titleEnField: {
              placeholder: "text field...",
              value: "",
              onChange: () => {},
            },
            symbolField: { placeholder: "...", value: "", onChange: () => {} },
            picsField: { placeholder: "...", value: "", onChange: () => {} },
          },
          previews: {
            postingPreviewLabel: { text: "Posting Preview:" },
            platformPreviews: [],
          },
          quotes: {
            quotesSectionLabel: { text: "Quotes Field:" },
            quoteItems: [],
          },
        },
      },
    } satisfies PostingClerkViewModel,
  };
}
