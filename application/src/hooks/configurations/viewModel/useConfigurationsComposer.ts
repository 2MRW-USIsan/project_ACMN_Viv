import { ChipCheckboxAtomProps } from "@/components/atoms/inputs/ChipCheckboxAtom";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { LabelAtomProps } from "@/components/atoms/display/LabelAtom";
import { SwitchAtomProps } from "@/components/atoms/inputs/SwitchAtom";
import { TextFieldAtomProps } from "@/components/atoms/inputs/TextFieldAtom";
import { NavigationOrganismProps } from "@/components/organisms/navigation/NavigationOrganism";
import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";

export interface BlocItem {
  id: string;
  keyValue: string;
  labelValue: string;
  availableBlocTypes: string[];
}

export interface OrdersGrpItem {
  id: string;
  keyValue: string;
  labelValue: string;
}

export type OrdersTypeOption = "random" | "complex" | "scripts" | "colors";

export interface RandomRowItem {
  key: string;
  valueLabel: LabelAtomProps["props"];
  valueField: TextFieldAtomProps["props"];
  promptLabel: LabelAtomProps["props"];
  promptField: TextFieldAtomProps["props"];
  weightLabel: LabelAtomProps["props"];
  weightField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
}

export interface RandomSection {
  headerLabel: LabelAtomProps["props"];
  randomRows: RandomRowItem[];
  addRowLabel: LabelAtomProps["props"];
  addRowButton: IconButtonAtomProps["props"];
}

export interface ScriptsSection {
  scriptLabel: LabelAtomProps["props"];
  scriptInfoLabel: LabelAtomProps["props"];
}

export interface ColorsSection {
  colorLabel: LabelAtomProps["props"];
  colorInfoLabel: LabelAtomProps["props"];
}

export interface ComplexRandomItemPanel {
  key: string;
  valueLabel: LabelAtomProps["props"];
  valueField: TextFieldAtomProps["props"];
  promptLabel: LabelAtomProps["props"];
  promptField: TextFieldAtomProps["props"];
  weightLabel: LabelAtomProps["props"];
  weightField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
}

export interface ComplexCategoryPanel {
  key: string;
  categoryLabel: LabelAtomProps["props"];
  valueLabel: LabelAtomProps["props"];
  valueField: TextFieldAtomProps["props"];
  promptLabel: LabelAtomProps["props"];
  promptField: TextFieldAtomProps["props"];
  weightLabel: LabelAtomProps["props"];
  weightField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  randomSectionLabel: LabelAtomProps["props"];
  randomItemPanels: ComplexRandomItemPanel[];
  addRandomItemRowLabel: LabelAtomProps["props"];
  addRandomItemButton: IconButtonAtomProps["props"];
}

export interface ComplexSection {
  categoryPanels: ComplexCategoryPanel[];
  addCategoryRowLabel: LabelAtomProps["props"];
  addCategoryButton: IconButtonAtomProps["props"];
}

export interface OrdersItemPanel {
  key: string;
  panelLabel: LabelAtomProps["props"];
  keyLabel: LabelAtomProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  ordersTypeLabel: LabelAtomProps["props"];
  ordersTypeChips: Array<ChipCheckboxAtomProps["props"] & { key: string }>;
  selectedTypeLabel: LabelAtomProps["props"] | null;
  randomSection: RandomSection | null;
  complexSection: ComplexSection | null;
  scriptsSection: ScriptsSection | null;
  colorsSection: ColorsSection | null;
}

export interface OrdersItemSection {
  ordersItemPanels: OrdersItemPanel[];
  addItemRowLabel: LabelAtomProps["props"];
  addItemButton: IconButtonAtomProps["props"];
}

export interface OrdersGrpPanel {
  key: string;
  panelLabel: LabelAtomProps["props"];
  keyLabel: LabelAtomProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  orderItemsLabel: LabelAtomProps["props"];
  ordersItemSection: OrdersItemSection;
}

export interface SwitchItemPanel {
  key: string;
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  valueLabel: LabelAtomProps["props"];
  valueField: TextFieldAtomProps["props"];
  altLabel: LabelAtomProps["props"];
  altField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
}

export interface SwitchItemSection {
  randomizeLabel: LabelAtomProps["props"];
  randomizeSwitch: SwitchAtomProps["props"];
  switchItemPanels: SwitchItemPanel[];
  addSwitchRowLabel: LabelAtomProps["props"];
  addSwitchButton: IconButtonAtomProps["props"];
}

export interface SwitchGrpPanel {
  key: string;
  panelLabel: LabelAtomProps["props"];
  keyLabel: LabelAtomProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  switchItemsLabel: LabelAtomProps["props"];
  switchItemSection: SwitchItemSection;
}

export interface ListItemPanel {
  key: string;
  valueLabel: LabelAtomProps["props"];
  valueField: TextFieldAtomProps["props"];
  promptLabel: LabelAtomProps["props"];
  promptField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
}

export interface SelectorPanel {
  key: string;
  panelLabel: LabelAtomProps["props"];
  keyLabel: LabelAtomProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  listItemsLabel: LabelAtomProps["props"];
  listItemPanels: ListItemPanel[];
  addListItemRowLabel: LabelAtomProps["props"];
  addListItemButton: IconButtonAtomProps["props"];
}

export interface SelectItemSection {
  shuffleLabel: LabelAtomProps["props"];
  shuffleSwitch: SwitchAtomProps["props"];
  selectorsLabel: LabelAtomProps["props"];
  selectorPanels: SelectorPanel[];
  addSelectorRowLabel: LabelAtomProps["props"];
  addSelectorButton: IconButtonAtomProps["props"];
}

export interface SelectGrpPanel {
  key: string;
  panelLabel: LabelAtomProps["props"];
  keyLabel: LabelAtomProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelAtomProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  selectItemsLabel: LabelAtomProps["props"];
  selectItemSection: SelectItemSection;
}

export type ConfigBodySectionType = "Orders" | "Switch" | "Select";

export interface ConfigBodySection {
  key: string;
  type: ConfigBodySectionType;
  titleLabel: LabelAtomProps["props"];
  placeholderLabel: LabelAtomProps["props"];
  ordersGrpPanels?: OrdersGrpPanel[];
  addGrpRowLabel?: LabelAtomProps["props"];
  addGrpButton?: IconButtonAtomProps["props"];
  switchGrpPanels?: SwitchGrpPanel[];
  addSwitchGrpRowLabel?: LabelAtomProps["props"];
  addSwitchGrpButton?: IconButtonAtomProps["props"];
  selectGrpPanels?: SelectGrpPanel[];
  addSelectGrpRowLabel?: LabelAtomProps["props"];
  addSelectGrpButton?: IconButtonAtomProps["props"];
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
      onMenuOpen: () => void;
    };
    drawer: {
      open: boolean;
      onClose: () => void;
    };
    title: string;
    navigation: NavigationOrganismProps["props"];
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
          onMenuOpen: () => {},
        },
        drawer: {
          open: false,
          onClose: () => {},
        },
        title: "ACMN",
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
