import type {
  ColorsSection,
  ComplexSection,
  ConfigBodyBlocPanel,
  ConfigBodySection,
  OrdersItemSection,
  RandomSection,
  ScriptsSection,
  SelectItemSection,
  SwitchItemSection,
} from "@/hooks/configurations/viewModel/useConfigurationsComposer";

export interface ConfigurationComplexSectionOrganismProps {
  props: ComplexSection;
}

export interface ConfigurationBlocPanelOrganismProps {
  props: ConfigBodyBlocPanel;
}

export interface ConfigurationOrdersSectionOrganismProps {
  props: ConfigBodySection;
}

export interface ConfigurationOrdersItemSectionOrganismProps {
  props: OrdersItemSection;
}

export interface ConfigurationOrdersItemColorsOrganismProps {
  props: ColorsSection;
}

export interface ConfigurationOrdersItemScriptsOrganismProps {
  props: ScriptsSection;
}

export interface OrdersRandomSectionOrganismProps {
  props: RandomSection;
}

export interface ConfigurationSelectSectionOrganismProps {
  props: ConfigBodySection;
}

export interface SelectItemSectionOrganismProps {
  props: SelectItemSection;
}

export interface ConfigurationSwitchSectionOrganismProps {
  props: ConfigBodySection;
}

export interface SwitchItemSectionOrganismProps {
  props: SwitchItemSection;
}
