import { LabelAtomProps } from "@/components/atoms/display/LabelAtom";
import { ButtonAtomProps } from "@/components/atoms/inputs/ButtonAtom";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { SelectAtomProps } from "@/components/atoms/inputs/SelectAtom";
import { SwitchAtomProps } from "@/components/atoms/inputs/SwitchAtom";
import { TextAreaAtomProps } from "@/components/atoms/inputs/TextAreaAtom";
import { TextFieldAtomProps } from "@/components/atoms/inputs/TextFieldAtom";
import { NavigationOrganismProps } from "@/components/organisms/navigation/NavigationOrganism";
import { AppBarType, DrawerType, LabelAtomType } from "@/types/ui";
import { PromptForgerContexts } from "@/hooks/promptForger/state/usePromptForgerContext";
import { usePromptForgerHandlers } from "@/hooks/promptForger/viewModel/usePromptForgerHandlers";
import { usePromptForgerProperties } from "@/hooks/promptForger/viewModel/usePromptForgerProperties";
import { ChipRadioAtomType } from "@/types/ui";

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
  panelInfo: {
    label: LabelAtomProps["props"];
    isExpanded: boolean;
    toggle: IconButtonAtomProps["props"];
  };
  listInfo: {
    grpPanels: ForgerOrdersGrpPanel[];
  };
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
  panelInfo: {
    label: LabelAtomProps["props"];
    isExpanded: boolean;
    toggle: IconButtonAtomProps["props"];
  };
  listInfo: {
    grpPanels: ForgerSwitchGrpPanel[];
  };
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
  panelInfo: {
    label: LabelAtomProps["props"];
    isExpanded: boolean;
    toggle: IconButtonAtomProps["props"];
  };
  listInfo: {
    grpPanels: ForgerSelectGrpPanel[];
  };
}

// Bloc panel
export interface ForgerBlocPanel {
  key: string;
  panelInfo: {
    label: LabelAtomProps["props"];
    isExpanded: boolean;
    toggle: IconButtonAtomProps["props"];
  };
  blocInfo: {
    ordersSection: ForgerOrdersSection | null;
    switchSection: ForgerSwitchSection | null;
    selectSection: ForgerSelectSection | null;
  };
}

// Tune-up Composition
export interface RadioOptionItem {
  key: string;
  radio: ChipRadioAtomType;
  label: LabelAtomProps["props"];
}

export interface TuneupCompositionSection {
  panelInfo: {
    label: LabelAtomProps["props"];
    isExpanded: boolean;
    toggle: IconButtonAtomProps["props"];
  };
  tunesInfo: {
    anglesLabel: LabelAtomProps["props"];
    anglesOptions: RadioOptionItem[];
    directionsLabel: LabelAtomProps["props"];
    directionsOptions: RadioOptionItem[];
  };
}

// Prompt Idea
export interface PromptIdeaSection {
  panelInfo: {
    label: LabelAtomProps["props"];
    isExpanded: boolean;
    toggle: IconButtonAtomProps["props"];
  };
  promptInfo: {
    shuffleButton: ButtonAtomProps["props"];
    copyButton: ButtonAtomProps["props"];
    summaryPromptLabel: LabelAtomProps["props"];
    summaryPromptField: TextAreaAtomProps["props"];
  };
}

// Summary Bloc
export interface SummaryBlocPanel {
  panelInfo: {
    label: LabelAtomProps["props"];
    isExpanded: boolean;
    toggle: IconButtonAtomProps["props"];
  };
  summaryInfo: {
    tuneupComposition: TuneupCompositionSection;
    promptIdea: PromptIdeaSection;
  };
}

export interface PromptForgerInfoSectionViewModel {
  infoSectionLabel: LabelAtomProps["props"];
  idLabel: LabelAtomProps["props"];
  idValueLabel: LabelAtomProps["props"];
  titleLabel: LabelAtomProps["props"];
  titleField: TextFieldAtomProps["props"];
  statusLabel: LabelAtomProps["props"];
  statusValueLabel: LabelAtomProps["props"];
  saveButton: ButtonAtomProps["props"];
}

export interface PromptForgerForgersSectionViewModel {
  forgersSectionLabel: LabelAtomProps["props"];
  blocPanels: ForgerBlocPanel[];
  summaryBloc: SummaryBlocPanel;
}

// Body ViewModel
export interface PromptForgerBodyViewModel {
  infoSection: PromptForgerInfoSectionViewModel;
  forgersSection: PromptForgerForgersSectionViewModel;
}

export interface PromptForgerViewModel {
  navigationLayout: {
    appBar: AppBarType;
    drawer: DrawerType;
    title: LabelAtomType;
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
      promptForgerBody: {
        infoSection: {
          infoSectionLabel: {
            text: "Information Field:",
            variant: "subtitle1" as const,
          },
          idLabel: { text: "ID:", variant: "body2" as const },
          idValueLabel: { text: "#01 - [uuid]", variant: "body2" as const },
          titleLabel: { text: "Title:", variant: "body2" as const },
          titleField: {
            placeholder: "text field...",
            value: "",
            onChange: () => {},
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
        },
        forgersSection: {
          forgersSectionLabel: {
            text: "Forgers Field:",
            variant: "subtitle1" as const,
          },
          blocPanels: [],
          summaryBloc: {
            panelInfo: {
              label: { text: "Summary Bloc:", variant: "h6" as const },
              isExpanded: false,
              toggle: { icon: "expandMore" as const, onClick: () => {} },
            },
            summaryInfo: {
              tuneupComposition: {
                panelInfo: {
                  label: {
                    text: "Tune-up Composition:",
                    variant: "subtitle1" as const,
                  },
                  isExpanded: false,
                  toggle: {
                    icon: "expandMore" as const,
                    onClick: () => {},
                  },
                },
                tunesInfo: {
                  anglesLabel: { text: "Angles:", variant: "body2" as const },
                  anglesOptions: [],
                  directionsLabel: {
                    text: "Directions:",
                    variant: "body2" as const,
                  },
                  directionsOptions: [],
                },
              },
              promptIdea: {
                panelInfo: {
                  label: {
                    text: "Prompt Idea:",
                    variant: "subtitle1" as const,
                  },
                  isExpanded: false,
                  toggle: {
                    icon: "expandMore" as const,
                    onClick: () => {},
                  },
                },
                promptInfo: {
                  shuffleButton: {
                    label: "Shuffle",
                    onClick: () => {},
                    size: "small" as const,
                  },
                  copyButton: {
                    label: "Copy",
                    onClick: () => {},
                    size: "small" as const,
                  },
                  summaryPromptLabel: {
                    text: "Summary Prompt:",
                    variant: "body2" as const,
                  },
                  summaryPromptField: {
                    placeholder: "Text area Field...",
                    value: "",
                    onChange: () => {},
                    multiline: true,
                    rows: 14,
                    fullWidth: true,
                  },
                },
              },
            },
          },
        },
      },
    } satisfies PromptForgerViewModel,
  };
}
