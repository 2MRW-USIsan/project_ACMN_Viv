"use client";

import { PromptForgerContexts } from "@/hooks/promptForger/state/usePromptForgerContext";
import { usePromptForgerProperties } from "@/hooks/promptForger/viewModel/usePromptForgerProperties";
import { usePromptForgerHandlers } from "@/hooks/promptForger/viewModel/usePromptForgerHandlers";
import { LabelAtomProps } from "@/components/atoms/LabelAtom";
import { TextFieldAtomProps } from "@/components/atoms/TextFieldAtom";
import { ButtonAtomProps } from "@/components/atoms/ButtonAtom";
import { SelectAtomProps } from "@/components/atoms/SelectAtom";
import { SwitchAtomProps } from "@/components/atoms/SwitchAtom";
import { RadioButtonAtomProps } from "@/components/atoms/RadioButtonAtom";
import { IconButtonAtomProps } from "@/components/atoms/IconButtonAtom";
import { NavigationOrganismProps } from "@/components/organisms/NavigationOrganism";

// Orders section types
export interface ForgerOrdersGrpPanel {
  key: string;
  grpLabel: LabelAtomProps["props"];
  displayLines: LabelAtomProps["props"][];
  scriptsLabel: LabelAtomProps["props"];
  promptLabel: LabelAtomProps["props"];
  promptField: TextFieldAtomProps["props"];
  resetButton: ButtonAtomProps["props"];
  clearButton: ButtonAtomProps["props"];
}

export interface ForgerOrdersSection {
  key: string;
  titleLabel: LabelAtomProps["props"];
  isExpanded: boolean;
  toggleButton: IconButtonAtomProps["props"];
  grpPanels: ForgerOrdersGrpPanel[];
}

// Switch section types
export interface ForgerSwitchItem {
  key: string;
  itemLabel: LabelAtomProps["props"];
  switchControl: SwitchAtomProps["props"];
}

export interface ForgerSwitchGrpPanel {
  key: string;
  grpLabel: LabelAtomProps["props"];
  switchItems: ForgerSwitchItem[];
}

export interface ForgerSwitchSection {
  key: string;
  titleLabel: LabelAtomProps["props"];
  isExpanded: boolean;
  toggleButton: IconButtonAtomProps["props"];
  grpPanels: ForgerSwitchGrpPanel[];
}

// Select section types
export interface ForgerSelectRow {
  key: string;
  label: LabelAtomProps["props"];
  select: SelectAtomProps["props"];
  reloadButton: ButtonAtomProps["props"];
}

export interface ForgerSelectGrpPanel {
  key: string;
  grpLabel: LabelAtomProps["props"];
  shuffleAllLabel: LabelAtomProps["props"];
  shuffleButton: ButtonAtomProps["props"];
  selectRows: ForgerSelectRow[];
}

export interface ForgerSelectSection {
  key: string;
  titleLabel: LabelAtomProps["props"];
  isExpanded: boolean;
  toggleButton: IconButtonAtomProps["props"];
  grpPanels: ForgerSelectGrpPanel[];
}

// Bloc panel
export interface ForgerBlocPanel {
  key: string;
  titleLabel: LabelAtomProps["props"];
  isExpanded: boolean;
  toggleButton: IconButtonAtomProps["props"];
  ordersSection: ForgerOrdersSection | null;
  switchSection: ForgerSwitchSection | null;
  selectSection: ForgerSelectSection | null;
}

// Tune-up Composition
export interface RadioOptionItem {
  key: string;
  radio: RadioButtonAtomProps["props"];
  label: LabelAtomProps["props"];
}

export interface TuneupCompositionSection {
  titleLabel: LabelAtomProps["props"];
  isExpanded: boolean;
  toggleButton: IconButtonAtomProps["props"];
  anglesLabel: LabelAtomProps["props"];
  anglesOptions: RadioOptionItem[];
  directionsLabel: LabelAtomProps["props"];
  directionsOptions: RadioOptionItem[];
}

// Prompt Idea
export interface PromptIdeaSection {
  titleLabel: LabelAtomProps["props"];
  isExpanded: boolean;
  toggleButton: IconButtonAtomProps["props"];
  shuffleButton: ButtonAtomProps["props"];
  copyButton: ButtonAtomProps["props"];
  summaryPromptLabel: LabelAtomProps["props"];
  summaryPromptField: TextFieldAtomProps["props"];
}

// Summary Bloc
export interface SummaryBlocPanel {
  titleLabel: LabelAtomProps["props"];
  isExpanded: boolean;
  toggleButton: IconButtonAtomProps["props"];
  tuneupComposition: TuneupCompositionSection;
  promptIdea: PromptIdeaSection;
}

// Body ViewModel
export interface PromptForgerBodyViewModel {
  infoSectionLabel: LabelAtomProps["props"];
  idLabel: LabelAtomProps["props"];
  idValueLabel: LabelAtomProps["props"];
  titleLabel: LabelAtomProps["props"];
  titleField: TextFieldAtomProps["props"];
  statusLabel: LabelAtomProps["props"];
  statusValueLabel: LabelAtomProps["props"];
  saveButton: ButtonAtomProps["props"];
  forgersSectionLabel: LabelAtomProps["props"];
  blocPanels: ForgerBlocPanel[];
  summaryBloc: SummaryBlocPanel;
}

export interface PromptForgerViewModel {
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
  promptForgerBody: PromptForgerBodyViewModel;
}

export function usePromptForgerComposer(contexts: PromptForgerContexts) {
  const { properties: _properties } = usePromptForgerProperties(contexts);
  const { handlers: _handlers } = usePromptForgerHandlers(contexts);

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
      promptForgerBody: {
        infoSectionLabel: { text: "Information Field:", variant: "subtitle1" as const },
        idLabel: { text: "ID:", variant: "body2" as const },
        idValueLabel: { text: "#01 - [uuid]", variant: "body2" as const },
        titleLabel: { text: "Title:", variant: "body2" as const },
        titleField: { placeholder: "text field...", defaultValue: "", onBlur: () => {}, size: "small" as const, fullWidth: true },
        statusLabel: { text: "Status:", variant: "body2" as const },
        statusValueLabel: { text: "- there are some changes... -", variant: "body2" as const },
        saveButton: { label: "Save", onClick: () => {}, size: "small" as const },
        forgersSectionLabel: { text: "Forgers Field:", variant: "subtitle1" as const },
        blocPanels: [],
        summaryBloc: {
          titleLabel: { text: "Summary Bloc:", variant: "h6" as const },
          isExpanded: false,
          toggleButton: { icon: "expandMore" as const, onClick: () => {} },
          tuneupComposition: {
            titleLabel: { text: "Tune-up Composition:", variant: "subtitle1" as const },
            isExpanded: false,
            toggleButton: { icon: "expandMore" as const, onClick: () => {} },
            anglesLabel: { text: "Angles:", variant: "body2" as const },
            anglesOptions: [],
            directionsLabel: { text: "Directions:", variant: "body2" as const },
            directionsOptions: [],
          },
          promptIdea: {
            titleLabel: { text: "Prompt Idea:", variant: "subtitle1" as const },
            isExpanded: false,
            toggleButton: { icon: "expandMore" as const, onClick: () => {} },
            shuffleButton: { label: "Shuffle", onClick: () => {}, size: "small" as const },
            copyButton: { label: "Copy", onClick: () => {}, size: "small" as const },
            summaryPromptLabel: { text: "Summary Prompt:", variant: "body2" as const },
            summaryPromptField: { placeholder: "Text area Field...", defaultValue: "", onBlur: () => {}, multiline: true, rows: 14, fullWidth: true },
          },
        },
      },
    } satisfies PromptForgerViewModel,
  };
}
