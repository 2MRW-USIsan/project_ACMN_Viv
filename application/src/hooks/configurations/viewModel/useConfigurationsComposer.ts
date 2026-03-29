"use client";

import { NavItem } from "@/components/atoms/DrawerAtom";
import { NavigationConfigurations } from "@/components/organisms/NavigationOrganism";
import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";
import { LabelAtomProps } from "@/components/atoms/LabelAtom";
import { NavLinkAtomProps } from "@/components/atoms/NavLinkAtom";
import { TextFieldAtomProps } from "@/components/atoms/TextFieldAtom";
import { IconButtonAtomProps } from "@/components/atoms/IconButtonAtom";
import { ChipCheckboxAtomProps } from "@/components/atoms/ChipCheckboxAtom";

export interface BlocItem {
  id: string;
  keyValue: string;
  labelValue: string;
  availableBlocTypes: string[];
}

export type ConfigBodySectionType = "Orders" | "Switch" | "Select";

export interface ConfigBodySection {
  key: string;
  type: ConfigBodySectionType;
  titleLabel: LabelAtomProps["props"];
  placeholderLabel: LabelAtomProps["props"];
}

export interface ConfigBodyBlocPanel {
  key: string;
  panelLabel: LabelAtomProps["props"];
  keyLabel: LabelAtomProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  blocSelectLabel: LabelAtomProps["props"];
  blocTypeChips: Array<ChipCheckboxAtomProps["props"] & { key: string }>;
  sections: ConfigBodySection[];
}

export interface ConfigurationsViewModel {
  navigationLayout: {
    appBar: {
      title: string;
      onMenuOpen: () => void;
    };
    drawer: {
      open: boolean;
      onClose: () => void;
    };
    navigation: {
      activeItemLabel?: LabelAtomProps["props"];
      links: NavLinkAtomProps["props"][];
      configurations?: NavigationConfigurations;
    };
  };
  configBody: {
    headerLabel: LabelAtomProps["props"];
    blocPanels: ConfigBodyBlocPanel[];
    addRowLabel: LabelAtomProps["props"];
    addButton: IconButtonAtomProps["props"];
  };
}

export function useConfigurationsComposer(contexts: ConfigurationsContexts) {
  const { properties: _properties } = useConfigurationsProperties(contexts);
  const { handlers: _handlers } = useConfigurationsHandlers(contexts);

  return {
    viewModel: {
      navigationLayout: {
        // NavigationLayout のスタブ実装（工程2〜3で実際の値に置き換える）
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
      configBody: {
        headerLabel: {
          text: "Configurations Form:",
          variant: "subtitle1",
        },
        blocPanels: [],
        addRowLabel: {
          text: "Add Bloc:",
          variant: "body2",
        },
        addButton: {
          icon: "add",
          onClick: () => {},
        },
      },
    } satisfies ConfigurationsViewModel,
  };
}
