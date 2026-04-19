import { LabelProps } from "@/components/atoms/display/Label";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { SwitchAtomProps } from "@/components/atoms/inputs/Switcher";
import { TextFieldAtomProps } from "@/components/atoms/inputs/TextField";
import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { LabelAtomType } from "../ui";
import { SelectorType } from "./types";

export type ListItemPanelType = {
  key: string;
  valueLabel: LabelProps["props"];
  valueField: TextFieldAtomProps["props"];
  promptLabel: LabelProps["props"];
  promptField: TextFieldAtomProps["props"];
  removeButton: IconButtonAtomProps["props"];
};

export type SelectorPanelType = {
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
  listItemPanels: ListItemPanelType[];
  addListItemRowLabel: LabelProps["props"];
  addListItemButton: IconButtonAtomProps["props"];
};

export type SelectItemSectionType = {
  shuffleLabel: LabelProps["props"];
  shuffleSwitch: SwitchAtomProps["props"];
  selectorsLabel: LabelProps["props"];
  selectorPanels: SelectorPanelType[];
  addSelectorRowLabel: LabelProps["props"];
  addSelectorButton: IconButtonAtomProps["props"];
};

export type SelectGroupPanelType = {
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
  selectItemSection: SelectItemSectionType;
};

export type SectionType = {
  selector: SelectorType;
  panels: any[];
  add: AddPanelButtonType;
  label: LabelAtomType;
};

export interface SectionProps {
  props: SectionType;
}

export interface ConfigurationSelectSectionOrganismProps {
  props: SectionType;
}

export interface SelectItemSectionOrganismProps {
  props: SelectItemSectionType;
}
