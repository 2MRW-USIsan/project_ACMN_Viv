import { ChipCheckProps } from "@/components/atoms/inputs/ChipCheck";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { LabelProps } from "@/components/atoms/display/Label";
import { SwitchAtomProps } from "@/components/atoms/inputs/Switcher";
import { TextFieldAtomProps } from "@/components/atoms/inputs/TextField";
import { NavigationLayoutType } from "@/types/navigation";
import { AppBarType, DrawerType, LabelAtomType } from "@/types/ui";
import { BodyType } from "@/types/configurations/orders/blocs";
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
  valueLabel: LabelProps["props"];
  valueField: TextFieldAtomProps["props"];
  promptLabel: LabelProps["props"];
  promptField: TextFieldAtomProps["props"];
  weightLabel: LabelProps["props"];
  weightField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
}

export interface RandomSection {
  headerLabel: LabelProps["props"];
  randomRows: RandomRowItem[];
  addRowLabel: LabelProps["props"];
  addRowButton: IconButtonAtomProps["props"];
}

export interface ScriptsSection {
  scriptLabel: LabelProps["props"];
  scriptInfoLabel: LabelProps["props"];
}

export interface ColorsSection {
  colorLabel: LabelProps["props"];
  colorInfoLabel: LabelProps["props"];
}

export interface ComplexRandomItemPanel {
  key: string;
  valueLabel: LabelProps["props"];
  valueField: TextFieldAtomProps["props"];
  promptLabel: LabelProps["props"];
  promptField: TextFieldAtomProps["props"];
  weightLabel: LabelProps["props"];
  weightField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
}

export interface ComplexCategoryPanel {
  key: string;
  categoryLabel: LabelProps["props"];
  valueLabel: LabelProps["props"];
  valueField: TextFieldAtomProps["props"];
  promptLabel: LabelProps["props"];
  promptField: TextFieldAtomProps["props"];
  weightLabel: LabelProps["props"];
  weightField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  randomSectionLabel: LabelProps["props"];
  randomItemPanels: ComplexRandomItemPanel[];
  addRandomItemRowLabel: LabelProps["props"];
  addRandomItemButton: IconButtonAtomProps["props"];
}

export interface ComplexSection {
  categoryPanels: ComplexCategoryPanel[];
  addCategoryRowLabel: LabelProps["props"];
  addCategoryButton: IconButtonAtomProps["props"];
}

export interface OrdersItemPanel {
  key: string;
  panelLabel: LabelProps["props"];
  keyLabel: LabelProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  ordersTypeLabel: LabelProps["props"];
  ordersTypeChips: Array<ChipCheckProps["props"] & { key: string }>;
  selectedTypeLabel: LabelProps["props"] | null;
  randomSection: RandomSection | null;
  complexSection: ComplexSection | null;
  scriptsSection: ScriptsSection | null;
  colorsSection: ColorsSection | null;
}

export interface OrdersItemSection {
  ordersItemPanels: OrdersItemPanel[];
  addItemRowLabel: LabelProps["props"];
  addItemButton: IconButtonAtomProps["props"];
}

export interface OrdersGrpPanel {
  key: string;
  panelLabel: LabelProps["props"];
  keyLabel: LabelProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  orderItemsLabel: LabelProps["props"];
  ordersItemSection: OrdersItemSection;
}

export interface SwitchItemPanel {
  key: string;
  labelLabel: LabelProps["props"];
  labelField: TextFieldAtomProps["props"];
  valueLabel: LabelProps["props"];
  valueField: TextFieldAtomProps["props"];
  altLabel: LabelProps["props"];
  altField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
}

export interface SwitchItemSection {
  randomizeLabel: LabelProps["props"];
  randomizeSwitch: SwitchAtomProps["props"];
  switchItemPanels: SwitchItemPanel[];
  addSwitchRowLabel: LabelProps["props"];
  addSwitchButton: IconButtonAtomProps["props"];
}

export interface SwitchGrpPanel {
  key: string;
  panelLabel: LabelProps["props"];
  keyLabel: LabelProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  switchItemsLabel: LabelProps["props"];
  switchItemSection: SwitchItemSection;
}

export interface ListItemPanel {
  key: string;
  valueLabel: LabelProps["props"];
  valueField: TextFieldAtomProps["props"];
  promptLabel: LabelProps["props"];
  promptField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
}

export interface SelectorPanel {
  key: string;
  panelLabel: LabelProps["props"];
  keyLabel: LabelProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  listItemsLabel: LabelProps["props"];
  listItemPanels: ListItemPanel[];
  addListItemRowLabel: LabelProps["props"];
  addListItemButton: IconButtonAtomProps["props"];
}

export interface SelectItemSection {
  shuffleLabel: LabelProps["props"];
  shuffleSwitch: SwitchAtomProps["props"];
  selectorsLabel: LabelProps["props"];
  selectorPanels: SelectorPanel[];
  addSelectorRowLabel: LabelProps["props"];
  addSelectorButton: IconButtonAtomProps["props"];
}

export interface SelectGrpPanel {
  key: string;
  panelLabel: LabelProps["props"];
  keyLabel: LabelProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  selectItemsLabel: LabelProps["props"];
  selectItemSection: SelectItemSection;
}

export type ConfigBodySectionType = "Orders" | "Switch" | "Select";

export interface ConfigBodySection {
  key: string;
  type: ConfigBodySectionType;
  titleLabel: LabelProps["props"];
  placeholderLabel: LabelProps["props"];
  ordersGrpPanels?: OrdersGrpPanel[];
  addGrpRowLabel?: LabelProps["props"];
  addGrpButton?: IconButtonAtomProps["props"];
  switchGrpPanels?: SwitchGrpPanel[];
  addSwitchGrpRowLabel?: LabelProps["props"];
  addSwitchGrpButton?: IconButtonAtomProps["props"];
  selectGrpPanels?: SelectGrpPanel[];
  addSelectGrpRowLabel?: LabelProps["props"];
  addSelectGrpButton?: IconButtonAtomProps["props"];
}

export interface ConfigBodyBlocPanel {
  key: string;
  panelLabel: LabelProps["props"];
  keyLabel: LabelProps["props"];
  keyField: TextFieldAtomProps["props"];
  labelLabel: LabelProps["props"];
  labelField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
  toggleButton: IconButtonAtomProps["props"];
  isExpanded: boolean;
  blocSelectLabel: LabelProps["props"];
  blocTypeChips: Array<ChipCheckProps["props"] & { key: string }>;
  sections: ConfigBodySection[];
}

export interface ConfigurationsViewModel {
  navigationLayout: {
    appBar: AppBarType;
    drawer: DrawerType;
    title: LabelAtomType;
    navigation: NavigationLayoutType["navigation"];
  };
  configBody: BodyType;
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
        title: { text: "ACMN" },
        navigation: {
          linksAbove: [],
          label: undefined,
          links: [],
        },
      },
      configBody: {
        headerLabel: {
          text: "Configurations Form:",
          variant: "subtitle1",
        },
        panels: [],
        addRowLabel: {
          text: "Add Bloc:",
          variant: "body2",
        },
        addButton: {
          icon: "add",
          onClick: () => {},
        },
        add: {
          label: {
            text: "",
            variant: undefined,
            color: undefined,
            fontWeight: undefined,
            style: undefined,
          },
          onClick: function (): void {
            throw new Error("Function not implemented.");
          },
        },
      },
    } satisfies ConfigurationsViewModel,
  };
}
